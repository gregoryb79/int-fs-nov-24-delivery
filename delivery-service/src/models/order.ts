import { Schema, model } from "mongoose";

const schema = new Schema({
     items: {
        type: Map,
        of: Number,
        required: true,
    },    
    phase: {
        type: String,
        requred: true,},
    restaurant: String,
}, { timestamps: true });

export const Order = model("Order", schema);