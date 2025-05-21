import { Link, Outlet } from "react-router";

import styles from "./App.module.scss";

export function App() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export function Nav() {
  return (
    <nav>
      <menu className={styles.appNav}>
        <li><Link to="/order-history">Order history</Link></li>
        <li><Link to="/new-order">New order</Link></li>
        <li><Link to="/login">Log In</Link></li>
        <li><Link to="/register">Register</Link></li>
      </menu>
    </nav>
  );
}
