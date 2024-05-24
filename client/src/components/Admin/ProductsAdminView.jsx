import React, { useState, useEffect } from "react";
import ProductModal from "../Products/ProductModal";
import EditProductModal from "./EditProductModal";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddProductModal from "./AddProductModal";

const ProductsAdminView = ({ selectedCategory, selectedSubcategory }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `/api/v1/${selectedCategory || selectedSubcategory}`;
        if (selectedSubcategory) {
          url += `?subcategory=${selectedSubcategory}`;
        }
        const productsResponse = await fetch(url);
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (selectedCategory || selectedSubcategory) {
      fetchProducts();
    }
  }, [selectedCategory, selectedSubcategory]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleEditProduct = (product) => {
    setEditedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  const handleSaveChanges = async (editedProduct) => {
    try {
      const response = await fetch(
        `/api/v1/${selectedCategory || selectedSubcategory}/${
          editedProduct.id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedProduct),
        }
      );

      if (response.ok) {
        const updatedProducts = products.map((product) =>
          product.id === editedProduct.id ? editedProduct : product
        );
        setProducts(updatedProducts);
      } else {
        console.error("Error updating product:", await response.text());
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Вы действительно хотите удалить этот товар?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `/api/v1/${selectedCategory || selectedSubcategory}/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          const updatedProducts = products.filter(
            (product) => product.id !== productId
          );
          setProducts(updatedProducts);
        } else {
          console.error("Ошибка при удалении товара:", await response.text());
        }
      } catch (error) {
        console.error("Ошибка при удалении товара:", error);
      }
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch(
        `/api/v1/${selectedCategory || selectedSubcategory}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
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
    }
  };

  return (
    <div className="bg-[#1F1E24] p-8 rounded-lg shadow-lg max-h-[600px] overflow-y-auto">
      <h2 className="text-white text-2xl font-bold mb-6 flex justify-between items-center">
        <span>Товары</span>
        {selectedCategory || selectedSubcategory ? (
          <button
            className="bg-[#7FC647] text-white text-sm px-4 py-2 rounded hover:bg-[#6ca539] transition-colors duration-300"
            onClick={() => setIsAddModalOpen(true)}
          >
            Добавить товар
          </button>
        ) : null}
      </h2>
      <div className="text-white">
        {products.length > 0 ? (
          <ul className="max-h-[500px] overflow-y-auto">
            {products.map((product) => (
              <li
                key={product.id}
                className="cursor-pointer hover:text-[#7FC647] py-2 border-b border-gray-700 last:border-b-0 flex justify-between items-center"
              >
                <span>{product.product_title}</span>
                <div className="flex">
                  <FiEdit2
                    className="text-white hover:text-[#7FC647] cursor-pointer mr-2"
                    size={20}
                    onClick={() => handleEditProduct(product)}
                  />
                  <RiDeleteBin6Line
                    className="text-white hover:text-[#DD5B5B] cursor-pointer"
                    size={20}
                    onClick={() => handleDeleteProduct(product.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Выберите категорию или подкатегорию для отображения товаров.</p>
        )}
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        product={selectedProduct}
        categoryName={selectedCategory || selectedSubcategory}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onRequestClose={handleCloseEditModal}
        product={editedProduct}
        onSaveChanges={handleSaveChanges}
      />
      <AddProductModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        setProducts={setProducts}
        products={products}
      />
    </div>
  );
};
export default ProductsAdminView;
