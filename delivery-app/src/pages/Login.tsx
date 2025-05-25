import { Link, useNavigate } from "react-router";
import { useCenterRoot } from "../hooks/useCenterRoot";
import { Main } from "../components/Main";
import { PrimaryButton } from "../components/PrimaryButton";
import { Input } from "../components/Input";
import { PasswordInput } from "../components/PasswordInput";

import styles from "./Login.module.scss";

export function Login() {
    useCenterRoot();
    const navigate = useNavigate();

    async function login(formData: FormData) {
        const user = Object.fromEntries(formData);
        const body = JSON.stringify(user);
        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                if (res.status === 400) {
                    throw new Error("Bad credentials");
                }else if (res.status === 401) {
                    throw new Error("Invalid email or password");
                } else {
                    throw new Error("Failed to login");
                }          
            }
            const { token } = await res.json();
            sessionStorage.setItem("token", token);
            navigate("/");
        } catch (err) {
            console.error(err);
            alert(err instanceof Error ? err.message : "An unexpected error occurred");
        }  
    }

    return (
        <>
            <nav className={styles.nav}>
                <Link to="/register">Register</Link>
            </nav>
            <Main fitContent>
                <h1>Login</h1>
                <form className={styles.form} action={login}>
                    <Input type="email" id="email" label="Email" name="email" required />
                    <PasswordInput id="password" label="Password" name="password" required />
                    <PrimaryButton>Login</PrimaryButton>
                </form>
            </Main>
        </>
    );
}
