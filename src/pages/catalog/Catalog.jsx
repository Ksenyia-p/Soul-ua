import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfigs";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Layout from "../../components/layout/Layout";
import FilterAndSort from "../../components/filter and sort icons/FilterAndSort";
import ProductCard from "../../components/productCard/ProductCard";
import Way from "../../components/way/Way";
import styles from "./Catalog.module.css";

const Catalog = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [maskUrl, setMaskUrl] = useState(
      "/masks/corner-mask-2560px-1440px.svg"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "catalog"));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched products:", fetchedProducts);
        setProducts(fetchedProducts);
        setFavorites(Array(fetchedProducts.length).fill(false));
      } catch (error) {
        console.error("Error fetching catalog:", error);
      }
    };



    const updateMaskUrl = () => {
      const width = window.innerWidth;
      if (width >= 2560) {
        setMaskUrl("/masks/corner-mask-2560px-1440px.svg");
      } else if (width >= 1024) {
        setMaskUrl("/masks/corner-mask-1024px.svg");
      } else if (width >= 768) {
        setMaskUrl("/masks/corner-mask-768px.svg");
      } else if (width >= 425) {
        setMaskUrl("/masks/corner-mask-425-375px.svg");
      } else {
        setMaskUrl("/masks/corner-mask-320px.svg");
      }
    };

    fetchData();
    updateMaskUrl();
    window.addEventListener("resize", updateMaskUrl);
    return () => window.removeEventListener("resize", updateMaskUrl);
  }, []);

  const toggleFavorite = (productSlug, colorKey) => {
    const key = `${productSlug}-${colorKey}`;
    setFavorites((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };


  return (
      <div>
        <Header/>
        <Way>Весь каталог</Way>
        <FilterAndSort/>
        <div className={styles.cards}>
          {console.log("Rendering products:", products)}
          {products.map((product, productIndex) => {
            const colorEntries = Object.entries(product.colors || {});
            if (colorEntries.length > 0) {
              return colorEntries.map(([colorKey, color], colorIndex) => (
                  <ProductCard
                      key={`${productIndex}-${colorKey}`}
                      product={{
                        ...product,
                        imgSrc: color.mainImage,
                        link: `/${product.group}/${product.items}/${product.slug}/${color.slug}`,
                        color: colorKey,
                      }}
                      isFavorite={favorites[`${product.slug}-${colorKey}`] || false}
                      onToggleFavorite={() => toggleFavorite(product.slug, colorKey)}
                      maskUrl={maskUrl}
                  />
              ));
            }
            return (
                <ProductCard
                    key={`${productIndex}`}
                    product={{
                      ...product,
                      imgSrc: product.mainImage,
                      link: `/${product.group}/${product.items || "category"}/${product.slug || product.id}`,
                      color: product.color || null,
                    }}
                    isFavorite={favorites[`${product.slug || product.id}`] || false}
                    onToggleFavorite={() => toggleFavorite(product.slug || product.id, product.color || "")}
                    maskUrl={maskUrl}
                />
            );
          })}

        </div>

        <Layout/>
      </div>
  );
};

export default Catalog;
