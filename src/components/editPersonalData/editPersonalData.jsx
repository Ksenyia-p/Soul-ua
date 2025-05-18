import React, {useState} from 'react';
import SmallInputField from "../small inputField/SmallInputField";
import InputField from "../inputField/InputField";
import clsx from "clsx";
import Button from "../button/Button";
import editPersonalStyles from "./editPersonalData.module.css";
import { auth, db } from "../../FirebaseConfigs/FirebaseConfigs";
import { doc, updateDoc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";




const EditPersonalData = ({ userData, onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        phone: userData?.phone || '',
        dob: userData?.dob || '',
        email: userData?.email || '',
        password: '',
        newPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (!user) {
            return;
        }

        try {
            const userRef = doc(db, "users", user.uid);

            await updateDoc(userRef, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                dob: formData.dob,
                email: formData.email
            });

            if (formData.email !== user.email) {
                await updateEmail(user, formData.email);
            }

            onCancel();
        } catch (err) {
            console.error("Помилка при оновленні:", err);
        }
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={editPersonalStyles.nameAndSurname}>
                    <SmallInputField
                        label="Імʼя"
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={handleChange}
                        wrapperClass={editPersonalStyles.firstInput}
                        defaultValue={formData.firstName}
                    />
                    <SmallInputField
                        label="Прізвище"
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={handleChange}
                        wrapperClass={editPersonalStyles.firstInput}
                        defaultValue={formData.lastName}
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
                        defaultValue={formData.phone}
                    />
                    <SmallInputField
                        label="Дата народження"
                        type="date"
                        name="dob"
                        id="dob"
                        onChange={handleChange}
                        defaultValue={formData.dob}
                        wrapperClass={editPersonalStyles.firstInput}
                    />
                </div>


                <InputField
                    label="E-mail"
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    defaultValue={formData.email}
                    wrapperClass={editPersonalStyles.firstInput}
                />
                <InputField
                    label="Поточний пароль"
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    wrapperClass={editPersonalStyles.secondInput}
                />

                <InputField
                    label="Новий пароль"
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    onChange={handleChange}
                    wrapperClass={editPersonalStyles.secondInput}
                />

                <div className={clsx(editPersonalStyles.textButtonWrapper)}>
                    <Button type={"submit"} >Зберегти</Button>
                    <Button onClick={onCancel}>Скасувати</Button>
                </div>
            </form>
        </div>
    );
};

export default EditPersonalData;