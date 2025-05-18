import React, {useEffect, useState} from 'react';
import Header from "../../components/header/Header";
import Way from "../../components/way/Way";
import Layout from "../../components/layout/Layout";
import stylesPersonal from "./PersonalData.module.css";
import SideBar from "../../components/sideBar/sideBar";
import clsx from "clsx";
import Button from "../../components/button/Button";
import {auth, db} from "../../FirebaseConfigs/FirebaseConfigs";
import {doc, getDoc} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
import EditPersonalData from "../../components/editPersonalData/editPersonalData";
import {useNavigate} from "react-router-dom";

const PersonalData = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        setUserData(userSnap.data());
                    } else {
                        setError("Користувача не знайдено в базі");
                    }
                } catch (err) {
                    console.error("Помилка отримання користувача:", err);
                    setError("Помилка при отриманні даних");
                }
            } else {
                setError("Користувач не авторизований");
                navigate('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <div>
            <Header/>
            <Way>Особистий кабінет</Way>

            <Layout>
                <SideBar>
                    <div className={clsx(stylesPersonal.dataWrapper)}>
                        <h2>Особисті дані</h2>

                        {loading && <h3 className={stylesPersonal.h3Download}>Завантаження...</h3>}
                        {error && <p style={{color: "red"}}>{error}</p>}


                        {!loading && !error && userData && (
                            isEditing ? (
                                <EditPersonalData userData={userData} onCancel={() => setIsEditing(false)} />
                            ) : (
                                <>
                                    <div className={clsx(stylesPersonal.listWrapper)}>
                                        <ul className={clsx(stylesPersonal.list)}>
                                            <li>
                                                <div><h3>Прізвище: {userData.lastName}</h3></div>
                                                <div><h3>Ім'я: {userData.firstName}</h3></div>
                                            </li>
                                            <li><h3>Номер телефону: {userData.phone}</h3></li>
                                            <li><h3>E-mail: {userData.email}</h3></li>
                                        </ul>
                                    </div>
                                    <Button onClick={() => setIsEditing(true)}>
                                        Змінити
                                    </Button>
                                </>
                            )
                        )}

                    </div>
                </SideBar>
            </Layout>
        </div>
    );
};

export default PersonalData;