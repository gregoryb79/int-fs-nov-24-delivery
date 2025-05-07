import styles from "./OrderItem.module.scss";

type OrderItemProps = {
    sourceRest: string;    
    sourceAddress: string;
    clientName: string;
    clientAddress: string;
    status: "cooking" | "awaiting pick up" | "on the way" | "delivered";
    updatedAt: string;
};
export function OrderItem({sourceRest, sourceAddress, clientName, clientAddress, status, updatedAt}: OrderItemProps) {
    return(
        <article className={styles.container}>
            <h4>
                Ordered from: {sourceRest}
            </h4>
            <p>
                {sourceAddress}
            </p>
            <h4>
                Deliver To: {clientName}
            </h4>
            <p>
                {clientAddress}
            </p>
            <section className={styles.status}>
                <span >
                   Status: {status}
                </span>
                <span >
                   Last Updated: {updatedAt}
                </span>
            </section>
            
        </article>
    );
}