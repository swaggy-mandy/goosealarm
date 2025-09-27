import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmTriggered, setAlarmTriggered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    if (alarmTime && time.toLocaleTimeString('en-US', { hour12: false }) === alarmTime) {
      setAlarmTriggered(true);
      alert('⏰ Alarm ringing!');
    }

    return () => clearInterval(interval);
  }, [time, alarmTime]);

  const handleAlarmChange = (e) => {
    setAlarmTime(e.target.value);
    setAlarmTriggered(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Current Time</h1>
      <h2>{time.toLocaleTimeString()}</h2>

      <h3>Set Alarm (HH:MM:SS, 24-hour)</h3>
      <input type="time" step="1" onChange={handleAlarmChange} />
      {alarmTriggered && <p style={{ color: 'red' }}>Alarm is ringing!</p>}
    </div>
  );
};

export default Clock;
