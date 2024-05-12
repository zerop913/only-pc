import React from "react";

import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes.js";

import Logo from "../../images/Logo.svg";

import SearchMain from "../SearchMain/SearchMain.jsx";
import NavigationButton from "../Buttons/NavigationButton/NavigationButton.jsx";
import {
  ConfiguratorButton,
  CatalogButton,
} from "../Buttons/SectionsButton/SectionsButton.jsx";

const Header = () => {
  return (
    <header className="flex justify-start items-center mt-6 mb-14">
      <Link to={ROUTES.HOME} className="mr-[50px]">
        <img src={Logo} alt="OnlyPC" />
      </Link>
      <div className="flex justify-center items-center gap-[30px]">
        <ConfiguratorButton />
        <CatalogButton />
        <SearchMain />
      </div>
      <div className="flex ml-auto">
        <NavigationButton />
      </div>
    </header>
  );
};

export default Header;
