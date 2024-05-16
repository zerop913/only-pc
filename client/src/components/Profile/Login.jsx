import React, { useState } from "react";
import { loginUser } from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }
    try {
      const { token, user } = await loginUser(formData);
      localStorage.setItem("token", token);
      if (user && user.username) {
        localStorage.setItem("username", user.username);
      }
      setError(null);
      navigate("/profile");
    } catch (error) {
      if (error.message === "Invalid username or password") {
        setError("Неверный логин или пароль");
      } else {
        setError(error.message);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-[#3C3A46] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Авторизация
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
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#7FC647] text-white font-bold hover:bg-[#6ca63a] transition-colors duration-300"
          >
            Войти
          </button>
          <p className="text-center text-white">
            Еще нет аккаунта?{" "}
            <Link
              to="/registration"
              className="text-[#7FC647] hover:text-[#6ca63a] transition-colors duration-300"
            >
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
