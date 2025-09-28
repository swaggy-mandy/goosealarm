import React from 'react';
import Clock from './clock';
import './App.css';
import MotorControl from "./components/MotorControl"; // check path

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
