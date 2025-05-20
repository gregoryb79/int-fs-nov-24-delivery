// import { useNavigate } from "react-router";

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, {
        ...init,
        credentials: "include",
    });
    // const navigate = useNavigate();
    
    console.log("response", response.status);

    if (response.status === 401) {        
        
        console.error("User not logged in");
        window.location.href = "/login";        
        return Promise.reject("User not logged in");
        
    }

    return response;
}