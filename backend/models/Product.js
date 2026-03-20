const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  shoeTitle: {
    type: String,
    required: true
  },
  shoePrice: {
    type: Number,
    required: true
  },
  oldShoePrice: {
    type: Number,
    default: null
  },
  saleStatus: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    required: true,
    enum: ['Running', 'Sneaker', 'Training']
  },
  category: {
    type: String,
    required: true,
    enum: ['Men', 'Women']
  },
  desc: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);

