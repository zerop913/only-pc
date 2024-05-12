import React from "react";

const Subcategories = ({ subcategories, onSubcategoryClick }) => {
  return (
    <div
      className="absolute left-0 top-full bg-[#1F1E24] rounded-lg shadow-lg z-10 overflow-hidden"
      style={{ minWidth: "200px" }}
    >
      {subcategories.map((subcategory) => (
        <button
          key={subcategory.subcategory_id}
          className="block w-full text-left px-4 py-3 hover:bg-[#3C3A46] transition-colors duration-200 focus:outline-none"
          onClick={() => onSubcategoryClick(subcategory)}
        >
          {subcategory.subcategory_description}
        </button>
      ))}
    </div>
  );
};

export default Subcategories;
