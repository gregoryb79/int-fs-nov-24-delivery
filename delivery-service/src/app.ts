import express from "express";
import { json } from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { User } from "./models/user";
import { router as itemsRouter } from "./routers/items";
import { router as ordersRouter } from "./routers/orders";

export const app = express();

app.use(cors());

app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});
 
app.use(json());

function createToken(userId: string) {
    return jwt.sign({ sub: userId }, process.env.SESSION_SECRET!, { expiresIn: 60 * 60 });
}

app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            res.status(400);
            res.send("email is required");
            return;
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(409);
            res.send(`User with email ${email} already exists`);
            return;
        }

        // TODO: validate password

        const newUser = await User.create({ email, password });

        res.json({
            token: createToken(newUser.id),
        });
    } catch (err) {
        console.error(err);
        res.status(500);
        res.end();
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            res.status(400);
            res.send("email is required");
            return;
        }

        if (!password) {
            res.status(400);
            res.send("password is required");
            return;
        }

        const user = await User.findOne({ email, password });

        if (!user) {
            res.status(401);
            res.end();
            return;
        }

        res.json({
            token: createToken(user.id),
        });
    } catch (err) {
        console.error(err);
        res.status(500);
        res.end();
    }
});

app.use(expressjwt({
    algorithms: ["HS256"],
    secret: process.env.SESSION_SECRET!,
}));

app.use("/items", itemsRouter);
app.use("/orders", ordersRouter);

app.use(express.static("public"));
