const SerialPort = require('serialport');
const WebSocket = require('ws');

// Change 'COM3' to your Arduino's port (check Arduino IDE > Tools > Port)
const port = new SerialPort('COM3', { baudRate: 9600 });
const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', ws => {
  port.on('data', data => {
    const msg = data.toString().trim();
    if (msg === 'ALARM_OFF') {
      ws.send('ALARM_OFF');
    }
  });
});

console.log('Serial bridge running. WebSocket on ws://localhost:8081');
