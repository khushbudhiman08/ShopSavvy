# Futwrk - E-commerce Application

Welcome to **Futwrk**, a full-stack e-commerce web application for a shoe store, built with React (frontend) and Node.js/Express (backend).

## 📁 Project Structure

```
Futwrk/
├── frontend/          # React frontend application
│   ├── src/           # React source code
│   ├── public/        # Static files
│   └── package.json   # Frontend dependencies
├── backend/           # Node.js/Express backend API
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── middleware/   # Express middleware
│   ├── scripts/       # Database scripts
│   └── package.json   # Backend dependencies
└── README.md          # This file
```

## ✨ Features

- 🛍️ Product browsing and search
- 👤 User authentication (register/login)
- 🛒 Shopping cart functionality (persisted in database)
- 📦 Order management
- 💳 Checkout process
- 📱 Responsive design
- 💾 All data stored in MongoDB (users, products, carts, orders)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (see backend/ENV_SETUP.md)
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/futwrk
# JWT_SECRET=your_secure_jwt_secret_key_here

# Seed products database
npm run seed

# Start backend server
npm start
```

Backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

Frontend will run on `http://localhost:3000`

## 📚 Documentation

### Backend Documentation
- `backend/README.md` - Backend API documentation
- `backend/ENV_SETUP.md` - Environment variables setup
- `backend/MONGODB_COMPASS_SETUP.md` - MongoDB Compass connection guide
- `backend/SETUP_DATABASE.md` - Database setup guide
- `backend/TROUBLESHOOTING.md` - Troubleshooting guide

### Database Documentation
- `DATABASE_COLLECTIONS.md` - Database collections overview

### Quick Guides
- `QUICK_START.md` - Quick setup guide
- `FIX_DATABASE.md` - Database troubleshooting

## 🔌 API Endpoints

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

## 🗄️ Database Collections

The application uses MongoDB with the following collections:

1. **users** - User accounts (username, email, hashed password)
2. **products** - Product catalog (shoes with details)
3. **carts** - Shopping cart items (one cart per user)
4. **orders** - Customer orders (with billing info and status)

See `DATABASE_COLLECTIONS.md` for detailed schema information.

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

The token is automatically stored in localStorage after login/registration.

## 🛠️ Development

### Running Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Backend Scripts
```bash
cd backend
npm start      # Start server
npm run dev    # Start with nodemon (auto-reload)
npm run seed   # Seed products database
npm run verify # Verify database contents
```

### Frontend Scripts
```bash
cd frontend
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
```

## 📦 Technologies Used

### Frontend
- React
- React Router
- Tailwind CSS
- React Hot Toast
- Material-UI

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## 🔍 MongoDB Compass Connection

Connect to MongoDB Compass using:
```
mongodb://localhost:27017
```

Database name: `futwrk`

See `backend/MONGODB_COMPASS_SETUP.md` for detailed instructions.

## 📝 Environment Variables

### Backend (.env in backend folder)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/futwrk
JWT_SECRET=your_secure_jwt_secret_key_here
```

### Frontend (.env in frontend folder - optional)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Products not showing in database?
```bash
cd backend
npm run seed
```

### Cart not showing?
Cart collection only appears when logged-in users add items to cart.

### Can't connect to MongoDB?
- Make sure MongoDB is running
- Check connection string in `.env` file
- See `backend/TROUBLESHOOTING.md` for more help

## 📄 License

This project is for educational purposes.
