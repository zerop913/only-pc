import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const FilterModal = ({ isOpen, onRequestClose, category, onApplyFilters }) => {
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filtersResponse = await fetch(`/api/v1/filters/${category}`);
        const filtersData = await filtersResponse.json();
        const filtersArray = Object.values(filtersData).filter(
          (filter) => filter.filter_name !== "manufacturer_code"
        );
        setFilters(filtersArray);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    if (isOpen && category) {
      fetchFilters();
    }
  }, [isOpen, category]);

  const handleFilterSelect = (filter, value) => {
    const existingFilter = selectedFilters.find(
      (f) => f.filter_name === filter.filter_name
    );

    if (existingFilter) {
      const updatedFilter = {
        ...existingFilter,
        filter_values: existingFilter.filter_values.includes(value)
          ? existingFilter.filter_values.filter((v) => v !== value)
          : [...existingFilter.filter_values, value],
      };

      setSelectedFilters(
        selectedFilters.map((f) =>
          f.filter_name === filter.filter_name ? updatedFilter : f
        )
      );
    } else {
      setSelectedFilters([
        ...selectedFilters,
        { ...filter, filter_values: [value] },
      ]);
    }
  };

  const handleApplyFilters = () => {
    onApplyFilters(selectedFilters);
    onRequestClose();
  };

  const handleResetFilters = () => {
    setSelectedFilters([]);
    onApplyFilters([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Filter Modal"
      style={{
        content: {
          width: "800px",
          maxHeight: "80vh",
          padding: "30px",
          backgroundColor: "#1F1E24",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
          position: "relative",
          border: 0,
          overflow: "hidden",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "#3C3A46",
          borderRadius: "20%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onClick={onRequestClose}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#DD5B5B")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#3C3A46")
        }
      >
        <span style={{ fontSize: "24px", color: "white" }}>&times;</span>
      </div>

      <div className="w-full mb-4">
        <h2 className="text-white text-2xl font-bold mb-4">Фильтры</h2>
        <div className="flex flex-col h-[200px] overflow-y-auto">
          {selectedFilters.map((filter, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">
                {filter.filter_desc}
              </span>
              <div className="flex flex-wrap">
                {filter.filter_values.map((value, valueIndex) => (
                  <span
                    key={valueIndex}
                    className="bg-[#3C3A46] text-white px-3 py-1 rounded-md mr-2 mb-2 cursor-pointer transition-colors duration-300 hover:bg-[#514f5e]"
                    onClick={() => handleFilterSelect(filter, value)}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex-grow overflow-y-auto mb-4">
        {filters.map((filter, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-white text-lg font-bold mb-4">
              {filter.filter_desc}
            </h3>
            <div className="flex flex-wrap">
              {filter.filter_values.map((value, valueIndex) => (
                <span
                  key={valueIndex}
                  className={`px-3 py-1 rounded-md mr-2 mb-2 cursor-pointer transition-colors duration-300 ${
                    selectedFilters.some(
                      (f) =>
                        f.filter_name === filter.filter_name &&
                        f.filter_values.includes(value)
                    )
                      ? "bg-[#7FC647] text-white"
                      : "bg-[#3C3A46] text-white hover:bg-[#514f5e]"
                  }`}
                  onClick={() => handleFilterSelect(filter, value)}
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end w-full">
        {selectedFilters.length > 0 && (
          <button
            className="bg-[#DD5B5B] text-white px-4 py-2 rounded mr-2 transition-colors duration-300 hover:bg-[#c24a4a]"
            onClick={handleResetFilters}
          >
            Сбросить фильтры
          </button>
        )}
        <button
          className="bg-[#7FC647] text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-[#6ca63a]"
          onClick={handleApplyFilters}
        >
          Применить
        </button>
      </div>
    </Modal>
  );
};

export default FilterModal;
