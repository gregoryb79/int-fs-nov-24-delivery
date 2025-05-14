import { useEffect, useState } from "react";
import { Main } from "../components/Main";
import { getItems, type Item } from "../models/item";

import styles from "./NewOrder.module.scss";

export function NewOrder() {
    return (
        <Main>
            <h1>New order</h1>
            <div className={styles.container}>
                <article className={styles.menu}>
                    <h2>Menu</h2>
                    <ItemsList />
                </article>
                <OrderSummary />
            </div>
        </Main>
    );
}

function ItemsList() {
    const [items, setItems] = useState<Item[]>();

    useEffect(() => {
        setItems(undefined);
        getItems()
            .then(setItems);
    }, []);

    if (!items) {
        return (
            <p>Loading items...</p>
        );
    }

    return (
        <ul>
            {items.map((item) => <li key={item.id} className={styles.menuItem}><MenuItem {...item} /></li>)}
        </ul>
    );
}

function MenuItem({ imgSrc, name, description, priceInAgorot }: Item) {
    return (
        <>
            <img src={imgSrc} alt="" />
            <h3>{name}</h3>
            <p>{description}</p>
            <p>{priceInAgorot / 100}₪</p>
        </>
    );
}

function OrderSummary() {
    return (
        <article className={styles.summmary}>
            <h2>Order summary</h2>
        </article>
    );
}
