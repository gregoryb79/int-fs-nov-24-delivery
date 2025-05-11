import { useEffect, useState } from "react";
import styles from "./TrackOrder.module.scss";
import cover from "./assets/order-status-cover.jpg";

// 1. Show loading even when an order was previously loaded
// 2. Show error message on rejection
// 3. Find and fix the bug

const orderPhases = [
    "received",
    "opened",
    "making",
    "ready",
    "picked-up",
    "arrived",
] as const;

type OrderPhase = typeof orderPhases[number];

type Order = {
    id: string,
    phase: OrderPhase,
    timestamp: number,
    restaurant: string,
    items: string[],
};

type TrackOrderProps = {
    orderId: string,
};

async function getOrderById(id: string): Promise<Order> {
    await new Promise<void>((resolve, reject) => {
        const delay = id === "112335" ? 500 : (Math.random() * 2000) + 700;

        return setTimeout(
            () => {
                if (id === "404") {
                    reject();
                } else {
                    resolve();
                }
            },
            delay
        );
    });

    return {
        id,
        phase: "making",
        timestamp: new Date(2025, 4, 7, 19).valueOf(),
        restaurant: "A nice place",
        items: [
            "Burger",
            "Fries",
            "Soda",
        ],
    };
}

const timestampFormater = new Intl.DateTimeFormat("he", {
    timeStyle: "short",
    dateStyle: "short",
});

export function TrackOrder({ orderId }: TrackOrderProps) {
    const [order, setOrder] = useState<Order>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        let isCanceled = false;

        setOrder(undefined);
        setError(undefined);
        getOrderById(orderId)
            .then((order) => {
                if (isCanceled) {
                    return;
                }

                setOrder(order);
            })
            .catch(() => {
                if (isCanceled) {
                    return;
                }

                setError(`Order ${orderId} was not found.`);
            });

        return () => {
            isCanceled = true;
        };
    }, [orderId]);

    if (error) {
        return (
            <main className={styles.container}>
                <h1>Your order status</h1>
                <p>{error}</p>
            </main>
        );
    }

    if (!order) {
        return (
            <main className={styles.container}>
                <h1>Your order status</h1>
                <p>Loading...</p>
            </main>
        )
    }

    return (
        <main className={styles.container}>
            <h1>Your order status</h1>
            <img src={cover} className={styles.cover} alt="" />
            <Steps phase={order.phase} />
            <article>
                <p>Order number: <span>{order.id}</span></p>
                <p>Ordered from: <span>{order.restaurant}</span></p>
                <p>Ordered on: <time dateTime={order.timestamp.toString()}>{timestampFormater.format(order.timestamp)}</time></p>
            </article>
            <details>
                <summary>Order details</summary>
                <ul>
                    {order.items.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </details>
        </main>
    );
}

type StepsProps = {
    phase: OrderPhase;
};
function Steps({ phase }: StepsProps) {
    const currentStep = orderPhases.indexOf(phase);

    function isActive(step: OrderPhase) {
        return orderPhases.indexOf(step) <= currentStep;
    }

    return (
        <div className={styles.stepsContainer} style={{ "--step": currentStep }}>
            <div className={styles.step} data-active={isActive("received")}>We got your order!</div>
            <div className={styles.step} data-active={isActive("opened")}>The restaurant has seen your order</div>
            <div className={styles.step} data-active={isActive("making")}>Your order is in the making</div>
            <div className={styles.step} data-active={isActive("ready")}>The order is ready for pick-up</div>
            <div className={styles.step} data-active={isActive("picked-up")}>The courier is on the way with your food</div>
            <div className={styles.step} data-active={isActive("arrived")}>Bon appetite!</div>
        </div>
    );
}
