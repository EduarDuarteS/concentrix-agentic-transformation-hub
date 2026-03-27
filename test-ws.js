const WebSocket = require('ws');

console.log('Connecting to WS...');
const ws = new WebSocket('wss://gateway-app-7998411376.us-central1.run.app/');

ws.on('open', () => {
  console.log('WebSocket Opened!');
});

ws.on('message', (data) => {
  console.log('Data received:', data.toString());
  process.exit(0);
});

ws.on('error', (err) => {
  console.error('WS Error:', err);
});

ws.on('close', () => {
  console.log('WS Closed');
});

setTimeout(() => {
  console.log('Timeout waiting for data');
  process.exit(1);
}, 10000);
