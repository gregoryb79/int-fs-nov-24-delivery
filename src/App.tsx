import { useState } from "react";
import { TrackOrder } from "./TrackOrder";
import { HandleOrder } from "./HandleOrder";


export function App() {
  const [currentOrderId, setCurrentOrderId] = useState("112335");
  const [currPage, setCurrentPage] = useState("TrackOrder");

  const renderPage = () => {
    switch (currPage) {
      case "TrackOrder":
        return <TrackOrder orderId={currentOrderId} />;
      case "HandleOrders":
        return <HandleOrder orderId={currentOrderId} />;      
    }
  };

  return (
    <>
      <menu>
        <button onClick={() => setCurrentOrderId("112335")}>112335</button>
        <button onClick={() => setCurrentOrderId("225914")}>225914</button>
        <button onClick={() => setCurrentOrderId("658891")}>658891</button>
        <button onClick={() => setCurrentOrderId("404")}>404</button>
        <button onClick={() => setCurrentPage("TrackOrder")}>Track Order</button>
        <button onClick={() => setCurrentPage("HandleOrders")}>HandleOrders</button>
      </menu>
      {renderPage()}
    </>
  );
}
