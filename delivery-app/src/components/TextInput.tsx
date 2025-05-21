import { useId, type InputHTMLAttributes } from "react";
import styles from "./TextInput.module.scss";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & { id: string, name: string, label: string };

export function TextInput({ id, label, ...props }: TextInputProps) {
    const baseId = useId();
    const labelId = `${baseId}_label`;

    return (
        <div className={styles.formField}>
            <label id={labelId} htmlFor={id}>{label}</label>
            <input id={id} aria-labelledby={labelId} {...props} />
        </div>
    );
}
