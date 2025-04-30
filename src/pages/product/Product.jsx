import React, { useEffect, useState } from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useParams } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../FirebaseConfigs/FirebaseConfigs'; // імпортуй свою ініціалізацію firebase

const Product = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'catalog'));
                const productDoc = querySnapshot.docs.find(doc => doc.data().slug === slug);
                if (productDoc) {
                    setProduct({ id: productDoc.id, ...productDoc.data() });
                } else {
                    setProduct(null);
                }
                setLoading(false);
            } catch (error) {
                console.error("Помилка при завантаженні товару:", error);
            }
        };

        fetchProduct();
    }, [slug]);

    return (
        <div>
            <Header />
            {loading ? (
                <p>Завантаження...</p>
            ) : product ? (
                <div >
                    <h2>{product.name}</h2>
                    <img src={product.mainImage} alt={product.name} />
                    <p><strong>Ціна:</strong> {product.price}</p>
                    <p><strong>Колір:</strong> {product.color}</p>
                    <p><strong>Сезон:</strong> {product.season}</p>
                    <p><strong>Група:</strong> {product.group}</p>
                </div>
            ) : (
                <p>Товар не знайдено.</p>
            )}
            <Footer />
        </div>
    );
};

export default Product;
