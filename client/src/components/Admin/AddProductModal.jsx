import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import FilterInput from "./FilterInput";

const AddProductModal = ({
  isOpen,
  onRequestClose,
  onAddProduct,
  selectedCategory,
  selectedSubcategory,
  setProducts,
  products,
}) => {
  const [filters, setFilters] = useState([]);
  const [newProduct, setNewProduct] = useState({
    product_title: "",
    price: "",
    product_images: null,
  });
  const [newProductImage, setNewProductImage] = useState(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filtersResponse = await fetch(
          `http://localhost:3001/api/v1/filters/${
            selectedCategory || selectedSubcategory
          }`
        );
        const filtersData = await filtersResponse.json();
        setFilters(filtersData);
      } catch (error) {
        console.error("Ошибка при получении фильтров:", error);
      }
    };

    if (selectedCategory || selectedSubcategory) {
      fetchFilters();
    }

    const initialProductData = filters.reduce((acc, filter) => {
      acc[filter.filter_name] = "";
      return acc;
    }, {});
    setNewProduct(initialProductData);
  }, [selectedCategory, selectedSubcategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevNewProduct) => ({
      ...prevNewProduct,
      [name]: value,
    }));
  };

  const uploadImage = async (image, category, productTitle) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        `/api/v1/upload-image/${category}/${productTitle}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const imageUrl = await response.text();
        return imageUrl;
      } else {
        console.error(
          "Ошибка при загрузке изображения:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
    }
  };

  const fieldTranslations = {
    product_title: "Название товара",
    price: "Цена",
    manufacturer: "Производитель",
  };

  const handleAddProduct = async () => {
    let imageUrl = null;
    if (newProduct.product_images) {
      imageUrl = await uploadImage(
        newProduct.product_images,
        selectedCategory || selectedSubcategory,
        newProduct.product_title
      );
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(newProduct)) {
      if (value) {
        formData.append(key, value.toString().trim());
      }
    }

    if (imageUrl) {
      formData.append("product_images", imageUrl);
    }

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await fetch(
        `/api/v1/${selectedCategory || selectedSubcategory}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        }
      );

      if (response.ok) {
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
      } else {
        console.error("Ошибка при добавлении товара:", await response.text());
      }
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
    } finally {
      onRequestClose();
    }
  };

  const handleImageChange = (e) => {
    setNewProduct((prevNewProduct) => ({
      ...prevNewProduct,
      product_images: e.target.files[0],
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Product"
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
      <div className="flex flex-col">
        <div className="mb-4 p-4">
          <h2 className="text-white text-2xl font-bold mb-3">Добавить товар</h2>
        </div>
        <div className="bg-[#1F1E24] p-4 rounded-lg flex-1 max-h-[400px] overflow-auto">
          <div className="text-white mb-2 flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold">Название товара:</span>
            <input
              type="text"
              name="product_title"
              value={newProduct.product_title}
              onChange={handleInputChange}
              className="bg-[#1F1E24] text-white border-b border-gray-700 outline-none"
            />
          </div>
          <div className="text-white mb-2 flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold">Цена:</span>
            <input
              type="text"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="bg-[#1F1E24] text-white border-b border-gray-700 outline-none"
            />
          </div>
          {filters.map((filter) => (
            <FilterInput
              key={filter.filter_id}
              filter={filter}
              value={newProduct[filter.filter_name]}
              onChange={handleInputChange}
            />
          ))}
          <div className="text-white mb-2 flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold">Изображение:</span>
            <input
              type="file"
              name="product_images"
              onChange={handleImageChange}
              className="bg-[#1F1E24] text-white border-b border-gray-700 outline-none"
            />
          </div>
        </div>
        <button
          className="bg-[#7FC647] text-white px-4 py-2 rounded mt-4 self-end"
          onClick={handleAddProduct}
        >
          Добавить товар
        </button>
      </div>
    </Modal>
  );
};

export default AddProductModal;
