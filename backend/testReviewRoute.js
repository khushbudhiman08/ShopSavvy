const express = require('express');
const app = express();

// Test if reviews route can be loaded
try {
  const reviewsRoute = require('./routes/reviews');
  console.log('✅ Reviews route loaded successfully');
  console.log('Route type:', typeof reviewsRoute);
  
  // Test if Review model can be loaded
  const Review = require('./models/Review');
  console.log('✅ Review model loaded successfully');
  
  console.log('\n✅ All review components are ready!');
  console.log('💡 Make sure to restart the backend server:');
  console.log('   1. Stop the current server (Ctrl+C)');
  console.log('   2. Run: npm start');
} catch (error) {
  console.error('❌ Error loading reviews:', error.message);
  console.error(error.stack);
  process.exit(1);
}


