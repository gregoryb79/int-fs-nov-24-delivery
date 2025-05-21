
import styles from "./NotFound.module.scss";

export function NotFound() {
    

    return (
        <main className={styles.container}>
            <h1>Sorry</h1>
            <h3>The page you are asking for is not found.</h3>
            <h3>Something went wrong, try again...</h3>
        </main>
    );
}


