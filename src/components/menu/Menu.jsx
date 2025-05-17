import React, { useEffect, useState, useMemo } from "react";
import styles from "./Menu.module.css";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfigs";
import { Link } from "react-router-dom";

import Cross from "../../icons/cross.svg";

const Menu = ({ active, setActive }) => {
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
                console.error("Error", error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (active) {
            document.body.classList.add('bodyLock');
        } else {
            document.body.classList.remove('bodyLock');
        }

        return () => {
            document.body.classList.remove('bodyLock');
        };
    }, [active]);


    const blocks = useMemo(() => {
        return groups.map(group => ({
            id: group.id,
            slug: group.slug,
            order: group.order,
            name: group.name,
            items: items
                .filter(item => item.group === group.id)
                .sort((a, b) => a.order - b.order)
        }));
    }, [groups, items]);

    const columns = useMemo(() => {
        const cols = Array.from({ length: numberOfColumns }, () => []);
        const rowsPerBlock = blocks.map(block => 1 + block.items.length);
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
        <>
            <div className={`${styles.overlay} ${active ? styles.activeOverlay : ''}`}
                 onClick={() => setActive(false)}/>

            <div className={`${styles.menuWrapper} ${active ? styles.active : ''}`}>
                <button className={styles.closeButton} onClick={() => setActive(false)}>
                    <img src={Cross} alt="Закрити"/>
                </button>
                {columns.map((columnBlocks, colIndex) => (
                    <div key={colIndex} onClick={() => setActive(false)}>
                        {columnBlocks.map(block => (
                            <div key={block.id}>
                                <Link to={`/${block.slug}`} className={styles.groupLink}>
                                       <h3>{block.name}</h3>
                                </Link>

                                <ul className={styles.menuItemList}>
                                    {block.items.map(item => (
                                        <li key={item.id}>
                                            <Link to={`/${block.slug}/${item.slug}`} className={styles.menuItemLink}>
                                                <div className="h3-light">
                                                    {item.name}
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Menu;
