import React from "react";

import favorite from "../../../images/favorite.svg";
import ShoppingCart from "../../../images/shopping-cart.svg";
import profile from "../../../images/profile.svg";

import styles from "../../../styles/NavigationButton.module.css";

function FavoriteIcon() {
  return (
    <img src={favorite} alt="Favorite icon" className={styles.IconFavorite} />
  );
}

function ShoppingCartIcon() {
  return (
    <img
      src={ShoppingCart}
      alt="ShoppingCart icon"
      className={styles.IconShoppingCart}
    />
  );
}

function ProfileIcon() {
  return (
    <img src={profile} alt="Profile icon" className={styles.IconProfile} />
  );
}

function NavigationButton({ icon, label, isProfile }) {
  const itemClassName = isProfile ? styles.ItemProfile : styles.Item;

  return (
    <button className={styles.Button}>
      <div className={itemClassName}>
        {icon}
        <div className="mt-1.5">{label}</div>
      </div>
    </button>
  );
}

export function Button() {
  const favoriteItems = [{ icon: <FavoriteIcon />, label: "Избранное" }];
  const shoppingCartItems = [{ icon: <ShoppingCartIcon />, label: "Корзина" }];
  const profileItems = [{ icon: <ProfileIcon /> }];

  return (
    <div className="flex gap-10">
      {favoriteItems.map((item, index) => (
        <NavigationButton key={index} icon={item.icon} label={item.label} />
      ))}
      {shoppingCartItems.map((item, index) => (
        <NavigationButton key={index} icon={item.icon} label={item.label} />
      ))}
      {profileItems.map((item, index) => (
        <NavigationButton key={index} icon={item.icon} isProfile />
      ))}
    </div>
  );
}

export default Button;
