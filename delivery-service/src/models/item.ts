// import { Schema, model } from "mongoose";

// const schema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     description: String,
//     previewImageUrl: String,
//     priceInAgorot: {
//         type: String,
//         required: true,
//     },
// }, { timestamps: true });

// export const Item = model("Item", schema);

import { client } from "./sqlSetup";

export async function getAllItems() {
    try{
        const result = await client.execute("SELECT * FROM items");
        console.log("SQL query getAllItems executed successfully");
        return result.rows;
    }catch (error) {
        console.error("Error executing SQL query:", error);
        throw error; 
    }    
}