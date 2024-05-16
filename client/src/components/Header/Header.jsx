import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes.js";

import Logo from "../../images/Logo.svg";

import SearchMain from "../SearchMain/SearchMain.jsx";
import NavigationButton from "../Buttons/NavigationButton/NavigationButton.jsx";
import {
  ConfiguratorButton,
  CatalogButton,
} from "../Buttons/SectionsButton/SectionsButton.jsx";
import AuthButton from "../Buttons/AuthButton.jsx";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(ROUTES.LOGIN);
  };

  const handleLogoClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <header className="flex justify-start items-center mt-6 mb-14">
      <div className="mr-[50px] cursor-pointer" onClick={handleLogoClick}>
        <img src={Logo} alt="OnlyPC" />
      </div>
      <div className="flex justify-center items-center gap-[30px]">
        <ConfiguratorButton />
        <CatalogButton />
        <SearchMain />
      </div>
      <div className="flex ml-auto">
        <NavigationButton />
        <AuthButton />
      </div>
    </header>
  );
};

export default Header;
