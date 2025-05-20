import express from 'express';
import { User } from '../models/users.model';
import crypto from "crypto";
import mongoose from 'mongoose';
// import { authenticate } from '../middleware/authenticate';

export const router = express.Router();

const hashKey = process.env.HASH_SECRET || "defaultKey";

router.get("/check", async (req, res) => {
    if (req.signedCookies.userId) {
        res.json({ loggedIn: true, userId: req.signedCookies.userId });
    } else {
        res.json({ loggedIn: false });
    }
});


router.put("/login", async (req, res) => {
    const { email, password } = req.body;

    console.log(`Starting login email = ${email}, password = ${password}`);

    const credentials  = await User.find({email: email},
        {email: true,
         passwordHash: true});

    console.log(credentials);
    if (credentials.length == 0){
        res.status(401);
        res.send("Wrong credentials");
        return;
    }
    const hashedPassword = crypto.createHmac("sha256", hashKey).update(`${password}-${email}`).digest("hex");

    if (email !== credentials[0].email || hashedPassword !== credentials[0].passwordHash) {
        res.status(401);
        res.send("Wrong credentials");
        return;
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    console.log(`user logged in, sending cookie with ${credentials[0]._id} and expires ${expires}`);   
    
    res.cookie("userId", credentials[0]._id, {
        expires,
        signed: true,
        httpOnly: true,
    });

    res.end();
});

router.post("/register", async (req, res) => {
    const { email, password  } = req.body;

    console.log(`Starting register email = ${email}, password = ${password}`);

    const emailCheck  = await User.find({email: email},{email: true});
    if (emailCheck.length > 0){
        res.status(401);
        res.send(`user with email ${email} already exists.`);
        console.log(`user with email ${email} already exists.`);
        return;
    }    
    
    const hashedPassword = crypto.createHmac("sha256", hashKey).update(`${password}-${email}`).digest("hex");

    try {     
        console.log(`Creating user with email ${email} and password ${hashedPassword} in DB.`);
        const createdUser = await User.create({
            email: email,
            passwordHash: hashedPassword,            
        });

        const expires = new Date();
        expires.setDate(expires.getDate() + 1);

        res.cookie("userId", createdUser._id, {
            expires,
            signed: true,
            httpOnly: true,
        });

        res.status(201);
        res.end();
    } catch (error) {
        console.error(error);

        res.status(500);
        res.send("Oops, something went wrong");
    }
});

router.get("/logout", async (_, res) => {
    res.clearCookie("userId", { httpOnly: true, signed: true });
    res.send("Logged out successfully.");
});