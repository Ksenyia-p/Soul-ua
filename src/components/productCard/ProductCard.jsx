import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

import Favorite from "../favorite/Favorite";

const ProductCard = ({
                         product,
                         maskUrl,
                         wishlistMode = false,
                     }) => {
    return (
        <div className={styles.card}>
            <div className={styles.maskWrapper}>
                <Link to={product.link}>
                    {product.imgSrc ? (
                        <img
                            src={product.imgSrc}
                            alt={product.name}
                            className={styles.imageWithMask}
                            style={{
                                WebkitMaskImage: `url(${maskUrl})`,
                                WebkitMaskRepeat: "no-repeat",
                                WebkitMaskSize: "cover",
                                maskImage: `url(${maskUrl})`,
                                maskRepeat: "no-repeat",
                                maskSize: "cover",
                            }}
                        />
                    ) : (
                        <div className={styles.placeholder}>No Image</div>
                    )}
                </Link>

                <div className={styles.favoriteWrapper}>
                    <Favorite product={product} />
                </div>
            </div>

            <div className={styles.info}>
                <h3>{product.name}</h3>
                <h3>{product.price} UAH</h3>
            </div>
        </div>
    );
};

export default ProductCard;
