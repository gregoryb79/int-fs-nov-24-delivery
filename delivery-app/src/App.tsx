
import styles from "./App.module.scss";
import { Outlet, useNavigate} from "react-router";
import { useCheckLogIn, useDoLogOut } from "./hooks/useLogIn";
import { useState } from "react";

export function App() {  
   const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
     <>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={{ setLoggedIn }}/>
    </>
  );
}
type NavProps = {
  loggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
};
export function Nav({ loggedIn, setLoggedIn }: NavProps) {
  const navigate = useNavigate();
  function navTo (page: string) {
    navigate(`${page}`);
  };
  
  useCheckLogIn(() => setLoggedIn(true));
  const {doLogOut} = useDoLogOut(() => {setLoggedIn(false); 
                                        navTo("./login")});                                       
  return (
    <nav>
      <menu className={styles.menu}>                
        {loggedIn ? (<button onClick={doLogOut}>Log Out</button>) : <button onClick={() => navTo("./login")}>Log In</button>}
        <button onClick={() => navTo("./orders-history")}>Orders History</button>
        <button onClick={() => navTo("./new-order")}>New Order</button>
      </menu>
    </nav>
  );
}
