import { Router } from "express";
import { Item } from "../models/item";

export const router = Router();

router.get("/", async (_, res) => {
    try {
        const items = await Item.find();

        res.json(items);
    } catch (err) {
        console.error(err);

        res.status(500);
        res.end();
    }
});
