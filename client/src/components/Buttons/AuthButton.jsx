import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import signIn from "../../images/log-in.svg";
import profile from "../../images/profile.svg";

import styles from "../../styles/NavigationButton.module.css";

const AuthButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("token");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`${styles.Button} flex items-center justify-center ml-10`}
        onClick={toggleDropdown}
      >
        <div className={styles.Item}>
          <img
            src={isLoggedIn ? profile : signIn}
            alt="Auth"
            className={styles.Icon}
          />
          <div className="mt-1.5">{isLoggedIn ? "Профиль" : "Вход"}</div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-[#3C3A46] rounded-md shadow-lg">
          {isLoggedIn ? (
            <>
              <Link
                to={ROUTES.PROFILE}
                className="block px-4 py-2 text-sm text-white hover:bg-[#514f5e]"
              >
                Профиль
              </Link>
              <button
                className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-[#514f5e]"
                onClick={handleLogout}
              >
                Выход
              </button>
            </>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                className="block px-4 py-2 text-sm text-white hover:bg-[#514f5e]"
              >
                Войти
              </Link>
              <Link
                to={ROUTES.REGISTRATION}
                className="block px-4 py-2 text-sm text-white hover:bg-[#514f5e]"
              >
                Зарегистрироваться
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthButton;
