import express from 'express';
import MenuItem from '../models/menuitems.js';  // 👈 Note the .js extension

const router = express.Router();

// POST Method to add a Menu Item
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET method to get the Menu Items
router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET by taste type
router.get('/:taste', async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (tasteType === 'sweet' || tasteType === 'sour' || tasteType === 'spicy') {
      const response = await MenuItem.find({ taste: tasteType });
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid Taste type' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT method to update Menu Item
router.put('/:id', async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenuData = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: 'Menu Item not found' });
    }

    console.log('data updated');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE method to delete Menu Item
router.delete('/:id', async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await MenuItem.findByIdAndRemove(menuId);

    if (!response) {
      return res.status(404).json({ error: 'Menu Item not found' });
    }

    console.log('data delete');
    res.status(200).json({ message: 'Menu Deleted Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
