
import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    query,
    orderBy,
    getDoc,
    doc,
} from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfigs";


const Menu = () => {
    const [menu, setMenu] = useState({
        women: [],
        men: [],
        seasons: [],
        collaborations: [],
        certificates: [],
    });

    useEffect(() => {
        const fetchMenu = async () => {
            const fetchSubCollection = async (parentPath) => {
                const q = query(collection(db, ...parentPath), orderBy("order"));
                const snapshot = await getDocs(q);
                return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            };

            const [women, men, seasons, collaborations, certificates] =
                await Promise.all([
                    fetchSubCollection(["menu", "categories", "women", "meta", "items"]),
                    fetchSubCollection(["menu", "categories", "men", "meta", "items"]),
                    fetchSubCollection(["menu", "seasons", "items"]),
                    fetchSubCollection(["menu", "collaborations", "items"]),
                    fetchSubCollection(["menu", "certificates", "items"]),
                ]);

            setMenu({ women, men, seasons, collaborations, certificates });
        };

        fetchMenu();
    }, []);

    return (
        <div className="p-6 space-y-6">
            {/* Жінки */}
            <Section title="Жінки" items={menu.women} />

            {/* Чоловіки */}
            <Section title="Чоловіки" items={menu.men} />

            {/* Seasons */}
            <Section title="Seasons" items={menu.seasons} />

            {/* Collaborations */}
            <Section title="Collaboration" items={menu.collaborations} />

            {/* Certificates */}
            <Section title="Сертифікати" items={menu.certificates} />
        </div>
    );
};

const Section = ({ title, items }) => (
    <div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <ul className="space-y-1">
            {items.map((item) => (
                <li key={item.id} className="bg-gray-100 px-3 py-2 rounded shadow-sm">
                    {item.name}
                </li>
            ))}
        </ul>
    </div>
);

export default Menu;
