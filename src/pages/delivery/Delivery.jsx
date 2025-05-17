import React from 'react';
import styles from './Delivery.module.css';
import Header from '../../components/header/Header';
import Layout from "../../components/layout/Layout";

const Delivery = () => {

    return (
        <div className={styles.main}>
            <Header />

            <Layout/>
        </div>
    );
};

export default Delivery;
