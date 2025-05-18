import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import sideBarStyles from "./sideBar.module.css";
import backIcon from "../../icons/arrow for way.svg";
import clsx from "clsx";
import styles from "../way/Way.module.css";
import burgerIcon from "../../icons/menuPhone.svg";
import closeIcon from "../../icons/cross.svg";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../FirebaseConfigs/FirebaseConfigs";


const navItems = [
    {text: 'Особисті дані', path: '/account'},
    {text: 'Поточні замовлення', path: '/orders'},
    {text: 'Історія замовлень', path: '/order-history'},
    {text: 'Адреса доставки', path: '/address'},
    {text: 'Вихід з системи', path: '/login'},
];

const SideBar = ({children}) => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        if (auth.currentUser) {
            navigate("/login");
        }
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const navigate = useNavigate();

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Помилка при виході з системи:", error);
        }
    };

    return (
        <div>
            <div className={clsx(sideBarStyles.container)}>

                <div className={clsx(sideBarStyles.sideBarWrapper)}>
                    <div className={clsx(sideBarStyles.iconTitleWrapper)}>
                        {isMobile && (
                            <button
                                className={sideBarStyles.burgerButton}
                                onClick={toggleMenu}
                                aria-label="Відкрити меню навігації"
                            >
                                <img
                                    src={clsx(burgerIcon)}
                                    alt=""
                                    className={sideBarStyles.burgerIcon}
                                />
                            </button>
                        )}
                        <h2 className={clsx(sideBarStyles.welcomeText)}>Вітаємо наш SOULmate</h2>
                    </div>
                    {!isMobile && (
                        <div className={clsx(sideBarStyles.listWrapper, sideBarStyles.stickyList)}>
                            <ul>
                                {navItems.map((item) => (
                                    <li key={item.path}>
                                        <Link to={item.path} className={clsx(sideBarStyles.linkTo)}>
                                            {location.pathname === item.path && (
                                                <div className={styles.backIcon}>
                                                    <img src={clsx(backIcon)} alt="/"/>
                                                </div>
                                            )}
                                            <h3 className={clsx({
                                                [sideBarStyles.active]: location.pathname === item.path
                                            })}>{item.text}</h3>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div>
                    {children}
                </div>
            </div>

            {isMobile && (
                <>
                    <div
                        className={clsx(sideBarStyles.overlay, {
                            [sideBarStyles.overlayActive]: isMenuOpen,
                        })}
                        onClick={toggleMenu}
                    />

                    <div
                        className={clsx(sideBarStyles.menuWindowWrapper, {
                            [sideBarStyles.menuWindowWrapperActive]: isMenuOpen,
                        })}
                    >
                        <div className={sideBarStyles.mobileMenuHeader}>
                            <h2>Меню</h2>
                            <button
                                className={sideBarStyles.closeButton}
                                onClick={toggleMenu}
                                aria-label="Закрити меню"
                            >
                                <img src={closeIcon} alt="Закрити" />
                            </button>
                        </div>


                        <div className={clsx(sideBarStyles.mobileList)}>

                        <ul>
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    {item.path === "/login" ? (
                                        <div
                                            className={clsx(sideBarStyles.linkTo)}
                                            onClick={() => {
                                                toggleMenu();
                                                handleLogout();
                                            }}
                                        >
                                            <h3>{item.text}</h3>
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className={clsx(sideBarStyles.linkTo)}
                                            onClick={toggleMenu}
                                        >
                                            {location.pathname === item.path && (
                                                <div className={styles.backIcon}>
                                                    <img src={backIcon} alt="Поточна сторінка" />
                                                </div>
                                            )}
                                            <h3
                                                className={clsx({
                                                    [sideBarStyles.active]: location.pathname === item.path,
                                                })}
                                            >
                                                {item.text}
                                            </h3>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        </div>
                    </div>
                </>
            )}

        </div>
    );
};

export default SideBar;