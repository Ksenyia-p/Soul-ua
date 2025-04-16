import React from 'react';
import styles from './Main.module.css';
import Header from '../../components/header/Header';
import Bestsellers from "../../components/bestsellers/Bestsellers";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";

const Main = () => {
    return (
        <div className={styles.main}>
            <Header />
            <Bestsellers/>
            <Footer/>

        </div>
    );
};

export default Main;
