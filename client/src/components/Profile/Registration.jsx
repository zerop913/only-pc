import React, { useState } from "react";
import { registerUser } from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка на использование только английских букв и цифр в логине
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(formData.username)) {
      setError(
        "Логин должен содержать только английские буквы и цифры без пробелов и специальных символов."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (formData.password.length < 8) {
      setError("Пароль должен быть не менее 8 символов");
      return;
    }

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "user",
      };
      await registerUser(userData);
      setError(null);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-[#3C3A46] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Регистрация
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Логин"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1E24] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7FC647]"
              required
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Почта"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1E24] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7FC647]"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Пароль"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1E24] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7FC647]"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={toggleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Подтверждение пароля"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1E24] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7FC647]"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={toggleShowConfirmPassword}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#7FC647] text-white font-bold hover:bg-[#6ca63a] transition-colors duration-300"
          >
            Зарегистрироваться
          </button>
          <p className="text-center text-white">
            Уже есть аккаунт?{" "}
            <Link
              to="/login"
              className="text-[#7FC647] hover:text-[#6ca63a] transition-colors duration-300"
            >
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
