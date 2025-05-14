import type { PropsWithChildren } from "react";

import styles from "./Main.module.scss";
import { NavMenu } from "./NavMenu";

type MainProps = {
    large?: boolean;
};
export function Main({ large, children }: PropsWithChildren<MainProps>) {
    return (
        <>
            <NavMenu/>
            <main className={styles.root} data-large={large}>{children}</main>
        </>
        
    );
}
