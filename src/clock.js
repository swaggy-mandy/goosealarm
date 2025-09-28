import React, { useState, useEffect } from "react";

let device;
let characteristic;

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmTriggered, setAlarmTriggered] = useState(false);

  // Update the clock every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    // Check if alarm should trigger
    if (
      alarmTime &&
      time.toLocaleTimeString("en-US", { hour12: false }) === alarmTime &&
      !alarmTriggered
    ) {
      setAlarmTriggered(true);
      alert("⏰ Alarm ringing!");
      turnOnLight();
    }

    return () => clearInterval(interval);
  }, [time, alarmTime, alarmTriggered]);

  // Bluetooth connection
  const connectBluetooth = async () => {
    try {
      device = await navigator.bluetooth.requestDevice({
        filters: [{ name: "ESP32_LED" }],
        optionalServices: ["0000ffe0-0000-1000-8000-00805f9b34fb"],
      });
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(
        "0000ffe0-0000-1000-8000-00805f9b34fb"
      );
      characteristic = await service.getCharacteristic(
        "0000ffe1-0000-1000-8000-00805f9b34fb"
      );
      console.log("Connected to ESP32 via Bluetooth!");
    } catch (err) {
      console.error("Bluetooth connection failed:", err);
    }
  };

  // Send command to ESP32
  const sendCommand = async (cmd) => {
    if (!characteristic) {
      console.warn("Bluetooth not connected yet");
      return;
    }
    const data = new TextEncoder().encode(cmd);
    await characteristic.writeValue(data);
  };

  const turnOnLight = () => sendCommand("1");
  const turnOffLight = () => sendCommand("0");

  const handleAlarmChange = (e) => {
    setAlarmTime(e.target.value);
    setAlarmTriggered(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Current Time</h1>
      <h2>{time.toLocaleTimeString()}</h2>

      <h3>Set Alarm (HH:MM:SS, 24-hour)</h3>
      <input type="time" step="1" onChange={handleAlarmChange} />

      <div style={{ marginTop: "20px" }}>
        <button onClick={connectBluetooth}>Connect to ESP32</button>
        <button onClick={turnOnLight}>Turn On Light</button>
        <button onClick={turnOffLight}>Turn Off Light</button>
      </div>

      {alarmTriggered && <p style={{ color: "red" }}>Alarm is ringing!</p>}
    </div>
  );
};

export default Clock;
