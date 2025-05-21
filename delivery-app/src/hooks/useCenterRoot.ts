import { useEffect } from "react";

export function useCenterRoot() {
    useEffect(() => {
        const rootElement = document.getElementById("root");

        rootElement?.style.setProperty("--root-justify-content", "center");

        return () => {
            rootElement?.style.setProperty("--root-justify-content", null);
        };
    }, []);
}
