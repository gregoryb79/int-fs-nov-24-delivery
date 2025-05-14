import { useState, type MouseEvent } from "react";
import { TrackOrder } from "./pages/TrackOrder";
import { OrderHistory } from "./pages/OrderHistory";
import { NewOrder } from "./pages/NewOrder";

import styles from "./App.module.scss";

type AppPage =
  | "order-history"
  | "track-order"
  | "new-order";

export function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("order-history");
  const [currentOrderId] = useState<string>();

  return (
    <>
      <Nav onLinkClick={setCurrentPage} />
      <Main
        page={currentPage}
        currentOrderId={currentOrderId}
      />
    </>
  );
}

type NavProps = { onLinkClick: (page: AppPage) => void };
function Nav({ onLinkClick }: NavProps) {
  const navTo = (page: AppPage) => (e: MouseEvent) => {
    e.preventDefault();
    onLinkClick(page);
  };

  return (
    <nav>
      <menu className={styles.appNav}>
        <li><a href="#" onClick={navTo("order-history")}>Order history</a></li>
        <li><a href="#" onClick={navTo("new-order")}>New order</a></li>
      </menu>
    </nav>
  );
}

type MainProps = {
  page: AppPage,
  currentOrderId?: string,
};
function Main({ page, currentOrderId }: MainProps) {
  switch (page) {
    case "order-history": return <OrderHistory />;
    case "track-order":
      if (!currentOrderId) {
        return <p>error</p>;
      }

      return <TrackOrder />;
    case "new-order": return <NewOrder />;
  }
}
