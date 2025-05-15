import React, { useState } from 'react';
import Header from "../../components/header/Header";
import Way from "../../components/way/Way";
import Footer from "../../components/footer/Footer";
import loginStyles from "./RegistrationPage.module.css";
import Button from "../../components/button/Button";
import clsx from "clsx";
import InputField from "../../components/inputField/InputField";
import SmallInputField from "../../components/small inputField/SmallInputField";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { auth,db } from "../../FirebaseConfigs/FirebaseConfigs";
import { doc, setDoc } from "firebase/firestore";

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shakeEmail, setShakeEmail] = useState(false);
    const [shakePassword, setShakePassword] = useState(false);
    const { login } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // сброс предыдущей ошибки

        try {
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = credentials.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                firstName,
                lastName,
                phone,
                createdAt: new Date().toISOString()
            });

            login(user); // передаём объект пользователя
            navigate("/account");
        } catch (error) {
            console.error(error.code);
            let errorMessage = "Сталася помилка. Спробуйте ще раз.";

            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "Ця електронна адреса вже використовується.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Невірний формат електронної пошти.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "Пароль має містити щонайменше 6 символів.";
                    break;
                default:
                    errorMessage = "Помилка: " + error.message;
            }

            setError(errorMessage);
            setShakeEmail(true);
            setShakePassword(true);
            setTimeout(() => setShakeEmail(false), 300);
            setTimeout(() => setShakePassword(false), 300);
        }
    };



    return (
        <div>
            <Header />
            <Way>Реєстрація</Way>
            <div className={loginStyles.container}>
                <div className={loginStyles.contentWrapper}>
                    <h2 className={clsx(loginStyles.h2, "h2-light")}>Реєстрація</h2>
                    {error && <h3 className={loginStyles.errorMessage}>{error}</h3>}
                    <form>
                        <div className={loginStyles.nameAndSurname}>
                            <SmallInputField
                                label="Імʼя"
                                type="text"
                                name="firstName"
                                id="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                                wrapperClass={loginStyles.firstInput}
                            />
                            <SmallInputField
                                label="Прізвище"
                                type="text"
                                name="lastName"
                                id="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                                wrapperClass={loginStyles.firstInput}
                            />
                        </div>
                        <InputField
                            label="Телефон"
                            type="text"
                            name="phone"
                            id="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            wrapperClass={loginStyles.firstInput}
                        />

                        <InputField
                            label="E-mail"
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            wrapperClass={loginStyles.firstInput}
                            animationClass={shakeEmail ? loginStyles.shake : ""}
                        />
                        <InputField
                            label="Пароль"
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            wrapperClass={loginStyles.secondInput}
                            animationClass={shakePassword ? loginStyles.shake : ""}
                        />
                        <div className={clsx(loginStyles.textButtonWrapper)}>
                            <Button onClick={handleRegister}>Зареєструватись</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RegistrationPage;
