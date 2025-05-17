import React from 'react';
import {Link, useLocation} from "react-router-dom";
import sideBarStyles from "./sideBar.module.css";
import backIcon from "../../icons/arrow for way.svg";
import clsx from "clsx";
import styles from "../way/Way.module.css";


const navItems = [
    {text: 'Особисті дані', path: '/account'},
    {text: 'Поточні замовлення', path: '/orders'},
    {text: 'Історія замовлень', path: '/order-history'},
    {text: 'Адреса доставки', path: '/address'},
    {text: 'Вихід з системи', path: '/logout'},
];

const SideBar = ({children}) => {
    const location = useLocation();

    return (
        <div>
            <div className={clsx(sideBarStyles.container)}>

                <div className={clsx(sideBarStyles.sideBarWrapper)}>
                    <h2>Вітаємо наш SOULmate</h2>
                    <div className={clsx(sideBarStyles.listWrapper, sideBarStyles.stickyList)}>
                        <ul>
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <Link to={item.path} className={clsx(sideBarStyles.linkTo)}>
                                        {location.pathname === item.path && (
                                            <div className={styles.backIcon}>
                                                <img src={backIcon} alt="/"/>
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
                </div>

                <div>
                    {children}
                </div>

            </div>

        </div>
    );
};

export default SideBar;