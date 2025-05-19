import { useEffect, useState } from "react";
import { checkLogIn } from "../services/logInService";

export function useLogIn(onSuccess: () => void) {
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<string>();

    useEffect(() => {
        let isCanceled = false;

        async function logIn() {
            setError(undefined);
            setLoading(true);

            try {
                console.log("checking if user is logged in");
                const loggedUser = await checkLogIn();
                console.log("loggedUser", loggedUser);
                if (!isCanceled && loggedUser) {
                    setUser(loggedUser);                    
                    onSuccess();                    
                }
            } catch (error) {
                if (!isCanceled) {
                    if (error === "User not logged in") {
                        setError("User not logged in. Please log in.");
                    }
                }
            } finally {
                if (!isCanceled) {
                    setLoading(false);
                }
            }
        }

        logIn();

        return () => {
            isCanceled = true;
        };
    }, []);

    return { error, loading, user };
}