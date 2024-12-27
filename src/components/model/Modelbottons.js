import React from 'react';

// interface ModalButtonsProps {
//   onCancel: () => void;
//   onSubmit: () => void;
//   submitText: string;
// }

const ModalButtons = ({ onCancel, onSubmit, submitText }) => (
  <div className="flex justify-end space-x-2">
    <button onClick={onCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
      Cancel
    </button>
    <button onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
      {submitText}
    </button>
  </div>
);

export default ModalButtons;
