import { createBrowserRouter, redirect } from "react-router";
import { OrderHistory } from "./pages/OrderHistory";
import { NewOrder } from "./pages/NewOrder";
import { TrackOrder } from "./pages/TrackOrder";
import { LogIn } from "./pages/LogIn";
import { Register } from "./pages/Register";
import { App } from "./App";
import { NotFound } from "./pages/NotFound";
import { getOrderById, listOrders } from "./models/order";
import { getItems } from "./models/item";

export const router = createBrowserRouter([
    {
    path: "/login",
    Component: LogIn,                
    },
    {
        path: "/register",
        Component: Register,  
    },
    {
        path: "/",
        Component: App,
        children: [
            { index: true, loader: () => redirect("/order-history") },
            { path: "*", Component: NotFound },
            {
                path: "/order-history",
                Component: OrderHistory,
                loader() {
                    return listOrders();
                },
            },
            {
                path: "/new-order",
                Component: NewOrder,
                loader() {
                    return getItems();
                },
            },
            {
                path: "/track-order/:orderId",
                Component: TrackOrder,
                loader({ params }) {
                    return getOrderById(params.orderId as string);
                },
            },
           
        ],
    },
]);
