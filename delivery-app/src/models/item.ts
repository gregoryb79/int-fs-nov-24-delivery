import api from "./api";

export type Item = {
    _id: string,
    name: string,
    description: string,
    previewImageUrl: string,
    priceInAgorot: number,
};

export async function getItems(): Promise<Item[]> {
    try {
        const res = await api.get("/items");
        return res.data as Item[];
    }catch (error) {
        console.error("Failed to fetch items:", error); 
        throw new Error("Failed to fetch items");
    }    
}
