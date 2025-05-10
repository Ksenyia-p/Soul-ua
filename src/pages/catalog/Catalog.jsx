import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfigs";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FilterAndSort from "../../components/filter and sort icons/FilterAndSort";
import ProductCard from "../../components/productCard/ProductCard";
import Way from "../../components/way/Way";
import styles from "./Catalog.module.css";

const Catalog = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [maskUrl, setMaskUrl] = useState(
    "/masks/corner-mask-2560px-1440px.svg"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "catalog"));
        const fetchedProducts = querySnapshot.docs.map((doc) => doc.data());
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

    fetchData();
    updateMaskUrl();
    window.addEventListener("resize", updateMaskUrl);
    return () => window.removeEventListener("resize", updateMaskUrl);
  }, []);

  const toggleFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index] = !updatedFavorites[index];
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <Header />
      <Way>Весь каталог</Way>
      <FilterAndSort />
      <div className={styles.cards}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={{
              ...product,
              imgSrc: product.mainImage || null,
              link: `/${product.group}/${product.items}/${product.slug}`,
            }}
            isFavorite={favorites[index]}
            onToggleFavorite={() => toggleFavorite(index)}
            maskUrl={maskUrl}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
