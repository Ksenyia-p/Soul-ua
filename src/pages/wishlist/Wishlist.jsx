import React from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FilterAndSort from "../../components/filter and sort icons/FilterAndSort";
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
                        Головна
                    </h3>
                    <div className={styles.backIcon}>
                        <img src={backIcon} alt="/"/>
                    </div>
                    <div className={styles.text}>
                        <h3>Вішліст</h3>
                    </div>
                </div>
            </div>
            <FilterAndSort/>
            <Footer/>
        </div>
    );
};

export default Wishlist;
