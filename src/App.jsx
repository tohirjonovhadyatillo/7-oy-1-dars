import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleTimeOut = () => {
    if (isTimeout) {
      setTime(25 * 60);
      setIsTimeout(false)
    } else {
      setTime(5 * 60);
      setIsTimeout(true);
    }
    setIsRunning(false);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">LOGO✔️</h1>
        <div className="header-buttons">
          <button className="report-btn">Report📝</button>
          <button className="settings-btn"> Settings⚙️</button>
        </div>
      </header>

      <main className="timer-section">
        <div className="timer-box">
          <div className="mode-switch">
            <button className="active">Pomodoro</button>
            <button>Short Break</button>
            <button>Long Break</button>
          </div>
          <h1 className="timer-display">{formatTime(time)}</h1>
          <div className="timer-controls">
            <button
              className="start-btn"
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? "PAUSE" : "START"}
            </button>
            <button className="timeout-btn" onClick={handleTimeOut}>
              {isTimeout ? "RESET to 25m" : "TIME OUT"}
            </button>
          </div>
        </div>
        <p className="focus-text">#1 Time to focus!</p>
      </main>

      <section className="tasks">
        <h2>Tasks</h2>
        <div className="add-task">
          <button className="add-task-btn">➕ Add Task</button>
        </div>
      </section>
    </div>
  );
}

export default App;
