import { apiClient } from "./apiClient";

export type Item = {
    _id: string,
    name: string,
    description: string,
    previewImageUrl: string,
    priceInAgorot: number,
};

export async function getItems(): Promise<Item[]> {
    const res = await apiClient.get("/items");
    console.log("getItems response:", res.data);
    
    return res.data;
}
