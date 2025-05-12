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
    id: string;
    phase: OrderPhase;
    timestamp: number;
    restaurant: string;
    items: string[];
};

export async function getOrderById(id: string): Promise<Order> {
    const orders = JSON.parse(localStorage.getItem("orders") ?? "[]");
    const order = orders.find((order: Order) => order.id === id);

    await new Promise<void>((resolve, reject) => {
        const delay = (Math.random() * 2000) + 700;

        return setTimeout(() => {
            const userId = localStorage.getItem("userId");
            if (!order) {
                reject("404");
            } else if (!userId) {
                reject("User not logged in");
            } else {
                resolve();
            }
        }, delay);
    });    
    
    if (!order) {
        throw new Error("404");
    }
    return order as Order;
}

export async function setOrderById(id: string, phase : number): Promise<void> {
    const orders = JSON.parse(localStorage.getItem("orders") ?? "[]");
    console.log("id", id);
    console.log("orders before update", orders);
    const order = orders.find((order: Order) => order.id === id);
    console.log("order before update", order.id);

    await new Promise<void>((resolve, reject) => {
        const delay = (Math.random() * 2000) + 700;       

        return setTimeout(() => {
            const userId = localStorage.getItem("userId");
            if (!orders) {
                reject("404");
            } else if (!userId) {
                reject("User not logged in");
            } else {
                resolve();
            }
        }, delay);
    });

    if (!order) {
        console.log("order not found", id);
        throw new Error("404");
    }   

    order.phase = orderPhases[phase];
    console.log("orders after update", orders);        
    localStorage.setItem("orders", JSON.stringify(orders));
   
}

export async function getOrders(): Promise<Order[]> {

    const orders = JSON.parse(localStorage.getItem("orders") ?? "[]");    

    await new Promise<void>((resolve, reject) => {
        const delay = (Math.random() * 2000) + 700;

        return setTimeout(() => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                reject("User not logged in");
            } else {
                resolve();
            }
        }, delay);
    });    
    
    if (!orders) {
        throw new Error("404");
    }
    return orders;
}

function generateOrders(){
    const orders = [
        {
            id: "112335",
            phase: "received",
            timestamp: Date.now(),
            restaurant: "McDonald's",
            items: ["Big Mac", "Fries"],
        },
        {
            id: "225914",
            phase: "opened",
            timestamp: Date.now(),
            restaurant: "Burger King",
            items: ["Whopper", "Onion Rings"],
        },
        {
            id: "658891",
            phase: "making",
            timestamp: Date.now(),
            restaurant: "KFC",
            items: ["Chicken Bucket", "Coleslaw"],
        },
        {
            id: "650091",
            phase: "picked-up",
            timestamp: Date.now(),
            restaurant: "Pizza Hut",
            items: ["Pepperoni Pizza", "Garlic Bread"],
        },
    ];
    localStorage.setItem("orders", JSON.stringify(orders));
}

const orders = JSON.parse(localStorage.getItem("orders") ?? "[]");
if (orders.length === 0) {
    generateOrders();
}