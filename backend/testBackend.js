const http = require('http');

console.log('🔍 Testing Backend Connection...\n');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`✅ Backend Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📄 Response:', data);
    if (res.statusCode === 200) {
      console.log('\n✅ SUCCESS: Backend is working!');
      console.log('💡 Backend API is ready at: http://localhost:5000');
    }
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('❌ ERROR: Backend is not running!');
  console.error('Error:', error.message);
  console.log('\n🔧 To start backend:');
  console.log('   cd backend');
  console.log('   npm start');
  process.exit(1);
});

req.setTimeout(5000, () => {
  console.error('❌ ERROR: Connection timeout');
  console.log('💡 Make sure backend server is running');
  req.destroy();
  process.exit(1);
});

req.end();

