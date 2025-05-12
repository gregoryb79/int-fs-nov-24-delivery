export type MenuItem = {
    id: string; 
    name: string; 
    price: number;
};

function generateMenu() {
    const menu = [
        { id: "1234", name: "Cheeseburger", price: 4.99 },
        { id: "2234", name: "Veggie Burger", price: 5.49 },
        { id: "3234", name: "Chicken Sandwich", price: 6.99 },
        { id: "4234", name: "Caesar Salad", price: 7.99 },
        { id: "5234", name: "French Fries", price: 2.99 },
        { id: "6234", name: "Onion Rings", price: 3.49 },
        { id: "7234", name: "Milkshake", price: 3.99 },
        { id: "8234", name: "Coke Zero", price: 1.99 },
    ];

    localStorage.setItem("menu", JSON.stringify(menu));
}

const menu = JSON.parse(localStorage.getItem("menu") ?? "[]");
if (menu.length === 0) {
    generateMenu();
}


export async function getMenu(): Promise<MenuItem[]> {

    const menu = JSON.parse(localStorage.getItem("menu") ?? "[]");    

    await new Promise<void>((resolve, reject) => {
        const delay = (Math.random() * 2000) + 700;

        return setTimeout(() => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                reject("User not logged in");
            } else {
                resolve();
            }
        }, delay);
    });    
    
    if (!menu) {
        throw new Error("404");
    }
    return menu;
}