import React from 'react';
import styles from './Info.module.css';
import Button from "../button/Button";
import {Link} from "react-router-dom";

const Info = () => {
    return (
        <>
            <div className={styles.info}>
                <h1>
                    SOUL — ЦЕ УКРАЇНСЬКИЙ БРЕНД СПОРТИВНОГО ОДЯГУ
                </h1>
                <h2 className={styles.paragraph}>
                    Основна мета, створювати якісний одяг для активних людей, що підкреслює індивідуальність
                </h2>
                <Link to='/about_us' className={styles.buttonReadMore}>
                    <Button type="button">читати далі</Button>
                </Link>
            </div>
        </>
    )
};

export default Info;