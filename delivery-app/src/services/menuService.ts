import { apiFetch } from "./apiService";

export type MenuItem = {
    _id: string; 
    name: string; 
    price: number;
    imgSource?: string;
};

export async function getMenu(): Promise<MenuItem[]> {
    console.log("getting menu from server");
    // const menu = JSON.parse(localStorage.getItem("menu") ?? "[]");    

    try{
        const res = await apiFetch("http://localhost:5000/items");   
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to fetch menu. Status: ${res.status}. Message: ${message}`);
        } 
        const menu : MenuItem [] = await res.json();
        console.log("menu from server", menu);
        if (menu.length > 0) {
            return menu;
        }else {
            return [];
        }
    }catch (error) {
        console.error("Error fetching menu:", error);    
        return [];    
    } 
    
}