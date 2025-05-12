import React, {useState} from 'react';
import Header from "../../components/header/Header";
import Way from "../../components/way/Way";
import Footer from "../../components/footer/Footer";
import loginStyles from "./LogIn.module.css";
import Button from "../../components/button/Button";
import clsx from "clsx";
import InputField from "../../components/inputField/InputField";
import {useNavigate} from 'react-router-dom';




const LogIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shakeEmail, setShakeEmail] = useState(false);
    const [shakePassword, setShakePassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        // Дані для заглушки
        const testEmail = "debil@gmail.com";
        const testPassword = "123456";

        const isEmailValid = email === testEmail;
        const isPasswordValid = password === testPassword;

        if (isEmailValid && isPasswordValid) {
            navigate("/account");
        } else {

            if (!isEmailValid && !isPasswordValid) {
                setShakeEmail(true);
                setShakePassword(true);
                setTimeout(() => setShakeEmail(false), 300);
                setTimeout(() => setShakePassword(false), 300);
            } else if (!isEmailValid) {
                setShakeEmail(true);
                setTimeout(() => setShakeEmail(false), 300);
            } else if (!isPasswordValid) {
                setShakePassword(true);
                setTimeout(() => setShakePassword(false), 300);
            }

        }
    };



    function RegisterClick(event) {
        event.preventDefault();
        navigate("/login/registration");
    }


    return (
        <div>
            <Header />
            <Way>Авторизація</Way>
            <div className={loginStyles.container}>
                <div className={loginStyles.contentWrapper}>
                    <h2 className={clsx(loginStyles.h2, "h2-light")}>Авторизація</h2>
                    <form action="/login" method={"POST"}>
                        <InputField label="Логін" type="text" name="text" id="text" onChange={(e) => setEmail(e.target.value)} wrapperClass={loginStyles.firstInput} animationClass={shakeEmail ? loginStyles.shake : ""} />

                        <InputField label="Пароль" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} wrapperClass={loginStyles.secondInput} animationClass={shakePassword ? loginStyles.shake : ""}>
                            <div className={loginStyles.forgotPassword}>
                                <a href="#" className="h3-light">Забули Пароль ?</a>
                            </div>
                        </InputField>

                        <div className={clsx(loginStyles.textButtonWrapper)}>
                            <div className={loginStyles.registerInvite}>
                                <p className={"h3-light"}>Це ваш перший візит ?</p>
                                <a href="#" onClick={RegisterClick}><h3>Зареєструватися</h3></a>
                            </div>
                           <Button onClick={handleLogin}>Увійти</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LogIn;