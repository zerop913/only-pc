import React, { useState } from "react";
import ProductModal from "./ProductModal";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

// import favorite from "../../images/favorite.svg";

function ProductImage({ image }) {
  return <img src={image} alt="Test Product" className="w-[90px] h-[90px]" />;
}

function ProductName({ title }) {
  return <div className="flex-auto my-auto text-base">{title}</div>;
}

function ProductInfo({ title, image }) {
  return (
    <div className="flex grow gap-5 text-sm font-medium leading-6 text-white">
      <ProductImage image={image} />
      <ProductName title={title} />
    </div>
  );
}

function ProductPrice({ price }) {
  if (!price) {
    return <div className="font-bold text-xl leading-3 text-right"></div>;
  }

  const priceString = String(price);

  const priceWithoutCurrency = priceString.replace(/\s₽/g, "");
  const formattedPrice = Number(priceWithoutCurrency).toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });

  return (
    <div className="font-bold text-xl leading-3 text-right">
      {formattedPrice}
    </div>
  );
}

function AddToCartButton({ onAddToBuilder, product }) {
  return (
    <button
      className="justify-center p-4 rounded bg-[#3C3A46] transition-colors duration-300 ease-in-out hover:bg-[#7FC647]"
      onClick={() => onAddToBuilder(product)}
    >
      Добавить
    </button>
  );
}

function ProductActions({ onAddToBuilder, product }) {
  return (
    <div className="flex gap-2 mt-3 text-xs leading-3 whitespace-nowrap">
      <button className="bg-[#3C3A46] rounded flex items-center justify-center w-full h-full p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#DD5B5B]">
        <FaRegHeart className="h-4" />
      </button>
      <AddToCartButton onAddToBuilder={onAddToBuilder} product={product} />
    </div>
  );
}

function ProductDetails({ price, onAddToBuilder, product }) {
  return (
    <div className="flex flex-col ml-5 w-[23%]">
      <div className="flex flex-col self-stretch my-auto text-white">
        <ProductPrice price={price} />
        <ProductActions onAddToBuilder={onAddToBuilder} product={product} />
      </div>
    </div>
  );
}

const ProductCard = ({
  title,
  image,
  price,
  id,
  categoryName,
  onAddToBuilder,
  product,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClick = (event) => {
    const isButtonClick = event.target.closest("button");
    if (isButtonClick) {
      event.stopPropagation();
    } else {
      toggleModal();
    }
  };

  return (
    <article
      className="px-5 py-5 rounded-xl bg-[#1F1E24] max-w-[701px] w-[701px] cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex gap-5">
        <div className="flex flex-col w-[70%]">
          <ProductInfo title={title} image={image} />
        </div>
        <ProductDetails
          price={price}
          onAddToBuilder={onAddToBuilder}
          product={product}
        />
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        product={product}
        categoryName={categoryName}
      />
    </article>
  );
};

export default ProductCard;
