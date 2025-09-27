// src/components/MotorControl.js
import React from "react";

export default function MotorControl() {

  async function connectESP() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'ESP32-Motors' }],
        optionalServices: [0xFFE0]
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(0xFFE0);
      const characteristic = await service.getCharacteristic(0xFFE1);

      // Example: M1 forward, M2 backward
      await characteristic.writeValue(new TextEncoder().encode("M1:1,M2:-1"));

      // Stop both motors after 1 second
      setTimeout(async () => {
        await characteristic.writeValue(new TextEncoder().encode("M1:0,M2:0"));
      }, 1000);

    } catch (err) {
      console.error(err);
      alert("Failed to connect to ESP32. Make sure Bluetooth is on.");
    }
  }

  return (
    <div>
      <h2>ESP32 Motor Alarm</h2>
      <button onClick={connectESP}>Start Motor Challenge</button>
    </div>
  );
}

