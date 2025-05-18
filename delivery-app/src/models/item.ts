import burgerImg from "../assets/burger.jpg";
import frenchFriesImg from "../assets/french fries.jpg";
import sodaImg from "../assets/soda.jpg";
import mayoImg from "../assets/mayo.jpg";

export type Item = {
    _id: string,
    name: string,
    description: string,
    imgSrc: string,
    priceInAgorot: number,
};

export async function getItems(): Promise<Item[]> {
    console.log("Fetching items from server...");
    try {
        const res = await fetch(`http://localhost:5000/items`);
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to fetch watchlist. Status: ${res.status}. Message: ${message}`);
        }
        const items : Item [] =  await res.json();
        if (items.length > 0) {
            return items;            
        }else{
            return [];
        } 
    }catch (error) {
        console.error("Error fetching items:", error);
        return [];        
    }
};

