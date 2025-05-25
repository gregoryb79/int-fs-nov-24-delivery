import type { Item } from "./item";
import {api} from "./api";

export const orderPhases = [
    "received",
    "opened",
    "making",
    "ready",
    "picked-up",
    "arrived",
] as const;

export type OrderPhase = typeof orderPhases[number];

export type Order = {
    _id: string,
    phase: OrderPhase,
    createdAt: string,
    restaurant: string,
    items: { item: Item, quantity: number }[],
};

export type OrderList = Omit<Order, "items">[];

export async function listOrders(): Promise<OrderList> {
    const res = await api.get("/orders");

    return res.data as OrderList;
}

export async function getOrderById(id: string): Promise<Order> {
    
    try {
        const res = await api.get(`/orders/${id}`);  
        return res.data as Order;
    }catch (error) {
        console.error(error);
        throw new Error("Failed to fetch order details");
    }
}

export const timestampFormater = new Intl.DateTimeFormat("he", {
    timeStyle: "short",
    dateStyle: "short",
});
