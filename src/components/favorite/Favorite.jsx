import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../FirebaseConfigs/FirebaseConfigs";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "./Favorite.module.css";
import FavoriteIcon from "../../icons/favorite.svg";
import FavoriteFilledIcon from "../../icons/full-favorite.svg";

const Favorite = ({ product, onToggle }) => {
  const [user] = useAuthState(auth);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || !product?.id) return;
      const ref = doc(
        db,
        "users",
        user.uid,
        "wishlist",
        product.color ? `${product.id}_${product.color}` : product.id
      );
      const docSnap = await getDoc(ref);
      setIsFavorite(docSnap.exists());
    };
    checkFavorite();
  }, [user, product]);

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    if (!user) {
      navigate("/wishlist");
      return;
    }

    const docId = product.color ? `${product.id}_${product.color}` : product.id;
    const ref = doc(db, "users", user.uid, "wishlist", docId);

    try {
      if (isFavorite) {
        await deleteDoc(ref);
        setIsFavorite(false);
        if (onToggle) onToggle(product.id, product.color, false);
      } else {
        await setDoc(ref, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.mainImage || product.imgSrc,
          slug: product.slug,
          group: product.group,
          items: product.items,
          color: product.color || null,
          createdAt: Date.now(),
        });
        setIsFavorite(true);
        if (onToggle) onToggle(product.id, product.color, true);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <button
      className={styles.favoriteButton}
      onClick={toggleFavorite}
      aria-label="Toggle favorite"
    >
      <img
        src={isFavorite ? FavoriteFilledIcon : FavoriteIcon}
        alt={isFavorite ? "Видалити з вішліста" : "Додати у вішліст"}
        className={styles.favoriteIcon}
      />
    </button>
  );
};

export default Favorite;
