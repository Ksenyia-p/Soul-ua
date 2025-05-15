import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfigs";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FilterAndSort from "../../components/filter and sort icons/FilterAndSort";
import ProductCard from "../../components/productCard/ProductCard";
import Way from "../../components/way/Way";
import styles from "./AssortmentPage.module.css";
const AssortmentPage = () => {
    const navigate = useNavigate();
    const { group, item } = useParams(); // ← сюда попадут "women" и "pants", если путь /women/pants
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState({});
    const [maskUrl, setMaskUrl] = useState("/masks/corner-mask-2560px-1440px.svg");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "catalog"));
                const fetchedProducts = querySnapshot.docs.map((doc) => doc.data());

                const filteredProducts = fetchedProducts.filter((product) => {
                    if (group === "seasons") {
                        return item ? product.season === item : !!product.season;
                    }

                    if (group === "collaboration") {
                        return item ? product.collab === item : !!product.collab;
                    }

                    const matchesGroup = product.group === group;
                    const matchesItem = !item || product.items === item;

                    return matchesGroup && matchesItem;
                });








                setProducts(filteredProducts);
                setFavorites(Array(filteredProducts.length).fill(false));
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
    }, [group, item]);
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

            <Footer/>
        </div>
    );
};

export default AssortmentPage;