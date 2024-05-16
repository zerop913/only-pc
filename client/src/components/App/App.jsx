import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AppRoutes from "../Routes/Routes";
import Header from "../Header/Header";
import Catalog from "../Catalog/Catalog";
import Products from "../Products/Products";
import Build from "../BuildPc/Build";
import CategoryProducts from "../Catalog/CategoryProducts";
import Info from "../Catalog/Info";
import ConfirmationModal from "../Notifications/ConfirmationModal";
import NotificationModal from "../Notifications/NotificationModal";
import Registration from "../Profile/Registration";
import Login from "../Profile/Login";
import Profile from "../Profile/Profile";
import PrivateRoute from "../Routes/PrivateRoute";
import AdminRoute from "../Routes/AdminRoute";
import AdminPanel from "../Admin/AdminPanel";

const App = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [productInBuilder, setProductInBuilder] = useState(null);
  const [tempSelectedProduct, setTempSelectedProduct] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchProductData = async (categoryName, productId) => {
      try {
        const productResponse = await fetch(
          `/api/v1/${categoryName}/${productId}`
        );
        const productData = await productResponse.json();
        return productData;
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const handleInitialCategory = async () => {
      try {
        const categoryResponse = await fetch("/api/v1/categories");
        const categories = await categoryResponse.json();
        if (categories.length > 0) {
          setCurrentCategory(categories[0].name);
          window.history.replaceState({}, null, `/${categories[0].name}`);
        }
      } catch (error) {
        console.error("Error fetching initial category:", error);
      }
    };

    const fetchSelectedProductsData = async () => {
      const selectedProductsData = {};
      for (const categoryId in selectedProducts) {
        const product = selectedProducts[categoryId];
        const productData = await fetchProductData(
          product.category_name,
          product.id
        );
        selectedProductsData[categoryId] = productData;
      }
      setSelectedProducts(selectedProductsData);
    };

    handleInitialCategory();
    fetchSelectedProductsData();
  }, []);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category.name);
    setCurrentSubcategory(null);
    window.history.pushState({}, null, `/${category.name}`);
  };

  const handleSubcategoryClick = (subcategory) => {
    setCurrentCategory(null);
    setCurrentSubcategory(subcategory.subcategory_name);
    window.history.pushState({}, null, `/${subcategory.subcategory_name}`);
  };

  const handleAddToBuilder = (product) => {
    const categoryId = product.category_id;
    const existingProduct = selectedProducts[categoryId];

    if (existingProduct && existingProduct.id === product.id) {
      setProductInBuilder(product);
    } else {
      setTempSelectedProduct(product);

      if (existingProduct) {
        setModalProduct({ ...product, category_id: categoryId });
        setShowConfirmationModal(true);
      } else {
        const updatedSelectedProducts = { ...selectedProducts };
        updatedSelectedProducts[categoryId] = product;
        setSelectedProducts(updatedSelectedProducts);
      }
    }
  };

  const handleConfirmReplaceProduct = () => {
    const updatedSelectedProducts = { ...selectedProducts };
    updatedSelectedProducts[modalProduct.category_id] = tempSelectedProduct;
    setSelectedProducts(updatedSelectedProducts);
    setShowConfirmationModal(false);
    setModalProduct(null);
    setTempSelectedProduct(null);
  };

  const handleCancelReplaceProduct = () => {
    setShowConfirmationModal(false);
    setModalProduct(null);
    setTempSelectedProduct(null);
  };

  const handleRemoveProduct = (categoryId) => {
    setSelectedProducts((prevSelectedProducts) => {
      const updatedSelectedProducts = { ...prevSelectedProducts };
      delete updatedSelectedProducts[categoryId];
      return updatedSelectedProducts;
    });
  };

  const getTotalCost = () => {
    const total = Object.values(selectedProducts).reduce(
      (acc, product) => acc + parseFloat(product.price),
      0
    );
    return total;
  };

  return (
    <div className="MainContainer">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Catalog
                onCategoryClick={handleCategoryClick}
                onSubcategoryClick={handleSubcategoryClick}
                totalCost={getTotalCost()}
              />
              <div className="flex gap-[26px]">
                {currentSubcategory ? (
                  <CategoryProducts
                    subcategory={currentSubcategory}
                    handleAddToBuilder={handleAddToBuilder}
                  />
                ) : currentCategory ? (
                  <CategoryProducts
                    category={currentCategory}
                    handleAddToBuilder={handleAddToBuilder}
                  />
                ) : (
                  <Products handleAddToBuilder={handleAddToBuilder} />
                )}
                <Build
                  selectedProducts={selectedProducts}
                  onRemoveProduct={handleRemoveProduct}
                />
              </div>
            </>
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        {/* Добавляем редирект */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onConfirm={handleConfirmReplaceProduct}
        onCancel={handleCancelReplaceProduct}
        message="Продукт из этой категории уже находится в сборке. Заменить его на"
        productTitle={modalProduct?.product_title}
      />
      <NotificationModal
        isOpen={productInBuilder !== null}
        onOk={() => setProductInBuilder(null)}
        message={`Этот товар (${productInBuilder?.product_title}) уже находится в сборке.`}
      />
    </div>
  );
};

export default App;
