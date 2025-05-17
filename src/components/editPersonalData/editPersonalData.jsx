import React from 'react';
import SmallInputField from "../small inputField/SmallInputField";
import InputField from "../inputField/InputField";
import clsx from "clsx";
import Button from "../button/Button";
import editPersonalStyles from "./editPersonalData.module.css";

const EditPersonalData = ({ userData, onCancel }) => {
    return (
        <div>
            <form>
                <div className={editPersonalStyles.nameAndSurname}>
                    <SmallInputField
                        label="Імʼя"
                        type="text"
                        name="firstName"
                        id="firstName"
                        wrapperClass={editPersonalStyles.firstInput}
                    />
                    <SmallInputField
                        label="Прізвище"
                        type="text"
                        name="lastName"
                        id="lastName"
                        wrapperClass={editPersonalStyles.firstInput}
                    />
                </div>
                <InputField
                    label="Телефон"
                    type="text"
                    name="phone"
                    id="phone"
                    wrapperClass={editPersonalStyles.firstInput}
                />

                <InputField
                    label="E-mail"
                    type="email"
                    name="email"
                    id="email"
                    wrapperClass={editPersonalStyles.firstInput}
                />
                <InputField
                    label="Пароль"
                    type="password"
                    name="password"
                    id="password"
                    wrapperClass={editPersonalStyles.secondInput}
                />
                <div className={clsx(editPersonalStyles.textButtonWrapper)}>
                    <Button>Зберегти</Button>
                    <Button onClick={onCancel}>Скасувати</Button>
                </div>
            </form>
        </div>
    );
};

export default EditPersonalData;