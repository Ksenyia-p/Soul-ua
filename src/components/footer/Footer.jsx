import React from 'react';
import styles from './Footer.module.css';
import LogoTwoStars from '../../icons/Logo Two Stars.svg';
import InstagramIcon from '../../icons/instagram.svg';
import TelegramIcon from '../../icons/telegram.svg';
import TikTokIcon from '../../icons/tik tok.svg';
import {Link} from "react-router-dom";
import clsx from "clsx";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.columns}>
                <div className={styles.leftGroup}>
                    <div className={styles.leftColumn}>
                        <Link to="/about_us" className={clsx(styles.link)}><h3>Про нас</h3></Link>
                        <Link to="/size_table" className={clsx(styles.link)}><h3>Розмірна сітка</h3></Link>
                        <Link to="/clothe_care" className={clsx(styles.link)}><h3>Догляд за одягом</h3></Link>
                    </div>
                    <div className={styles.centerColumn}>
                        <Link to="/news" className={clsx(styles.link)}><h3>Новини</h3></Link>
                        <Link to="/return_exchange" className={clsx(styles.link)}><h3>Повернення та обмін</h3></Link>
                        <Link to="/offer_agreement" className={clsx(styles.link)}><h3>Договір публічної оферти</h3></Link>
                    </div>
                </div>
                <div className={styles.rightColumn}>
                    <h3>Контакти</h3>
                    <div className={styles.socialIcons}>
                        <a
                            href="https://www.instagram.com/soul.ua.store?igsh=MXdrdjN6anFtNG8xOA=="
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <img src={InstagramIcon} alt="Instagram"/>
                        </a>
                        <a
                            href="https://t.me/soul_ua_store"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={TelegramIcon} alt="Telegram"/>
                        </a>
                        <a
                            href="https://www.tiktok.com/@soul.shopping?_t=8hJz6esmoI1&_r=1&fbclid=PAQ0xDSwKXVVxleHRuA2FlbQIxMQABpzLVRs8ARkgzyzQFLfKL21WY1q7ZLdyRG29HY3PTU8cV7GC8UQCIWJecYW1x_aem_82I5f1t-6Qgeh4gs-QoEWw"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={TikTokIcon} alt="TikTok"/>
                        </a>

                    </div>
                </div>
            </div>
            <div className={styles.bottomRow}>
                <div className={styles.logo}>
                    <img src={LogoTwoStars} alt="Logo"/>
                </div>
                <div className="h3-light">©2025 — Інтернет магазин спортивного одягу</div>
            </div>
        </footer>
    );
};

export default Footer;
