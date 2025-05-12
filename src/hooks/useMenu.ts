import { useEffect, useState } from "react";
import { getMenu, type MenuItem } from "../services/menuService";

export function useMenu(){
     const [menu, setMenu] = useState<MenuItem[]>();
      const [error, setError] = useState<string>();
    
      useEffect(() => {
        let isCanceled = false;
    
        async function fetchMenu() {
          setMenu(undefined);
          setError(undefined);
    
          try {
            const fetchedMenu = await getMenu();
    
            if (!isCanceled) {
                setMenu(fetchedMenu);
            }
          } catch (error) {
            if (error === "User not logged in") {
              setError("User not logged in. Please log in to create order.");
            }
          }
        }
        fetchMenu();
    
        return () => {
          isCanceled = true;
        };
      }, []);

      return { menu, error };
}