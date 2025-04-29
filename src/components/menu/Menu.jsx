import React, { useEffect, useState, useMemo } from "react";
import {
    collection, getDocs, query, orderBy
} from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfigs";
import { Link } from "react-router-dom";

const Menu = () => {
    const [groups, setGroups] = useState([]);
    const [items, setItems] = useState([]);
    const numberOfColumns = 2;

    useEffect(() => {
        async function fetchData() {
            try {
                const [groupsSnapshot, itemsSnapshot] = await Promise.all([
                    getDocs(query(collection(db, "menu1/menu/groups"), orderBy("order"))),
                    getDocs(collection(db, "menu1/menu/items"))
                ]);

                const groupsData = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const itemsData = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setGroups(groupsData);
                setItems(itemsData);
            } catch (error) {
                console.error("Ошибка при загрузке меню:", error);
            }
        }

        fetchData();
    }, []);

    const blocks = useMemo(() => {
        return groups.map(group => ({
            id: group.id,
            slug: group.slug, // <--- добавляем slug группы!
            order: group.order,
            name: group.name,
            items: items
                .filter(item => item.group === group.id)
                .sort((a, b) => a.order - b.order)
        }));
    }, [groups, items]);

    const columns = useMemo(() => {
        const cols = Array.from({ length: numberOfColumns }, () => []);
        const rowsPerBlock = blocks.map(block => 1 + block.items.length); // 1 группа + айтемы
        const totalRows = rowsPerBlock.reduce((sum, rows) => sum + rows, 0);
        const targetRowsPerColumn = Math.ceil(totalRows / numberOfColumns);

        let currentColumn = 0;
        let currentRows = 0;

        blocks.forEach((block, index) => {
            const blockRows = rowsPerBlock[index];

            if (currentRows >= targetRowsPerColumn && currentColumn < numberOfColumns - 1) {
                currentColumn++;
                currentRows = 0;
            }

            cols[currentColumn].push(block);
            currentRows += blockRows;
        });

        return cols;
    }, [blocks, numberOfColumns]);

    return (
        <div style={{ display: 'flex', gap: '40px' }}>
            {columns.map((columnBlocks, colIndex) => (
                <div key={colIndex} style={{ flex: 1 }}>
                    {columnBlocks.map(block => (
                        <div key={block.id} style={{ marginBottom: '30px' }}>
                            {/* Ссылка на саму группу */}
                            <h2 style={{ fontWeight: 'bold' }}>
                                <Link to={`/${block.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {block.name}
                                </Link>
                            </h2>

                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {/* Ссылки на айтемы внутри группы */}
                                {block.items.map(item => (
                                    <li key={item.id}>
                                        <Link
                                            to={`/${block.slug}/${item.slug}`}
                                            style={{ textDecoration: 'none', color: 'gray' }}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Menu;
