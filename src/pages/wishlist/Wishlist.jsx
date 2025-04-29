import React from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Filtr from "../../components/filtr/Filtr";
import backIcon from "../../icons/arrow for way.svg";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header/>

            <div className={styles.wishlist}>
                <div className={styles.wishlistContainer}>
                    <h3 onClick={() => navigate(-1)} className={styles.backButton}>
                        Назад
                    </h3>
                    <div className={styles.backIcon}>
                        <img src={backIcon} alt="/"/>
                    </div>
                    <h3>Вішліст</h3>
                </div>
            </div>
            <Filtr/>
            <Footer/>
        </div>
    );
};

export default Wishlist;
