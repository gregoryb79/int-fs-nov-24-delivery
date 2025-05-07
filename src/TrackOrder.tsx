import styles from "./TrackOrder.module.scss";

type OrderPhase =
    | "received"
    | "opened"
    | "making"
    | "ready"
    | "picked-up"
    | "arrived";

export function TrackOrder() {
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
                <p>Order number: <span>11111</span></p>
                <p>Ordered from: <span>A nice place</span></p>
                <p>Ordered on: <time dateTime="11111">Just now</time></p>
            </article>
            <details>
                <summary>See order details</summary>
                <ul>
                    <li>Item #1</li>
                    <li>Item #2</li>
                    <li>Item #3</li>
                </ul>
            </details>
        </main>
    );
}
