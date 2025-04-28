import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, type = 'button'}, ...props) => {
    return (
        <button className={styles.button} onClick={onClick} type={type} {...props}>
            {children}
        </button>
    );
};

export default Button;
