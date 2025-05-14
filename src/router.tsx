import { createBrowserRouter } from "react-router";
import { OrderHistory } from "./pages/OrderHistory";
import { NewOrder } from "./pages/NewOrder";
import { TrackOrder } from "./pages/TrackOrder";
import { AboutUs } from "./pages/AboutUs";
import { Page404 } from "./pages/Page404";

export const router = createBrowserRouter([
    { path: "/order-history", Component: OrderHistory },
    { path: "/new-order", Component: NewOrder },
    { path: "/track-order/:orderId", Component: TrackOrder },
    { path: "/about-us", Component: AboutUs },
    { path: "/", Component: OrderHistory },
    { path: "*", Component: Page404 },
]);
