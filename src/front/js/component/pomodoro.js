import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/pomodoro.css";

export const Pomodoro = () => {
  const work_time = 25 * 60; //25min en seg
  const break_time = 5 * 60; //5 min en seg 

  const { store, actions } = useContext(Context);

  const [workTime, setWorkTime] = useState(true); // true = working false = descanso
  const [completedCycles, setCompletedCycles] = useState(store.completedCycles);
  const [timeLeft, setTimeLeft] = useState(store.pomodoroTime);
  const [started, setStarted] = useState(store.started);

  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((time) => time - 1);

      }, 1000);

    } else if (timeLeft === 0) {
      if (workTime) {
        alert("Break time!");
        setWorkTime(false);
        setTimeLeft(break_time);

      } else {
        alert("Session completed!");
        setWorkTime(true);
        setTimeLeft(work_time);
        actions.addCompletedCycle();
      }
      setStarted(false);

    }

    return () => clearInterval(timer);

  }, [started, workTime, timeLeft]);

  const timeFormat = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  }

  // console.log("Started:", started);
  // console.log("TimeLeft:", timeLeft);
  // console.log("WorkTime:", workTime);
  // console.log("CompletedCycles:", completedCycles);


  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Let's Focus</h5>
          <h1 className={`card-numbers ${!started ? "animate" : ""}`}>{timeFormat(timeLeft)}</h1>
          <p>{workTime ? "Work Time" : "Break"}</p>
          <button onClick={() => setStarted(!started)} className="btn btn-primary">
            {started ? "⏸" : "▶"}
          </button>
          <button onClick={() => { setTimeLeft(work_time); setStarted(false); }} className="btn btn-secondary">
            Start Again  ↺
          </button>
          <div className="modal-footer mt-3">
            <h3>Completed Sessions: {completedCycles}</h3>
            <button onClick={() => actions.resetCycleCount()} className="btn btn-danger">
              Reset Cycles
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};