import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/notifications/Notification";
import TimerModal from "./components/model/TimmerModel";
import TimerApp from "./components/Timmerapp";
import {
  addTimer,
  clearNotification,
  removeTimer,
  setNotification,
  togglePopup,
  updateTimer,
} from "./Redux/timerSlice";
import soundFile from './assets/happy-bells.wav'; // Import the audio file

function App() {
  const dispatch = useDispatch();
  const { timers, notification, isPopupOpen } = useSelector((state) => state.timer);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);

  // Track notified timers
  const notifiedTimers = useRef(new Set()); // Using useRef to persist between renders

  const openPopup = () => dispatch(togglePopup());
  const closePopup = () => dispatch(togglePopup());

  // Handle timer completion notification
  const handleTimerComplete = (id, title) => {
    if (notifiedTimers.current.has(id)) {
      return; // Don't trigger notification again for this timer
    }

    // Mark this timer as notified
    notifiedTimers.current.add(id);

    dispatch(setNotification(`Timer "${title}" has completed!`));

    // Use the imported sound file
    const sound = new Audio(soundFile);
    sound.play();

    setTimeout(() => dispatch(clearNotification()), 3000);
  };

  // Add timer functionality
  const handleAddTimer = () => {
    if (title.trim() && duration > 0) {
      dispatch(
        addTimer({
          id: new Date().toISOString(),
          title,
          description,
          duration,
          timeLeft: duration,
        })
      );
      setTitle("");
      setDescription("");
      setDuration(0);
      closePopup();
    } else {
      dispatch(setNotification("Please fill all required fields."));
    }
  };

  // Timer tick logic (Simulate timer countdown)
  useEffect(() => {
    const interval = setInterval(() => {
      timers.forEach((timer) => {
        if (timer.timeLeft > 0) {
          dispatch(updateTimer({ ...timer, timeLeft: timer.timeLeft - 1 }));
        } else if (timer.timeLeft === 0) {
          handleTimerComplete(timer.id, timer.title); // Only trigger once for each timer
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timers, dispatch]); // Dependency on timers to react to timer changes

  // Store timers in localStorage on change
  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  // Load timers from localStorage on initial load
  useEffect(() => {
    const savedTimers = JSON.parse(localStorage.getItem("timers") || "[]");
    savedTimers.forEach((timer) => dispatch(addTimer(timer)));
  }, [dispatch]);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <i className="fas fa-clock text-blue-500 text-2xl mr-2"></i>
            <h1 className="text-xl font-semibold">Timer App</h1>
          </div>
          <button
            onClick={openPopup}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            + Add Timer
          </button>
        </div>

        {/* Timers list */}
        <div className="flex flex-col items-center">
          {timers.length === 0 ? (
            <>
              <img
                src="https://icon-library.com/images/timer-icon-png/timer-icon-png-20.jpg"
                alt="Large timer icon"
                className="w-36 h-36 mb-4"
              />
              <p className="text-gray-600 text-lg mb-2">No timers yet. Add one to get started!</p>
              <p className="text-gray-500">Click the "Add Timer" button above to create your first timer.</p>
            </>
          ) : (
            <TimerApp />
          )}
        </div>
      </div>

      {/* Add/Edit Timer Modal */}
      {isPopupOpen && (
        <TimerModal
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          duration={duration}
          setDuration={setDuration}
          onSubmit={handleAddTimer}
          onCancel={closePopup}
        />
      )}

      {/* Notification */}
      {notification && (
        <Notification message={notification} onDismiss={() => dispatch(clearNotification())} />
      )}
    </div>
  );
}

export default App;
