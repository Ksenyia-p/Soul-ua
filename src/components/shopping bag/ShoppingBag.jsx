import React, { useEffect } from 'react';
import styles from './ShoppingBag.module.css';
import Cross from '../../icons/cross.svg';
import Button from "../button/Button";
import { Link } from "react-router-dom";

const ShoppingBag = ({ active, setActive }) => {
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

            <div className={`${styles.shoppingBag} ${active ? styles.active : ''}`}>
                <div className={styles.upperRectangleContainer}>
                    <div className={styles.upperRectangle}>
                        <h2>Кошик</h2>
                        <button className={styles.closeButton} onClick={() => setActive(false)}>
                            <img src={Cross} alt="Закрити" />
                        </button>
                    </div>
                </div>

                <div className={styles.bottomRectangleContainer}>
                    <div className={styles.bottomRectangle}>
                        <div className={styles.textContainer}>
                            <div className={styles.text}>
                                <h3>Підсумок</h3>
                                <h3>7 позицій</h3>
                            </div>
                            <h3>5850 UAH</h3>
                        </div>
                        <Link to="/delivery" className={styles.buttonShoppingBag}>
                            <Button type="button">переглянути та оплатити</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShoppingBag;
