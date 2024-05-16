import React from "react";

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-[#1F1E24] rounded-lg shadow-lg p-8">
        <p className="text-white mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
