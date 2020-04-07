const WebSocket = require('ws');
const CryptoJS = require("crypto-js");

const port = process.env.PORT || 5000;

const wss = new WebSocket.Server({ port });

wss.on('connection', function connection(ws) {
    console.log('connected');
    ws.on('message', function incoming(message) {
        try {
            const bytesBody  = CryptoJS.AES.decrypt(message, 'abcd');
            const body = JSON.parse(bytesBody.toString(CryptoJS.enc.Utf8));
            console.log(`received: `, body);
        } catch (e) {
            console.error(e);
            ws.close(1002, 'Invalid Password');
        }
    });
});

console.log(`Listening to port: ${port}`);