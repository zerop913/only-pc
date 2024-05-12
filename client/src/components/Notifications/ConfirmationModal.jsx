import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
  productTitle,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Confirmation Modal"
      style={{
        content: {
          width: "500px",
          padding: "30px",
          backgroundColor: "#1F1E24",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
          position: "relative",
          border: 0,
          opacity: isAnimating ? 1 : 0,
          transform: isAnimating ? "scale(1)" : "scale(0.5)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
      onClick={handleModalClick}
    >
      <div className="flex flex-col items-center">
        <p className="text-white text-xl mb-6 text-center">
          {message} <span className="font-bold">{productTitle}</span>?
        </p>
        <div className="flex justify-center gap-8">
          <button
            className="px-6 py-3 bg-[#3C3A46] text-white rounded-lg hover:bg-[#514f5e] transition-colors duration-300 ease-in-out"
            onClick={onConfirm}
          >
            Да
          </button>
          <button
            className="px-6 py-3 bg-[#3C3A46] text-white rounded-lg hover:bg-[#514f5e] transition-colors duration-300 ease-in-out"
            onClick={onCancel}
          >
            Нет
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
