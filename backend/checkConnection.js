const mongoose = require('mongoose');
require('dotenv').config();

// Try different connection strings
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/futwrk';

console.log('🔍 Checking Backend and MongoDB Connection...\n');
console.log(`📊 Connection String: ${MONGODB_URI}\n`);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ SUCCESS: Connected to MongoDB successfully!\n');
  
  // Check database and collections
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  
  console.log('📦 Database Collections:');
  if (collections.length === 0) {
    console.log('   ⚠️  No collections found (database is empty)');
    console.log('   💡 Run: npm run seed (to add products)');
  } else {
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`   ✓ ${col.name}: ${count} documents`);
    }
  }
  
  console.log('\n✅ Backend is ready to use!');
  console.log('💡 Start server with: npm start');
  
  await mongoose.connection.close();
  process.exit(0);
})
.catch((error) => {
  console.error('❌ ERROR: MongoDB connection failed!\n');
  console.error('Error details:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('   1. Make sure MongoDB service is running');
  console.log('   2. Check MongoDB connection string in .env file');
  console.log('   3. Verify MongoDB is accessible on port 27017');
  console.log('   4. Try: mongosh (to test MongoDB connection)');
  process.exit(1);
});

