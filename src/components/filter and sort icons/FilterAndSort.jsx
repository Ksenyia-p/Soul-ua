import React, { useState, useEffect } from "react";
import sortIcon from "../../icons/arrow.svg";
import filterIcon from "../../icons/filter.svg";
import Cross from "../../icons/cross.svg";
import styles from "./FilterAndSort.module.css";
import Button from "../button/Button";

const FilterAndSort = ({ onFilterChange }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    gender: [],
    size: [],
    category: [],
    color: [],
  });

  const genders = [
    { label: "Чоловіки", value: "men" },
    { label: "Жінки", value: "women" },
  ];

  const categories = [
    { label: "Світшоти/худі", value: "sweatshirts-hoodies" },
    { label: "Лонгсліви/рашгарди", value: "longsleeves-rashguards" },
    { label: "Штани", value: "pant" },
    { label: "Шорти", value: "shorts" },
    { label: "Футболки", value: "tshirts" },
  ];

  const sizes = ["S", "M", "L"];

  const colors = [
    "Фісташка",
    "Графіт",
    "Синій",
    "Мокко",
    "Смарагд",
    "Сірий",
    "Малина",
    "Білий",
    "Рожевий",
    "Чорний",
    "Шоколад",
  ];

  useEffect(() => {
    if (showSidebar) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showSidebar]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleMultiCheckboxChange = (e, key) => {
    const { value, checked } = e.target;
    setLocalFilters((prev) => {
      const updatedList = checked
        ? [...prev[key], value]
        : prev[key].filter((item) => item !== value);
      return { ...prev, [key]: updatedList };
    });
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
    setShowSidebar(false);
  };

  const resetFilters = () => {
    const emptyFilters = {
      gender: [],
      size: [],
      category: [],
      color: [],
    };
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <button className={styles.filterIcon} onClick={toggleSidebar}>
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

      <div
        className={`${styles.overlay} ${showSidebar ? styles.show : ""}`}
        onClick={toggleSidebar}
      ></div>

      <div className={`${styles.sidebar} ${showSidebar ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2>Фільтр</h2>
          <button className={styles.closeButton} onClick={toggleSidebar}>
            <img src={Cross} alt="Закрити" />
          </button>
        </div>

        <div className={styles.sidebarContent}>
          <div className={styles.resetAllWrapper}>
            <button className={styles.resetButton} onClick={resetFilters}>
              Відмінити все
            </button>
          </div>

          <h3>Стать</h3>
          {genders.map(({ label, value }) => (
            <label className="h3-light" key={value}>
              <input
                type="checkbox"
                value={value}
                checked={localFilters.gender.includes(value)}
                onChange={(e) => handleMultiCheckboxChange(e, "gender")}
              />
              {label}
            </label>
          ))}

          <h3>Розмір</h3>
          {sizes.map((size) => (
            <label className="h3-light" key={size}>
              <input
                type="checkbox"
                value={size}
                checked={localFilters.size.includes(size)}
                onChange={(e) => handleMultiCheckboxChange(e, "size")}
              />
              {size}
            </label>
          ))}

          <h3>Категорія</h3>
          {categories.map(({ label, value }) => (
            <label className="h3-light" key={value}>
              <input
                type="checkbox"
                value={value}
                checked={localFilters.category.includes(value)}
                onChange={(e) => handleMultiCheckboxChange(e, "category")}
              />
              {label}
            </label>
          ))}

          <h3>Колір</h3>
          {colors.map((color) => (
            <label className="h3-light" key={color}>
              <input
                type="checkbox"
                value={color}
                checked={localFilters.color.includes(color)}
                onChange={(e) => handleMultiCheckboxChange(e, "color")}
              />
              {color}
            </label>
          ))}
        </div>

        <div className={styles.sidebarFooter}>
          <Button className={styles.applyButton} onClick={applyFilters}>
            Застосувати
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterAndSort;
