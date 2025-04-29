import React from "react";
import sortIcon from "../../icons/arrow.svg";
import filterIcon from "../../icons/filter.svg";
import styles from "./FilterAndSort.module.css";

const FilterAndSort = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <button className={styles.filterIcon}>
          <img src={filterIcon} alt="filter" />
        </button>
        <div className="h2-light">Фільтр</div>
      </div>
      <div className={styles.sortContainer}>
        <div className="h2-light">Сортувати</div>
        <button className={styles.sortIcon}>
          <img src={sortIcon} alt="sort" />
        </button>
      </div>
    </div>
  );
};

export default FilterAndSort;
