
import { useState } from 'react';
import { Main } from '../components/Main';
import styles from './LogIn.module.scss';


export function LogIn() {
   
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Main loginMenu>
            <h3>Log In</h3>                    
            <form className={styles.loginForm}>
                <section className={styles.inputsSection}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                    <label htmlFor="password">Password</label>
                    <section className={styles.passwordInput}>
                        <button className={styles.eyeButton} type="button" onClick={() => setShowPassword(!showPassword)}>👁</button>
                        <input type={showPassword ? "text" : "password"} id="password" name="password" required />
                    </section>
                    
                </section>                
                <button type="submit">Log In</button>
            </form>
        </Main>
    );
}


