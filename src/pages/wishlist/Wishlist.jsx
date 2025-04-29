import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FilterAndSort from "../../components/filter and sort icons/FilterAndSort";
import Way from "../../components/way/Way";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
    return (
        <div>
            <Header/>
            <Way>Вішліст</Way>
            <FilterAndSort/>
            <Footer/>
        </div>
    );
};

export default Wishlist;
