import { useEffect, useState } from "react";
import { useMenu } from "../hooks/useMenu";
import { clearLocalOrder, createLocalOrder, updateItemAtLocalOrder, type Order } from "../services/orderService";
import { OrderDetails } from "./components/OrderDetails";
import { Spinner } from "./components/Spinner";
import styles from "./NewOrder.module.scss";
import { useAddOrder } from "../hooks/useAddOrder";
import { useNavigate } from "react-router";

export function NewOrder() {    
    const [currOrder, setOrder] = useState<Order>();
    const {menu, error : useMenuError} = useMenu(); 
    const {addOrder, error: addOrderError, loading } = useAddOrder();
    console.log("new order");

    useEffect(() => {
        console.log("creating new order or getting one in progress from local storage");
        setOrder(createLocalOrder());
    }, []);   

    const navigate = useNavigate();
    function navTo (page: string) {
        navigate(`/${page}`);
    };
    
    if (useMenuError) {
        return (
        <main className={styles.container}>
            <h1>New Order</h1>
            <p>{useMenuError}</p>
        </main>
        );
    }
    
    if (!menu) {
        return (
        <main className={styles.container}>
            <h1>New Order</h1>
            <Spinner />
            <p>Loading...</p>
        </main>
        );
    }    
    
    return (
        <main className={styles.container}>
            <h1>New Order</h1>
            <h3>Menu</h3>
            {loading && <Spinner/>} 
            <ul>
                {menu.map((menuItem) => (
                <li key={menuItem.id}>
                    <img src={menuItem.imgSource} alt={menuItem.name} />
                    <p>{menuItem.name} - ${menuItem.price.toFixed(2)}</p> 
                    <section>
                        <button onClick={() => currOrder && setOrder(updateItemAtLocalOrder(menuItem,+1))}>
                            ➕
                        </button>
                        <button onClick={() => currOrder && setOrder(updateItemAtLocalOrder(menuItem,-1))}>
                            ➖
                        </button> 
                    </section>               
                                   
                </li>
                ))}
            </ul>
            <h3>Your Order:</h3>
            {currOrder?.items.length ? (<OrderDetails order={currOrder} />) 
            : (<p>No items in your order yet.</p>)}
            <button onClick={async () => {
                currOrder && await addOrder(currOrder);                 
                navTo("/orders-history");
                currOrder && clearLocalOrder();                 
            }}>Submit Order</button>
        </main>
    );
}