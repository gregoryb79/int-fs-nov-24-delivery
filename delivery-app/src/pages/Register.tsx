
import { useNavigate, Link } from "react-router";
import { useCheckLogIn, useDoRegister } from "../hooks/useLogIn";
import styles from "./LogIn.module.scss";
import { Spinner } from "./components/Spinner";
import { useOutletContext } from "react-router";


export function Register() {
    const navigate = useNavigate();
    const { setLoggedIn } = useOutletContext<{ setLoggedIn: (v: boolean) => void }>();
    
    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);        
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const repeatPassword = formData.get("repeatPassword") as string;
        console.log(`username = ${username}, password = ${password}, repeatPassword = ${repeatPassword}`);
        doRegister(username, password, repeatPassword);
    }

    console.log("LogIn page");
    const {loading: loadingCheck} = useCheckLogIn(() => navigate(`/orders-history`));
    const {loading: loadingRegister, doRegister } = useDoRegister(() => {setLoggedIn(true);
                                                                        navigate(`/orders-history`)});   
    const isLoading = loadingRegister || loadingCheck;

    return (
        <main className={styles.container}>
            <h1>Register</h1>
            {isLoading && <Spinner/>} 
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input disabled={isLoading} type="e-mail" id="username" name="username" placeholder="e-mail" aria-label="Enter your email" required />
                <label htmlFor="password">Password:</label>
                <input disabled={isLoading} type="password" id="password" name="password" placeholder="password" aria-label="Enter your password" required />
                <label htmlFor="repeatPassword">Repeat password:</label>
                <input disabled={isLoading} type="password" id="repeatPassword" name="repeatPassword" placeholder="repeat password" aria-label="Repeat your password" required />
                <button disabled={isLoading} type="submit">Register</button>                
            </form>
        </main>
    );
}


