import { useState, type ReactNode } from "react";
import { TrackOrder } from "./pages/TrackOrder";
import { HandleOrder } from "./pages/HandleOrder";
import { LogIn } from "./pages/LogIn";
import { OrdersHistory } from "./pages/OrdersHistory";

// 1. Create order history page (can still use mock data, but use async function)
// 2. New order page (using a form)
//    * start with hardcoded items in the order page
//    * get items from "server"
// 3. Tie it all together (save orders in local storage)
// 4. Update order details and history to show items' price and total cost etc...
// 5. Implement generic useAsync hook
// 6. Solve prop-drilling and synced states problem??

export type Pages = {
  TrackOrder: ReactNode;
  HandleOrders: ReactNode;
  LogIn: ReactNode;
  OrdersHistory: ReactNode;
};

export function App() {
  const [currentOrderId, setCurrentOrderId] = useState("112335");
  const [currPage, setCurrentPage] = useState<keyof Pages>("TrackOrder"); 

  const pages = {
    TrackOrder: <TrackOrder orderId={currentOrderId}/>,
    HandleOrders: <HandleOrder orderId={currentOrderId} />,
    LogIn: <LogIn />,
    OrdersHistory: (
      <OrdersHistory setCurrentPage={setCurrentPage} setCurrentOrderId={setCurrentOrderId}/>
    ),
  };

  return (
    <>
      <menu>        
        <button onClick={() => setCurrentPage("TrackOrder")}>Track Order</button>
        <button onClick={() => setCurrentPage("HandleOrders")}>HandleOrders</button>
        <button onClick={() => setCurrentPage("LogIn")}>Log In</button>
        <button onClick={() => setCurrentPage("OrdersHistory")}>Orders History</button>
      </menu>
      {pages[currPage] || <p>Ooops, something went wrong...</p>}
    </>
  );
}
