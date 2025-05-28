import { createHash } from "crypto";
import { Schema, model } from "mongoose";

const schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        set(newPassword: string) {
            const hash = createHash("sha512");

            hash.update(newPassword);

            return hash.digest("base64");
        },
    },
    fullName: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const User = model("User", schema);
