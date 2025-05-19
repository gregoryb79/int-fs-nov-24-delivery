import express from 'express';
import { Order } from '../models/order.model';
import mongoose from 'mongoose';
import { authenticate } from '../middleware/authenticate';

export const router = express.Router();

router.get('/', async (req, res) => {
    console.log('getting all orders');
    try {
        const orders = await Order.find().populate("items._id");
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Error fetching orders from DB' });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(`getting order with id ${id}`);

    if (!mongoose.isValidObjectId(id)) {
        res.status(400);
        res.send(`Invalid order id: ${id}`);
        return;
    }

    try {
        const order = await Order.findById(id).populate("items._id");        

        if (!order) {
            res.status(404);
            res.send(`Order with id ${id} not found`);
            return;
        }
        res.json(order);
    } catch (error) {
        console.error(`Error fetching order id = ${id}:`, error);
        res.status(500).json({ error: `error fetching order ${id} from DB`});
    }
});

router.post('/', async (req, res) => {
    const order = req.body;
    console.log(`putting new order to DB`, order);

    if (!order.items || order.items.length === 0) {
        res.status(400);
        res.send(`Order must have at least one item`);
        return;
    }       

    const newOrder = new Order ({items: order.items, phase: "received", restaurant: order?.restaurant});
    console.log(`new order`, newOrder);
    try {
        await newOrder.save();
        res.status(201).json(newOrder._id);
    } catch (error) {
        console.error('Error creating new order:', error);
        res.status(500).json({ error: 'Error creating new order at DB' });
    }
});