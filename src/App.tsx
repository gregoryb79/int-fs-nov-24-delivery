import { useState } from "react";
import { TrackOrder } from "./TrackOrder";

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
