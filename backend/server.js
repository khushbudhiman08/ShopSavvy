const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/futwrk';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully!');
  console.log(`📊 Database: ${MONGODB_URI}`);
  console.log('💡 Connect to MongoDB Compass using: mongodb://localhost:27017');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  console.log('\n💡 Make sure MongoDB is running and accessible');
  console.log('💡 For MongoDB Compass, use connection string: mongodb://localhost:27017');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

