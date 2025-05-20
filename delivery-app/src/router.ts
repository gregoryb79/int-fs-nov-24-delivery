import { createBrowserRouter, redirect } from "react-router";
import { OrdersHistory } from "./pages/OrdersHistory";
import { NewOrder } from "./pages/NewOrder";
import { TrackOrder } from "./pages/TrackOrder";
import { App } from "./App";
import { NotFound } from "./pages/NotFound";
import { HandleOrder } from "./pages/HandleOrder";
import { LogIn } from "./pages/LogIn";
import { Register } from "./pages/Register";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, loader: () => redirect("/orders-history") },
            { path: "*", Component: NotFound },
            {
                path: "/orders-history",
                Component: OrdersHistory,                
            },
            {
                path: "/new-order",
                Component: NewOrder,               
            },
            {
                path: "/track-order/:orderId",
                Component: TrackOrder,
            },
            {
                path: "/handle-order/:orderId",
                Component: HandleOrder,
            },
            {
                path: "/login",
                Component: LogIn,
            },
            {
                path: "/register",
                Component: Register,
            },
        ],
    },
]);
