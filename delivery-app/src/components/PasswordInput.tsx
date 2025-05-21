import { useState } from "react";
import styles from "./PasswordInput.module.scss";



export function PasswordInput() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <label htmlFor="password">Password</label>
            <section className={styles.passwordInput}>
                <button className={styles.eyeButton} type="button" onClick={() => setShowPassword(!showPassword)}>👁</button>
                <input type={showPassword ? "text" : "password"} id="password" name="password" required />
            </section>
        </>
        
    );
}