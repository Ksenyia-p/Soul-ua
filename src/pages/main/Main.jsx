import React from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import styles from './Main.module.css';
import Header from '../../components/header/Header';
import Bestsellers from "../../components/bestsellers/Bestsellers";
import Button from "../../components/button/Button";
import Info from "../../components/info/Info";
import Footer from "../../components/footer/Footer";

const Main = () => {

    return (
        <div className={styles.main}>
            <Header />
            <Bestsellers/>
            <Link to='/assortment' className={styles.buttonBestsellers}>
                <Button type="button">переглянути все</Button>
            </Link>
            <Info/>
            <Footer/>
        </div>
    );
};

export default Main;
