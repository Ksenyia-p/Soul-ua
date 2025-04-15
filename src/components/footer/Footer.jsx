import React from 'react';
import styles from './Footer.module.css';
import LogoTwoStars from '../../icons/Logo Two Stars.svg';
import InstagramIcon from '../../icons/instagram.svg';
import TelegramIcon from '../../icons/telegram.svg';
import TikTokIcon from '../../icons/tik tok.svg';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.columns}>
                <div className={styles.leftGroup}>
                    <div className={styles.leftColumn}>
                        <h3>Про нас<br/>Розмірна сітка<br/>Догляд за одягом</h3>
                    </div>
                    <div className={styles.centerColumn}>
                        <h3>Новини<br/>Повернення та обмін<br/>Договір публічної оферти</h3>
                    </div>
                </div>
                <div className={styles.rightColumn}>
                    <h3>Контакти</h3>
                    <div className={styles.socialIcons}>
                        <img src={InstagramIcon} alt="Instagram"/>
                        <img src={TelegramIcon} alt="Telegram"/>
                        <img src={TikTokIcon} alt="TikTok"/>
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
