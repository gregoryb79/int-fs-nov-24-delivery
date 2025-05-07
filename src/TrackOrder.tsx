import styles from "./TrackOrder.module.scss";

type OrderPhase =
    | "received"
    | "opened"
    | "making"
    | "ready"
    | "picked-up"
    | "arrived";

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

function getOrderById(id: string): Order {
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

export function TrackOrder({ orderId }: TrackOrderProps) {
    const order = getOrderById(orderId);

    return (
        <main className={styles.container}>
            <h1>Your order status</h1>
            <div>cool image</div>
            <div className={styles.stepsContainer}>
                <div className={styles.step} data-active>We got your order!</div>
                <div className={styles.step} data-active>The restaurant has seen your order</div>
                <div className={styles.step} data-active>Your order is in the making</div>
                <div className={styles.step}>The order is ready for pick-up</div>
                <div className={styles.step}>The courier is on the way with your food</div>
                <div className={styles.step}>Bon appetite!</div>
            </div>
            <article>
                <p>Order number: <span>{order.id}</span></p>
                <p>Ordered from: <span>{order.restaurant}</span></p>
                <p>Ordered on: <time dateTime={order.timestamp.toString()}>{order.timestamp}</time></p>
            </article>
            <details>
                <summary>See order details</summary>
                <ul>
                    {order.items.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </details>
        </main>
    );
}
