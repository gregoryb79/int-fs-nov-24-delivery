import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Main } from "../../../int-fs-nov-24-delivery-1/src/components/Main";
import { listOrders, timestampFormater, type OrderList } from "../../../int-fs-nov-24-delivery-1/src/models/order";

import styles from "./OrderHistory.module.scss";

export function Page404() {
    
    return (
        <Main>
            <h1>Sorry</h1>
            <h3>Something went wrong...</h3>            
        </Main>
    );
}
