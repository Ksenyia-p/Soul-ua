import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import Header from "../../components/header/Header";
import Bestsellers from "../../components/bestsellers/Bestsellers";
import Button from "../../components/button/Button";
import Info from "../../components/info/Info";
import Layout from "../../components/layout/Layout";
import Test from "../../components/test/Test";

const Main = () => {
  return (
    <div className={styles.main}>
      <Header />
      <Info />
      <Bestsellers />
      <Link to="/catalog" className={styles.buttonBestsellers}>
        <Button type="button">переглянути все</Button>
      </Link>

      <Test />
      <Layout />
    </div>
  );
};

export default Main;
