import React, { useState, useEffect } from "react";
import styles from "../../styles/Catalog.module.css";
import CategoryCard from "./CategoryCard";
import Info from "./Info";

const Catalog = ({ onCategoryClick, onSubcategoryClick, totalCost }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetch("/api/v1/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));

    fetch("/api/v1/subcategories")
      .then((response) => response.json())
      .then((data) => setSubcategories(data));
  }, []);

  return (
    <div className={`flex justify-between items-center ${styles.Form}`}>
      {/* Категории */}
      <section className={`flex gap-[15px] ${styles.Categories}`}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onCategoryClick={onCategoryClick}
            subcategories={subcategories.filter(
              (subcategory) => subcategory.category_id === category.id
            )}
            onSubcategoryClick={onSubcategoryClick}
          />
        ))}
      </section>

      {/* Цена и доп кнопки */}
      <Info totalCost={totalCost} />
    </div>
  );
};
export default Catalog;
