import { useState } from "react";
import { Link } from "react-router";
import { useCenterRoot } from "../hooks/useCenterRoot";
import { Main } from "../components/Main";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextInput } from "../components/TextInput";

import styles from "./Login.module.scss";

export function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useCenterRoot();

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
                    <TextInput />
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
