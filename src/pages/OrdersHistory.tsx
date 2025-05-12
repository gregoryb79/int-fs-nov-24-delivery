import { useEffect, useState } from "react";
import { getOrders, type Order } from "../services/orderService";
import { Spinner } from "./components/Spinner";
import styles from "./OrdersHistory.module.scss";
import type { Pages } from "../App";

type OrdersHistoryProps = {
  setCurrentPage: (page: keyof Pages) => void;
  setCurrentOrderId: (orderId: string) => void;
};

export function OrdersHistory({ setCurrentPage, setCurrentOrderId }: OrdersHistoryProps) {
  const [orders, setOrders] = useState<Order[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    let isCanceled = false;

    async function fetchOrders() {
      setOrders(undefined);
      setError(undefined);

      try {
        const fetchedOrders = await getOrders();

        if (!isCanceled) {
          setOrders(fetchedOrders);
        }
      } catch (error) {
        if (error === "User not logged in") {
          setError("User not logged in. Please log in to handle orders.");
        }
      }
    }
    fetchOrders();

    return () => {
      isCanceled = true;
    };
  }, []);

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