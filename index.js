const WebSocket = require('ws');
const CryptoJS = require("crypto-js");
const { PeerServer } = require('peer');
const axios = require('axios');
const wsport = process.env.WS_PORT || 4000;
const peerport = process.env.PORT || 9000;

const wss = new WebSocket.Server({ port: wsport });
wss.on('connection', function connection(ws) {
    console.log('connected');
    ws.on('message', function incoming(message) {
        try {
            const bytesBody  = CryptoJS.AES.decrypt(message, 'abcd');
            const body = JSON.parse(bytesBody.toString(CryptoJS.enc.Utf8));
            axios.post('http://localhost:5000/message', body)
                .catch(e => console.error(e.message));
        } catch (e) {
            console.error(e);
            ws.close(1002, 'Invalid Password');
        }
    });
});
console.log(`WS listening on port: ${wsport}`);

const peerServer = PeerServer({ port: peerport, path: '/peer' });
console.log(`Peer listening on port: ${peerport}`);