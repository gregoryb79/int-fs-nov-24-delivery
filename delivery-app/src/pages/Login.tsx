import { Link } from "react-router";
import { useCenterRoot } from "../hooks/useCenterRoot";
import { Main } from "../components/Main";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextInput } from "../components/TextInput";
import { PasswordInput } from "../components/PasswordInput";

import styles from "./Login.module.scss";

export function Login() {
    useCenterRoot();

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
                    <TextInput type="email" id="email" label="Email" name="email" required />
                    <PasswordInput id="password" label="Password" name="password" required />
                    <PrimaryButton>Login</PrimaryButton>
                </form>
            </Main>
        </>
    );
}
