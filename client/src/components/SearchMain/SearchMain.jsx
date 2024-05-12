import React from "react";

import search from "../../images/search.svg";

import styles from "../../styles/SearchMain.module.css";

export function SearchMain() {
  return (
    <div className={styles.FormInput}>
      <img src={search} alt="Search icon" />
      <input
        type="search"
        name="search"
        id="SearchMain"
        placeholder="Поиск"
        className={styles.Input}
      />
    </div>
  );
}

export default SearchMain;
