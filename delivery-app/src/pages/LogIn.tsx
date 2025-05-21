
import { useState } from 'react';
import { Main } from '../components/Main';
import styles from './LogIn.module.scss';
import { Link } from 'react-router';
import { TextInput } from '../components/TextInput';
import { PasswordInput } from '../components/PasswordInput';


export function LogIn() {
   
    // const [showPassword, setShowPassword] = useState(false);

    function login(formData: FormData) {
        console.log(Object.fromEntries(formData));
    }

    return (
         <>
            <nav className={styles.nav}>
                <Link to="/register">Register</Link>
            </nav>

            <Main fitContent>
                <h3>Log In</h3>                    
                <form className={styles.loginForm} action={login}>
                    <TextInput />
                    <PasswordInput />
                    {/* <section className={styles.inputsSection}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                        <label htmlFor="password">Password</label>
                        <section className={styles.passwordInput}>
                            <button className={styles.eyeButton} type="button" onClick={() => setShowPassword(!showPassword)}>👁</button>
                            <input type={showPassword ? "text" : "password"} id="password" name="password" required />
                        </section>
                        
                    </section>                 */}
                    <button type="submit">Log In</button>
                </form>
            </Main>
        </>
    );
}


