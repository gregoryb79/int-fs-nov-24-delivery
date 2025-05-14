import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Main } from "../components/Main";
import { listOrders, timestampFormater, type OrderList } from "../models/order";

import styles from "./OrderHistory.module.scss";

export function OrderHistory() {
    const { error, orders } = useOrders();

    if (error) {
        return (
            <Main>
                <h1>Order history</h1>
                <p>{error}</p>
            </Main>
        );
    }

    if (!orders) {
        return (
            <Main>
                <h1>Order history</h1>
                <p>Loading...</p>
            </Main>
        );
    }

    return (
        <Main>
            <h1>Order history</h1>
            <OrderList orders={orders} />
        </Main>
    );
}

type OrderListProps = { orders: OrderList };
function OrderList({ orders }: OrderListProps) {
    if (!orders.length) {
        return (
            <p>No orders yet... Let's order something to eat!</p>
        );
    }

    return (
        <ol>
            {orders
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((order) => <li key={order.id}><OrderListItem {...order} /></li>)}
        </ol>
    );
}

type OrderListItemProps = OrderList[number];
function OrderListItem({ id, phase, timestamp, restaurant }: OrderListItemProps) {
    return (
        <article className={styles.order}>
            <p>{phase}</p>
            <time dateTime={timestamp.toString()}>{timestampFormater.format(timestamp)}</time>
            <p>{restaurant}</p>
            <Link to={`/track-order/${id}`} className={styles.goToDetails}>See details</Link>
        </article>
    );
}

function useOrders() {
    const [orders, setOrders] = useState<OrderList>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        let isCanceled = false;

        setOrders(undefined);
        setError(undefined);
        listOrders()
            .then((orders) => {
                if (isCanceled) {
                    return;
                }

                setOrders(orders);
            })
            .catch((error) => {
                if (isCanceled) {
                    return;
                }

                setError(error);
            });

        return () => {
            isCanceled = true;
        };
    }, []);

    return { orders, error };
}
