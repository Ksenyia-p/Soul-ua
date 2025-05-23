import React, { useState, useEffect, useRef } from 'react';
import styles from './Bestsellers.module.css';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from "../../FirebaseConfigs/FirebaseConfigs";
import Arrow from '../../icons/arrow.svg';

import ProductCard from '../productCard/ProductCard';

const Bestsellers = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [maskUrl, setMaskUrl] = useState('/masks/corner-mask-2560px-1440px.svg');
    const [visibleCount, setVisibleCount] = useState(6);

    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bestsellersSnapshot = await getDocs(collection(db, 'bestsellers'));
                const bestsellers = bestsellersSnapshot.docs.map(doc => doc.data());

                const productsWithDetails = [];

                for (const bestseller of bestsellers) {
                    const catalogDocRef = doc(db, 'catalog', bestseller.slug);
                    const catalogSnap = await getDoc(catalogDocRef);

                    if (catalogSnap.exists()) {
                        const productData = catalogSnap.data();

                        const colorKey = bestseller.color;
                        const colorData = productData.colors?.[colorKey];

                        const sizes = colorData?.sizes || {};
                        const isAvailable = Object.values(sizes).some(qty => qty > 0);

                        if (!isAvailable) {
                            continue;
                        }

                        if (colorData) {
                            productsWithDetails.push({
                                ...productData,
                                color: colorKey,
                                colorName: colorData.colorName,
                                hex: colorData.hex,
                                images: colorData.images || [],
                                mainImage: colorData.mainImage || null,
                                imgSrc: colorData.mainImage || (colorData.images && colorData.images[0]) || null,
                                link: `/${productData.group}/${productData.items}/${productData.slug}/${colorKey}`
                            });
                        } else {
                            productsWithDetails.push({
                                ...productData,
                                color: colorKey,
                                imgSrc: null,
                                link: `/${productData.group}/${productData.items}/${productData.slug}/${colorKey}`
                            });
                        }
                    } else {
                        console.warn('Catalog product not found:', bestseller.slug);
                    }
                }

                setProducts(productsWithDetails);
            } catch (error) {
                console.error('Error fetching bestsellers:', error);
            }
        };

        const updateResponsiveSettings = () => {
            const width = window.innerWidth;

            if (width >= 2560) {
                setMaskUrl('/masks/corner-mask-2560px-1440px.svg');
                setVisibleCount(6);
            } else if (width >= 1440) {
                setMaskUrl('/masks/corner-mask-2560px-1440px.svg');
                setVisibleCount(4);
            } else if (width >= 1024) {
                setMaskUrl('/masks/corner-mask-1024px.svg');
                setVisibleCount(3);
            } else if (width >= 768) {
                setMaskUrl('/masks/corner-mask-768px.svg');
                setVisibleCount(3);
            } else if (width >= 425) {
                setMaskUrl('/masks/corner-mask-425-375px.svg');
                setVisibleCount(2);
            } else if (width >= 375) {
                setMaskUrl('/masks/corner-mask-425-375px.svg');
                setVisibleCount(2);
            } else if (width >= 320) {
                setMaskUrl('/masks/corner-mask-320px.svg');
                setVisibleCount(1);
            }
        };

        fetchData();
        updateResponsiveSettings();
        window.addEventListener('resize', updateResponsiveSettings);
        return () => window.removeEventListener('resize', updateResponsiveSettings);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            handleNext();
        } else if (distance < -minSwipeDistance) {
            handlePrev();
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    const visibleProducts = products
        .slice(currentIndex, currentIndex + visibleCount)
        .concat(
            currentIndex + visibleCount > products.length
                ? products.slice(0, (currentIndex + visibleCount) % products.length)
                : []
        );

    return (
        <div className={styles.wrapper}>
            <div className={styles.sideTextLeft}>
                <h1>BESTSELLERS</h1>
            </div>

            <section className={styles.section}>
                <div className={styles.text}>
                    <h4>ГОРТАЙ</h4>
                </div>

                <div className={styles.content}>
                    <div className={styles.leftArrow} onClick={handlePrev}>
                        <img src={Arrow} alt="Previous" />
                    </div>

                    <div
                        className={styles.cards}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {visibleProducts.map((product, i) => (
                            <div className={styles.cardWrapper} key={(currentIndex + i) % products.length}>
                                <ProductCard
                                    product={product}
                                    maskUrl={maskUrl}
                                />
                            </div>
                        ))}
                    </div>

                    <div className={styles.rightArrow} onClick={handleNext}>
                        <img src={Arrow} alt="Next" />
                    </div>
                </div>
            </section>

            <div className={styles.sideTextRight}>
                <h1>BESTSELLERS</h1>
            </div>
        </div>
    );
};

export default Bestsellers;
