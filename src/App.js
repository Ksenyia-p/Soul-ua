import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Wishlist from "./pages/wishlist/Wishlist";
import Delivery from "./pages/delivery/Delivery";
import PersonalData from "./pages/personal data/PersonalData";
import Catalog from "./pages/catalog/Catalog";
import ColorType from "./pages/color type/ColorType";
import { db } from "./FirebaseConfigs/FirebaseConfigs";
import { collection, getDocs } from "firebase/firestore";
import AssortmentPage from "./pages/assortmentPage/AssortmentPage";
import Product from "./pages/product/Product";
import LogIn from "./pages/logIn/LogIn";
import RegistrationPage from "./pages/registration/RegistrationPage";
import CurrentOrders from "./pages/currentOrders/currentOrders";
import OrderHistory from "./pages/orderHistory/orderHistory";
import DeliveryAddress from "./pages/deliveryAddress/deliveryAddress";
import SizeTable from "./pages/sizeTable/sizeTable";
import ClotheCare from "./pages/clotheCare/clotheCare";
import News from "./pages/news/news";
import ReturnExchange from "./pages/returnExchange/returnExchange";
import OfferAgreement from "./pages/offerAgreement/offerAgreement";

const App = () => {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsSnapshot = await getDocs(collection(db, "menu1/menu/items"));
        const itemsArray = itemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsArray);

        const groupsSnapshot = await getDocs(
          collection(db, "menu1/menu/groups")
        );
        const groupsArray = groupsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroups(groupsArray);

        const productSnapshot = await getDocs(collection(db, "catalog"));
        const productArray = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProduct(productArray);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/main" element={<Main />} />
        <Route path="/account" element={<PersonalData />} />
        <Route path="/orders" element={<CurrentOrders />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/address" element={<DeliveryAddress />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/login/registration" element={<RegistrationPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/color_type" element={<ColorType />} />
        <Route path="/size_table" element={<SizeTable />} />
        <Route path="/clothe_care" element={<ClotheCare />} />
        <Route path="/news" element={<News />} />
        <Route path="/return_exchange" element={<ReturnExchange />} />
        <Route path="/offer_agreement" element={<OfferAgreement />} />
        <Route path="/:group" element={<AssortmentPage />} />
        <Route path="/:group/:item" element={<AssortmentPage />} />
        <Route path="/:group/:item/:slug/:color" element={<Product />} />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
