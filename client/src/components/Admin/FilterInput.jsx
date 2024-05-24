import React from "react";

const FilterInput = ({ filter, value, onChange }) => (
  <div className="text-white mb-2 flex justify-between border-b border-gray-700 pb-2">
    <span className="font-semibold">{filter.filter_desc}</span>
    <input
      type="text"
      name={filter.filter_name}
      value={value}
      onChange={onChange}
      className="bg-[#1F1E24] text-white border-b border-gray-700 outline-none"
    />
  </div>
);

export default FilterInput;
