import React from "react";
import { Link } from "react-router-dom";
import styles from "./Main.module.css";
import Header from "../../components/header/Header";
import Bestsellers from "../../components/bestsellers/Bestsellers";
import Button from "../../components/button/Button";
import Info from "../../components/info/Info";
import Layout from "../../components/layout/Layout";
import Test from "../../components/test/Test";
import Video_1 from "../../video/video_1.MOV";
import Video_2 from "../../video/video_2.mp4";

const Main = () => {
    return (
        <div className={styles.main}>

            <div className={styles.videosContainer}>
                <video className={styles.video} src={Video_1} autoPlay muted loop playsInline />
                <video className={styles.video} src={Video_2} autoPlay muted loop playsInline />
                <video className={styles.video} src={Video_1} autoPlay muted loop playsInline />
            </div>
            <div className={styles.header}>
                <Header/>
            </div>

            <Info/>
            <div className={styles.bestsellers}>
                <Bestsellers/>
                <Link to="/catalog" className={styles.buttonBestsellers}>
                    <Button type="button">переглянути все</Button>
                </Link>
            </div>
            <Test/>
            <Layout/>
        </div>
    );
};

export default Main;
