import React from 'react';
import styles from './Search.module.css';
import Cross from '../../icons/cross.svg';


const Search = ({ active, setActive }) => {
    return (
        <>
            <div
                className={`${styles.overlay} ${active ? styles.activeOverlay : ''}`}
                onClick={() => setActive(false)}
            />
            <div className={`${styles.searchWrapper} ${active ? styles.active : ''}`}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Пошук"
                        className={styles.searchInput}
                    />
                    <button className={styles.closeButton} onClick={() => setActive(false)}>
                        <img src={Cross} alt="Закрити" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Search;
