import React, { Component } from "react";
import sortIcon from "../../icons/Vector.svg";
import filterIcon from "../../icons/Artboard 36 1.svg";
import backIcon from "../../icons/arrowlink.svg";
import styles from "./Filtr.module.css";

const Filtr = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filtrContainer}>
        <div className={styles.filtrIcon}>
          <img src={filterIcon} alt="filter" />
        </div>
        <div className="h2-light">Фільтр</div>
      </div>
      <div className={styles.sortContainer}>
        <div className="h2-light">Сортувати</div>
        <div className={styles.sortIcon}>
          <img src={sortIcon} alt="sort" />
        </div>
      </div>
    </div>
  );
};

export default Filtr;
