const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  userName: {
    type: String,
    required: true
  },
  verifiedPurchase: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Prevent duplicate reviews from same user for same product
reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);


