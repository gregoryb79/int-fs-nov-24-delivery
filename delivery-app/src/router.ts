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

function requireAuth() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw redirect("/login");
  }
  return null;
}

function redirectIfLoggedIn() {
  const token = sessionStorage.getItem("token");
  if (token) {
    throw redirect("/");
  }
  return null;
}

export const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login,
        loader: redirectIfLoggedIn,
    },
    {
        path: "/register",
        Component: Register,
        loader: redirectIfLoggedIn,
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
                    requireAuth();
                    return listOrders();
                },
            },
            {
                path: "/new-order",
                Component: NewOrder,
                loader() {
                    requireAuth();
                    return getItems();
                },
            },
            {
                path: "/track-order/:orderId",
                Component: TrackOrder,
                loader({ params }) {
                    requireAuth();
                    return getOrderById(params.orderId as string);
                },
            },
        ],
    },
]);
