const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Get user's cart (protected)
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.userId }).populate('userId', 'username');
    
    if (!cart) {
      // Create empty cart if it doesn't exist
      cart = new Cart({ userId: req.user.userId, items: [] });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error fetching cart' });
  }
});

// Add item to cart (protected)
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, title, image, price, quantity, size } = req.body;

    if (!productId || !title || !image || !price || !quantity || !size) {
      return res.status(400).json({ message: 'All item fields are required' });
    }

    let cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
    }

    // Check if item with same productId and size already exists
    const existingItemIndex = cart.items.findIndex(
      item => item.productId === productId && item.size === size
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId,
        title,
        image,
        price,
        quantity,
        size
      });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error adding to cart' });
  }
});

// Update cart item quantity (protected)
router.put('/update/:itemId', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error updating cart' });
  }
});

// Remove item from cart (protected)
router.delete('/remove/:itemId', auth, async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error removing from cart' });
  }
});

// Clear cart (protected)
router.delete('/clear', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error clearing cart' });
  }
});

module.exports = router;

