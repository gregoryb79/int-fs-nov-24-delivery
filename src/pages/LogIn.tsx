import type { Pages } from "../App";
import { useLogIn } from "../hooks/useLogIn";
import styles from "./LogIn.module.scss";
import { Spinner } from "./components/Spinner";

type LogInProps = {
    setCurrentPage: (page: keyof Pages) => void;}
export function LogIn({ setCurrentPage }: LogInProps) {
    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);        
        const username = formData.get("username") as string;
        console.log("username", username);
        localStorage.setItem("userId", username);
        setCurrentPage("OrdersHistory");
    }

    console.log("LogIn page");
    const {user, error, loading} = useLogIn(() => setCurrentPage("OrdersHistory"));   

    return (
        <main className={styles.container}>
            <h1>Log In</h1>
            {loading && <Spinner/>} 
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input disabled={loading} type="text" id="username" name="username" required />
                <label htmlFor="password">Password:</label>
                <input disabled={loading} type="password" id="password" name="password" required />
                <button disabled={loading} type="submit">Log In</button>
            </form>
        </main>
    );
}


