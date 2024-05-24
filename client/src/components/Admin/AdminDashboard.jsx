import React, { useState } from "react";
import CategoriesAdminView from "./CategoriesAdminView";
import ProductsAdminView from "./ProductsAdminView";

const AdminDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedCategory(null);
    setSelectedSubcategory(subcategory.subcategory_name);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#1F1E24] p-8 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-6">
          Панель администратора
        </h2>
        <div className="flex gap-8">
          <CategoriesAdminView
            onCategoryClick={handleCategoryClick}
            onSubcategoryClick={handleSubcategoryClick}
          />
          <ProductsAdminView
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
