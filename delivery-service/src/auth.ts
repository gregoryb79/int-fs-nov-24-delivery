import { Application, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { User } from "./models/user";

export function useAuth(app: Application) {
    app.post("/register", register);
    app.post("/login", login);
    app.use(expressjwt({
        algorithms: ["HS256"],
        secret: process.env.SESSION_SECRET!,
    }));
}

function createToken(userId: string, userName: string ) {
    return jwt.sign({ sub: userId, userName }, process.env.SESSION_SECRET!, { expiresIn: 60 * 10 });
    // return jwt.sign({ sub: userId, userName }, process.env.SESSION_SECRET!, { expiresIn: 10 });
}

const register: RequestHandler = async (req, res) => {
    try {
        const { email, password, username } = req.body;

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
        if (!username) {
            res.status(400);
            res.send("fullName is required");
            return;
        }
        if (!password || (password.length < 8) || !password.match(/[a-z]/) 
                        || !password.match(/[A-Z]/) || !password.match(/[0-9]/)) {
            res.status(400);
            res.send("password doesnt meet requirements");
            return;
        }
        const newUser = await User.create({ email, password, username });

        res.json({
            token: createToken(newUser.id, newUser.username),
        });
    } catch (err) {
        console.error(err);
        res.status(500);
        res.end();
    }
};

const login: RequestHandler = async (req, res) => {
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
            token: createToken(user.id, user.username),
        });
    } catch (err) {
        console.error(err);
        res.status(500);
        res.end();
    }
};
