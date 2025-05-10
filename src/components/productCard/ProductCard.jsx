import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

import Favorite from "../../icons/favorite.svg";
import FavoriteFilled from "../../icons/full-favorite.svg";

const ProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
  maskUrl,
  wishlistMode = false,
}) => {
  const icon = wishlistMode
    ? isFavorite
      ? FavoriteFilled
      : Favorite
    : isFavorite
    ? FavoriteFilled
    : Favorite;
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
        <button
          className={styles.favoriteButton}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          <img
            src={isFavorite ? FavoriteFilled : Favorite}
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
  );
};

export default ProductCard;
