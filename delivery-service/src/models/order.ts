// import { Schema, model } from "mongoose";

// const schema = new Schema({
//     phase: {
//         type: String,
//         enum: [
//             "received",
//             "opened",
//             "making",
//             "ready",
//             "picked-up",
//             "arrived",
//         ],
//         required: true,
//     },
//     restaurant: {
//         type: String,
//         require: true,
//     },
//     items: {
//         require: true,
//         type: [{
//             itemId: {
//                 type: Schema.Types.ObjectId,
//                 ref: 'Item',
//                 required: true,
//             },
//             quantity: {
//                 type: Number,
//                 required: true,
//             }
//         }]
//     },
// }, { timestamps: true });

// export const Order = model("Order", schema);
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
    id: string,
    phase: OrderPhase,
    createdAt: string,
    restaurant: string,  
    items: { id: string, quantity: number }[]  
};

// export type Item = {
//     id: string,
//     name: string,
//     description: string,
//     previewImageUrl: string,
//     priceInAgorot: number,
// };

import { client } from "./sqlSetup";

export async function getAllOrders() {
    try {
        const result = await client.execute("SELECT * FROM orders");
        console.log("SQL query getAllOrders executed successfully");
        return result.rows;
    } catch (error) {
        console.error("Error executing SQL query:", error);
        throw error; 
    }    
}

export async function getOrderById(id: string) {
    try {
        const orderItems = await client.execute(`SELECT * FROM orderItems WHERE orderId = ${id}`);
        console.log(`SQL query orderItems executed successfully for id: ${id}`);
        console.log(orderItems.rows)
        const order = await client.execute(`SELECT * FROM orders WHERE orderId = ${id}`);
        console.log(order.rows[0]);
        return []; 
    } catch (error) {
        console.error("Error executing SQL query:", error);
        throw error; 
    }
}

export async function createOrder(order: Order, userId: string) {
    const orderId = crypto.randomUUID();
    console.log(`Creating order with id: ${orderId} for user: ${userId}`);
    console.log("Order details:", order);
    try {        
        await client.execute(
          `INSERT INTO orders (id, orderingUserId, phase, restaurant, createdAt, lastUpdatedAt)
           VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
          [orderId, userId, order.phase, order.restaurant]
        );        
        console.log("Order created in orders table");

        if (order.items.length > 0) {
          const placeholders = order.items.map(() => "(?, ?, ?)").join(", ");
          console.log("Inserting items into orderItems table with placeholders:", placeholders);
          const values = order.items.flatMap(item => [orderId, item.id, item.quantity]);
          console.log("Inserting items into orderItems table with values:", values);
          await client.execute(
            `INSERT INTO orderItems (orderId, itemId, quantity) VALUES ${placeholders}`,
            values
          );
        }
        console.log("items created in orderItems table");

        console.log(`SQL query createOrder executed successfully for orderId: ${orderId}`);

        
    } catch (error) {
        console.error("Error executing SQL query:", error);
        throw error; 
    }
}