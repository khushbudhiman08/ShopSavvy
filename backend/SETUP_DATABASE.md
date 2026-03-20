# Quick Database Setup Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Seed Products

Run this command to populate products in your database:

```bash
cd backend
npm run seed
```

**Expected Output:**
```
Connected to MongoDB
Cleared existing products
Seeded 20 products successfully
Database connection closed
```

### Step 2: Verify Database

Check what's in your database:

```bash
npm run verify
```

**Expected Output:**
```
✅ Connected to MongoDB successfully!
📦 Products Collection:
   Total products: 20
   Sample product: Men's Black Running (ID: 1)
```

### Step 3: View in MongoDB Compass

1. Open **MongoDB Compass**
2. Connect using: `mongodb://localhost:27017`
3. Click on **`futwrk`** database
4. You should see **`products`** collection with 20 items

## 📝 About Cart Data

**Cart collection only appears when:**
1. ✅ User is **logged in** (has authentication token)
2. ✅ User **adds items to cart** through the frontend

**To create cart data:**
1. Start backend: `npm start` (in server folder)
2. Start frontend: `npm start` (in root folder)
3. Register/Login a user
4. Browse products → Add to cart
5. Check MongoDB Compass → `carts` collection will appear

## 🔍 Troubleshooting

### Products not showing?

```bash
# Make sure you're in server directory
cd server

# Run seed script
npm run seed

# Verify it worked
npm run verify
```

### Cart not showing?

**This is normal!** Cart only appears after:
- User logs in
- User adds items to cart

**Test it:**
1. Start both frontend and backend
2. Register a new user
3. Add products to cart
4. Check MongoDB Compass

### Still can't see data?

Run verification:
```bash
cd server
npm run verify
```

This will show you exactly what's in your database.

