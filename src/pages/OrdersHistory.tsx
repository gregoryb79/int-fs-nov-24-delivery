import { Spinner } from "./components/Spinner";
import styles from "./OrdersHistory.module.scss";
import type { Pages } from "../App";
import { useOrders } from "../hooks/useOrders";

type OrdersHistoryProps = {
  setCurrentPage: (page: keyof Pages) => void;
  setCurrentOrderId: (orderId: string) => void;
};

export function OrdersHistory({ setCurrentPage, setCurrentOrderId }: OrdersHistoryProps) {

  const {orders, error} = useOrders(); 

  if (error) {
    return (
      <main className={styles.container}>
        <h1>Orders History:</h1>
        <p>{error}</p>
      </main>
    );
  }

  if (!orders) {
    return (
      <main className={styles.container}>
        <h1>Orders History:</h1>
        <Spinner />
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1>Orders History</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <h2>Order ID: {order.id}</h2>
            <p>Restaurant: {order.restaurant}</p>
            <p>Status: {order.phase}</p>
            <p>Timestamp: {new Date(order.timestamp).toLocaleString()}</p>
            <button onClick={() => {setCurrentOrderId(order.id); setCurrentPage("TrackOrder");}}>
              Track
            </button>
            <button onClick={() => {setCurrentOrderId(order.id); setCurrentPage("HandleOrders");}}>
              Handle
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}