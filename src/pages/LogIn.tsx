
import { useNavigate } from "react-router";
import { useLogIn } from "../hooks/useLogIn";
import styles from "./LogIn.module.scss";
import { Spinner } from "./components/Spinner";


export function LogIn() {
    const navigate = useNavigate();
    
    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);        
        const username = formData.get("username") as string;
        console.log("username", username);
        localStorage.setItem("userId", username);
        
        navigate(`/orders-history`);   
    }

    console.log("LogIn page");
    const {user, error, loading} = useLogIn(() => navigate(`/orders-history`));   

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


