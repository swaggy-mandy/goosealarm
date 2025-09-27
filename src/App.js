import React from 'react';
import Clock from './clock';
import './App.css';

function App() {
  return (
    <div className="App">
      <Clock />
      <h1>Wake-Up Alarm</h1>
      <MotorControl />
    </div>
  );
}

export default App;
