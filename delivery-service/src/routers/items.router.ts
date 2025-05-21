import express from 'express';
import { Item } from '../models/item.model';
import mongoose from 'mongoose';
import { authenticate } from '../middleware/authenticate';

export const router = express.Router();

router.get('/',authenticate, async (req, res) => {

    try {
        const items = await Item.find();
         res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }   
   
});
