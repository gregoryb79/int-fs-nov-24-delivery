import styles from "./HandleOrder.module.scss";
import cover from "../assets/order-status-cover.jpg";
import {  orderPhases  } from "../services/orderService";
import type { OrderPhase}  from "../services/orderService";
import { Spinner } from "./components/Spinner";
import { OrderDetails } from "./components/OrderDetails";
import { useOrder } from "../hooks/useOrder";

const timestampFormater = new Intl.DateTimeFormat("he", {
    timeStyle: "short",
    dateStyle: "short",
});

type HandleOrderProps = {
    orderId: string,    
};
export function HandleOrder({ orderId}: HandleOrderProps) {
    
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
                <p>Order number: <span>{order.id}</span></p>
                <p>Ordered from: <span>{order.restaurant}</span></p>
                <p>Ordered on: <time dateTime={order.timestamp.toString()}>{timestampFormater.format(order.timestamp)}</time></p>
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
function Steps({ phase, updatePhase, loading}: StepsProps) {
    const currentStep = orderPhases.indexOf(phase);

    function isActive(step: OrderPhase) {
        return orderPhases.indexOf(step) <= currentStep;
    }

    return (
        <div className={styles.stepsContainer} style={{ "--step": currentStep }}>              
            <div className={styles.step} data-active={isActive("received")}>
                <button disabled={loading} onClick={() => updatePhase(0)}>We got your order!</button>
            </div>
            <div className={styles.step} data-active={isActive("opened")}>
                <button disabled={loading} onClick={() => updatePhase(1)}>The restaurant has seen your order</button>
            </div>
            <div className={styles.step} data-active={isActive("making")}>
                <button disabled={loading} onClick={() => updatePhase(2)}>Your order is in the making</button>
            </div>
            <div className={styles.step} data-active={isActive("ready")}>
                <button disabled={loading} onClick={() => updatePhase(3)}>The order is ready for pick-up</button> 
            </div>
            <div className={styles.step} data-active={isActive("picked-up")}>
                <button disabled={loading} onClick={() => updatePhase(4)}>The courier is on the way with your food</button>
            </div>
            <div className={styles.step} data-active={isActive("arrived")}>
                <button disabled={loading} onClick={() => updatePhase(5)}>Bon appetite!</button>
            </div>
        </div>
    );
}
