import React, { useEffect, useState } from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useParams, useNavigate } from 'react-router-dom';
import { getDocs, collection, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
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
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedColorKey, setSelectedColorKey] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [fullscreenIndex, setFullscreenIndex] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });
        return () => unsubscribe();
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

                    if (userId) {
                        const favDoc = await getDoc(doc(db, 'users', userId, 'wishlist', data.id));
                        setIsFavorite(favDoc.exists());
                    }
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
    }, [slug, userId]);

    useEffect(() => {
        if (product && color && product.colors[color]) {
            setSelectedColorKey(color);
            setSelectedSize('');
        }
    }, [color, product]);

    const handleColorChange = (colorKey) => {
        setSelectedColorKey(colorKey);
        setSelectedSize('');
        navigate(`/${product.group}/${product.items}/${slug}/${colorKey}`);
    };

    const selectedColor = selectedColorKey && product?.colors?.[selectedColorKey];

    const isColorOutOfStock = selectedColor &&
        Object.values(selectedColor.sizes || {}).every(qty => qty === 0);

    const isSelectedSizeUnavailable = selectedSize &&
        selectedColor?.sizes?.[selectedSize] === 0;

    const buttonText = isColorOutOfStock || isSelectedSizeUnavailable
        ? 'Повідомити про наявність'
        : 'Додати в кошик';

    const toggleFavorite = async () => {
        if (!userId || !product) {
            alert('Щоб додати у вішліст, увійдіть у свій акаунт');
            return;
        }

        const favoriteRef = doc(db, 'users', userId, 'wishlist', product.id);

        try {
            if (isFavorite) {
                await deleteDoc(favoriteRef);
                setIsFavorite(false);
            } else {
                await setDoc(favoriteRef, {
                    productId: product.id,
                    slug: product.slug,
                    color: selectedColorKey,
                    timestamp: new Date()
                });
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Помилка при оновленні вішлісту:', error);
        }
    };

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
                                    <Favorite isFavorite={isFavorite} onClick={toggleFavorite} />
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
                                                onClick={() => setSelectedSize(size)}
                                                className={`${styles.sizeButton}
                                                    ${available === 0 ? styles.sizeUnavailable : ''}
                                                    ${selectedSize === size ? styles.sizeSelected : ''}`}
                                            >
                                                {size}
                                            </button>
                                        );
                                    })}
                            </div>
                            <div className={styles.textButton}>
                                <div className="h3-underlined">Розмірна сітка</div>
                            </div>
                        </div>

                        <Button type="button">
                            {buttonText}
                        </Button>

                        <div className={styles.description}>
                            <div className="h3-bold">Опис</div>
                            <h4>Lorem ipsum dolor sit amet consectetur. Fringilla sed augue nunc in id a convallis. Sit cras eu adipiscing ut parturient. In dignissim magna massa </h4>
                        </div>

                        <div className={styles.care}>
                            <div className="h3-bold">Склад та догляд</div>
                            <h4>Lorem ipsum dolor sit amet consectetur. Fringilla sed augue nunc in id a convallis. Sit cras eu adipiscing </h4>
                        </div>
                    </div>
                </div>
            ) : (
                <h3>Товар не знайдено.</h3>
            )}

            <Footer />

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
