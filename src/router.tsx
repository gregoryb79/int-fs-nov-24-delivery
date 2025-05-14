import { createBrowserRouter } from "react-router";
import { OrderHistory } from "./pages/OrderHistory";
import { NewOrder } from "./pages/NewOrder";
import { TrackOrder } from "./pages/TrackOrder";

export const router = createBrowserRouter([
    { path: "/order-history", Component: OrderHistory },
    { path: "/new-order", Component: NewOrder },
    { path: "/track-order/:orderId", Component: TrackOrder },
]);
