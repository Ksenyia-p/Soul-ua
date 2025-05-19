import React, { useEffect, useState } from 'react';
import Header from "../../components/header/Header";
import Layout from "../../components/layout/Layout";
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../FirebaseConfigs/FirebaseConfigs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import styles from './Product.module.css';
import Way from '../../components/way/Way';
import Favorite from "../../components/favorite/Favorite";
import ColourIcon from '../../components/colourIcon/ColourIcon';
import Button from "../../components/button/Button";
import FullScreenPhoto from "../../components/full screen photo/FullScreenPhoto";

const Product = ({ wishlistMode = false }) => {
    const { slug, color } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedColorKey, setSelectedColorKey] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [fullscreenIndex, setFullscreenIndex] = useState(null);
    const [sizeError, setSizeError] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            // Наразі логіка кошика підтримує неавторизованих користувачів
        });
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'catalog'));
                const productDoc = querySnapshot.docs.find(doc => doc.data().slug === slug);
                if (productDoc) {
                    const data = { id: productDoc.id, ...productDoc.data() };
                    setProduct(data);

                    const firstColorKey = Object.keys(data.colors)[0];
                    const matchedColorKey = color && data.colors[color]
                        ? color
                        : Object.keys(data.colors).find(key => slug.includes(key)) || firstColorKey;

                    setSelectedColorKey(matchedColorKey);

                    const passedSize = searchParams.get('size');
                    setSelectedSize(passedSize || '');

                } else {
                    setProduct(null);
                }
                setLoading(false);
            } catch (error) {
                console.error("Помилка при завантаженні товару:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug, color]);


    const handleColorChange = (colorKey) => {
        setSelectedColorKey(colorKey);
        setSelectedSize('');
        navigate(`/${product.group}/${product.items}/${slug}/${colorKey}`);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            setSizeError(true);
            return;
        }

        setSizeError(false);

        const selectedColor = product?.colors?.[selectedColorKey];
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            size: selectedSize,
            color: selectedColorKey,
            colorName: selectedColor?.colorName || '',
            image: selectedColor?.images?.[0] || '',
            slug: product.slug,
            group: product.group,
            items: product.items,
            quantity: 1
        };

        const cartData = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItemIndex = cartData.findIndex(item =>
            item.id === cartItem.id &&
            item.color === cartItem.color &&
            item.size === cartItem.size
        );

        if (existingItemIndex !== -1) {
            cartData[existingItemIndex].quantity += 1;
        } else {
            cartData.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cartData));

        window.dispatchEvent(new Event('openShoppingBag'));
    };


    const selectedColor = selectedColorKey && product?.colors?.[selectedColorKey];
    const isColorOutOfStock = selectedColor &&
        Object.values(selectedColor.sizes || {}).every(qty => qty === 0);
    const isSelectedSizeUnavailable = selectedSize &&
        selectedColor?.sizes?.[selectedSize] === 0;

    const buttonText = isColorOutOfStock || isSelectedSizeUnavailable
        ? 'Повідомити про наявність'
        : 'Додати в кошик';

    return (
        <div className={styles.product}>
            <Header />
            <Way>{loading ? 'Завантаження...' : (product ? product.name : 'Товар не знайдено')}</Way>

            {loading ? (
                <h3>Завантаження...</h3>
            ) : product ? (
                <div className={styles.content}>
                    <div className={styles.photos}>
                        {selectedColor?.images?.map((url, index) => (
                            <img
                                key={index}
                                src={url.trim()}
                                alt={`${product.name} ${index + 1}`}
                                onClick={() => setFullscreenIndex(index)}
                                style={{ cursor: 'zoom-in' }}
                            />
                        ))}
                    </div>

                    <div className={styles.text}>
                        <div className={styles.namePrice}>
                            <div className={styles.nameFavorite}>
                                <h2>{product.name}</h2>
                                <div className={styles.favoriteWrapper}>
                                    <Favorite
                                        product={{
                                            id: product.id,
                                            slug: product.slug,
                                            name: product.name,
                                            price: product.price,
                                            mainImage: selectedColor?.images?.[0] || '',
                                            group: product.group,
                                            items: product.items,
                                            color: selectedColorKey
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="h3-light">{product.price} UAH</div>
                        </div>

                        <div className={styles.color}>
                            <h3><strong>Колір:</strong> {selectedColor?.colorName}</h3>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                {product.colors && Object.entries(product.colors).map(([key, colorData]) => (
                                    <ColourIcon
                                        key={key}
                                        color={colorData.hex}
                                        onClick={() => handleColorChange(key)}
                                        isActive={selectedColorKey === key}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={styles.size}>
                            <h3><strong>Розмір:</strong></h3>
                            <div className={styles.sizeList}>
                                {selectedColor &&
                                    ['S', 'M', 'L'].map(size => {
                                        const available = selectedColor.sizes[size];
                                        if (available === undefined) return null;
                                        return (
                                            <button
                                                key={size}
                                                onClick={() => {
                                                    setSelectedSize(size);
                                                    setSizeError(false);
                                                }}
                                                className={`${styles.sizeButton}
                                                    ${available === 0 ? styles.sizeUnavailable : ''}
                                                    ${selectedSize === size ? styles.sizeSelected : ''}`}
                                            >
                                                {size}
                                            </button>
                                        );
                                    })}
                            </div>
                            {sizeError && <h3 className={styles.validationError}>Оберіть розмір</h3>}
                        </div>

                        <Button type="button" onClick={handleAddToCart}>
                            {buttonText}
                        </Button>

                        <div className={styles.description}>
                            <div className="h3-bold">Опис</div>
                            <h4>Lorem ipsum dolor sit amet consectetur. Fringilla sed augue nunc in id a convallis. Sit cras eu adipiscing ut parturient. In dignissim magna massa </h4>
                        </div>

                        <div className={styles.care}>
                            <div className="h3-bold">Склад та догляд</div>
                            <h4>Lorem ipsum dolor sit amet consectetur. Fringilla sed augue nunc in id a convallis. Sit cras eu adipiscing ut parturient. In dignissim magna massa </h4>
                        </div>
                    </div>
                </div>
            ) : (
                <h3>Товар не знайдено.</h3>
            )}

            <Layout />

            {fullscreenIndex !== null && (
                <FullScreenPhoto
                    images={selectedColor?.images || []}
                    startIndex={fullscreenIndex}
                    onClose={() => setFullscreenIndex(null)}
                />
            )}
        </div>
    );
};

export default Product;
