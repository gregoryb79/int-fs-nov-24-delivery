import { createBrowserRouter } from "react-router";
import { OrderHistory } from "./pages/OrderHistory";
import { NewOrder } from "./pages/NewOrder";
import { TrackOrder } from "./pages/TrackOrder";
import { App } from "./App";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { path: "*", Component: NotFound },
            { path: "/order-history", Component: OrderHistory },
            { path: "/new-order", Component: NewOrder },
            { path: "/track-order/:orderId", Component: TrackOrder },
        ],
    },
]);
