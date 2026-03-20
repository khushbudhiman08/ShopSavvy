# Fix: Can't See Products and Cart in Database

## 🔧 Quick Fix (Follow These Steps)

### Step 1: Install Dependencies

```bash
cd server
npm install
```

### Step 2: Create .env File

Create a file named `.env` in the `server` folder with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/futwrk
JWT_SECRET=your_secret_key_here
```

### Step 3: Make Sure MongoDB is Running

**Windows:**
- Check if MongoDB service is running
- Or start it: `net start MongoDB`

**Test connection:**
```bash
mongosh
# If this works, MongoDB is running
```

### Step 4: Seed Products

```bash
cd server
npm run seed
```

**You should see:**
```
Connected to MongoDB
Cleared existing products
Seeded 20 products successfully
```

### Step 5: Verify Database

```bash
npm run verify
```

**You should see:**
```
✅ Connected to MongoDB successfully!
📦 Products Collection:
   Total products: 20
```

### Step 6: Check MongoDB Compass

1. Open **MongoDB Compass**
2. Connect: `mongodb://localhost:27017`
3. Click **`futwrk`** database
4. You should see **`products`** collection with 20 items

## 📦 About Cart Data

**Cart collection only appears when:**
- ✅ User logs in
- ✅ User adds items to cart

**To see cart data:**
1. Start backend: `npm start` (in server folder)
2. Start frontend: `npm start` (in root folder)  
3. Register/Login
4. Add products to cart
5. Check MongoDB Compass → `carts` collection will appear

## 🐛 Still Not Working?

Run these commands one by one:

```bash
# 1. Go to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Check if .env exists
# Create it if it doesn't exist with the content above

# 4. Seed products
npm run seed

# 5. Verify
npm run verify

# 6. Check MongoDB Compass
# Connect: mongodb://localhost:27017
# Database: futwrk
```

## ✅ Expected Results

After running `npm run seed`, you should see:
- **20 products** in `products` collection
- Database name: **`futwrk`**
- Connection: **`mongodb://localhost:27017`**

After using the app (login + add to cart):
- **`users`** collection (after registration)
- **`carts`** collection (after adding to cart)
- **`orders`** collection (after placing order)

