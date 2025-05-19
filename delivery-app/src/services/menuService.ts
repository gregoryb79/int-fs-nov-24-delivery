export type MenuItem = {
    _id: string; 
    name: string; 
    price: number;
    imgSource?: string;
};

function generateMenu() {
    const menu = [
        { id: "1234", name: "Cheeseburger", price: 4.99, imgSource: "../src/assets/cheesburger.jfif" },
        { id: "2234", name: "Veggie Burger", price: 5.49, imgSource: "../src/assets/veggie-burger.jfif" },
        { id: "3234", name: "Chicken Sandwich", price: 6.99, imgSource: "../src/assets/Chicken Sandwich.jfif" },
        { id: "4234", name: "Caesar Salad", price: 7.99, imgSource: "../src/assets/Caesar Salad.jfif" },
        { id: "5234", name: "French Fries", price: 2.99, imgSource: "../src/assets/French Fries.jfif" },
        { id: "6234", name: "Onion Rings", price: 3.49, imgSource: "../src/assets/Onion Rings.jfif" },
        { id: "7234", name: "Milkshake", price: 3.99, imgSource: "../src/assets/Milkshake.jfif" },
        { id: "8234", name: "Coke Zero", price: 1.99, imgSource: "../src/assets/Coke Zero.jfif" },
    ];

    localStorage.setItem("menu", JSON.stringify(menu));
}

const menu = JSON.parse(localStorage.getItem("menu") ?? "[]");
if (menu.length === 0) {
    generateMenu();
}


export async function getMenu(): Promise<MenuItem[]> {
    console.log("getting menu from server");
    // const menu = JSON.parse(localStorage.getItem("menu") ?? "[]");    

    try{
        const res = await fetch("http://localhost:5000/items");   
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