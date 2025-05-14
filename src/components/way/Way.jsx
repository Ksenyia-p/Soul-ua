import React from 'react';
import styles from './Way.module.css';
import {useNavigate} from "react-router-dom";

import backIcon from "../../icons/arrow for way.svg";


const Way = ({children, onClick}) => {
    const navigate = useNavigate();

    return (
        <div className={styles.way}>
            <div className={styles.wayContainer}>
                <h3 onClick={() => navigate(-1)} className={styles.backButton}>
                    Назад
                </h3>
                <div className={styles.backIcon}>
                    <img src={backIcon} alt="/"/>
                </div>
                <div className={styles.text}>
                    <h3>{children}</h3>
                </div>
            </div>
        </div>
    );
};

export default Way;

