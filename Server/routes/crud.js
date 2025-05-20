const express = require('express');
const ShoppingItem = require('../model/ShoppingList');
const router = express.Router();

// GET all shopping items
router.get('/getitems', async (req, res) => {
  try {
    const shoppingItems = await ShoppingItem.find();
    if (!shoppingItems || shoppingItems.length === 0) {
      return res.status(200).json({ message: 'Empty List', data: [] });
    }
    res.status(200).json({ message: 'List Fetched', data: shoppingItems });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
});

// POST a new shopping item
router.post('/additem', async (req, res) => {
  try {
    const newShoppingItem = new ShoppingItem(req.body);
    const savedItem = await newShoppingItem.save();
    res.status(201).json({ message: 'Item added', data: savedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item', error: error.message });
  }
});

// DELETE a specific shopping item by ID
router.delete('/deleteitem/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await ShoppingItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
});

// DELETE all shopping items
router.delete('/deleteall', async (req, res) => {
  try {
    await ShoppingItem.deleteMany({});
    res.status(200).json({ message: 'List deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting list', error: error.message });
  }
});

// PATCH to update the 'istaken' status of a shopping item
router.patch('/updateTaken/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItem = await ShoppingItem.findByIdAndUpdate(
      id,
      { $set: { istaken: req.body.istaken } },
      { new: true } // Return the modified document
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item updated', data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item status', error: error.message });
  }
});

// PATCH to update details of a shopping item
router.patch('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItem = await ShoppingItem.findByIdAndUpdate(
      id,
      { $set: { product: req.body.product, quantity: req.body.quantity, unit: req.body.unit } },
      { new: true } // Return the modified document
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item updated', data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
});

module.exports = router;