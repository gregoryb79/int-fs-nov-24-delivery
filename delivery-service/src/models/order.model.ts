import { Schema, model } from "mongoose";

const schema = new Schema({
   items: {
        type: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: "Item",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        required: true,
    },    
    phase: {
        type: String,
        requred: true,},
    restaurant: String,
}, { timestamps: true });

export const Order = model("Order", schema);