import { useEffect, useState } from "react";
import { checkLogIn, putLogIn, postRegister } from "../services/logInService";

export function useCheckLogIn(onSuccess: () => void) {
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);    

    useEffect(() => {
        let isCanceled = false;

        async function checklogIn() {
            setError(undefined);
            setLoading(true);

            try {
                console.log("checking if user is logged in");
                const loggedUser = await checkLogIn();
                console.log("loggedUser", loggedUser);
                if (!isCanceled && loggedUser) {                                      
                    onSuccess();                    
                }else {
                    setError("User not logged in");
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

        checklogIn();

        return () => {
            isCanceled = true;
        };
    }, []);

    return { error, loading};
}

export function useDoLogIn(onSuccess: () => void) {
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);  
    
    let isCanceled = false;

        async function doLogIn(username: string, password: string) {
            setError(undefined);
            setLoading(true);

            try {
                console.log("checking credentials"); 
                const loggedUser = await putLogIn(username, password);               
                if (!isCanceled && loggedUser) {                                      
                    console.log("credentials are correct");
                    onSuccess();                    
                }else {
                    setError("Wrong credentials");
                    console.log("Wrong credentials");
                }
            } catch (error) {
                if (!isCanceled) {
                    setError(error as string);
                    console.error("Error logging in:", error);                    
                }
            } finally {
                if (!isCanceled) {
                    setLoading(false);
                }
            }
        }

    useEffect(() => {       
        return () => {
            isCanceled = true;
        };
    }, []);

    return { error, loading, doLogIn};

}

export function useDoRegister(onSuccess: () => void) {
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);  
    
    let isCanceled = false;

        async function doRegister(username: string, password: string, repeatPassword: string) {
            setError(undefined);
            setLoading(true);

            if (password !== repeatPassword) {
                setError("Passwords do not match");
                return;
            }

            try {
                console.log("checking credentials"); 
                const registered = await postRegister(username, password);               
                if (!isCanceled && registered) {                                      
                    console.log("user registered");
                    onSuccess();                    
                }else {
                    setError("Error registering user");
                    console.log("Error registering user");                    
                }
            } catch (error) {
                if (!isCanceled) {
                    setError(error as string);
                    console.error("Error logging in:", error);                    
                }
            } finally {
                if (!isCanceled) {
                    setLoading(false);
                }
            }
        }

    useEffect(() => {       
        return () => {
            isCanceled = true;
        };
    }, []);

    return { error, loading, doRegister};

}