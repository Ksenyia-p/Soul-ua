import React, { useState, useEffect, useRef } from "react";
import sortIcon from "../../icons/arrow.svg";
import filterIcon from "../../icons/filter.svg";
import Cross from "../../icons/cross.svg";
import styles from "./FilterAndSort.module.css";
import Button from "../button/Button";
import CheckBoxIcon from "../CheckBoxIcon/CheckBoxIcon";

const FilterAndSort = ({ onFilterChange, onSortChange }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const sortRef = useRef(null);

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

  const sortOptions = [
    { label: "За новизною", value: "newest" },
    { label: "Від найнижчої", value: "price-asc" },
    { label: "Від найбільшої", value: "price-desc" },
  ];

  useEffect(() => {
    if (showSidebar) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showSidebar]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleSortChange = (value) => {
    setSortOption(value);
    onSortChange?.(value);
    setShowSortOptions(false);
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

        <div className={styles.sortContainer} ref={sortRef}>
          <div className="h2-light">Сортувати</div>
          <button
            className={`${styles.sortIcon} ${
              showSortOptions ? styles.sortIconRotated : ""
            }`}
            onClick={() => setShowSortOptions((prev) => !prev)}
          >
            <img src={sortIcon} alt="sort" />
          </button>

          <div
            className={`${styles.sortOptions} ${
              showSortOptions ? styles.open : ""
            }`}
          >
            {sortOptions.map(({ label, value }) => (
              <button
                key={value}
                className={`${styles.sortButton} ${
                  sortOption === value ? styles.active : ""
                }`}
                onClick={() => handleSortChange(value)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
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
            <CheckBoxIcon
              key={value}
              id={`gender-${value}`}
              label={label}
              value={value}
              checked={localFilters.gender.includes(value)}
              onChange={(e) => handleMultiCheckboxChange(e, "gender")}
            />
          ))}

          <h3>Розмір</h3>
          {sizes.map((size) => (
            <CheckBoxIcon
              key={size}
              id={`size-${size}`}
              label={size}
              value={size}
              checked={localFilters.size.includes(size)}
              onChange={(e) => handleMultiCheckboxChange(e, "size")}
            />
          ))}

          <h3>Категорія</h3>
          {categories.map(({ label, value }) => (
            <CheckBoxIcon
              key={value}
              id={`category-${value}`}
              label={label}
              value={value}
              checked={localFilters.category.includes(value)}
              onChange={(e) => handleMultiCheckboxChange(e, "category")}
            />
          ))}

          <h3>Колір</h3>
          {colors.map((color) => (
            <CheckBoxIcon
              key={color}
              id={`color-${color}`}
              label={color}
              value={color}
              checked={localFilters.color.includes(color)}
              onChange={(e) => handleMultiCheckboxChange(e, "color")}
            />
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
