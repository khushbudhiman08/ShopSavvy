# MongoDB Compass Connection Guide

This guide will help you connect MongoDB Compass to your Futwrk database.

## Prerequisites

1. **MongoDB Server** must be running on your system
2. **MongoDB Compass** installed on your computer
   - Download from: https://www.mongodb.com/try/download/compass

## Connection Steps

### Step 1: Start MongoDB Server

Make sure MongoDB is running on your system:

**Windows:**
- MongoDB should be running as a service
- Or start manually: `mongod` in command prompt

**Mac/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod
# Or
mongod
```

### Step 2: Open MongoDB Compass

1. Launch MongoDB Compass application

### Step 3: Connect to Local MongoDB

1. In MongoDB Compass, you'll see a connection screen
2. Use this connection string:
   ```
   mongodb://localhost:27017
   ```
3. Click **Connect**

### Step 4: Navigate to Futwrk Database

After connecting, you should see:
- **Databases** in the left sidebar
- Look for **futwrk** database
- Click on it to expand

### Step 5: Explore Collections

Inside the `futwrk` database, you'll find these collections:

1. **users** - User accounts (username, email, hashed passwords)
2. **products** - Product catalog (shoes data)
3. **orders** - Customer orders

## Connection String Details

### Local MongoDB (Default)
```
mongodb://localhost:27017
```

### With Database Name
```
mongodb://localhost:27017/futwrk
```

### With Authentication (if configured)
```
mongodb://username:password@localhost:27017/futwrk
```

## Verify Connection

### From Backend Server
When you start the backend server, you should see:
```
✅ Connected to MongoDB successfully!
📊 Database: mongodb://localhost:27017/futwrk
💡 Connect to MongoDB Compass using: mongodb://localhost:27017
```

### From MongoDB Compass
- You should see the `futwrk` database
- Collections should appear after seeding data
- You can view, edit, and query documents directly

## Common Issues

### Issue: Cannot Connect to MongoDB

**Solution:**
1. Check if MongoDB service is running
2. Verify MongoDB is listening on port 27017
3. Check firewall settings
4. Try restarting MongoDB service

### Issue: Database Not Visible

**Solution:**
1. Make sure you've run the seed script: `node scripts/seedProducts.js`
2. Create a user or product through the API to create collections
3. Refresh MongoDB Compass (F5)

### Issue: Connection Timeout

**Solution:**
1. Verify MongoDB is running: `mongosh` or `mongo` command
2. Check MongoDB logs for errors
3. Ensure no other application is using port 27017

## MongoDB Atlas (Cloud) Connection

If you're using MongoDB Atlas instead of local MongoDB:

1. Get your connection string from Atlas dashboard
2. It will look like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/futwrk
   ```
3. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/futwrk
   ```
4. In MongoDB Compass, paste the full connection string
5. Click **Connect**

## Useful MongoDB Compass Features

1. **Browse Collections** - View all documents
2. **Add Document** - Manually add data
3. **Edit Document** - Modify existing documents
4. **Delete Document** - Remove documents
5. **Query Documents** - Filter and search
6. **Indexes** - View and create indexes
7. **Schema** - Analyze document structure

## Testing the Connection

1. Start your backend server: `npm start` in `server/` directory
2. Open MongoDB Compass and connect
3. Navigate to `futwrk` database
4. You should see collections appear as you use the API

## Next Steps

- Browse your data in MongoDB Compass
- Verify users, products, and orders are being created
- Use Compass to debug data issues
- Export/import data as needed

