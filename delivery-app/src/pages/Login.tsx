import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Main } from "../components/Main";
import { PrimaryButton } from "../components/PrimaryButton";

import styles from "./Login.module.scss";

export function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        const rootElement = document.getElementById("root");

        rootElement?.style.setProperty("--root-justify-content", "center");

        return () => {
            rootElement?.style.setProperty("--root-justify-content", null);
        };
    }, []);

    function togglePasswordVisibility() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    function login(formData: FormData) {
        console.log(Object.fromEntries(formData));
    }

    return (
        <>
            <nav className={styles.nav}>
                <Link to="/register">Register</Link>
            </nav>
            <Main fitContent>
                <h1>Login</h1>
                <form className={styles.form} action={login}>
                    <div className={styles.formField}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="password">Password</label>
                        <div className={styles.passwordContainer}>
                            <input type={isPasswordVisible ? "text" : "password"} name="password" id="password" required />
                            <button
                                className={styles.togglePasswordVisibilityButton}
                                type="button"
                                onClick={togglePasswordVisibility}
                            >👁️</button>
                        </div>
                    </div>
                    <PrimaryButton>Login</PrimaryButton>
                </form>
            </Main>
        </>
    );
}
