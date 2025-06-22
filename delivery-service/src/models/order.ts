import { dbClient } from "./db";

type Order = {
    id: string,
    orderingUserId: string,
    phase: string,
    restaurant: string,
    items: { itemId: string, quantity: number }[],
    createdAt: number,
    lastUpdatedAt: number,
};

export function createOrder(order: Order) {
    return dbClient.executeMultiple(`
INSERT INTO orders (id, orderingUserId, phase, restaurant, createdAt, lastUpdatedAt)
VALUES ("${order.id}", "${order.orderingUserId}", "${order.phase}", "${order.restaurant}", ${order.createdAt}, ${order.lastUpdatedAt});

INSERT INTO orderItems
(orderId, itemId, quantity)
VALUES
${order.items.map(({ itemId, quantity }) => `("${order.id}", "${itemId}", ${quantity})`).join(",\n")};
        `);
}

export async function listOrders(userId: string) {
    const res = await dbClient.execute(`SELECT * FROM orders WHERE orderingUserId = "${userId}"`);

    return res.rows;
}

export async function getOrderDetails(orderId: string) {
    const res = await dbClient.execute({
        sql: `
        SELECT *
        FROM orders
        LEFT JOIN orderItems
        ON orders.id = orderId
        LEFT JOIN items
        ON itemId = items.id
        WHERE orders.id = $1
        `,
        args: [orderId],
    });
    
    return {
        id: res.rows[0].id,
        phase: res.rows[0].phase,
        restaurant: res.rows[0].restaurant,
        createdAt: res.rows[0].createdAt,
        lastUpdatedAt: res.rows[0].lastUpdatedAt,
        items: res.rows.map(({ name, description, previewImageUrl, priceInAgorot, quantity }) => ({
            item: {
                name,
                description,
                previewImageUrl,
                priceInAgorot,
            },
            quantity,
        })),
    };
}
