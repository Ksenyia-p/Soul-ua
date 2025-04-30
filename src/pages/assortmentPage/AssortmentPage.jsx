import React from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useParams } from 'react-router-dom';
const AssortmentPage = () => {
    const { group, item, slug } = useParams();
    return (

        <div>
            <Header />
            {group}
            {item}
            <Footer />
        </div>
    );
};

export default AssortmentPage;