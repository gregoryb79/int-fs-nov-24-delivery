
import styles from "./App.module.scss";
import { Outlet, useNavigate} from "react-router";

// 1. Create order history page (can still use mock data, but use async function)
// 2. New order page (using a form)
//    * start with hardcoded items in the order page
//    * get items from "server"
// 3. Tie it all together (save orders in local storage)
// 4. Update order details and history to show items' price and total cost etc...
// 5. Implement generic useAsync hook
// 6. Solve prop-drilling and synced states problem??



export function App() {  

  return (
     <>
      <Nav />
      <Outlet />
    </>
  );
}

export function Nav() {
  const navigate = useNavigate();
  function navTo (page: string) {
    navigate(`${page}`);
  };

  return (
    <nav>
      <menu className={styles.menu}>                
        <button onClick={() => navTo("./login")}>Log In</button>
        <button onClick={() => navTo("./orders-history")}>Orders History</button>
        <button onClick={() => navTo("./new-order")}>New Order</button>
      </menu>
    </nav>
  );
}
