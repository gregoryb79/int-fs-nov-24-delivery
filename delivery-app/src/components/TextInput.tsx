import styles from "./TextInput.module.scss";

export function TextInput() {
    return (
        <div className={styles.formField}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
        </div>
    );
}
