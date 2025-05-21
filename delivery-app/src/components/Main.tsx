import type { PropsWithChildren } from "react";

import styles from "./Main.module.scss";

type MainProps = {
    large?: boolean;
    overflow?: boolean;
    loginMenu?: boolean;
    registerMenu?: boolean;
};
export function Main({ large, overflow, loginMenu, registerMenu, children }: PropsWithChildren<MainProps>) {
    return (
        <main className={styles.root} data-large={large} data-overflow={overflow} data-login={loginMenu} data-register={registerMenu}>{children}</main>
    );
}
