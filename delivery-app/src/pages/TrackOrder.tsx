import styles from "./TrackOrder.module.scss";
import cover from "../assets/order-status-cover.jpg";
import { orderPhases  } from "../services/orderService";
import type { OrderPhase}  from "../services/orderService";
import { Spinner } from "./components/Spinner";
import { OrderDetails } from "./components/OrderDetails";
import { useOrder } from "../hooks/useOrder";
import { useParams } from "react-router";

export function TrackOrder() {
    // const [order, setOrder] = useState<Order>();
    // const [error, setError] = useState<string>();  
    const {orderId} = useParams(); 
    if (!orderId) {
        return (
            <main className={styles.container}>
                <h1>Your order status</h1>
                <p>Order ID is missing.</p>
            </main>
        );
    }    
    const {order, error} = useOrder(orderId); 

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
                <Spinner/>
                <p>Loading...</p>
            </main>
        )
    }

    return (
        <main className={styles.container}>
            <h1>Your order status</h1>
            {/* {loading && <Spinner/>}  */}
            <img src={cover} className={styles.cover} alt="" />
            <Steps phase={order.phase} />
            <article>
                <p>Order number: <span>{order._id}</span></p>
                <p>Ordered from: <span>{order.restaurant}</span></p>
                <p>Ordered on: <time dateTime={order.createdAt.toLocaleString()}></time></p>
            </article>
            <OrderDetails order={order} />            
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
            <div className={styles.step} data-active={isActive("Received")}>We got your order!</div>
            <div className={styles.step} data-active={isActive("Opened")}>The restaurant has seen your order</div>
            <div className={styles.step} data-active={isActive("Making")}>Your order is in the making</div>
            <div className={styles.step} data-active={isActive("Ready")}>The order is ready for pick-up</div>
            <div className={styles.step} data-active={isActive("Picked-up")}>The courier is on the way with your food</div>
            <div className={styles.step} data-active={isActive("Arrived")}>Bon appetite!</div>
        </div>
    );
}
