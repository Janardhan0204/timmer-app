import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTimer, editTimer, togglePopup } from "../../Redux/timerSlice";

const TimerModal = () => {
  const dispatch = useDispatch();
  const { isPopupOpen, editingTimer } = useSelector((state) => state.timer);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (editingTimer) {
      setTitle(editingTimer.title);
      setDescription(editingTimer.description);
      const totalSeconds = editingTimer.duration;
      setHours(Math.floor(totalSeconds / 3600));
      setMinutes(Math.floor((totalSeconds % 3600) / 60));
      setSeconds(totalSeconds % 60);
    } else {
      resetFields();
    }
  }, [editingTimer]);

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleSaveTimer = (e) => {
    e.preventDefault();
    const totalDuration = hours * 3600 + minutes * 60 + seconds;

    if (!title.trim()) {
      alert("Please provide a title.");
      return;
    }
    if (totalDuration <= 0) {
      alert("Please provide a valid duration.");
      return;
    }

    if (editingTimer) {
      dispatch(
        editTimer({
          id: editingTimer.id,
          title,
          description,
          duration: totalDuration,
        })
      );
    } else {
      dispatch(
        addTimer({
          id: new Date().toISOString(),
          title,
          description,
          duration: totalDuration,
          timeLeft: totalDuration,
        })
      );
    }

    closePopup();
  };

  const closePopup = () => {
    dispatch(togglePopup());
    resetFields();
  };

  if (!isPopupOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {editingTimer ? "Edit Timer" : "Add New Timer"}
        </h2>
        <form onSubmit={handleSaveTimer}>
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter timer title"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter timer description (optional)"
            ></textarea>
          </div>

          {/* Duration Inputs */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Duration <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Hours"
                className="w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                value={hours}
                onChange={(e) => setHours(Math.max(0, +e.target.value))}
              />
              <input
                type="number"
                placeholder="Minutes"
                className="w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, +e.target.value))}
              />
              <input
                type="number"
                placeholder="Seconds"
                className="w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, +e.target.value))}
              />

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closePopup}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {editingTimer ? "Update Timer" : "Add Timer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimerModal;
