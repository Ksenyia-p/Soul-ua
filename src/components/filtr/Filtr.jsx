import React, { Component } from "react";
import sortIcon from "../../icons/Vector.svg";
import filterIcon from "../../icons/Artboard 36 1.svg";
import backIcon from "../../icons/arrowlink.svg";
import styles from "./Filtr.module.css";

class Filtr extends Component {
  render() {
    return (
      <div className={styles.filtrContainer}>
        <div className={styles.filtrButtons}>
          {/* Іконка для кнопки "Назад" */}
          <div className={styles.filtrItem}>
            <img src={backIcon} alt="Назад" className="h3" />
            {/* Текст "Wishlist" після іконки */}
            <div className={styles.filtrItem}>
              <h3>Вішліст</h3>
            </div>
          </div>

          {/* Блок для фільтрації */}
          <div className={styles.filtrItem}>
            <button className={styles.filterButton}>
              <img src={filterIcon} alt="Фільтрувати" />
            </button>
            <span className="h2-light">Фільтрувати</span>
          </div>

          {/* Блок для сортування */}
          <div className={styles.filtrItem}>
            <button className={styles.sortButton}>
              <img src={sortIcon} alt="Сортувати" />
            </button>
            <span className="h2-light">Сортувати</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Filtr;
