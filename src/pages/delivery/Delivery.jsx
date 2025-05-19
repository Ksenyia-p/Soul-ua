import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Layout from '../../components/layout/Layout';
import Way from '../../components/way/Way';
import InputField from '../../components/inputField/InputField';
import SmallInputField from '../../components/small inputField/SmallInputField';
import QuantitySelector from "../../components/quantity selector/QuantitySelector";
import styles from './Delivery.module.css';
import Cross from '../../icons/cross.svg';
import Button from '../../components/button/Button';
import {Link} from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../FirebaseConfigs/FirebaseConfigs';

const Delivery = () => {
    const [cartItems, setCartItems] = useState([]);
    const [availableItems, setAvailableItems] = useState([]);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [delivery, setDelivery] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [shakeFirstName, setShakeFirstName] = useState(false);
    const [shakeLastName, setShakeLastName] = useState(false);
    const [shakeRegion, setShakeRegion] = useState(false);
    const [shakeCity, setShakeCity] = useState(false);
    const [shakeDelivery, setShakeDelivery] = useState(false);
    const [shakeEmail, setShakeEmail] = useState(false);
    const [shakePhone, setShakePhone] = useState(false);

    const fetchAvailability = async (items) => {
        const available = [];

        for (const item of items) {
            const productRef = doc(db, 'catalog', item.id);
            const snap = await getDoc(productRef);

            if (snap.exists()) {
                const product = snap.data();
                const colorData = product.colors?.[item.color];
                const availableQty = colorData?.sizes?.[item.size] ?? 0;

                available.push({
                    ...item,
                    maxQuantity: availableQty,
                    isAvailable: availableQty >= item.quantity,
                });
            }
        }

        setAvailableItems(available);
    };


    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
        fetchAvailability(cart);
    }, []);

    const updateCart = (updated) => {
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
        fetchAvailability(updated);
    };

    const handleQuantityChange = (index, delta) => {
        const updated = [...cartItems];
        updated[index].quantity += delta;

        if (updated[index].quantity <= 0) {
            updated.splice(index, 1);
        }

        updateCart(updated);
    };

    const handleRemove = (index) => {
        const updated = [...cartItems];
        updated.splice(index, 1);
        updateCart(updated);
    };

    const handleConfirm = () => {
        const hasEmpty = !firstName || !lastName || !region || !city || !delivery || !email || !phone;

        if (hasEmpty) {
            setShakeFirstName(!firstName);
            setShakeLastName(!lastName);
            setShakeRegion(!region);
            setShakeCity(!city);
            setShakeDelivery(!delivery);
            setShakeEmail(!email);
            setShakePhone(!phone);

            setTimeout(() => setShakeFirstName(false), 300);
            setTimeout(() => setShakeLastName(false), 300);
            setTimeout(() => setShakeRegion(false), 300);
            setTimeout(() => setShakeCity(false), 300);
            setTimeout(() => setShakeDelivery(false), 300);
            setTimeout(() => setShakeEmail(false), 300);
            setTimeout(() => setShakePhone(false), 300);
            return;
        }

        // TODO: реалізувати логіку підтвердження замовлення
        alert('Замовлення підтверджено!');
    };
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className={styles.delivery}>
            <Header/>
            <Way>Доставка</Way>

            {cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                    <h2>Ви ще не додали жодного товару</h2>
                    <Link to="/catalog" className={styles.buttonDeliveryWithoutItems}>
                        <Button type="button">перейти до покупок</Button>
                    </Link>
                </div>
            ) : (
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.text}>
                            <h2>Огляд замовлення</h2>
                            <h3>В твоєму кошику</h3>
                        </div>
                        <div className={styles.cart}>
                            {cartItems.map((item, index) => {
                                const available = availableItems.some(av =>
                                    av.id === item.id &&
                                    av.color === item.color &&
                                    av.size === item.size
                                );

                                return (
                                    <div key={index}>
                                        <div className={styles.cartItem}>
                                            <div
                                                className={styles.photo}
                                                onClick={() => navigate(`/${item.group}/${item.items}/${item.slug}/${item.color}?size=${item.size}`)}
                                                style={{cursor: 'pointer'}}
                                            >
                                                <img src={item.image} alt={item.name}/>
                                            </div>

                                            <div className={styles.itemInfoClose}>
                                                <div className={styles.itemInfo}>
                                                    <h3>{item.name}</h3>
                                                    <h3 className={styles.colorSize}>{item.colorName || item.color}
                                                        <h2 className="h2-light">|</h2>{item.size}</h3>
                                                    <div className={styles.quantity}>
                                                        <QuantitySelector
                                                            quantity={item.quantity}
                                                            maxQuantity={
                                                                availableItems.find(
                                                                    (av) => av.id === item.id &&
                                                                        av.color === item.color &&
                                                                        av.size === item.size
                                                                )?.maxQuantity || 1
                                                            }

                                                            onChange={(newQty) => {
                                                                const updated = [...cartItems];
                                                                updated[index].quantity = newQty;
                                                                updateCart(updated);
                                                            }}
                                                        />
                                                    </div>
                                                    <h3>{item.price * item.quantity} UAH</h3>
                                                </div>
                                                <button className={styles.closeButton}
                                                        onClick={() => handleRemove(index)}>
                                                    <img src={Cross} alt="Видалити"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.leftSecond}>
                            <div className={styles.textLeftSecond}>
                                <h2>Підсумок</h2>
                                <h3>{totalPrice} UAH</h3>
                            </div>

                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.deliveryDetails}>
                            <h2>Доставити</h2>
                            <div className={styles.nameAndSurname}>
                                <SmallInputField
                                    label="Імʼя"
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    animationClass={shakeFirstName ? styles.shake : ""}
                                />
                                <SmallInputField
                                    label="Прізвище"
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    onChange={(e) => setLastName(e.target.value)}
                                    animationClass={shakeLastName ? styles.shake : ""}
                                />
                            </div>
                            <div className={styles.regionAndCity}>
                                <SmallInputField
                                    label="Область"
                                    type="text"
                                    name="region"
                                    id="region"
                                    onChange={(e) => setRegion(e.target.value)}
                                    animationClass={shakeRegion ? styles.shake : ""}
                                />
                                <SmallInputField
                                    label="Місто"
                                    type="text"
                                    name="city"
                                    id="city"
                                    onChange={(e) => setCity(e.target.value)}
                                    animationClass={shakeCity ? styles.shake : ""}
                                />
                            </div>
                            <InputField
                                label="Нова пошта"
                                type="text"
                                name="delivery"
                                id="delivery"
                                onChange={(e) => setDelivery(e.target.value)}
                                animationClass={shakeDelivery ? styles.shake : ""}
                            />
                        </div>

                        <div className={styles.contactInfo}>
                            <h2>Контактна інформація</h2>
                            <InputField
                                label="E-mail"
                                type="email"
                                name="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                animationClass={shakeEmail ? styles.shake : ""}
                            />
                            <InputField
                                label="Номер телефону"
                                type="text"
                                name="phone"
                                id="phone"
                                onChange={(e) => setPhone(e.target.value)}
                                animationClass={shakePhone ? styles.shake : ""}
                            />
                        </div>
                        <div className={styles.buttonForPayment}>
                            <Button type="button">перейти до оплати</Button>
                        </div>
                    </div>
                </div>
            )}
            <Layout/>
        </div>
    );
};

export default Delivery;
