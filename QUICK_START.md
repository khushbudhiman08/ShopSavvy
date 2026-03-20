# Quick Start Guide

## Quick Setup (5 minutes)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/futwrk" >> .env
echo "JWT_SECRET=your_secret_key_change_this" >> .env

# Seed database with products
npm run seed

# Start server
npm start
```

### 1.5. Connect MongoDB Compass (Optional)

1. **Install MongoDB Compass** (if not already installed)
   - Download: https://www.mongodb.com/try/download/compass

2. **Open MongoDB Compass** and connect using:
   ```
   mongodb://localhost:27017
   ```

3. **Navigate to `futwrk` database** to view your data

   📖 **Detailed guide:** See `server/MONGODB_COMPASS_SETUP.md`

### 2. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start React app
npm start
```

### 3. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Testing the Backend

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running: `mongod` or start MongoDB service
- Check MongoDB URI in `.env` file
- For MongoDB Atlas, use connection string: `mongodb+srv://user:pass@cluster.mongodb.net/futwrk`
- **Test connection in MongoDB Compass** using: `mongodb://localhost:27017`

### MongoDB Compass Connection Issues
- Verify MongoDB server is running
- Check if port 27017 is accessible
- Try connection string: `mongodb://127.0.0.1:27017`
- See `backend/MONGODB_COMPASS_SETUP.md` for detailed troubleshooting

### Port Already in Use
- Change PORT in server/.env file
- Update REACT_APP_API_URL in frontend .env file accordingly

### CORS Issues
- Backend is configured to allow requests from `http://localhost:3000`
- If using different port, update CORS settings in `server/server.js`

