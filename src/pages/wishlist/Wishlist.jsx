import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Filtr from "../../components/filtr/Filtr";

const Wishlist = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      {/* Кнопка Назад */}
      <div className="wishlist-container">
        <button onClick={() => navigate(-1)} className="back-button">
          Назад
        </button>
      </div>

      {/*  компонента Filtr */}
      <Filtr />

      <Footer />
    </div>
  );
};

export default Wishlist;
