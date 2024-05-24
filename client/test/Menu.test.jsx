import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Menu from "../src/components/Products/Menu";
import "@testing-library/jest-dom";

describe("Menu", () => {
  const handleApplyFilters = jest.fn();

  it('opens filter modal when "Фильтры" icon is clicked', () => {
    // Рендерим компонент Menu с mock-функцией onApplyFilters
    render(<Menu category="category1" onApplyFilters={handleApplyFilters} />);

    // Получаем иконку "Фильтры"
    const filterIcon = screen.getByTitle("Фильтры");
    // Симулируем клик на иконке "Фильтры"
    fireEvent.click(filterIcon);

    // Проверяем, что модальное окно фильтров отображается
    expect(screen.getByLabelText("Filter Modal")).toBeInTheDocument();
  });
});
