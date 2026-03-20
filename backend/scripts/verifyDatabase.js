const mongoose = require('mongoose');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const User = require('../models/User');
require('dotenv').config();

async function verifyDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/futwrk';
    
    console.log('🔌 Connecting to MongoDB...');
    console.log(`📍 Connection string: ${MONGODB_URI}`);
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB successfully!\n');

    // Check Products
    const productCount = await Product.countDocuments();
    console.log(`📦 Products Collection:`);
    console.log(`   Total products: ${productCount}`);
    if (productCount > 0) {
      const sampleProduct = await Product.findOne();
      console.log(`   Sample product: ${sampleProduct.shoeTitle} (ID: ${sampleProduct.id})`);
    } else {
      console.log('   ⚠️  No products found! Run: node scripts/seedProducts.js');
    }

    // Check Users
    const userCount = await User.countDocuments();
    console.log(`\n👤 Users Collection:`);
    console.log(`   Total users: ${userCount}`);
    if (userCount > 0) {
      const sampleUser = await User.findOne().select('username email');
      console.log(`   Sample user: ${sampleUser.username} (${sampleUser.email})`);
    }

    // Check Carts
    const cartCount = await Cart.countDocuments();
    console.log(`\n🛒 Carts Collection:`);
    console.log(`   Total carts: ${cartCount}`);
    if (cartCount > 0) {
      const sampleCart = await Cart.findOne().populate('userId', 'username');
      console.log(`   Sample cart: User: ${sampleCart.userId?.username}, Items: ${sampleCart.items.length}`);
    } else {
      console.log('   ℹ️  No carts yet (carts are created when users add items)');
    }

    // Check Orders
    const orderCount = await Order.countDocuments();
    console.log(`\n📋 Orders Collection:`);
    console.log(`   Total orders: ${orderCount}`);
    if (orderCount > 0) {
      const sampleOrder = await Order.findOne().populate('userId', 'username');
      console.log(`   Sample order: User: ${sampleOrder.userId?.username}, Total: ₹${sampleOrder.totalAmount}`);
    } else {
      console.log('   ℹ️  No orders yet');
    }

    // List all collections
    console.log(`\n📊 Database Collections:`);
    const collections = await mongoose.connection.db.listCollections().toArray();
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });

    console.log(`\n💡 To view in MongoDB Compass:`);
    console.log(`   Connection string: mongodb://localhost:27017`);
    console.log(`   Database name: futwrk`);

    await mongoose.connection.close();
    console.log('\n✅ Database verification complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

verifyDatabase();

