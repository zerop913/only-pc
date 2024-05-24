import React, { useState, useEffect } from "react";

const CategoriesAdminView = ({ onCategoryClick, onSubcategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await fetch("/api/v1/categories");
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const subcategoriesResponse = await fetch("/api/v1/subcategories");
        const subcategoriesData = await subcategoriesResponse.json();
        setSubcategories(subcategoriesData);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <div className="bg-[#1F1E24] p-8 rounded-lg shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-6">
        Категории и подкатегории
      </h2>
      <div className="text-white">
        {categories.map((category) => (
          <div key={category.id} className="mb-4">
            <h3
              className="text-xl font-semibold cursor-pointer hover:text-[#7FC647]"
              onClick={() => onCategoryClick(category)}
            >
              {category.description}
            </h3>
            <ul className="ml-4">
              {subcategories
                .filter(
                  (subcategory) => subcategory.category_id === category.id
                )
                .map((subcategory) => (
                  <li
                    key={subcategory.subcategory_id}
                    className="ml-2 cursor-pointer hover:text-[#7FC647]"
                    onClick={() => onSubcategoryClick(subcategory)}
                  >
                    {subcategory.subcategory_description}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesAdminView;
