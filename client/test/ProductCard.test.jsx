import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProductCard from "../src/components/Products/ProductCard";
import "@testing-library/jest-dom";

describe("ProductCard", () => {
  const product = {
    id: 1,
    title: "Test Product",
    image: "https://example.com/image.jpg",
    price: "99",
    category_name: "category1",
  };

  it("renders product information correctly", () => {
    const { getByText, getByAltText } = render(
      <ProductCard
        title={product.title}
        image={product.image}
        price={product.price}
        id={product.id}
        categoryName={product.category_name}
        onAddToBuilder={() => {}}
        product={product}
      />
    );

    expect(getByText(product.title)).toBeInTheDocument();
    expect(getByAltText("Test Product")).toBeInTheDocument();
    expect(getByText("99 ₽")).toBeInTheDocument();
  });

  it('calls onAddToBuilder when "Добавить" button is clicked', () => {
    // Создаем mock-функцию handleAddToBuilder
    const handleAddToBuilder = jest.fn();
    const { getByText } = render(
      <ProductCard
        title={product.title}
        image={product.image}
        price={product.price}
        id={product.id}
        categoryName={product.category_name}
        onAddToBuilder={handleAddToBuilder}
        product={product}
      />
    );

    // Получаем кнопку "Добавить"
    const addButton = getByText("Добавить");
    // Симулируем клик на кнопке "Добавить"
    fireEvent.click(addButton);

    // Проверяем, что mock-функция handleAddToBuilder была вызвана с правильными данными продукта
    expect(handleAddToBuilder).toHaveBeenCalledWith(product);
  });
});
