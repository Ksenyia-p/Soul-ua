import React, { useEffect, useState } from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useParams } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../FirebaseConfigs/FirebaseConfigs';
import styles from './Product.module.css';
import Way from '../../components/way/Way';
import FavoriteFilled from "../../icons/full-favorite.svg";
import Favorite from "../../icons/favorite.svg";
import ColourIcon from '../../components/colourIcon/ColourIcon';
import Button from "../../components/button/Button";

const Product = ({ isFavorite, onToggleFavorite, wishlistMode = false }) => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedColorKey, setSelectedColorKey] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'catalog'));
                const productDoc = querySnapshot.docs.find(doc => doc.data().slug === slug);
                if (productDoc) {
                    const data = { id: productDoc.id, ...productDoc.data() };
                    setProduct(data);
                    const firstColorKey = Object.keys(data.colors)[0];
                    setSelectedColorKey(firstColorKey);
                } else {
                    setProduct(null);
                }
                setLoading(false);
            } catch (error) {
                console.error("Помилка при завантаженні товару:", error);
            }
        };

        fetchProduct();
    }, [slug]);

    const handleColorChange = (colorKey) => {
        setSelectedColorKey(colorKey);
        setSelectedSize('');
    };

    const selectedColor = selectedColorKey && product?.colors?.[selectedColorKey];
    const icon = isFavorite ? FavoriteFilled : Favorite;

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
                            <img key={index} src={url.trim()} alt={`${product.name} ${index + 1}`} />
                        ))}
                    </div>
                    <div className={styles.text}>
                        <h2>{product.name}</h2>
                        <div className={styles.priceFavorite}>
                            <h3>{product.price}</h3>
                            <button
                                className={styles.favoriteButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleFavorite();
                                }}
                            >
                                <img
                                    src={icon}
                                    alt="Favorite"
                                    className={styles.favoriteIcon}
                                />
                            </button>
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
                                        const isSelected = selectedSize === size;
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
                    </div>
                </div>
            ) : (
                <h3>Товар не знайдено.</h3>
            )}
            <Footer />
        </div>
    );
};

export default Product;
