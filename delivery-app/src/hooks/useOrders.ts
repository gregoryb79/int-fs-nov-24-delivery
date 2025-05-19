import { useEffect, useState } from "react";
import { getOrders, type Order } from "../services/orderService";

export function useOrders(){
     const [orders, setOrders] = useState<Order[]>();
      const [error, setError] = useState<string>();
    
      useEffect(() => {
        let isCanceled = false;
    
        async function fetchOrders() {
          setOrders(undefined);
          setError(undefined);
    
          try {
            const fetchedOrders = await getOrders();
            console.log("fetchedOrders", fetchedOrders);
    
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

      return { orders, error };
}