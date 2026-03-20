# Database Collections Guide

This document describes all the collections stored in the MongoDB database for the Futwrk application.

## Collections Overview

The `futwrk` database contains the following collections:

1. **users** - User accounts and authentication
2. **products** - Product catalog (shoes)
3. **carts** - Shopping cart items for each user
4. **orders** - Customer orders

---

## 1. Users Collection

**Purpose:** Store user account information and authentication data.

**Schema:**
```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "password": "$2a$10$hashedPasswordHere...",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Key Features:**
- Passwords are hashed using bcrypt
- Username and email are unique
- Automatically timestamps creation and updates

---

## 2. Products Collection

**Purpose:** Store product catalog information (shoes).

**Schema:**
```javascript
{
  _id: ObjectId,
  id: Number (unique, required), // Product ID
  image: String (required),
  shoeTitle: String (required),
  shoePrice: Number (required),
  oldShoePrice: Number (optional),
  saleStatus: Boolean (default: false),
  type: String (enum: ['Running', 'Sneaker', 'Training']),
  category: String (enum: ['Men', 'Women']),
  desc: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "id": 1,
  "image": "https://example.com/shoe.jpg",
  "shoeTitle": "Men's Black Running",
  "shoePrice": 4500,
  "oldShoePrice": null,
  "saleStatus": false,
  "type": "Running",
  "category": "Men",
  "desc": "Product description here...",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Key Features:**
- Products can be filtered by category, type, and search
- Supports sale pricing with oldShoePrice
- Seeded with sample data via `scripts/seedProducts.js`

---

## 3. Carts Collection

**Purpose:** Store shopping cart items for each logged-in user.

**Schema:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', unique, required),
  items: [
    {
      productId: Number (required),
      title: String (required),
      image: String (required),
      price: Number (required),
      quantity: Number (required, min: 1),
      size: String (required)
    }
  ],
  totalAmount: Number (auto-calculated),
  createdAt: Date,
  updatedAt: Date
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "productId": 1,
      "title": "Men's Black Running",
      "image": "https://example.com/shoe.jpg",
      "price": 4500,
      "quantity": 2,
      "size": "9"
    }
  ],
  "totalAmount": 9000,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Key Features:**
- One cart per user (unique userId)
- Total amount is automatically calculated
- Items are stored with product details for quick access
- Cart persists across sessions

---

## 4. Orders Collection

**Purpose:** Store customer orders with full order details.

**Schema:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  items: [
    {
      productId: Number (required),
      title: String (required),
      image: String (required),
      price: Number (required),
      quantity: Number (required, min: 1),
      size: String (required)
    }
  ],
  totalAmount: Number (required),
  customerInfo: {
    email: String,
    firstName: String,
    lastName: String,
    phone: String
  },
  billingAddress: {
    street: String,
    apartment: String,
    city: String,
    state: String,
    postcode: String
  },
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  createdAt: Date,
  updatedAt: Date
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "userId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "productId": 1,
      "title": "Men's Black Running",
      "image": "https://example.com/shoe.jpg",
      "price": 4500,
      "quantity": 2,
      "size": "9"
    }
  ],
  "totalAmount": 9000,
  "customerInfo": {
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "1234567890"
  },
  "billingAddress": {
    "street": "123 Main St",
    "apartment": "Apt 4B",
    "city": "Mumbai",
    "state": "Maharashtra",
    "postcode": "400001"
  },
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Key Features:**
- Stores complete order snapshot
- Includes customer and billing information
- Order status can be tracked
- Linked to user via userId

---

## Viewing Collections in MongoDB Compass

1. **Connect to MongoDB:**
   ```
   mongodb://localhost:27017
   ```

2. **Navigate to Database:**
   - Click on `futwrk` database

3. **View Collections:**
   - Click on any collection name (users, products, carts, orders)
   - Browse documents in the collection
   - Use filters and queries to search

4. **Common Queries:**

   **Find all products:**
   ```javascript
   {}
   ```

   **Find products by category:**
   ```javascript
   { "category": "Men" }
   ```

   **Find user's cart:**
   ```javascript
   { "userId": ObjectId("507f1f77bcf86cd799439011") }
   ```

   **Find user's orders:**
   ```javascript
   { "userId": ObjectId("507f1f77bcf86cd799439011") }
   ```

---

## Data Flow

1. **User Registration/Login:**
   - Creates/authenticates user → stored in `users` collection

2. **Product Browsing:**
   - Products fetched from `products` collection

3. **Add to Cart:**
   - Item added to user's cart → stored in `carts` collection

4. **Place Order:**
   - Cart items converted to order → stored in `orders` collection
   - Cart is cleared after order placement

5. **View Orders:**
   - Orders fetched from `orders` collection filtered by userId

---

## Database Indexes

Recommended indexes for better performance:

```javascript
// Users
db.users.createIndex({ "username": 1 }, { unique: true })
db.users.createIndex({ "email": 1 }, { unique: true })

// Products
db.products.createIndex({ "id": 1 }, { unique: true })
db.products.createIndex({ "category": 1 })
db.products.createIndex({ "type": 1 })

// Carts
db.carts.createIndex({ "userId": 1 }, { unique: true })

// Orders
db.orders.createIndex({ "userId": 1 })
db.orders.createIndex({ "status": 1 })
db.orders.createIndex({ "createdAt": -1 })
```

---

## Backup and Maintenance

- **Backup:** Use `mongodump` to backup the database
- **Restore:** Use `mongorestore` to restore from backup
- **Clear Data:** Delete documents or drop collections as needed
- **Seed Products:** Run `node scripts/seedProducts.js` to repopulate products

---

## Notes

- All timestamps are automatically managed by Mongoose
- Passwords are never stored in plain text
- Cart data persists across sessions for logged-in users
- Orders are immutable snapshots (don't change after creation)
- Product IDs are numeric for compatibility with frontend



