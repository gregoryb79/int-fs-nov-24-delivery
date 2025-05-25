import { useState } from "react";
import { Link } from "react-router";
import { useCenterRoot } from "../hooks/useCenterRoot";
import { Main } from "../components/Main";
import { PrimaryButton } from "../components/PrimaryButton";
import { Input } from "../components/Input";
import { PasswordInput } from "../components/PasswordInput";
import { useNavigate } from "react-router";

import styles from "./Register.module.scss";

export function Register() {
    useCenterRoot();
    const navigate = useNavigate();

    async function register(formData: FormData) {
        const user = Object.fromEntries(formData);
        const body = JSON.stringify(user);
        try {
            const res = await fetch("http://localhost:5000/register", {
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                if (res.status === 409) {
                    throw new Error("User with this email already exists");
                }
                throw new Error("Failed to register");
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
                <Link to="/login">Login</Link>
            </nav>
            <Main fitContent>
                <h1>Register</h1>
                <form className={styles.form} action={register}>
                    <Input type="email" id="email" label="Email" name="email" required />
                    <SetPasswordField />
                    <PrimaryButton>Register</PrimaryButton>
                </form>
            </Main>
        </>
    );
}

function SetPasswordField() {
    const [password, setPassword] = useState("");

    return (
        <>
            <PasswordInput
                id="password"
                label="Password"
                name="password"
                minLength={8}
                required
                onInput={(e) => setPassword(e.currentTarget.value)}
                value={password}
            />
            <PasswordRules password={password} />
        </>
    );
}

type PasswordRulesProps = { password: string };
function PasswordRules({ password }: PasswordRulesProps) {
    return (
        <ul className={styles.passwordRules}>
            <li className={password.length >= 8 ? styles.satisfied : undefined}>8 characters long</li>
            <li className={password.match(/[a-z]/) ? styles.satisfied : undefined}>1 lowercase letter</li>
            <li className={password.match(/[A-Z]/) ? styles.satisfied : undefined}>1 uppercase letter</li>
            <li className={password.match(/[0-9]/) ? styles.satisfied : undefined}>1 digit</li>
        </ul>
    );
}
