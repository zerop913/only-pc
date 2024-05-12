import React, { useState } from "react";
import ProductModal from "./ProductModal";

function ProductImage({ image }) {
  return <img src={image} alt="" className="w-[90px] h-[90px]" />;
}

function ProductName({ title }) {
  return <div className="flex-auto my-auto text-base ">{title}</div>;
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
  const numericPrice = parseFloat(
    price.replace(/[^\d,.-]/g, "").replace(",", ".")
  );
  const formattedPrice = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(numericPrice);

  return (
    <div className="font-bold text-xl leading-3 text-right">
      {formattedPrice}
    </div>
  );
}

function ProductDetails({ price }) {
  return (
    <div className="flex flex-col ml-5 w-full">
      <div className="flex flex-col self-stretch my-auto text-white">
        <ProductPrice price={price} />
      </div>
    </div>
  );
}

const ProductCardInBuilder = ({ title, image, price, id, categoryName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="w-full" onClick={toggleModal}>
      <article className="px-5 py-5 rounded-xl bg-[#1F1E24] w-full cursor-pointer flex">
        <div className="flex flex-col w-[70%]">
          <ProductInfo title={title} image={image} />
        </div>
        <ProductDetails price={price} />
      </article>
      <ProductModal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        productId={id}
        categoryName={categoryName}
      />
    </div>
  );
};

export default ProductCardInBuilder;
