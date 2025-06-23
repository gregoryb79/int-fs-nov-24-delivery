import { Router } from "express";
import { createOrder, getAllOrders, getOrderById} from "../models/order";
// import { Types } from "mongoose";

export const router = Router();

router.post("/", async (req, res) => {
    try {
        const userId = req.auth?.sub;
        await createOrder(req.body,userId);

        res.status(201);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500);
        res.end();
    }
});

router.get("/", async (_, res) => {
    try {
        const orders = await getAllOrders();

        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500);
        res.end();
    }
});

router.get("/:id", async (req, res) => {
    try {
        const order = await getOrderById(req.params.id);

        if (!order) {
            res.status(404);
            res.send(`Order ${req.params.id} not found`);
            return;
        }

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500);
        res.end();
    }
});
