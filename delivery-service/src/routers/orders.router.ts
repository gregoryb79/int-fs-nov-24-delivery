import express from 'express';
import { Order } from '../models/order.model';
import mongoose from 'mongoose';
import { authenticate } from '../middleware/authenticate';
import bodyParser from 'body-parser';

export const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    console.log('getting all orders');
    try {
        const orders = await Order.find().populate("items._id");
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Error fetching orders from DB' });
    }
});

router.get('/:id', authenticate, async (req, res) => {
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

router.post('/', authenticate, async (req, res) => {
    const order = req.body;
    console.log(`putting new order to DB`, order);

    if (!order.items || order.items.length === 0) {
        res.status(400);
        res.send(`Order must have at least one item`);
        return;
    }       

    const newOrder = new Order ({items: order.items, phase: "Received", restaurant: order?.restaurant});
    console.log(`new order`, newOrder);
    try {
        await newOrder.save();
        res.status(201).json(newOrder._id);
    } catch (error) {
        console.error('Error creating new order:', error);
        res.status(500).json({ error: 'Error creating new order at DB' });
    }
});

router.put('/:id', authenticate, async (req, res) => {
    const id = req.params.id;
    console.log(`updating order with id ${id}`);
    const order = req.body;
    
    if (!mongoose.isValidObjectId(id)) {
        res.status(400);
        res.send(`Invalid order id: ${id}`);
        return;
    }      

    try {
        const orderToUpdate = await Order.findById(id);        

        if (!orderToUpdate) {
            res.status(404);
            res.send(`Order with id ${id} not found`);
            return;
        }
        orderToUpdate.phase = order.phase;
        try {
            await orderToUpdate.save();
            res.status(201).json(orderToUpdate._id);
        } catch (error) {
            console.error('Error saving updated order:', error);
            res.status(500).json({ error: 'Error updating order at DB' });
        }
        
    } catch (error) {
        console.error(`Error updating order id = ${id}:`, error);
        res.status(500).json({ error: `error updating order ${id} in DB`});
    }    
});