const express = require('express');
const { createServer } = require('http');
const { WebSocketServer, WebSocket } = require('ws');
const { createClient } = require('redis');
const EventEmitter = require('events');

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });
const mockBus = new EventEmitter();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
let redisPublisher;
let redisSubscriber;

const PORT = process.env.PORT || 4000;

app.use(express.json());

wss.on('connection', (ws) => {
  console.log('🔌 Sifu Gateway: Cliente Frontend conectado');
});

const broadcast = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

const initRedis = async () => {
  try {
    redisPublisher = createClient({ url: REDIS_URL });
    redisSubscriber = createClient({ url: REDIS_URL });
    
    await redisPublisher.connect();
    await redisSubscriber.connect();
    
    await redisSubscriber.subscribe('sensei:live:telemetry', (message) => {
      broadcast(message);
    });
    console.log('📡 Sifu Gateway: Redis Pub/Sub activo');
  } catch (e) {
    console.warn('⚠️ Redis no disponible. Usando Mock Bus interno.');
    mockBus.on('message', (message) => {
      broadcast(message);
    });
  }
};

app.post('/api/requirement', async (req, res) => {
  const payload = JSON.stringify(req.body);
  try {
    if (redisPublisher && redisPublisher.isOpen) {
      await redisPublisher.publish('sensei:live:telemetry', payload);
    } else {
      mockBus.emit('message', payload);
    }
    res.status(202).json({ status: 'queued' });
  } catch (e) {
    res.status(400).json({ error: 'Error publishing', details: e.message });
  }
});

initRedis().catch(console.error);

server.listen(PORT, () => {
  console.log(`🚀 Sifu Event Gateway (Mockable) corriendo en http://localhost:${PORT}`);
});
