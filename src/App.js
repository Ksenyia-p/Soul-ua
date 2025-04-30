import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './pages/main/Main';
import Menu from './components/menu/Menu';
import Wishlist from './pages/wishlist/Wishlist';
import ShoppingBag from './components/shopping bag/ShoppingBag';
import PersonalData from "./pages/personal data/PersonalData";
import Assortment from "./pages/assortment/Assortment";
import AboutUs from "./pages/about us/AboutUs";
import { db } from "./FirebaseConfigs/FirebaseConfigs";
import { collection, getDocs } from 'firebase/firestore';
import AssortmentPage from "./pages/assortmentPage/AssortmentPage";
import { useEffect } from 'react';
import Product from "./pages/product/Product";


const App = () => {
    const [items, setItems] = useState([]);
    const [groups, setGroups] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemsSnapshot = await getDocs(collection(db, "menu1/menu/items"));
                const itemsArray = [];
                itemsSnapshot.forEach((doc) => {
                    itemsArray.push({ id: doc.id, ...doc.data() });
                });
                setItems(itemsArray);
                const groupsSnapshot = await getDocs(collection(db, "menu1/menu/groups"));
                const groupsArray = [];
                groupsSnapshot.forEach((doc) => {
                    groupsArray.push({ id: doc.id, ...doc.data() });
                });
                setGroups(groupsArray);
                const productSnapshot = await getDocs(collection(db, "catalog"));
                const productArray = [];
                productSnapshot.forEach((doc) => {
                    productArray.push({ id: doc.id, ...doc.data() });
                });
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
                <Route path="/" element={<Main/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/wishlist" element={<Wishlist/>}/>
                <Route path="/main" element={<Main/>}/>
                <Route path="/shoppingback" element={<ShoppingBag/>}/>
                <Route path="/account" element={<PersonalData/>}/>
                <Route path="/assortment" element={<Assortment/>}/>
                <Route path="/about_us" element={<AboutUs />}/>
                <Route path="/:group" element={<AssortmentPage />} />
                <Route path="/:group/:item" element={<AssortmentPage />} />
                <Route path="/:group/:item/:slug" element={<Product />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;


