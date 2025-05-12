import { useState, useEffect } from "react";
import { getOrderById, setOrderById, orderPhases } from "../services/orderService";
import type { Order } from "../services/orderService";

export function useOrder(orderId: string) {
    const [order, setOrder] = useState<Order | undefined>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        let isCanceled = false;

        async function fetchOrder() {
            setOrder(undefined);
            setError(undefined);
            setLoading(true);

            try {
                const fetchedOrder = await getOrderById(orderId);
                if (!isCanceled) {
                    setOrder(fetchedOrder);
                }
            } catch (error) {
                if (!isCanceled) {
                    if (error === "404") {
                        setError(`Order ${orderId} was not found.`);
                    } else if (error === "User not logged in") {
                        setError("User not logged in. Please log in to handle orders.");
                    }
                }
            } finally {
                if (!isCanceled) {
                    setLoading(false);
                }
            }
        }

        fetchOrder();

        return () => {
            isCanceled = true;
        };
    }, [orderId]);

    async function updatePhase(updatedPhase: number) {
        if (!order) return;

        console.log("updatedPhase", updatedPhase);

        const updatedOrder = { ...order, phase: orderPhases[updatedPhase] };
        setOrder(updatedOrder);

        setLoading(true);

        try {
            await setOrderById(orderId, updatedPhase);
        } catch (error) {
            if (error === "404") {
                setError(`Order ${orderId} was not found.`);
            }
        } finally {
            setLoading(false);
        }
    }

    return { order, loading, error, updatePhase };
}