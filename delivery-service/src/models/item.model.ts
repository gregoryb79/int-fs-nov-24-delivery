import { Schema, model } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    imgSrc: String,
    price: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Item = model("Item", schema);
