import React, { useEffect, useState } from "react";
import styles from "./Favorite.module.css";
import FavoriteIcon from "../../icons/favorite.svg";
import FavoriteFilledIcon from "../../icons/full-favorite.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../FirebaseConfigs/FirebaseConfigs";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Favorite = ({ product }) => {
    const [user] = useAuthState(auth);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkFavorite = async () => {
            if (!user || !product?.id) return;
            const ref = doc(db, "users", user.uid, "wishlist", product.id);
            const docSnap = await getDoc(ref);
            setIsFavorite(docSnap.exists());
        };
        checkFavorite();
    }, [user, product?.id]);

    const toggleFavorite = async (e) => {
        e.stopPropagation();

        if (!user) {
            navigate("/wishlist");
            return;
        }

        const ref = doc(db, "users", user.uid, "wishlist", product.id);

        if (isFavorite) {
            await deleteDoc(ref);
        } else {
            await setDoc(ref, {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.mainImage || product.imgSrc,
                slug: product.slug,
                group: product.group,
                items: product.items,
                createdAt: Date.now(),
            });
        }

        setIsFavorite(!isFavorite);
    };

    return (
        <button className={styles.favoriteButton} onClick={toggleFavorite}>
            <img
                src={isFavorite ? FavoriteFilledIcon : FavoriteIcon}
                alt="Favorite"
                className={styles.favoriteIcon}
            />
        </button>
    );
};

export default Favorite;