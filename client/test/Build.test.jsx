import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Build from "../src/components/BuildPc/Build";
import "@testing-library/jest-dom";

describe("Build", () => {
  const selectedProducts = {
    1: {
      id: 1,
      product_title: "Test Product 1",
      product_images: "https://example.com/image1.jpg",
      price: "99",
      category_name: "category1",
    },
    2: {
      id: 2,
      product_title: "Test Product 2",
      product_images: "https://example.com/image2.jpg",
      price: "199",
      category_name: "category2",
    },
  };

  it("renders selected products correctly", () => {
    // Рендерим компонент Build с выбранными продуктами и mock-функцией onRemoveProduct
    const { getAllByText, getAllByAltText } = render(
      <Build selectedProducts={selectedProducts} onRemoveProduct={() => {}} />
    );

    // Проверяем, что количество элементов с названиями продуктов равно 2
    const productTitles = getAllByText(/Test Product/);
    expect(productTitles).toHaveLength(2);

    // Проверяем, что количество элементов с изображениями продуктов равно 2
    const productImages = getAllByAltText("");
    expect(productImages).toHaveLength(2);
  });

  it("calls onRemoveProduct when delete button is clicked", () => {
    // Создаем mock-функцию handleRemoveProduct
    const handleRemoveProduct = jest.fn();
    const { getAllByAltText } = render(
      <Build
        selectedProducts={selectedProducts}
        onRemoveProduct={handleRemoveProduct}
      />
    );

    // Получаем все кнопки удаления
    const deleteButtons = getAllByAltText("Удалить");
    // Симулируем клик на первой кнопке удаления
    fireEvent.click(deleteButtons[0]);

    // Проверяем, что mock-функция handleRemoveProduct была вызвана с правильным идентификатором продукта
    expect(handleRemoveProduct).toHaveBeenCalledWith("1");
  });
});
