import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Layout from "../../components/layout/Layout";
// ❌ Видалено: import FilterAndSort
import styles from "./Wishlist.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../FirebaseConfigs/FirebaseConfigs";
import ProductCard from "../../components/productCard/ProductCard";
import Way from "../../components/way/Way";
import { useAuthState } from "react-firebase-hooks/auth";
import Koshyk from "../../icons/koshyk.svg";

const Wishlist = () => {
  const [user] = useAuthState(auth);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [maskUrl, setMaskUrl] = useState(
    "/masks/corner-mask-2560px-1440px.svg"
  );

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setWishlistProducts([]);
        return;
      }

      try {
        const snapshot = await getDocs(
          collection(db, "users", user.uid, "wishlist")
        );
        const items = snapshot.docs.map((doc) => doc.data());
        setWishlistProducts(items);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    const updateMaskUrl = () => {
      const width = window.innerWidth;
      if (width >= 2560) setMaskUrl("/masks/corner-mask-2560px-1440px.svg");
      else if (width >= 1024) setMaskUrl("/masks/corner-mask-1024px.svg");
      else if (width >= 768) setMaskUrl("/masks/corner-mask-768px.svg");
      else if (width >= 425) setMaskUrl("/masks/corner-mask-425-375px.svg");
      else setMaskUrl("/masks/corner-mask-320px.svg");
    };

    fetchWishlist();
    updateMaskUrl();
    window.addEventListener("resize", updateMaskUrl);
    return () => window.removeEventListener("resize", updateMaskUrl);
  }, [user]);

  const handleFavoriteToggle = (productId, colorKey, isFavoriteNow) => {
    if (!isFavoriteNow) {
      setWishlistProducts((prev) =>
        prev.filter((p) => {
          const uniqueId = p.color ? `${p.id}_${p.color}` : p.id;
          const targetId = colorKey ? `${productId}_${colorKey}` : productId;
          return uniqueId !== targetId;
        })
      );
    }
  };

  const normalizedProducts = wishlistProducts.map((product) => {
    if (product.colors) return product;

    const colorKey = product.color || "default";
    return {
      ...product,
      colors: {
        [colorKey]: {
          slug: product.color || "default",
          colorName: product.color || "default",
          mainImage: product.image || product.mainImage || null,
          sizes: product.sizes || { [product.size]: 1 },
        },
      },
    };
  });

  if (!user) {
    return (
      <div>
        <Header />
        <Way>Вішліст</Way>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h3>Щоб бачити вішліст, будь ласка, увійдіть у свій акаунт.</h3>
        </div>
        <Layout />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Way>Вішліст</Way>

      <div className={styles.cards}>
        {normalizedProducts.length > 0 ? (
          normalizedProducts.map((product) => {
            const colorEntries = Object.entries(product.colors || {});
            return colorEntries.map(([colorKey, color]) => (
              <ProductCard
                key={`${product.id}-${colorKey}`}
                product={{
                  ...product,
                  imgSrc: color.mainImage,
                  link: `/${product.group}/${product.items}/${product.slug}/${color.slug}`,
                  color: colorKey,
                }}
                wishlistMode
                maskUrl={maskUrl}
                onFavoriteToggle={() =>
                  handleFavoriteToggle(product.id, colorKey, false)
                }
              />
            ));
          })
        ) : (
          <div className={styles.emptyWishlist}>
            <h2 className={styles.emptyWishlistTitle}>
              Ваш вішліст <span className={styles.breakWord}>порожній</span>
            </h2>
            <img
              src={Koshyk}
              className={styles.emptyWishlistImg}
              alt="Порожній кошик"
            />
          </div>
        )}
      </div>

      <Layout />
    </div>
  );
};

export default Wishlist;
