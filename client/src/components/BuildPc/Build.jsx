import React from "react";
import NameBuild from "./NameBuild";
import ProductCardInBuilder from "../Products/ProductCardInBuilder";
import Delete from "../../images/delete.svg";

const Build = ({ selectedProducts, onRemoveProduct }) => {
  const productsArray = Object.values(selectedProducts);

  return (
    <div className="w-full flex flex-col">
      <NameBuild />
      <div className="text-white flex-grow">
        <div className="flex flex-col gap-4">
          {Object.keys(selectedProducts).length === 0 ? (
            <p>Нет добавленных товаров</p>
          ) : (
            Object.entries(selectedProducts).map(([categoryId, product]) => (
              <div
                key={categoryId}
                className="flex items-center justify-between"
              >
                <ProductCardInBuilder
                  title={product.product_title}
                  image={product.product_images}
                  price={product.price}
                  id={product.id}
                  categoryName={product.category_name}
                />
                <button
                  onClick={() => onRemoveProduct(categoryId)}
                  className="pl-9"
                >
                  <img src={Delete} alt="Удалить" className="w-6 h-6" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Build;
