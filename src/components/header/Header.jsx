import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Header.module.css';
import {Link} from 'react-router-dom';
import MenuIcon from '../../icons/menu.svg';
import LogoIcon from '../../icons/Logo soul.svg';
import SearchIcon from '../../icons/search.svg';
import UserIcon from '../../icons/user.svg';
import FavoriteIcon from '../../icons/favorite.svg';
import BagIcon from '../../icons/bag.svg';
import Search from "../search/search";

const Header = () => {
    const [searchActive, setSearchActive] = React.useState();

    return (
        <header className={styles.header}>
            <Link to='/menu'>
                <div className={styles.leftImage}>
                    <img src={MenuIcon} alt="Меню"/>
                </div>
            </Link>
            <Link to='/'>
                <div className={styles.logo}>
                    <img src={LogoIcon} alt="Логотип Soul"/>
                </div>
            </Link>
            <nav className={styles.menu}>
                <ul>
                    <li>
                        <button className={styles.searchIcon} onClick={() => setSearchActive(true)}>
                            <img src={SearchIcon} alt="Пошук"/>
                            <h4>ПОШУК</h4>
                        </button>
                    </li>


                    <li>
                        <Link to='/account' className={styles.link}>
                        <img src={UserIcon} alt="Особистий кабінет"/>
                            <h4>ОСОБИСТИЙ<br/>КАБІНЕТ</h4>
                        </Link>
                    </li>


                        <li>
                            <Link to='/wishlist' className={styles.link}>
                            <img src={FavoriteIcon} alt="Вішліст"/>
                            <h4>ВІШЛІСТ</h4>
                            </Link>
                        </li>



                        <li>
                            <Link to='/shoppingback' className={styles.link}>
                            <img src={BagIcon} alt="Кошик"/>
                            <h4>КОШИК</h4>
                            </Link>
                        </li>

                </ul>
            </nav>
            <Search active={searchActive} setActive={setSearchActive} />
        </header>
    );
};

export default Header;
