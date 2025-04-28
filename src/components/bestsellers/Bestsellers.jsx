import React, { useState, useEffect } from 'react';
import styles from './Bestsellers.module.css';

import Photo1 from '../../images/photo-1.JPG';
import Photo2 from '../../images/photo-2.JPG';
import Photo3 from '../../images/photo-3.JPG';
import Favorite from '../../icons/favorite.svg';
import FavoriteFilled from '../../icons/full-favorite.svg';
import Arrow from '../../icons/arrow.svg';

const Bestsellers = () => {
    const products = [
        { name: 'Футболка OVERSIZED', price: '750 UAH', imgSrc: Photo1 },
        { name: 'Рашгард', price: '750 UAH', imgSrc: Photo2 },
        { name: 'Худі STANDART', price: '1350 UAH', imgSrc: Photo3 },
        { name: 'Товар без фото', price: '700 UAH', imgSrc: null },
        { name: 'Товар без фото', price: '900 UAH', imgSrc: null },
        { name: 'Товар без фото', price: '600 UAH', imgSrc: null },
    ];

    const [favorites, setFavorites] = useState(Array(products.length).fill(false));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [maskUrl, setMaskUrl] = useState('/masks/corner-mask-2560px-1440px.svg');
    const [visibleCount, setVisibleCount] = useState(8);

    useEffect(() => {
        const updateResponsiveSettings = () => {
            const width = window.innerWidth;

            if (width >= 2560) {
                setMaskUrl('/masks/corner-mask-2560px-1440px.svg');
                setVisibleCount(6);
            }
            else if (width >= 1440) {
                setMaskUrl('/masks/corner-mask-2560px-1440px.svg');
                setVisibleCount(4);
            }
            else if (width >= 1024) {
                setMaskUrl('/masks/corner-mask-1024px.svg');
                setVisibleCount(3);
            }
            else if (width >= 768) {
                setMaskUrl('/masks/corner-mask-768px.svg');
                setVisibleCount(3);
            }
            else if (width >= 425) {
                setMaskUrl('/masks/corner-mask-375px.svg');
                setVisibleCount(2);
            }
            else if (width >= 375) {
                setMaskUrl('/masks/corner-mask-375px.svg');
                setVisibleCount(2);
            }
            else if (width >= 320) {
                setMaskUrl('/masks/corner-mask-320px.svg');
                setVisibleCount(1);
            }
        };

        updateResponsiveSettings();
        window.addEventListener('resize', updateResponsiveSettings);

        return () => window.removeEventListener('resize', updateResponsiveSettings);
    }, []);

    const toggleFavorite = (index) => {
        const updatedFavorites = [...favorites];
        updatedFavorites[index] = !updatedFavorites[index];
        setFavorites(updatedFavorites);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const visibleProducts = products
        .slice(currentIndex, currentIndex + visibleCount)
        .concat(
            currentIndex + visibleCount > products.length
                ? products.slice(0, (currentIndex + visibleCount) % products.length)
                : []
        );

    return (
        <div className={styles.wrapper}>
            <div className={styles.sideTextLeft}>
                <h1>BESTSELLERS</h1>
            </div>

            <section className={styles.section}>
                <div className={styles.text}>
                    <h4>ГОРТАЙ</h4>
                </div>

                <div className={styles.content}>
                    <div className={styles.leftArrow} onClick={handlePrev}>
                        <img src={Arrow} alt="Previous" />
                    </div>

                    <div className={styles.cards}>
                        {visibleProducts.map((product, i) => (
                            <div key={(currentIndex + i) % products.length} className={styles.card}>
                                <div className={styles.maskWrapper}>
                                    {product.imgSrc ? (
                                        <img
                                            src={product.imgSrc}
                                            alt={product.name}
                                            className={styles.imageWithMask}
                                            style={{
                                                WebkitMaskImage: `url(${maskUrl})`,
                                                WebkitMaskRepeat: 'no-repeat',
                                                WebkitMaskSize: 'cover',
                                                maskImage: `url(${maskUrl})`,
                                                maskRepeat: 'no-repeat',
                                                maskSize: 'cover',
                                            }}
                                        />
                                    ) : (
                                        <div className={styles.placeholder}>No Image</div>
                                    )}
                                    <button
                                        className={styles.favoriteButton}
                                        onClick={() => toggleFavorite((currentIndex + i) % products.length)}
                                    >
                                        <img
                                            src={
                                                favorites[(currentIndex + i) % products.length]
                                                    ? FavoriteFilled
                                                    : Favorite
                                            }
                                            alt="Favorite"
                                            className={styles.favoriteIcon}
                                        />
                                    </button>
                                </div>

                                <div className={styles.info}>
                                    <h3>{product.name}</h3>
                                    <h3>{product.price}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.rightArrow} onClick={handleNext}>
                        <img src={Arrow} alt="Next" />
                    </div>
                </div>
            </section>

            <div className={styles.sideTextRight}>
                <h1>BESTSELLERS</h1>
            </div>
        </div>
    );
};

export default Bestsellers;
