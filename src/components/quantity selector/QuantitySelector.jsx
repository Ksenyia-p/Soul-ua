import React, { useState, useRef, useEffect } from 'react';
import styles from './QuantitySelector.module.css';
import ArrowIcon from '../../icons/arrow.svg';

const QuantitySelector = ({ quantity, maxQuantity, onChange }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <h3>Кількість</h3>
            <div className={styles.selectorDropdown}>
                <div className={styles.selector} onClick={() => setShowDropdown(!showDropdown)}>
                    <h3>{quantity}</h3>
                    <img src={ArrowIcon} alt="arrow" className={styles.arrow} />
                </div>
                {showDropdown && (
                    <div className={styles.dropdown}>
                        {[...Array(maxQuantity).keys()].map((_, i) => (
                            <h3
                                key={i}
                                className={styles.option}
                                onClick={() => {
                                    onChange(i + 1);
                                    setShowDropdown(false);
                                }}
                            >
                                {i + 1}
                            </h3>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuantitySelector;
