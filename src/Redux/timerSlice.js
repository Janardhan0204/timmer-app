// timerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timers: [],
  notification: null,
  isPopupOpen: false,
  editingTimer: null,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    addTimer: (state, action) => {
      state.timers.push({
        ...action.payload,
        isRunning: false,
      });
    },
    removeTimer: (state, action) => {
      state.timers = state.timers.filter((timer) => timer.id !== action.payload);
    },
    updateTimer: (state, action) => {
      const timer = state.timers.find((t) => t.id === action.payload.id);
      if (timer) {
        timer.timeLeft = action.payload.timeLeft;
      }
    },
    toggleTimer: (state, action) => {
      const timer = state.timers.find((t) => t.id === action.payload);
      if (timer) {
        timer.isRunning = !timer.isRunning;
      }
    },
    resetTimer: (state, action) => {
      const timer = state.timers.find((t) => t.id === action.payload);
      if (timer) {
        timer.timeLeft = timer.duration;
        timer.isRunning = false;
      }
    },
    editTimer: (state, action) => {
      const timer = state.timers.find((t) => t.id === action.payload.id);
      if (timer) {
        timer.title = action.payload.title;
        timer.description = action.payload.description;
        timer.duration = action.payload.duration;
        timer.timeLeft = action.payload.duration;
      }
    },
    togglePopup: (state) => {
      state.isPopupOpen = !state.isPopupOpen;
      if (!state.isPopupOpen) {
        state.editingTimer = null;
      }
    },
    setEditingTimer: (state, action) => {
      state.editingTimer = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  addTimer,
  removeTimer,
  updateTimer,
  toggleTimer,
  resetTimer,
  editTimer,
  togglePopup,
  setEditingTimer,
  setNotification,
  clearNotification,
 
} = timerSlice.actions;
export default timerSlice.reducer;
