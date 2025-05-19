import type { MenuItem } from "./menuService";

export const orderPhases = [
    "Received",
    "Opened",
    "Making",
    "Ready",
    "Picked-up",
    "Arrived",
] as const;

export type OrderPhase = typeof orderPhases[number];

export type OrderItem = {
    _id: string;
    name: string; 
    quantity: number;
    price: number;
};

export type Order = {
    _id: string; 
    phase: OrderPhase;     
    restaurant: string; 
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
};



export async function getOrderById(id: string): Promise<Order> {
    console.log("getting order by id", id);

    try {
        const res = await fetch(`http://localhost:5000/orders/${id}`);
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to fetch order. Status: ${res.status}. Message: ${message}`);
        }
        const receivedOrder = await res.json();
        const items: OrderItem[] = receivedOrder.items.map((item: any) => 
            ({...item._id, quantity: item.quantity}));
        const order: Order = {
            _id: receivedOrder._id,
            phase: receivedOrder.phase,
            restaurant: receivedOrder.restaurant,
            items,
            createdAt: receivedOrder.createdAt,
            updatedAt: receivedOrder.updatedAt,
        };            
        
        console.log("order from server", order);
        if (order) {
            return order;
        } else {
            throw new Error("Order not found on server");
        }
    } catch (error) {
        console.error("Error fetching order:", error);
        return Promise.reject(error);
    }
}

export async function setOrderById(id: string, phase : number): Promise<void> {
    const orders = JSON.parse(localStorage.getItem("orders") ?? "[]");
    console.log("id", id);
    console.log("orders before update", orders);
    const order = orders.find((order: Order) => order._id === id);
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

type orderItemToStore = Omit<OrderItem, "name"|"price">;
export async function addOrder(newOrder: Order): Promise<void> {
    
     const orderToAdd: orderItemToStore[] = newOrder.items.map(item => ({
        _id: item._id,
        quantity: item.quantity,
    }));

    try {
        const res = await fetch("http://localhost:5000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: orderToAdd,                
                restaurant: newOrder.restaurant,
            }),
        });
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to create new order. Status: ${res.status}. Message: ${message}`);
        }  
    } catch (error) {
        console.error("Error creating new order:", error);     
    }
}

export async function getOrders(): Promise<Order[]> {

    console.log("getting orders from server");

    try {
        const res = await fetch("http://localhost:5000/orders");
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to fetch orders. Status: ${res.status}. Message: ${message}`);
        } 
        const orders: Order[] = await res.json();
        console.log("orders from server", orders);
        if (orders.length > 0) {
            return orders;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching orders:", error); 
        return [];   
    }    
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

export function createLocalOrder() : Order{  
    const localOrder = JSON.parse(localStorage.getItem("NewLocalOrder") ?? "null");
    console.log("localOrder", localOrder);
    if (localOrder && localOrder.items.length > 0) {
        console.log("existing localOrder found", localOrder);
        return localOrder;
    }  
    const newOrder: Order = {
        _id: Date.now().toString(),
        phase: "Received",
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
        restaurant: "Nice Restaurant",
        items: [],
    };
    localStorage.setItem("NewLocalOrder", JSON.stringify(newOrder));
    return newOrder;    
}

export function updateItemAtLocalOrder(item: MenuItem, change: number) : Order{
    const localOrder = JSON.parse(localStorage.getItem("NewLocalOrder") ?? "[]");
    console.log("localOrder items at start", localOrder.items);
    console.log("item to add", item);

    if (!localOrder) {
        throw new Error("Order not found");
    }
    const existingItem = localOrder.items.find((i: OrderItem) => i.name === item.name);
    if (existingItem) {
        existingItem.quantity += change;
        if (existingItem.quantity <= 0) {
            localOrder.items = localOrder.items.filter((i: OrderItem) => i.name !== item.name);
        }
    }
    else if (change > 0) {
        console.log("adding new item", item);
        const newItem: OrderItem = {
            _id: item._id,
            name: item.name,
            quantity: 1,
            price: item.price,
        };        
        localOrder.items.push(newItem);
    }    
    console.log("localOrder items at end", localOrder.items);    
    localStorage.setItem("NewLocalOrder", JSON.stringify(localOrder));   
    return localOrder;
}

export function clearLocalOrder() {
    localStorage.removeItem("NewLocalOrder");
}