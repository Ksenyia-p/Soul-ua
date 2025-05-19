import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfigs";
import Header from "../../components/header/Header";
import Layout from "../../components/layout/Layout";
import FilterAndSort from "../../components/filter and sort icons/FilterAndSort";
import ProductCard from "../../components/productCard/ProductCard";
import Way from "../../components/way/Way";
import styles from "./AssortmentPage.module.css";

const AssortmentPage = () => {
    const { group, item } = useParams();

    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState({});
    const [maskUrl, setMaskUrl] = useState("/masks/corner-mask-2560px-1440px.svg");
    const [filters, setFilters] = useState({
        gender: [],
        size: [],
        category: [],
        color: [],
    });
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "catalog"));
                const fetchedProducts = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const filteredByUrl = fetchedProducts.filter((product) => {
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

                setProducts(filteredByUrl);
                setFavorites({});
            } catch (error) {
                console.error("Error fetching catalog:", error);
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

    const filteredProducts = products.filter((product) => {
        if (filters.gender.length && !filters.gender.includes(product.group)) {
            return false;
        }
        if (filters.category.length && !filters.category.includes(product.items)) {
            return false;
        }

        const colors = product.colors || {};
        const colorEntries = Object.entries(colors);

        if (filters.color.length) {
            const hasColor = colorEntries.some(([, color]) => {
                const hasSizeAvailable = Object.values(color.sizes || {}).some((qty) => qty > 0);
                return (
                    hasSizeAvailable &&
                    (filters.color.includes(color.colorName) || filters.color.includes(color.slug))
                );
            });
            if (!hasColor) return false;
        }

        if (filters.size.length) {
            const hasAllSizes = colorEntries.some(([, color]) => {
                if (!color.sizes) return false;
                return filters.size.every((size) => color.sizes[size] > 0);
            });
            if (!hasAllSizes) return false;
        }

        return true;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case "newest":
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            case "price-asc":
                return (a.price || Infinity) - (b.price || Infinity);
            case "price-desc":
                return (b.price || 0) - (a.price || 0);
            default:
                return 0;
        }
    });

    const visibleProductCards = sortedProducts.flatMap((product) => {
        const colors = product.colors || {};
        const colorEntries = Object.entries(colors);

        return colorEntries.filter(([_, color]) => {
            const sizes = color.sizes || {};
            const hasAvailableSize = Object.values(sizes).some((qty) => qty > 0);
            if (!hasAvailableSize) return false;

            if (filters.size.length > 0) {
                const matchesSize = filters.size.every((size) => sizes[size] > 0);
                if (!matchesSize) return false;
            }

            if (filters.color.length > 0) {
                const matchesColor =
                    filters.color.includes(color.colorName) || filters.color.includes(color.slug);
                if (!matchesColor) return false;
            }

            return true;
        });
    });

    return (
        <div>
            <Header />
            <Way>Весь каталог</Way>
            <FilterAndSort onFilterChange={setFilters} onSortChange={setSortOption} />

            <div className={styles.cards}>
                {visibleProductCards.length === 0 && (
                    <h2 className={styles.emptyFiltr}>Немає товарів за обраними фільтрами</h2>
                )}

                {sortedProducts.map((product) => {
                    const colors = product.colors || {};
                    const colorEntries = Object.entries(colors);

                    const colorsToShow = colorEntries.filter(([_, color]) => {
                        const sizes = color.sizes || {};

                        const hasAvailableSize = Object.values(sizes).some((qty) => qty > 0);
                        if (!hasAvailableSize) return false;

                        if (filters.size.length > 0) {
                            const matchesSize = filters.size.every((size) => sizes[size] > 0);
                            if (!matchesSize) return false;
                        }

                        if (filters.color.length > 0) {
                            const matchesColor =
                                filters.color.includes(color.colorName) || filters.color.includes(color.slug);
                            if (!matchesColor) return false;
                        }

                        return true;
                    });

                    return colorsToShow.map(([colorKey, color]) => (
                        <ProductCard
                            key={`${product.id}-${colorKey}`}
                            product={{
                                ...product,
                                imgSrc: color.mainImage || product.image || product.mainImage,
                                link: `/${product.group}/${product.items}/${product.slug}/${color.slug}`,
                                color: colorKey,
                            }}
                            isFavorite={favorites[`${product.slug}-${colorKey}`] || false}
                            onToggleFavorite={() => toggleFavorite(product.slug, colorKey)}
                            maskUrl={maskUrl}
                        />
                    ));
                })}
            </div>
            <Layout />
        </div>
    );
};

export default AssortmentPage;
