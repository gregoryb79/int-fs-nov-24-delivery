
import { Link } from "react-router";
import styles from "./NavMenu.module.scss";

export function NavMenu() {  

  return (
    <nav>
      <menu className={styles.menu}>
        <li><Link to={`/order-history`}>Order history</Link></li>
        <li><Link to={`/new-order`}>New order</Link></li>        
      </menu>
    </nav>
  );
}