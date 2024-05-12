import React from "react";

import additionally from "../../images/additionally.svg";
import save from "../../images/save.svg";
import ShoppingCart from "../../images/shopping-cart.svg";

function Icon({ src, alt }) {
  return (
    <div className="w-10 h-10 flex items-center justify-center bg-[#3C3A46] rounded-[3px] cursor-pointer hover:bg-[#514f5e] transition-colors duration-300 ease-in-out">
      <img src={src} alt={alt} className="w-5 h-5 object-contain" />
    </div>
  );
}

function Info({ totalCost }) {
  const formattedTotalCost = totalCost.toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const icons = [
    {
      src: additionally,
      alt: "Additionally",
    },
    {
      src: save,
      alt: "Save",
    },
    {
      src: ShoppingCart,
      alt: "ShoppingCart",
    },
  ];

  return (
    <section className="flex flex-col px-5 justify-end">
      <h2 className="w-full text-xl font-bold leading-3 text-center text-white">
        {formattedTotalCost} ₽
      </h2>
      <div className="flex gap-4 mt-5">
        {icons.map((icon, index) => (
          <Icon key={index} src={icon.src} alt={icon.alt} />
        ))}
      </div>
    </section>
  );
}
export default Info;
