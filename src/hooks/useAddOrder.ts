import { useState } from "react";
import { addOrder as addOrderService, type Order } from "../services/orderService";

export function useAddOrder() {
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);

    async function addOrder(order: Order) {
        setError(undefined);
        setLoading(true);

        try {
            await addOrderService(order);
        } catch (error) {
            if (error === "User not logged in") {
                setError("User not logged in. Please log in to create order.");
            }
        }finally {
            setLoading(false);
        }
    }

    return { addOrder, error, loading };
}