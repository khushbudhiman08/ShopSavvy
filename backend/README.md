# Futwrk Backend API

Backend server for the Futwrk e-commerce application built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Product management (CRUD operations)
- Shopping cart management (persisted in database)
- Order management (create and retrieve user orders)
- JWT-based authentication
- MongoDB database with 4 collections: users, products, carts, orders

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the values in `.env`:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/futwrk
     JWT_SECRET=your_secure_jwt_secret_key_here
     ```

3. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/futwrk`

4. **Seed Products Database** (Optional)
   ```bash
   node scripts/seedProducts.js
   ```
   This will populate the database with sample products.

5. **Start the Server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products (supports query params: category, type, search)
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `PUT /api/cart/update/:itemId` - Update cart item quantity (protected)
- `DELETE /api/cart/remove/:itemId` - Remove item from cart (protected)
- `DELETE /api/cart/clear` - Clear entire cart (protected)

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/my-orders` - Get all orders for current user (protected)
- `GET /api/orders/:id` - Get single order by ID (protected)
- `PATCH /api/orders/:id/status` - Update order status (protected)

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Example API Usage

### Register User
```bash
POST /api/auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
{
  "username": "john_doe",
  "password": "password123"
}
```

### Get Products
```bash
GET /api/products?category=Men&type=Running
```

### Create Order
```bash
POST /api/orders
Headers: Authorization: Bearer <token>
{
  "items": [
    {
      "productId": 1,
      "title": "Men's Black Running",
      "image": "...",
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
    "city": "Mumbai",
    "state": "Maharashtra",
    "postcode": "400001"
  }
}
```

