import React, { useState, useEffect } from 'react';
import styles from './search.module.css';
import CloseIcon from '../../icons/cross.svg';

const Search = ({ active, setActive }) => {
    const [shouldRender, setShouldRender] = useState(active);

    useEffect(() => {
        if (active) setShouldRender(true);
    }, [active]);

    const onTransitionEnd = () => {
        if (!active) setShouldRender(false);
    };

    if (!shouldRender) return null;

    return (
        <div
            className={`${styles['search-container']} ${active ? styles.active : styles.closing}`}
            onTransitionEnd={onTransitionEnd}
        >
            <div className={styles['search-wrapper']}>
                <input
                    type="text"
                    className={styles['search-box']}
                    placeholder="Пошук"
                />
                <button
                    className={styles['clear-btn']}
                    onClick={() => setActive(false)}
                    aria-label="Закрыть"
                >
                    <img src={CloseIcon} alt="Закрыть" />
                </button>
            </div>
        </div>
    );
};

export default Search;
