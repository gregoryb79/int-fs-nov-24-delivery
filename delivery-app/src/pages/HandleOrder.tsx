import styles from "./HandleOrder.module.scss";
import cover from "../assets/order-status-cover.jpg";
import {  orderPhases  } from "../services/orderService";
import type { OrderPhase}  from "../services/orderService";
import { Spinner } from "./components/Spinner";
import { OrderDetails } from "./components/OrderDetails";
import { useOrder } from "../hooks/useOrder";
import { useParams } from "react-router";


export function HandleOrder() {
    
    const {orderId} = useParams(); 
    if (!orderId) {
        return (
            <main className={styles.container}>
                <h1>Your order status</h1>
                <p>Order ID is missing.</p>
            </main>
        );
    }   
    const { order, error, loading, updatePhase } = useOrder(orderId); 

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
                <Spinner/>
                <p>Loading...</p>
            </main>
        );
    }   

    return (
        <main className={styles.container}>
            <h1>Handle order:</h1>
            <img src={cover} className={styles.cover} alt="" />
            {loading && <Spinner/>} 
            <Steps phase={order.phase} updatePhase={updatePhase} loading={loading} />
            <article>
                <p>Order number: <span>{order._id.slice(-8).toUpperCase()}</span></p>
                <p>Ordered from: <span>{order.restaurant}</span></p>
                <p>Ordered on: <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleString("he-IL", { dateStyle: "short", timeStyle: "short" })}</time></p>
            </article>
            <OrderDetails order={order}/>
        </main>
    );
}



type StepsProps = {
    phase: OrderPhase;
    updatePhase: (updatedPhase: number) => void;
    loading: boolean;
};
function Steps({ phase, updatePhase, loading }: StepsProps) {
    const currentStep = orderPhases.indexOf(phase);

    function isActive(step: OrderPhase) {
        return orderPhases.indexOf(step) <= currentStep;
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>, step: number) {
        if (!loading && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            updatePhase(step);
        }
    }

    return (
        <div className={styles.stepsContainer} style={{ "--step": currentStep }} aria-disabled={loading}>
            <div
                className={styles.step}
                data-active={isActive("Received")}
                onClick={() => !loading && updatePhase(0)} 
                onKeyDown={(event) => handleKeyDown(event, 0)} 
                role="button"
                tabIndex={loading ? -1 : 0} 
                aria-disabled={loading}
            >
                We got your order!
            </div>
            <div
                className={styles.step}
                data-active={isActive("Opened")}
                onClick={() => !loading && updatePhase(1)}
                onKeyDown={(event) => handleKeyDown(event, 1)}
                role="button"
                tabIndex={loading ? -1 : 0}
                aria-disabled={loading}
            >
                The restaurant has seen your order
            </div>
            <div
                className={styles.step}
                data-active={isActive("Making")}
                onClick={() => !loading && updatePhase(2)}
                onKeyDown={(event) => handleKeyDown(event, 2)}
                role="button"
                tabIndex={loading ? -1 : 0}
                aria-disabled={loading}
            >
                Your order is in the making
            </div>
            <div
                className={styles.step}
                data-active={isActive("Ready")}
                onClick={() => !loading && updatePhase(3)}
                onKeyDown={(event) => handleKeyDown(event, 3)}
                role="button"
                tabIndex={loading ? -1 : 0}
                aria-disabled={loading}
            >
                The order is ready for pick-up
            </div>
            <div
                className={styles.step}
                data-active={isActive("Picked-up")}
                onClick={() => !loading && updatePhase(4)}
                onKeyDown={(event) => handleKeyDown(event, 4)}
                role="button"
                tabIndex={loading ? -1 : 0}
                aria-disabled={loading}
            >
                The courier is on the way with your food
            </div>
            <div
                className={styles.step}
                data-active={isActive("Arrived")}
                onClick={() => !loading && updatePhase(5)}
                onKeyDown={(event) => handleKeyDown(event, 5)}
                role="button"
                tabIndex={loading ? -1 : 0}
                aria-disabled={loading}
            >
                Bon appetite!
            </div>
        </div>
    );
}
