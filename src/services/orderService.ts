export const orderPhases = [
    "received",
    "opened",
    "making",
    "ready",
    "picked-up",
    "arrived",
] as const;

export type OrderPhase = typeof orderPhases[number];

export type OrderItem = {
    name: string; 
    quantity: number;
    price: number;
};

export type Order = {
    id: string; 
    phase: OrderPhase; 
    timestamp: number; 
    restaurant: string; 
    items: OrderItem[]; 
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

function generateOrders() {
    const orders = [
        {
            id: "112335",
            phase: "received",
            timestamp: Date.now(),
            restaurant: "McDonald's",
            items: [
                { name: "Big Mac", quantity: 2, price: 5.99 },
                { name: "Fries", quantity: 1, price: 2.99 },
            ],
        },
        {
            id: "225914",
            phase: "opened",
            timestamp: Date.now(),
            restaurant: "Burger King",
            items: [
                { name: "Whopper", quantity: 1, price: 6.99 },
                { name: "Onion Rings", quantity: 2, price: 3.49 },
            ],
        },
        {
            id: "658891",
            phase: "making",
            timestamp: Date.now(),
            restaurant: "KFC",
            items: [
                { name: "Chicken Bucket", quantity: 1, price: 12.99 },
                { name: "Coleslaw", quantity: 3, price: 1.99 },
            ],
        },
        {
            id: "650091",
            phase: "picked-up",
            timestamp: Date.now(),
            restaurant: "Pizza Hut",
            items: [
                { name: "Pepperoni Pizza", quantity: 1, price: 14.99 },
                { name: "Garlic Bread", quantity: 2, price: 4.99 },
            ],
        },
    ];
    localStorage.setItem("orders", JSON.stringify(orders));
}

const orders = JSON.parse(localStorage.getItem("orders") ?? "[]");
if (orders.length === 0) {
    generateOrders();
}