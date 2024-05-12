import React, { useState } from "react";
import styles from "../../styles/Catalog.module.css";
import Subcategories from "./Subcategories";

const CategoryCard = ({
  category,
  onCategoryClick,
  onSubcategoryClick,
  subcategories,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryClick = () => {
    if (subcategories.length > 0) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      closeSubcategoryMenu();
      onCategoryClick(category);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    closeSubcategoryMenu();
    onSubcategoryClick(subcategory);
  };

  const closeSubcategoryMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      onClick={handleCategoryClick}
      className={`${styles.Cart} cursor-pointer relative`}
      style={{ position: "relative" }}
    >
      <img
        src={category.images}
        alt={category.name}
        className="w-10 h-10 object-contain mb-3"
      />
      <div className="">{category.description}</div>
      {isMenuOpen && subcategories.length > 0 && (
        <Subcategories
          subcategories={subcategories}
          onSubcategoryClick={handleSubcategoryClick}
        />
      )}
    </div>
  );
};

export default CategoryCard;
