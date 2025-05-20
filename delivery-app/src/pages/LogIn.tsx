
import { useNavigate, Link } from "react-router";
import { useCheckLogIn, useDoLogIn } from "../hooks/useLogIn";
import styles from "./LogIn.module.scss";
import { Spinner } from "./components/Spinner";


export function LogIn() {
    const navigate = useNavigate();
    
    
    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);        
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        console.log(`username = ${username}, password = ${password}`);
        doLogIn(username, password);
    }

    console.log("LogIn page");
    const {error, loading: loadingCheck} = useCheckLogIn(() => navigate(`/orders-history`));
    const { error: errorLogIn, loading: loadingLogin, doLogIn } = useDoLogIn(() => navigate(`/orders-history`));   
    const isLoading = loadingLogin || loadingCheck;

    return (
        <main className={styles.container}>
            <h1>Log In</h1>
            {isLoading && <Spinner/>} 
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input disabled={isLoading} type="text" id="username" name="username" required />
                <label htmlFor="password">Password:</label>
                <input disabled={isLoading} type="password" id="password" name="password" required />
                <button disabled={isLoading} type="submit">Log In</button>
                <p className={styles.registerLine}>Don't have a user? <Link to="/register" onClick={e => isLoading && e.preventDefault()}>Register</Link>.</p>
            </form>
        </main>
    );
}


