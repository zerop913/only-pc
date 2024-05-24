import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationModal from "../src/components/Modals/ConfirmationModal";
import "@testing-library/jest-dom";

describe("ConfirmationModal", () => {
  const handleConfirm = jest.fn();
  const handleCancel = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal with correct message", () => {
    // Рендерим компонент ConfirmationModal с заданным сообщением и mock-функциями onConfirm и onCancel
    render(
      <ConfirmationModal
        isOpen
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Are you sure?"
      />
    );

    // Проверяем, что модальное окно содержит заданное сообщение
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it('calls onConfirm when "Подтвердить" button is clicked', () => {
    // Рендерим компонент ConfirmationModal с mock-функциями onConfirm и onCancel
    render(
      <ConfirmationModal
        isOpen
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Are you sure?"
      />
    );

    // Получаем кнопку "Подтвердить"
    const confirmButton = screen.getByText("Подтвердить");
    // Симулируем клик на кнопке "Подтвердить"
    fireEvent.click(confirmButton);

    // Проверяем, что mock-функция handleConfirm была вызвана
    expect(handleConfirm).toHaveBeenCalled();
  });

  it('calls onCancel when "Отмена" button is clicked', () => {
    // Рендерим компонент ConfirmationModal с mock-функциями onConfirm и onCancel
    render(
      <ConfirmationModal
        isOpen
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Are you sure?"
      />
    );

    // Получаем кнопку "Отмена"
    const cancelButton = screen.getByText("Отмена");
    // Симулируем клик на кнопке "Отмена"
    fireEvent.click(cancelButton);

    // Проверяем, что mock-функция handleCancel была вызвана
    expect(handleCancel).toHaveBeenCalled();
  });
});
