import React, { useState } from "react";
import FilterModal from "../Modals/FilterModal";

import tile from "../../images/tile.svg";
import list from "../../images/list.svg";
import filter from "../../images/filter.svg";

const Menu = ({ category, onApplyFilters }) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (selectedFilters) => {
    onApplyFilters(selectedFilters);
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
        <img src={tile} alt="Плитка" className="cursor-pointer" />
        <img src={list} alt="Список" className="cursor-pointer" />
        <img
          src={filter}
          alt="Фильтр"
          className="cursor-pointer"
          onClick={handleOpenFilterModal}
        />
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
