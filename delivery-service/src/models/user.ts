import { Schema, model } from "mongoose";

const schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const User = model("User", schema);
