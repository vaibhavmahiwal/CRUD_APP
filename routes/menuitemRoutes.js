import express from 'express';
const router = express.Router();

import MenuItems from '../models/menuitems.js';  // ✅ use .js extension & capitalized

// POST /menuitems
router.post('/', async (req, res) => {
  try {
    console.log("Incoming data:", req.body);
    const menuItem = new MenuItems(req.body);
    const savedItem = await menuItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("Error saving menu items:", err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "Menu item already exists" });
    }
    res.status(500).json({ error: "internal server error" });
  }
});

// GET /menuitems
router.get('/', async (req, res) => {
  try {
    const data = await MenuItems.find();
    console.log("Data fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

export default router;
