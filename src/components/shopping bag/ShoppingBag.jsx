import React, { useEffect, useState } from 'react';
import styles from './ShoppingBag.module.css';
import Cross from '../../icons/cross.svg';
import Button from "../button/Button";
import QuantitySelector from "../../components/quantity selector/QuantitySelector";
import { Link, useNavigate } from "react-router-dom";
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../FirebaseConfigs/FirebaseConfigs';



const ShoppingBag = ({ active, setActive }) => {
    const [cartItems, setCartItems] = useState([]);
    const [availableItems, setAvailableItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, [active]);

    useEffect(() => {
        if (active) {
            document.body.classList.add('bodyLock');
        } else {
            document.body.classList.remove('bodyLock');
        }

        return () => {
            document.body.classList.remove('bodyLock');
        };
    }, [active]);

    const handleDelete = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (index, newQty) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity = newQty;
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
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

    const updateCart = (updated) => {
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
        fetchAvailability(updated);
    };

    const handleRemove = (index) => {
        const updated = [...cartItems];
        updated.splice(index, 1);
        updateCart(updated);
    };

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <div
                className={`${styles.overlay} ${active ? styles.activeOverlay : ''}`}
                onClick={() => setActive(false)}
            />

            <div className={`${styles.shoppingBag} ${active ? styles.active : ''}`}>
                <div className={styles.upperRectangleContainer}>
                    <div className={styles.upperRectangle}>
                        <h2>Кошик</h2>
                        <button className={styles.closeButton} onClick={() => setActive(false)}>
                            <img src={Cross} alt="Закрити"/>
                        </button>
                    </div>
                </div>

                <div className={styles.cartItemsContainer}>
                    {cartItems.map((item, index) => {
                        const available = availableItems.some(av =>
                            av.id === item.id &&
                            av.color === item.color &&
                            av.size === item.size
                        );

                        return (
                            <div key={index} className={styles.cartItem}>
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
                                        <h3 className={styles.colorSize}>
                                            {item.colorName || item.color} <h2 className="h2-light">|</h2> {item.size}
                                        </h3>
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
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={styles.bottomRectangleContainer}>
                    <div className={styles.bottomRectangle}>
                        <div className={styles.textContainer}>
                            <div className={styles.text}>
                                <h3>Підсумок</h3>
                                <h3>{totalQuantity} позицій</h3>
                            </div>
                            <h3>{totalPrice} UAH</h3>
                        </div>
                        <Link to="/delivery" className={styles.buttonShoppingBag}>
                            <Button type="button" disabled={cartItems.length === 0}>
                                переглянути та оплатити
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShoppingBag;
