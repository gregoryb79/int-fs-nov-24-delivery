import { Spinner } from "./components/Spinner";
import styles from "./OrdersHistory.module.scss";
import { useOrders } from "../hooks/useOrders";
import { useNavigate } from "react-router";

export function OrdersHistory() {

  const {orders, error} = useOrders(); 
  const navigate = useNavigate();
    function navTo (page: string) {
        navigate(`/${page}`);
    };

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
            <button onClick={() => {navTo(`./track-order/${order.id}`);}}>
              Track
            </button>
            <button onClick={() => {navTo(`./handle-order/${order.id}`);}}>
              Handle
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}