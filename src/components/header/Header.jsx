import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Header.module.css';
import {Link} from 'react-router-dom';
import MenuIcon from '../../icons/menu.svg';
import LogoIcon from '../../icons/Logo soul.svg';
import SearchIcon from '../../icons/search.svg';
import UserIcon from '../../icons/user.svg';
import FavoriteIcon from '../../icons/favorite.svg';
import BagIcon from '../../icons/bag.svg';
import Search from "../search/Search";
import Menu from "../menu/Menu";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);


    const { isAuthenticated } = useAuth(); // <-- контекст
    const navigate = useNavigate();

    const handleAccountClick = () => {
        if (isAuthenticated) {
            navigate("/account");
        } else {
            navigate("/login");
        }
    };


    return (
        <header className={styles.header}>
            <div className={styles.leftImage} onClick={() => setMenuActive(true)}>
                <img src={MenuIcon} alt="Меню"/>
            </div>

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
                        <button onClick={handleAccountClick} className={styles.personalDataIcon}>
                            <img src={UserIcon} alt="Особистий кабінет" />
                            <h4>ОСОБИСТИЙ<br />КАБІНЕТ</h4>
                        </button>
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
            <Search active={searchActive} setActive={setSearchActive}/>
            <Menu active={menuActive} setActive={setMenuActive} />
        </header>
    );
};

export default Header;
