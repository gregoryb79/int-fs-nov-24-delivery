
import { useState } from 'react';
import { Main } from '../components/Main';
import styles from './LogIn.module.scss';
import { Link } from 'react-router';


export function Register() {

    const [showPassword, setShowPassword] = useState(false);
    const [passwordRules, setPasswordRules] = useState<boolean[]>([false, false, false, false, false]);
    function checkPassword(password: string) {
        const rules = [
            password.length >= 8,
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /\d/.test(password),
            /[!@#$%^&*(),.?":{}|<>]/.test(password)
        ];
        setPasswordRules(rules);
    }

    return (
         <>
            <nav className={styles.nav}>
                <Link to="/login">Log In</Link>
            </nav>
            <Main fitContent>
                <h3>Register</h3>                    
                <form className={styles.loginForm}>
                    <section className={styles.inputsSection}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                        <label htmlFor="password">Password</label>
                        <section className={styles.passwordInput}>
                            <button className={styles.eyeButton} type="button" onClick={() => setShowPassword(!showPassword)}>👁</button>
                            <input type={showPassword ? "text" : "password"} id="password" name="password" required onChange={e => checkPassword(e.target.value)}/>
                        </section>                    
                    </section>
                    <ul>
                        <li>{passwordRules[0] ? "✅" : "❌"}Must be at least 8 characters long</li>
                        <li>{passwordRules[1] ? "✅" : "❌"}Must contain at least one uppercase letter</li>
                        <li>{passwordRules[2] ? "✅" : "❌"}Must contain at least one lowercase letter</li>
                        <li>{passwordRules[3] ? "✅" : "❌"}Must contain at least one number</li>
                        <li>{passwordRules[4] ? "✅" : "❌"}Must contain at least one special character</li>
                    </ul>                
                    <button type="submit">Register</button>
                </form>
                
            </Main>
        </>
    );
}


