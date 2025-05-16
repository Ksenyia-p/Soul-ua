import React from 'react';
import Header from "../../components/header/Header";
import Way from "../../components/way/Way";
import Layout from "../../components/layout/Layout";
import stylesPersonal from "./PersonalData.module.css";

const PersonalData = () => {
    return (
        <div>
            <Header />
                <Way>Особистий кабінет</Way>

            <Layout/>
        </div>
    );
};

export default PersonalData;