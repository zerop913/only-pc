import React, { useState } from "react";
import { FaTh, FaList, FaFilter } from "react-icons/fa";
import FilterModal from "../Modals/FilterModal";

const Menu = ({ category, onApplyFilters }) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (filters) => {
    onApplyFilters(filters);
    handleCloseFilterModal();
  };

  return (
    <div className="w-[700px] h-[50px] rounded px-5 py-[14px] flex justify-between bg-[#1F1E24] mb-[31px]">
      <div>
        <span className="pr-2 text-white">Сортировка:</span>
        <select className="bg-[#1F1E24] text-[#7FC647] outline-none">
          <option value="" className="bg-[#1F1E24] text-white">
            сначала недорогие
          </option>
          <option value="" className="bg-[#1F1E24] text-white">
            сначала дорогие
          </option>
        </select>
      </div>
      <div className="max-w-full flex justify-between gap-[10px]">
        <div className="menu-item">
          <FaTh
            className="text-white text-2xl cursor-pointer hover:text-gray-300"
            title="Плитка"
          />
        </div>
        <div className="menu-item">
          <FaList
            className="text-white text-2xl cursor-pointer hover:text-gray-300"
            title="Список"
          />
        </div>
        <div className="menu-item" onClick={handleOpenFilterModal}>
          <FaFilter
            className="text-white text-2xl cursor-pointer hover:text-gray-300"
            title="Фильтры"
          />
        </div>
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onRequestClose={handleCloseFilterModal}
        category={category}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default Menu;
