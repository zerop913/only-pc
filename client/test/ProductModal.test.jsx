import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProductModal from "../src/components/Products/ProductModal";
import "@testing-library/jest-dom";

describe("ProductModal", () => {
  const product = {
    id: 1,
    product_title: "Test Product",
    product_images: "https://example.com/image.jpg",
    price: "99",
    category_name: "category1",
  };

  it("renders modal with product information when isOpen is true", () => {
    // Рендерим компонент ProductModal с заданными свойствами продукта и mock-функцией onRequestClose
    const { getByText, getByAltText } = render(
      <ProductModal
        isOpen={true}
        onRequestClose={() => {}}
        product={product}
        categoryName={product.category_name}
      />
    );

    // Проверяем, что название продукта отображается
    expect(getByText(product.product_title)).toBeInTheDocument();
    // Проверяем, что изображение продукта отображается
    expect(getByAltText(product.product_title)).toBeInTheDocument();
    // Проверяем, что цена продукта отображается
    expect(getByText("Цена: 99 ₽")).toBeInTheDocument();
  });

  it("calls onRequestClose when close button is clicked", () => {
    // Создаем mock-функцию handleRequestClose
    const handleRequestClose = jest.fn();
    const { getByText } = render(
      <ProductModal
        isOpen={true}
        onRequestClose={handleRequestClose}
        product={product}
        categoryName={product.category_name}
      />
    );

    // Получаем кнопку закрытия модального окна
    const closeButton = getByText("×");
    // Симулируем клик на кнопке закрытия
    fireEvent.click(closeButton);

    // Проверяем, что mock-функция handleRequestClose была вызвана
    expect(handleRequestClose).toHaveBeenCalled();
  });
});
