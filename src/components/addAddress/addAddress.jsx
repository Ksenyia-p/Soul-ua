import React from 'react';
import editPersonalStyles from "../editPersonalData/editPersonalData.module.css";
import SmallInputField from "../small inputField/SmallInputField";
import Button from "../button/Button";
import { useState } from "react";
import { db, auth } from "../../FirebaseConfigs/FirebaseConfigs";
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const AddAddress = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        region: "",
        city: "",
        phone: "",
        postNumber: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAddress = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const userAddressesRef = collection(db, "users", user.uid, "addresses");

        try {
            await addDoc(userAddressesRef, formData);
            console.log("Адресу додано успішно!");
            onSuccess();
        } catch (error) {
            console.error("Помилка при збереженні адреси:", error);
        }
    };

    return (
        <div>
            <form className={editPersonalStyles.form}>
                <div className={editPersonalStyles.nameAndSurname}>
                    <SmallInputField
                        label="Імʼя"
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={handleChange}
                        wrapperClass={editPersonalStyles.firstInput}
                    />
                    <SmallInputField
                        label="Прізвище"
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={handleChange}
                        wrapperClass={editPersonalStyles.firstInput}
                    />
                </div>
                <div className={editPersonalStyles.nameAndSurname}>
                    <SmallInputField
                        label="Область"
                        type="text"
                        name="region"
                        id="region"
                        onChange={handleChange}
                        wrapperClass={editPersonalStyles.firstInput}
                    />
                    <SmallInputField
                        label="Місто"
                        type="text"
                        name="city"
                        id="city"
                        onChange={handleChange}
                        wrapperClass={editPersonalStyles.firstInput}
                    />
                </div>
                <div className={editPersonalStyles.nameAndSurname}>
                    <SmallInputField
                        label="Номер телефону"
                        type="text"
                        name="phone"
                        id="phone"
                        onChange={handleChange}
                        wrapperClass={editPersonalStyles.firstInput}
                    />
                    <SmallInputField
                        label="Нова пошта"
                        type="text"
                        name="postNumber"
                        id="postNumber"
                        onChange={handleChange}
                        wrapperClass={editPersonalStyles.firstInput}
                    />
                </div>
                <Button onClick={handleAddAddress}>ДОДАТИ АДРЕСУ</Button>
            </form>
        </div>
    );
};

export default AddAddress;