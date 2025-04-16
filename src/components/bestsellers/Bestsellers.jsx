import React, { useState } from 'react';
import styles from './Bestsellers.module.css';

import Photo1 from '../../images/photo-1.JPG';
import Photo2 from '../../images/photo-2.JPG';
import Photo3 from '../../images/photo-3.JPG';
import Favorite from '../../icons/favorite.svg';
import FavoriteFilled from '../../icons/full-favorite.svg';

const Bestsellers = () => {
    const [favorites, setFavorites] = useState([false, false, false, false]);

    const toggleFavorite = (index) => {
        const newFavorites = [...favorites];
        newFavorites[index] = !newFavorites[index];
        setFavorites(newFavorites);
    };

    const products = [
        { name: 'Футболка OVERSIZED', price: '750 UAH', imgSrc: Photo1 },
        { name: 'Рашгард', price: '750 UAH', imgSrc: Photo2 },
        { name: 'Худі STANDART', price: '1350 UAH', imgSrc: Photo3 },
        { name: 'Name', price: 'price', imgSrc: null }
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.sideTextLeft}>
                <h1>BESTSELLERS</h1>
            </div>

            <section className={styles.section}>
                <div className={styles.content}>
                    <div className={styles.cards}>
                        {products.map((product, i) => (
                            <div key={i} className={styles.card}>
                                <div className={styles.maskWrapper}>
                                    {product.imgSrc ? (
                                        <img
                                            src={product.imgSrc}
                                            alt={product.name}
                                            className={styles.imageWithMask}
                                            style={{
                                                WebkitMaskImage: 'url(/masks/corner-mask.svg)',
                                                WebkitMaskRepeat: 'no-repeat',
                                                WebkitMaskSize: 'cover',
                                                maskImage: 'url(/masks/corner-mask.svg)',
                                                maskRepeat: 'no-repeat',
                                                maskSize: 'cover',
                                            }}
                                        />
                                    ) : (
                                        <div className={styles.placeholder}>
                                            no image
                                        </div>
                                    )}

                                    <button
                                        className={styles.favoriteButton}
                                        onClick={() => toggleFavorite(i)}
                                    >
                                        <img
                                            src={favorites[i] ? FavoriteFilled : Favorite}
                                            alt="favorite"
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
                </div>
            </section>

            <div className={styles.sideTextRight}>
                <h1>BESTSELLERS</h1>
            </div>
        </div>
    );
};

export default Bestsellers;
