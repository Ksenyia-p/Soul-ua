import React, { useEffect, useState } from "react";
import {
    collection, getDocs, query, orderBy
} from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfigs";

const Menu = () => {
    const [groups, setGroups] = useState([]);
    const [items, setItems] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const groupsSnapshot = await getDocs(query(collection(db, "menu1/menu/groups"), orderBy("order")));
            const groupsData = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const itemsSnapshot = await getDocs(collection(db, "menu1/menu/items"));
            const itemsData = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGroups(groupsData);
            setItems(itemsData);
        }

        fetchData();
    }, []);

    return (
        <div>
            {groups.map(group => (
                <div key={group.id}>
                    <h2>{group.name}</h2>
                    <ul>
                        {items
                            .filter(item => item.group === group.id)
                            .sort((a, b) => a.order - b.order) // Сортуємо айтеми по полю order
                            .map(item => (
                                <li key={item.id}>{item.name}</li>
                            ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Menu;
