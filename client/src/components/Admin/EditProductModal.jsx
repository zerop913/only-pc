import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FiEdit2 } from "react-icons/fi";

const EditProductModal = ({
  isOpen,
  onRequestClose,
  product,
  onSaveChanges,
}) => {
  const [editedProduct, setEditedProduct] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);
  const [editableFields, setEditableFields] = useState({});

  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
      setOriginalProduct({ ...product });
      const fields = {};
      Object.keys(product).forEach((key) => {
        fields[key] = false;
      });
      setEditableFields(fields);
    }
  }, [product]);

  const toggleEditField = (fieldName) => {
    setEditableFields((prevEditableFields) => ({
      ...prevEditableFields,
      [fieldName]: !prevEditableFields[fieldName],
    }));
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [fieldName]: value,
    }));
  };

  const handleSaveChanges = () => {
    onSaveChanges(editedProduct);
    onRequestClose();
  };

  const handleCancelChanges = () => {
    setEditedProduct(originalProduct);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Product Details"
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
          opacity: 1,
          transform: "scale(1)",
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
      {editedProduct ? (
        <div className="flex">
          <div className="mr-8">
            <img
              src={editedProduct.product_images}
              alt={editedProduct.product_title}
              style={{ maxWidth: "400px", maxHeight: "400px" }}
            />
          </div>
          <div className="flex flex-col">
            <div className="mb-4 p-4">
              <h2 className="text-white text-2xl font-bold mb-3 flex items-center">
                {editedProduct.product_title}{" "}
                <FiEdit2
                  className="ml-2 text-white hover:text-[#7FC647] cursor-pointer"
                  size={20}
                  onClick={() => toggleEditField("product_title")}
                />
              </h2>
              <p className="text-white text-xl flex items-center">
                Цена: {editedProduct.price} ₽{" "}
                <FiEdit2
                  className="ml-2 text-white hover:text-[#7FC647] cursor-pointer"
                  size={20}
                  onClick={() => toggleEditField("price")}
                />
              </p>
            </div>
            <div className="bg-[#1F1E24] p-4 rounded-lg flex-1 max-h-[400px] overflow-auto">
              {Object.keys(editedProduct).map((key) => {
                if (key === "product_images") return null;
                return (
                  <div
                    key={key}
                    className="text-white mb-2 flex justify-between border-b border-gray-700 pb-2"
                  >
                    <span className="font-semibold">{key}:</span>
                    <div className="flex items-center">
                      {editableFields[key] ? (
                        <>
                          <input
                            type="text"
                            name={key}
                            value={editedProduct[key]}
                            onChange={(e) => handleInputChange(e, key)}
                            className="bg-[#1F1E24] text-white border-b border-gray-700 outline-none"
                          />
                          <FiEdit2
                            className="ml-2 text-white hover:text-[#7FC647] cursor-pointer"
                            size={20}
                            onClick={() => toggleEditField(key)}
                          />
                        </>
                      ) : (
                        <>
                          <span>{editedProduct[key]}</span>
                          <FiEdit2
                            className="ml-2 text-white hover:text-[#7FC647] cursor-pointer"
                            size={20}
                            onClick={() => toggleEditField(key)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-[#7FC647] text-white px-4 py-2 rounded"
                onClick={handleSaveChanges}
              >
                Сохранить изменения
              </button>
              <button
                className="bg-[#DD5B5B] text-white px-4 py-2 rounded"
                onClick={handleCancelChanges}
              >
                Отменить изменения
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </Modal>
  );
};

export default EditProductModal;
