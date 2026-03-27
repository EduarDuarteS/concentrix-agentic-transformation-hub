const WebSocket = require('ws');
console.log('Connecting to WS...');
const ws = new WebSocket('wss://gateway-app-7998411376.us-central1.run.app/');
ws.on('open', () => {
  console.log('WebSocket Opened!');
});
ws.on('message', (data) => {
  console.log('Data received:', data.toString());
});
ws.on('error', (err) => {
  console.error('WS Error:', err);
});
setTimeout(() => {
  console.log('Timeout');
  process.exit(1);
}, 10000);
