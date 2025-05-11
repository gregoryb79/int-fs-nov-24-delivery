import { useEffect, useState } from "react";
import styles from "./HandleOrder.module.scss";
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
        const delay = (Math.random() * 2000) + 700;

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

export function HandleOrder({ orderId }: TrackOrderProps) {
    const [order, setOrder] = useState<Order>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        async function fetchOrder() {
            setOrder(undefined);
            setError(undefined);
            try{
                const fetchedOrder = await getOrderById(orderId);
                setOrder(fetchedOrder);
            }catch (error) {
                setError(`Order ${orderId} was not found.`);
            }
            
        }        
        fetchOrder();
    }, [orderId]);

    if (error) {
        return (
            <main className={styles.container}>
                <h1>Handle order:</h1>
                <p>{error}</p>
            </main>
        );
    }

    if (!order) {
        return (
            <main className={styles.container}>
                <h1>Handle order:</h1>
                <p>Loading...</p>
            </main>
        )
    }

    function updatePhase(updatedPhase: number) {
        if (!order) {return;}
        console.log("updatedPhase", updatedPhase);
        
        const updatedOrder = { ...order, phase: orderPhases[updatedPhase] };
        setOrder(updatedOrder);
    }    

    return (
        <main className={styles.container}>
            <h1>Handle order:</h1>
            <img src={cover} className={styles.cover} alt="" />
            <Steps phase={order.phase} updatePhase = {updatePhase}/>
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
    updatePhase: (updatedPhase: number) => void;
};
function Steps({ phase, updatePhase}: StepsProps) {
    const currentStep = orderPhases.indexOf(phase);

    function isActive(step: OrderPhase) {
        return orderPhases.indexOf(step) <= currentStep;
    }

    return (
        <div className={styles.stepsContainer} style={{ "--step": currentStep }}>              
            <div className={styles.step} data-active={isActive("received")}>
                <button onClick={() => updatePhase(0)}>We got your order!</button>
            </div>
            <div className={styles.step} data-active={isActive("opened")}>
                <button onClick={() => updatePhase(1)}>The restaurant has seen your order</button>
            </div>
            <div className={styles.step} data-active={isActive("making")}>
                <button onClick={() => updatePhase(2)}>Your order is in the making</button>
            </div>
            <div className={styles.step} data-active={isActive("ready")}>
                <button onClick={() => updatePhase(3)}>The order is ready for pick-up</button> 
            </div>
            <div className={styles.step} data-active={isActive("picked-up")}>
                <button onClick={() => updatePhase(4)}>The courier is on the way with your food</button>
            </div>
            <div className={styles.step} data-active={isActive("arrived")}>
                <button onClick={() => updatePhase(5)}>Bon appetite!</button>
            </div>
        </div>
    );
}
