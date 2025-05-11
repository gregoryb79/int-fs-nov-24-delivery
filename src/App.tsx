import { useState } from "react";
import { TrackOrder } from "./TrackOrder";

// 1. Create order history page (can still use mock data, but use async function)
// 2. New order page (using a form)
//    * start with hardcoded items in the order page
//    * get items from "server"
// 3. Tie it all together (save orders in local storage)
// 4. Update order details and history to show items' price and total cost etc...

export function App() {
  const [currentOrderId, setCurrentOrderId] = useState("112335");

  return (
    <>
      <menu>
        <button onClick={() => setCurrentOrderId("112335")}>112335</button>
        <button onClick={() => setCurrentOrderId("225914")}>225914</button>
        <button onClick={() => setCurrentOrderId("658891")}>658891</button>
        <button onClick={() => setCurrentOrderId("404")}>404</button>
      </menu>
      <TrackOrder orderId={currentOrderId} />
    </>
  );
}
