import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Layout from "../../components/layout/Layout";
import FilterAndSort from "../../components/filter and sort icons/FilterAndSort";
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
  const [filters, setFilters] = useState({
    gender: [],
    size: [],
    category: [],
    color: [],
  });

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

  const normalizedFilterColors = filters.color.map((c) => c.toLowerCase());
  const normalizedFilterSizes = filters.size.map((s) => s.toUpperCase());

  const filteredProducts = normalizedProducts.filter((product) => {
    if (filters.gender.length && !filters.gender.includes(product.group))
      return false;
    if (filters.category.length && !filters.category.includes(product.items))
      return false;

    const colorEntries = Object.entries(product.colors || {});

    // Фільтр по кольору
    if (normalizedFilterColors.length) {
      const hasColor = colorEntries.some(
        ([, color]) =>
          normalizedFilterColors.includes(color.colorName?.toLowerCase()) ||
          normalizedFilterColors.includes(color.slug?.toLowerCase())
      );
      if (!hasColor) return false;
    }

    // Фільтр по розміру
    if (normalizedFilterSizes.length) {
      const hasSize = colorEntries.some(([, color]) => {
        const sizeKeys = Object.keys(color.sizes || {}).map((k) =>
          k.toUpperCase()
        );
        return normalizedFilterSizes.some(
          (size) => sizeKeys.includes(size) && color.sizes[size] > 0
        );
      });
      if (!hasSize) return false;
    }

    return true;
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

      {wishlistProducts.length > 0 && (
        <FilterAndSort onFilterChange={setFilters} />
      )}

      <div className={styles.cards}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
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
                wishlistMode={true}
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
