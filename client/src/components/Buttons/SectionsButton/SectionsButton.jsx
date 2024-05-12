import React from "react";

import configurator from "../../../images/configurator.svg";
import catalog from "../../../images/catalog.svg";

import styles from "../../../styles/SectionsButton.module.css";

export function ConfiguratorButton() {
  return (
    <div className={styles.FormButton}>
      <button className={styles.ContentButton}>
        <img
          src={configurator}
          alt="Configurator icon"
          className={styles.SvgConfigurator}
        />
        <div className={styles.TextStyle}>Конфигуратор</div>
      </button>
    </div>
  );
}

export function CatalogButton() {
  return (
    <div className={styles.FormButton}>
      <button className={styles.ContentButton}>
        <img src={catalog} alt="Catalog icon" />
        <div className={styles.TextStyle}>Каталог</div>
      </button>
    </div>
  );
}
