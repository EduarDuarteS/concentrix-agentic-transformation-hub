import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createClient } from 'redis';
import { RequirementEventSchema } from '@concentrix/event-schemas';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(cors());
const server = createServer(app);
const wss = new WebSocketServer({ server });

let REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// ZTA Self-Healing: Forzar TLS (rediss://) si detectamos Upstash Serverless
// Cura crasheos silenciosos por secretos de GitHub pegados sin la 's'
if (REDIS_URL.includes('upstash.io') && REDIS_URL.startsWith('redis://')) {
  console.warn('🛡️ ZTA: Detectada URL de Upstash sin TLS. Aplicando Auto-Heal a rediss://');
  REDIS_URL = REDIS_URL.replace('redis://', 'rediss://');
}

const redisPublisher = createClient({ url: REDIS_URL });
const redisSubscriber = createClient({ url: REDIS_URL });

// ZTA: Evitar crasheo si falla la conexión (ECONNREFUSED)
redisPublisher.on('error', (err) => console.warn('⚠️ Sifu Gateway: Redis Publisher fallback (Mock Local)'));
redisSubscriber.on('error', (err) => console.warn('⚠️ Sifu Gateway: Redis Subscriber fallback (Mock Local)'));

let isRedisConnected = false;

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Sifu Event Gateway (WebSocket + Redis)',
    version: '1.0.0',
    redis_connected: isRedisConnected
  });
});

// WebSocket: Comunicación con el Frontend (Transient Updates)
wss.on('connection', (ws: WebSocket) => {
  console.log('🔌 Sifu Gateway: Cliente Frontend conectado');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log('📥 Recepción WS:', data.type);
    } catch (e) {
      console.error('❌ Error parseando mensaje WS');
    }
  });
});

// Redis Subscriber: Escucha eventos de los Workers y los manda al Frontend
const initRedis = async () => {
  try {
    await redisPublisher.connect();
    await redisSubscriber.connect();
    isRedisConnected = true;

    await redisSubscriber.subscribe('sensei:live:telemetry', (message) => {
      // Difundir a todos los clientes WS conectados (Dashboard/Canvas)
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    // Suscripción de Sensilla Inyectada (STT Subtítulos en Vivo)
    await redisSubscriber.subscribe('sensei:hud:insights', (message) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    console.log('📡 Sifu Gateway: Redis Pub/Sub activo');
  } catch (e) {
    console.warn('⚠️ Sifu Gateway: Fallo crítico de conexión a Redis durante el arranque. Usando fallback (Mock Local).');
    isRedisConnected = false;
  }
};

// API: Recibir requerimientos manuales o de audio
app.post('/api/requirement', async (req, res) => {
  try {
    const validated = RequirementEventSchema.parse(req.body);

    if (isRedisConnected) {
      await redisPublisher.publish('sensei:live:telemetry', JSON.stringify(validated));
    } else {
      console.warn('⚠️ Redis no disponible, simulando evento MOCK LOCAL:', validated);
      // MOCK LOCAL FALLBACK: Enviar el mensaje por WebSockets simulando la respuesta del Worker
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'agent_status_update',
            payload: {
              mock: true,
              originalEvent: validated
            }
          }));
        }
      });
    }

    res.status(202).json({ status: 'queued', id: validated.id, mock: !isRedisConnected });
  } catch (e) {
    res.status(400).json({ error: 'Invalid schema', details: e });
  }
});

// API: The Blueprint Engine (Vertex AI / Global Zone - 3.1 Pro)
app.post('/api/blueprint', async (req, res) => {
  try {
    const { buffer } = req.body;
    if (!buffer) return res.status(400).json({ error: 'Buffer is required' });
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY no conf en el Gateway' });
    }

    const url = `https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-3.1-pro-preview:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const systemInstruction = `
Eres el Enterprise Architect Chief de Concentrix. Tu misión es escuchar transcripciones desordenadas de entrevistas con clientes y transformarlas en un MEGA-PROMPT MAESTRO diseñado ESTRICTAMENTE para alimentar un generador de UI con IA (como Google Stitch, v0 o Cursor).

REGLAS ABSOLUTAS DEL PROMPT QUE VAS A GENERAR (EN INGLÉS):
1. MODO EXPANSIÓN MÁGICA: Aunque el cliente pida algo vago o minúsculo (ej. "una tabla de clientes"), tú DEBES extrapolarlo e imaginar un Producto SaaS Profesional completo. Añádele un Sidebar de Navegación, un Dashboard con 3 tarjetas de KPIs clave arriba (rendimiento, usuarios, etc.), y la tabla de datos robusta al centro.
2. ESTÉTICA OBLIGATORIA: En el prompt resultante, debes exigirle explícitamente a Stitch el siguiente diseño:
   - "Premium Glassmorphism Dark UI".
   - "Background purely #09090b (zinc-950) with subtle glowing noise".
   - "Cards should use bg-zinc-900/50, backdrop-blur-2xl, and ultra-thin borders (border-white/5)".
   - "Use Inter font (sans-serif) with tight tracking, using text-zinc-400 for secondary and white for primary text".
   - "Strategic neon accents using bg-indigo-500 and rose-500".
   - "Use exclusively lucide-react for all iconography".
3. FORMATO DE SALIDA: NO interactúes conmigo. Devuelve SOLO UN BLOQUE EN FORMATO MARKDOWN (\`\`\`) que contenga el mega-prompt final en INGLÉS listo para copiar y pegar.
    `;

    const payload = {
      contents: [{ role: 'user', parts: [{ text: buffer }] }],
      systemInstruction: { role: 'system', parts: [{ text: systemInstruction }] },
      generationConfig: { temperature: 0.2 }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
       const errorData = await response.text();
       throw new Error(`Vertex API Error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.json({ blueprint: resultText });
  } catch (error: any) {
    console.error('Vertex AI Error:', error);
    res.status(500).json({ error: `Error procesando Blueprint: ${error.message}` });
  }
});

initRedis().catch(console.error);

server.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Sifu Event Gateway corriendo en tcp://0.0.0.0:${PORT}`);
});
