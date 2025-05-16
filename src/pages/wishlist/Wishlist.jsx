import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FilterAndSort from "../../components/filter and sort icons/FilterAndSort";
import styles from "./Wishlist.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfigs";
import ProductCard from "../../components/productCard/ProductCard";
import Way from "../../components/way/Way";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../FirebaseConfigs/FirebaseConfigs";

const Wishlist = () => {
    const [user] = useAuthState(auth);
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [maskUrl, setMaskUrl] = useState("/masks/corner-mask-2560px-1440px.svg");

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!user) {
                setWishlistProducts([]);
                return;
            }
            try {
                const wishlistSnapshot = await getDocs(collection(db, "users", user.uid, "wishlist"));
                const wishlistItems = wishlistSnapshot.docs.map(doc => doc.data());
                setWishlistProducts(wishlistItems);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };

        const updateMaskUrl = () => {
            const width = window.innerWidth;
            if (width >= 2560) {
                setMaskUrl("/masks/corner-mask-2560px-1440px.svg");
            } else if (width >= 1440) {
                setMaskUrl("/masks/corner-mask-2560px-1440px.svg");
            } else if (width >= 1024) {
                setMaskUrl("/masks/corner-mask-1024px.svg");
            } else if (width >= 768) {
                setMaskUrl("/masks/corner-mask-768px.svg");
            } else if (width >= 425) {
                setMaskUrl("/masks/corner-mask-425-375px.svg");
            } else if (width >= 375) {
                setMaskUrl("/masks/corner-mask-425-375px.svg");
            } else {
                setMaskUrl("/masks/corner-mask-320px.svg");
            }
        };

        fetchWishlist();
        updateMaskUrl();
        window.addEventListener("resize", updateMaskUrl);
        return () => window.removeEventListener("resize", updateMaskUrl);
    }, [user]);

    const handleFavoriteToggle = (productId, colorKey, isFavoriteNow) => {
        if (!isFavoriteNow) {
            setWishlistProducts(prev =>
                prev.filter(p => {
                    const uniqueId = p.color ? `${p.id}_${p.color}` : p.id;
                    const targetId = colorKey ? `${productId}_${colorKey}` : productId;
                    return uniqueId !== targetId;
                })
            );
        }
    };

    if (!user) {
        return (
            <div>
                <Header />
                <Way>Вішліст</Way>
                <div style={{ padding: "20px", textAlign: "center" }}>
                    <h3>Щоб бачити вішліст, будь ласка, увійдіть у свій акаунт.</h3>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <Way>Вішліст</Way>
            <FilterAndSort />
            <div className={styles.cards}>
                {wishlistProducts.length > 0 ? (
                    wishlistProducts.map((product, index) => (
                        <ProductCard
                            key={product.color ? `${product.id}_${product.color}` : product.id || index}
                            product={{
                                ...product,
                                imgSrc: product.image || product.mainImage || null,
                                link: `/${product.group}/${product.items}/${product.slug}${product.color ? `/${product.color}` : ''}`,
                            }}
                            maskUrl={maskUrl}
                            wishlistMode={true}
                            onFavoriteToggle={handleFavoriteToggle}
                        />
                    ))
                ) : (
                    <h3>Ваш вішліст порожній.</h3>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Wishlist;
