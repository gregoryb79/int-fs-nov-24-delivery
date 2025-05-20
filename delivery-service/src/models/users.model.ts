import { Schema, model } from "mongoose";

const schema = new Schema({    
    email: {type: String, required: true },
    passwordHash: {type: String, required: true },    
}, { timestamps: true });

export const User = model("User", schema,"users");
