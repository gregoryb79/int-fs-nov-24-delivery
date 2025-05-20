import { apiFetch } from "./apiService";

export async function checkLogIn(): Promise<boolean> {
    console.log("checking if user is logged in");

    try {
        const res = await apiFetch("http://localhost:5000/login/check");
        console.log("res", res);
        if (!res.ok) {
            const message = await res.text();
            throw new Error(`Failed to check log in. Status: ${res.status}. Message: ${message}`);
        }
        const data = await res.json();
        console.log(`user logged in = ${data.loggedIn}, userId = ${data.userId}`);
        return data.loggedIn;
    } catch (error) {
        console.error("Error checking log in:", error);
        return false;
    }            
        
}

export async function putLogIn(email: string, password: string): Promise<boolean> {
    console.log("checking if user is logged in");

    try {
        const res = await apiFetch("http://localhost:5000/login/login",{
            method: "PUT",            
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("res", res);
        if (!res.ok) {
            const message = await res.text();
            throw new Error(`Failed to log in. Status: ${res.status}. Message: ${message}`);
        }        
        console.log(`loged in with: ${email} - ${password}`);
        return true;
    } catch (error) {
        console.error("Error logging in:", error);
        return false;
    }            
        
}

export async function postRegister(email: string, password: string): Promise<boolean> {
    console.log("checking if user is logged in");

    try {
        const res = await apiFetch("http://localhost:5000/login/register",{
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("res", res);
        if (!res.ok) {
            const message = await res.text();
            throw new Error(`Failed to register. Status: ${res.status}. Message: ${message}`);
        }        
        console.log(`Registered with: ${email} - ${password}`);
        return true;
    } catch (error) {
        console.error("Error registering:", error);
        return false;
    }            
        
}

export async function logOut(): Promise<void> {
    console.log("logging out");

    try {
        const res = await apiFetch("http://localhost:5000/login/logout");
        console.log("res", res);
        if (!res.ok) {
            const message = await res.text();
            throw new Error(`Failed to log out. Status: ${res.status}. Message: ${message}`);
        }        
    } catch (error) {
        console.error("Error checking logging out:", error);        
    }            
        
}