import React, { useEffect } from 'react';

const Notification = ({ message, onDismiss }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onDismiss();
    }, 3000); // Notification will disappear after 3 seconds

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [message, onDismiss]);

  return (
    <div className="fixed top-0 right-0 m-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
      <div className="flex items-center">
        <span className="mr-2">{message}</span>
        <button
          onClick={onDismiss}
          className="bg-transparent text-white border-0 cursor-pointer"
        >
          &#10005; {/* X icon to close */}
        </button>
      </div>
    </div>
  );
};

export default Notification;
