import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

import MenuIcon from '../../icons/menu.svg';
import LogoIcon from '../../icons/Logo soul.svg';
import SearchIcon from '../../icons/search.svg';
import UserIcon from '../../icons/user.svg';
import FavoriteIcon from '../../icons/favorite.svg';
import BagIcon from '../../icons/bag.svg';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <div className={styles.leftImage}>
                <img src={MenuIcon} alt="Меню" />
            </div>

            <div className={styles.logo}>
                <img src={LogoIcon} alt="Логотип Soul" />
            </div>

            <nav className={styles.menu}>
                <ul>
                    <li>
                        <img src={SearchIcon} alt="Пошук" />
                        <h4>ПОШУК</h4>
                    </li>
                    <li>
                        <img src={UserIcon} alt="Особистий кабінет" />
                        <h4>ОСОБИСТИЙ<br />КАБІНЕТ</h4>
                    </li>
                    <li>
                        <img src={FavoriteIcon} alt="Вішліст" />
                        <h4>ВІШЛІСТ</h4>
                    </li>
                    <li>
                        <img src={BagIcon} alt="Кошик" />
                        <h4>КОШИК</h4>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
