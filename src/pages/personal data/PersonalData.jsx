import React from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Way from "../../components/way/Way";
import stylesPersonal from "./PersonalData.module.css";

const PersonalData = () => {
    return (
        <div>
            <Header />
                <Way>Особистий кабінет</Way>

            <Footer/>
        </div>
    );
};

export default PersonalData;