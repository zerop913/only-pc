import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const ProductModal = ({ isOpen, onRequestClose, product, categoryName }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filtersResponse = await fetch(`/api/v1/filters/${categoryName}`);
        const filtersData = await filtersResponse.json();
        const filtersArray = Object.values(filtersData);
        setFilters(filtersArray);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    if (product) {
      fetchFilters();
    }
  }, [product, categoryName]);

  const renderFeature = (featureName, featureValue) => {
    const filter = filters.find((f) => f.filter_name === featureName);
    if (featureValue === "-") return null;
    return filter ? (
      <div
        key={featureName}
        className="text-white mb-2 flex justify-between border-b border-gray-700 pb-2"
      >
        <span className="font-semibold">{filter.filter_desc}:</span>{" "}
        <span>{featureValue}</span>
      </div>
    ) : null;
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details"
      style={{
        content: {
          width: "1200px",
          height: "full",
          padding: "50px",
          backgroundColor: "#1F1E24",
          borderRadius: "10px",
          display: "flex",
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
      <div onClick={handleModalClick}>
        {product ? (
          <div className="flex">
            <div className="mr-8">
              <img
                src={product.product_images}
                alt={product.product_title}
                style={{ maxWidth: "400px", maxHeight: "400px" }}
              />
            </div>
            <div className="flex flex-col">
              <div className="mb-4 p-4">
                <h2 className="text-white text-2xl font-bold mb-3">
                  {product.product_title}
                </h2>
                <p className="text-white text-xl">Цена: {product.price} ₽</p>
              </div>
              <div className="bg-[#1F1E24] p-4 rounded-lg flex-1 max-h-[400px] overflow-auto">
                {Object.keys(product).map((key) =>
                  renderFeature(key, product[key])
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-white">Loading...</div>
        )}
      </div>
    </Modal>
  );
};

export default ProductModal;
