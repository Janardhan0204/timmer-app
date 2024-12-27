// TimerApp Component
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTimer,
  toggleTimer,
  resetTimer,
  removeTimer,
  togglePopup,
  setEditingTimer,
} from "../Redux/timerSlice";

const formatTime = (timeInSeconds) => {
  const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeInSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const TimerApp = () => {
  const timers = useSelector((state) => state.timer.timers);
  const dispatch = useDispatch();
  console.log(timers, "timers"

  );

  useEffect(() => {
    const interval = setInterval(() => {
      timers.forEach((timer) => {
        if (timer.isRunning && timer.timeLeft > 0) {
          dispatch(updateTimer({ id: timer.id, timeLeft: timer.timeLeft - 1 }));
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timers, dispatch]);

  return (
    <div className="bg-gray-100 flex flex-col items-center min-h-screen">



      {timers.map((timer) => (
        <TimerItem key={timer.id} timer={timer} />
      ))}
    </div>
  );
};

const TimerItem = ({ timer }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div className="text-center text-3xl font-bold text-gray-800 mb-2">{timer.title}</div>
        <hr />
        <div className="flex space-x-2">
          <i
            className="fas fa-pen text-blue-500 cursor-pointer"
            title="Edit Timer"
            onClick={() => {
              dispatch(setEditingTimer(timer));
              dispatch(togglePopup());
            }}
          ></i>
          <i
            className="fas fa-sync text-blue-500 cursor-pointer"
            title="Reset Timer"
            onClick={() => dispatch(resetTimer(timer.id))}
          ></i>
          <i
            className="fas fa-trash text-red-500 cursor-pointer"
            title="Delete Timer"
            onClick={() => dispatch(removeTimer(timer.id))}
          ></i>
        </div>
      </div>


      <div className="text-center mb-4">

        <span className="text-center text-3xl font-bold text-gray-800 mb-2">{formatTime(timer.timeLeft)}</span>
      </div>
      <div className="h-1 bg-blue-600 mb-2"></div>
      <div className="flex justify-center">
        {/* Conditional for Reset or Play */}
        {timer.timeLeft === 0 ? (

          <button className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <i
              className="fas fa-sync text-blue-500 cursor-pointer text-3xl text-blue-600 p-2 rounded-full"
              title="Reset Timer"
              onClick={() => dispatch(resetTimer(timer.id))}
            ></i>
          </button>

        )
          : (
            <button className="bg-green-100 text-green-600 p-2 rounded-full">
              <i
                className="fas fa-play text-green-500 cursor-pointer text-3xl text-green-600 p-2 rounded-full"
                title="Start Timer"
              ></i>
            </button>
          )}
      </div>
    </div>
  );
};


export default TimerApp;
