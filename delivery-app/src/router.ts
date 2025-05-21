import { createBrowserRouter, redirect } from "react-router";

import { App } from "./App";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { OrderHistory } from "./pages/OrderHistory";
import { NewOrder } from "./pages/NewOrder";
import { TrackOrder } from "./pages/TrackOrder";
import { NotFound } from "./pages/NotFound";

import { getItems } from "./models/item";
import { getOrderById, listOrders } from "./models/order";

export const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login,
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
