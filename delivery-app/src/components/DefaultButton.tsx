import type { PropsWithChildren } from "react";

import styles from "./DefaultButton.module.scss";

type DefaultButtonProps = PropsWithChildren<{
    onClick?(): void,
}>;
export function DefaultButton({ onClick, children }: DefaultButtonProps) {
    return <button className={styles.button} onClick={onClick}>{children}</button>;
}
