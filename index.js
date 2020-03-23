const WebSocket = require('ws');
const port = process.env.PORT || 5000;

const wss = new WebSocket.Server({ port });

wss.on('connection', function connection(ws) {
    console.log('connected');
    ws.on('message', function incoming(message) {
        console.log(`received: ${message}`);
    });
});

console.log(`Listening to port: ${port}`);