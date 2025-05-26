import { createBrowserRouter, redirect } from "react-router";

import { App } from "./App";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { OrderHistory } from "./pages/OrderHistory";
import { NewOrder } from "./pages/NewOrder";
import { TrackOrder } from "./pages/TrackOrder";
import { NotFound } from "./pages/NotFound";

import { getToken } from "./models/apiClient";
import { getItems } from "./models/item";
import { getOrderById, listOrders } from "./models/order";
import { HandleAuthorizationError } from "./HandleAuthorizationError";
import { HandleOrderNotFoundError } from "./HandleOrderNotFoundError";

export const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login,
        loader: redirectHomeLoggedInUsers,
    },
    {
        path: "/register",
        Component: Register,
        loader: redirectHomeLoggedInUsers,
    },
    {
        path: "/",
        Component: App,
        loader: () => {
            if (!getToken()) {
                return redirect("/login");
            }
        },
        ErrorBoundary: HandleAuthorizationError,
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
                ErrorBoundary: HandleOrderNotFoundError,
            },
        ],
    },
]);

function redirectHomeLoggedInUsers() {
    if (getToken()) {
        return redirect("/");
    }
}

