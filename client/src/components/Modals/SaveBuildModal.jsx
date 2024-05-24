import React, { useState } from "react";
import axios from "axios";

const SaveBuildModal = ({ isOpen, onClose, selectedProducts, userId }) => {
  const [buildName, setBuildName] = useState("");

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const buildData = {
        build_name: buildName,
        ...selectedProducts,
        user_id: userId,
      };
      await axios.post("/api/v1/builds", buildData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onClose();
    } catch (error) {
      console.error("Error saving build:", error);
    }
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed z-10 inset-0 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#3C3A46] p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">
            Сохранить сборку
          </h2>
          <input
            type="text"
            placeholder="Введите название сборки"
            value={buildName}
            onChange={(e) => setBuildName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#1F1E24] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7FC647] mb-4"
          />
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="bg-[#3C3A46] text-white font-bold py-2 px-4 rounded hover:bg-[#DD5B5B] transition-colors duration-300"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="bg-[#7FC647] text-white font-bold py-2 px-4 rounded hover:bg-[#6ca63a] transition-colors duration-300"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveBuildModal;
