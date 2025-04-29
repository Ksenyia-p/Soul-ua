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


const App = () => {
    const [items, setItems] = useState([]);
    const [groups, setGroups] = useState([]);

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
                {items.map((item) => (
                    <Route
                        key={item.id}
                        path={`/${item.group}/${item.slug}`}
                        element={<AssortmentPage group={item.group} slug={item.slug} />}
                    />
                ))}
                {groups.map((group) => (
                    <Route
                        key={group.id}
                        path={`/${group.slug}`}
                        element={<Assortment group={group.slug} />}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
};

export default App;


