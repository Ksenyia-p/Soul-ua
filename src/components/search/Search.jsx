import React, { useEffect } from 'react';
import styles from './Search.module.css';
import Cross from '../../icons/cross.svg';
import SearchIcon from "../../icons/search.svg";

const Search = ({ active, setActive }) => {
    const handleSearch = () => {
        console.log("Пошук виконано!");
    };
    useEffect(() => {
        if (active) {
            document.body.classList.add('bodyLock');
        } else {
            document.body.classList.remove('bodyLock');
        }

        return () => {
            document.body.classList.remove('bodyLock');
        };
    }, [active]);

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
                    <button className={styles.searchButton} onClick={handleSearch}>
                        <img src={SearchIcon} alt="Шукати"/>
                    </button>
                    <button className={styles.closeButton} onClick={() => setActive(false)}>
                        <img src={Cross} alt="Закрити"/>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Search;
