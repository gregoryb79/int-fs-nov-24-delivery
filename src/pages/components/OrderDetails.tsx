import type { Order } from "../../services/orderService";

type OrderDetailsProps = {
    order: Order;
}
export function OrderDetails({ order }: OrderDetailsProps) {
    return (
        <details>
            <summary>Order details</summary>
            <ul>
                {order.items.map((item, index) => (
                    <li key={index}>
                        {item.name}: {item.quantity} × ${item.price.toFixed(2) } = ${item.quantity * item.price}
                    </li>
                ))}
            </ul>
            <p>Total: ${order.items.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2)}</p>
        </details>
    );
}