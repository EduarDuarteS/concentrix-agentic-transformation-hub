import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createClient } from 'redis';
import { RequirementEventSchema } from '@concentrix/event-schemas';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const redisPublisher = createClient({ url: REDIS_URL });
const redisSubscriber = createClient({ url: REDIS_URL });

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

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
    
    await redisSubscriber.subscribe('sensei:live:telemetry', (message) => {
      // Difundir a todos los clientes WS conectados (Dashboard/Canvas)
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
    
    console.log('📡 Sifu Gateway: Redis Pub/Sub activo');
  } catch (e) {
    console.error('❌ Sifu Gateway: Fallo crítico de conexión a Redis durante el arranque. El bus de eventos estático.', e);
  }
};

// API: Recibir requerimientos manuales o de audio
app.post('/api/requirement', async (req, res) => {
  try {
    const validated = RequirementEventSchema.parse(req.body);
    await redisPublisher.publish('sensei:live:telemetry', JSON.stringify(validated));
    res.status(202).json({ status: 'queued', id: validated.id });
  } catch (e) {
    res.status(400).json({ error: 'Invalid schema', details: e });
  }
});

initRedis().catch(console.error);

server.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Sifu Event Gateway corriendo en tcp://0.0.0.0:${PORT}`);
});
