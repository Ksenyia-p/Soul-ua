import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './pages/main/Main';
import Menu from './components/menu/Menu';
import Wishlist from './pages/wishlist/Wishlist';
import ShoppingBag from './components/shopping bag/ShoppingBag';
import PersonalData from "./pages/personal data/PersonalData";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/wishlist" element={<Wishlist/>}/>
                <Route path="/main" element={<Main/>}/>
                <Route path="/shoppingback" element={<ShoppingBag/>}/>
                <Route path="/account" element={<PersonalData/>}/>

            </Routes>
        </BrowserRouter>
    );
};

export default App;


