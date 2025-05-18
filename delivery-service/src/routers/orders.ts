import { Router } from "express";
import { Order } from "../models/order";

export const router = Router();

router.get("/", async (_, res) => {
    
    console.log(`getting orders`);
    try {
            const orders = await Order.find();
    
            res.json(orders);
        } catch (err) {
            console.error(err);
    
            res.status(500);
            res.end();
        }  
});

router.put("/", async (req, res) => {

    const body = req.body;
    console.log(`putting new order to DB`, body);
    if (!body) {
        res.status(400);
        res.end();
        return;
    }
    const newOrder = new Order({items: body, phase: "received"});
    console.log(`new order`, newOrder);
    try {
        await newOrder.save();
        res.status(201);
        res.json(newOrder._id);
    } catch (error) {
        console.error(`Couldnt save new order.`,error);
        res.status(500);
        res.send(`Couldnt save new order.`);
    }   
});
