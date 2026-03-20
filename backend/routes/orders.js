const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Create new order (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { items, totalAmount, customerInfo, billingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }

    const order = new Order({
      userId: req.user.userId,
      items,
      totalAmount,
      customerInfo: customerInfo || {},
      billingAddress: billingAddress || {}
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error creating order' });
  }
});

// Get all orders for current user (protected)
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'username email');
    
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
});

// Get single order by ID (protected)
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'username email');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user
    if (order.userId._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (protected)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user
    if (order.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

