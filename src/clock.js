

import React, { useState, useEffect } from "react";
import bg1 from "./assets/backgrounds/1.png";
import bg2 from "./assets/backgrounds/2.png";
import bg3 from "./assets/backgrounds/3.png";
import bg4 from "./assets/backgrounds/4.png";
import bg5 from "./assets/backgrounds/5.png";
import bg6 from "./assets/backgrounds/6.png";



const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const [alarmPhase, setAlarmPhase] = useState(0); // 0: not ringing, 1: phase1, 2: phase2, 3: phase3, 4: phase4


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
      setAlarmPhase(1);
    }

    return () => clearInterval(interval);
  }, [time, alarmTime, alarmTriggered]);

  // Handle alarm phase progression: 2.png, 3.png, 4.png, 5.png (phases 1-4)
  useEffect(() => {
    let phaseTimeout;
    if (alarmTriggered && alarmPhase > 0 && alarmPhase < 4) {
      phaseTimeout = setTimeout(() => setAlarmPhase(alarmPhase + 1), 5000);
    }
    return () => clearTimeout(phaseTimeout);
  }, [alarmTriggered, alarmPhase]);

  // Listen for ALARM_OFF from Node.js serial bridge
  useEffect(() => {
    const ws = new window.WebSocket('ws://localhost:8081');
    ws.onmessage = (event) => {
      if (event.data === 'ALARM_OFF') {
  setAlarmTriggered(false);
  setAlarmPhase(0);
      }
    };
    return () => ws.close();
  }, []);



  const handleAlarmChange = (e) => {
  setAlarmTime(e.target.value);
  setAlarmTriggered(false);
  setAlarmPhase(0);
  };

  // Determine which background to use and UI colors
  let backgroundImg = bg1;
  let textColor = "#e0eaff";
  let boxBg = "rgba(30,40,80,0.10)";
  let accentColor = "#ffe082";
  let alarmColor = "#e57373cc";
  let inputBg = "#2228";
  let inputBorder = accentColor;
  let shadow = "0 2px 8px #0008";
  const hour = time.getHours();
  if (!alarmTriggered) {
    // Not ringing
    if (hour >= 7 && hour < 21) {
      backgroundImg = bg6; // 6.png for daytime
      textColor = "#2d2d2d";
  boxBg = "rgba(255,255,255,0.10)";
      accentColor = "#ffb300";
      alarmColor = "#ff7043cc";
      inputBg = "#fff8e1";
      inputBorder = accentColor;
      shadow = "0 2px 8px #ffb30044";
    } else {
      backgroundImg = bg1; // 1.png for night
      textColor = "#e0eaff";
  boxBg = "rgba(30,40,80,0.10)";
      accentColor = "#ffe082";
      alarmColor = "#e57373cc";
      inputBg = "#2228";
      inputBorder = accentColor;
      shadow = "0 2px 8px #0008";
    }
  } else {
    // Alarm phases
  if (alarmPhase === 1) { backgroundImg = bg2; textColor = "#fff"; boxBg = "rgba(255, 183, 77, 0.10)"; accentColor = "#ff7043"; alarmColor = "#ff7043cc"; inputBg = "#fff3e0"; inputBorder = accentColor; shadow = "0 2px 8px #ff704344"; }
  else if (alarmPhase === 2) { backgroundImg = bg3; textColor = "#fff"; boxBg = "rgba(255, 255, 255, 0.10)"; accentColor = "#90caf9"; alarmColor = "#90caf9cc"; inputBg = "#e3f2fd"; inputBorder = accentColor; shadow = "0 2px 8px #90caf944"; }
  else if (alarmPhase === 3) { backgroundImg = bg4; textColor = "#fff"; boxBg = "rgba(120, 144, 156, 0.10)"; accentColor = "#ffb300"; alarmColor = "#ffb300cc"; inputBg = "#eceff1"; inputBorder = accentColor; shadow = "0 2px 8px #ffb30044"; }
  else if (alarmPhase === 4) { backgroundImg = bg5; textColor = "#fff"; boxBg = "rgba(183,28,28,0.10)"; accentColor = "#fff"; alarmColor = "#b71c1ccc"; inputBg = "#ffebee"; inputBorder = accentColor; shadow = "0 2px 8px #b71c1c44"; }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#222"
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(90vw, 600px)",
          aspectRatio: "1/1.3",
          maxWidth: 400,
          maxHeight: 520,
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: "0 4px 24px #0002",
          borderRadius: 24
        }}
      >

        <div style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          maxWidth: "60%",
          background: boxBg.replace(/0\.10\)/, '0.20)'),
          borderRadius: 12,
          padding: "10px 0 6px 0",
          textAlign: "center",
          boxSizing: "border-box",
          overflow: "hidden"
        }}>
          <h1 style={{ fontSize: "1.1rem", margin: 0, color: textColor, letterSpacing: 1, textShadow: shadow }}>Current Time</h1>
          <h2 style={{ fontSize: "2rem", margin: 0, color: textColor, letterSpacing: 2, textShadow: shadow }}>{time.toLocaleTimeString()}</h2>
        </div>


        <div style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          maxWidth: "60%",
          textAlign: "center"
        }}>
          <h3 style={{ fontSize: "1.7rem", margin: 0, color: accentColor, letterSpacing: 1, textShadow: shadow }}>Set Alarm</h3>
          <p style={{ fontSize: "1.05rem", margin: "8px 0 16px 0", color: textColor, textShadow: shadow }}>(HH:MM:SS, 24-hour)</p>
          <input
            type="time"
            step="1"
            onChange={handleAlarmChange}
            style={{
              fontSize: "1.3rem",
              padding: "8px 12px",
              borderRadius: 8,
              border: `2px solid ${inputBorder}`,
              background: inputBg,
              color: textColor,
              outline: "none",
              boxShadow: shadow,
              width: "70%",
              margin: "0 auto",
              display: "block"
            }}
          />
          {alarmTriggered && (
            <p
              style={{
                color: textColor,
                fontWeight: 700,
                fontSize: "1.1rem",
                background: alarmColor,
                borderRadius: 8,
                padding: "8px 0",
                marginTop: 14,
                letterSpacing: 1,
                textShadow: shadow
              }}
            >
              Alarm is ringing!
            </p>
          )}
        </div>

        <div style={{
          position: "absolute",
          bottom: "6%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          maxWidth: "60%",
          textAlign: "center"
        }}>
          <p style={{ fontSize: "0.85rem", color: textColor, fontStyle: "italic", margin: 0, textShadow: shadow }}>
            To turn off the alarm, win the Arduino Uno game connected via USB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Clock;
