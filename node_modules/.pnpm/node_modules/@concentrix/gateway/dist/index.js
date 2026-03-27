"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const ws_1 = require("ws");
const redis_1 = require("redis");
const event_schemas_1 = require("@concentrix/event-schemas");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const wss = new ws_1.WebSocketServer({ server });
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const redisPublisher = (0, redis_1.createClient)({ url: REDIS_URL });
const redisSubscriber = (0, redis_1.createClient)({ url: REDIS_URL });
// ZTA: Evitar crasheo si falla la conexión (ECONNREFUSED)
redisPublisher.on('error', (err) => console.warn('⚠️ Sifu Gateway: Redis Publisher fallback (Mock Local)'));
redisSubscriber.on('error', (err) => console.warn('⚠️ Sifu Gateway: Redis Subscriber fallback (Mock Local)'));
let isRedisConnected = false;
const PORT = process.env.PORT || 4000;
// Middleware
app.use(express_1.default.json());
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
wss.on('connection', (ws) => {
    console.log('🔌 Sifu Gateway: Cliente Frontend conectado');
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message.toString());
            console.log('📥 Recepción WS:', data.type);
        }
        catch (e) {
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
                if (client.readyState === ws_1.WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });
        console.log('📡 Sifu Gateway: Redis Pub/Sub activo');
    }
    catch (e) {
        console.warn('⚠️ Sifu Gateway: Fallo crítico de conexión a Redis durante el arranque. Usando fallback (Mock Local).');
        isRedisConnected = false;
    }
};
// API: Recibir requerimientos manuales o de audio
app.post('/api/requirement', async (req, res) => {
    try {
        const validated = event_schemas_1.RequirementEventSchema.parse(req.body);
        if (isRedisConnected) {
            await redisPublisher.publish('sensei:live:telemetry', JSON.stringify(validated));
        }
        else {
            console.warn('⚠️ Redis no disponible, simulando evento MOCK LOCAL:', validated);
            // MOCK LOCAL FALLBACK: Enviar el mensaje por WebSockets simulando la respuesta del Worker
            wss.clients.forEach((client) => {
                if (client.readyState === ws_1.WebSocket.OPEN) {
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
    }
    catch (e) {
        res.status(400).json({ error: 'Invalid schema', details: e });
    }
});
initRedis().catch(console.error);
server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 Sifu Event Gateway corriendo en tcp://0.0.0.0:${PORT}`);
});
