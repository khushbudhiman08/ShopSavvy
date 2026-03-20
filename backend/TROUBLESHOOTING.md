# Troubleshooting: Can't See Products and Cart in Database

If you can't see products and cart data in MongoDB Compass, follow these steps:

## Step 1: Verify MongoDB Connection

1. **Check if MongoDB is running:**
   ```bash
   # Windows (PowerShell)
   Get-Service MongoDB
   
   # Or try connecting
   mongosh
   ```

2. **Start MongoDB if not running:**
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

## Step 2: Seed Products Database

Products need to be seeded into the database. Run:

```bash
cd backend
npm run seed
```

Or manually:
```bash
cd backend
node scripts/seedProducts.js
```

**Expected output:**
```
Connected to MongoDB
Cleared existing products
Seeded 20 products successfully
Database connection closed
```

## Step 3: Verify Database Contents

Run the verification script:

```bash
cd backend
npm run verify
```

Or manually:
```bash
cd backend
node scripts/verifyDatabase.js
```

This will show you:
- How many products are in the database
- How many users exist
- How many carts exist
- How many orders exist

## Step 4: Check MongoDB Compass Connection

1. **Open MongoDB Compass**
2. **Connect using:**
   ```
   mongodb://localhost:27017
   ```
3. **Navigate to `futwrk` database**
4. **Look for collections:**
   - `products` - Should have 20 products after seeding
   - `users` - Will appear when you register a user
   - `carts` - Will appear when a logged-in user adds items to cart
   - `orders` - Will appear when orders are placed

## Step 5: Create Cart Data

Cart data only appears when:
1. A user is **logged in** (has a token)
2. User **adds items to cart** through the frontend

**To create cart data:**
1. Start the backend: `npm start` (in server directory)
2. Start the frontend: `npm start` (in root directory)
3. Register/Login a user
4. Browse products and add items to cart
5. Check MongoDB Compass - you should see a `carts` collection with data

## Common Issues

### Issue: Products collection is empty

**Solution:**
```bash
cd backend
npm run seed
```

### Issue: Cart collection doesn't exist

**This is normal!** Cart collection is only created when:
- A user logs in AND
- Adds items to cart

**To create cart data:**
1. Make sure backend is running
2. Login/Register through frontend
3. Add products to cart
4. Check MongoDB Compass

### Issue: Can't connect to MongoDB

**Check:**
1. MongoDB service is running
2. Connection string in `.env` is correct
3. Port 27017 is not blocked by firewall

**Test connection:**
```bash
mongosh
# Or
mongo
```

### Issue: Database name is different

**Check your `.env` file:**
```env
MONGODB_URI=mongodb://localhost:27017/futwrk
```

The database name is `futwrk` (last part of the URI).

### Issue: Collections don't show in Compass

**MongoDB only creates collections when first document is inserted.**

- `products` - Created when you run seed script
- `users` - Created when first user registers
- `carts` - Created when first user adds item to cart
- `orders` - Created when first order is placed

## Quick Test

Run this to test everything:

```bash
# 1. Start MongoDB (if not running)
# 2. Seed products
cd backend
npm run seed

# 3. Verify database
npm run verify

# 4. Start backend
npm start

# 5. In another terminal, start frontend
cd ..
npm start

# 6. Register a user and add items to cart
# 7. Check MongoDB Compass
```

## Expected Results

After seeding, you should see:
- ✅ `products` collection with 20 documents
- ✅ Database name: `futwrk`
- ✅ Connection: `mongodb://localhost:27017`

After using the app:
- ✅ `users` collection (after registration)
- ✅ `carts` collection (after adding items to cart)
- ✅ `orders` collection (after placing order)

## Still Having Issues?

1. **Check server logs** when starting backend
2. **Check MongoDB logs** for connection errors
3. **Verify `.env` file** exists and has correct values
4. **Run verification script:** `npm run verify`
5. **Check MongoDB Compass** connection string matches your setup

