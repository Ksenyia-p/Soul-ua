import React, {useEffect, useState} from 'react';
import Header from "../../components/header/Header";
import Way from "../../components/way/Way";
import Layout from "../../components/layout/Layout";
import SideBar from "../../components/sideBar/sideBar";
import clsx from "clsx";
import stylesPersonal from "../personal data/PersonalData.module.css";
import Button from "../../components/button/Button";
import {doc, getDoc} from "firebase/firestore";
import {collection, getDocs} from "firebase/firestore";
import {db, auth} from "../../FirebaseConfigs/FirebaseConfigs";
import AddAddress from "../../components/addAddress/addAddress";
import {onAuthStateChanged} from "firebase/auth";

const DeliveryAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                const userAddressesRef = collection(db, "users", firebaseUser.uid, "addresses");
                const snapshot = await getDocs(userAddressesRef);
                const addressesData = snapshot.docs.map(doc => doc.data());
                setAddresses(addressesData);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleShowForm = () => setShowForm(true);


    return (
        <div>
            <Header/>
            <Way>Адреса доставки</Way>
            <Layout>
                <SideBar>
                    <div className={clsx(stylesPersonal.dataWrapper)}>

                        {showForm ? (
                            <AddAddress onSuccess={() => setShowForm(false)}/>
                        ) : (
                            <>
                                {addresses.length === 0 ? (
                                    <>
                                        <div className={clsx(stylesPersonal.noAddressWrapper)}>
                                            <h2 className={stylesPersonal.noAddress}>Ви ще не додали<br/>адресу доставки
                                            </h2>
                                            <Button onClick={handleShowForm}>Додати</Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2>Типова адреса</h2>
                                        <div className={clsx(stylesPersonal.listWrapper)}>
                                            <ul className={clsx(stylesPersonal.list)}>
                                                <li>
                                                    <div><h3>Прізвище: {addresses[0].lastName}</h3></div>
                                                    <div><h3>Ім'я: {addresses[0].firstName}</h3></div>
                                                </li>
                                                <li>
                                                    <div><h3>Область: {addresses[0].region}</h3></div>
                                                    <div><h3>Місто: {addresses[0].city}</h3></div>
                                                </li>
                                                <li><h3>Номер телефону: {addresses[0].phone}</h3></li>
                                                <li><h3>Нова пошта №: {addresses[0].postNumber}</h3></li>
                                            </ul>
                                        </div>
                                            <Button onClick={handleShowForm}>+ Нова адреса</Button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </SideBar>
            </Layout>
        </div>
    );
};

export default DeliveryAddress;