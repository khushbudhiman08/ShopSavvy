const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Get all reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId: parseInt(productId) })
      .sort({ createdAt: -1 })
      .populate('userId', 'username')
      .limit(50);
    
    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
});

// Get all reviews by current user
router.get('/my-reviews', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'username');
    
    res.json(reviews);
  } catch (error) {
    console.error('Get my reviews error:', error);
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
});

// Get single review
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('userId', 'username');
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json(review);
  } catch (error) {
    console.error('Get review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create review (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ message: 'Product ID, rating, and comment are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      userId: req.user.userId,
      productId: parseInt(productId)
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Check if user has purchased this product (for verified purchase badge)
    const hasPurchased = await Order.findOne({
      userId: req.user.userId,
      'items.productId': parseInt(productId)
    });

    const review = new Review({
      userId: req.user.userId,
      productId: parseInt(productId),
      rating,
      comment: comment.trim(),
      userName: req.user.username,
      verifiedPurchase: !!hasPurchased
    });

    await review.save();
    
    const populatedReview = await Review.findById(review._id)
      .populate('userId', 'username');

    res.status(201).json(populatedReview);
  } catch (error) {
    console.error('Create review error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }
    res.status(500).json({ message: 'Server error creating review' });
  }
});

// Update review (protected - only by owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns this review
    if (review.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only edit your own reviews' });
    }

    if (rating !== undefined) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
      }
      review.rating = rating;
    }

    if (comment !== undefined) {
      review.comment = comment.trim();
    }

    await review.save();
    
    const populatedReview = await Review.findById(review._id)
      .populate('userId', 'username');

    res.json(populatedReview);
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ message: 'Server error updating review' });
  }
});

// Delete review (protected - only by owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns this review
    if (review.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only delete your own reviews' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ message: 'Server error deleting review' });
  }
});

// Get average rating for a product
router.get('/product/:productId/rating', async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await Review.aggregate([
      { $match: { productId: parseInt(productId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    if (result.length === 0) {
      return res.json({ averageRating: 0, totalReviews: 0 });
    }

    res.json({
      averageRating: Math.round(result[0].averageRating * 10) / 10,
      totalReviews: result[0].totalReviews
    });
  } catch (error) {
    console.error('Get rating error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


