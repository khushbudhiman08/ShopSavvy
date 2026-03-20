# Project Structure

This document describes the organization of the Futwrk project.

## 📁 Directory Structure

```
Futwrk/
├── frontend/                 # React frontend application
│   ├── public/              # Static files (HTML, images, etc.)
│   │   ├── index.html       # Main HTML file
│   │   └── ...
│   ├── src/                 # React source code
│   │   ├── Components/      # React components
│   │   │   ├── Account.js
│   │   │   ├── Cart.js
│   │   │   ├── LoginPage.js
│   │   │   └── ...
│   │   ├── utils/           # Utility functions
│   │   │   └── api.js       # API client
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   ├── package.json         # Frontend dependencies
│   └── tailwind.config.js   # Tailwind CSS configuration
│
├── backend/                  # Node.js/Express backend API
│   ├── models/              # MongoDB models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/              # API route handlers
│   │   ├── auth.js         # Authentication routes
│   │   ├── products.js     # Product routes
│   │   ├── cart.js         # Cart routes
│   │   └── orders.js       # Order routes
│   ├── middleware/          # Express middleware
│   │   └── auth.js         # JWT authentication middleware
│   ├── scripts/             # Database scripts
│   │   ├── seedProducts.js # Seed products database
│   │   └── verifyDatabase.js # Verify database contents
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables (create this)
│
└── Documentation files
    ├── README.md           # Main project README
    ├── QUICK_START.md      # Quick setup guide
    ├── DATABASE_COLLECTIONS.md # Database schema
    └── ...
```

## 🎯 Frontend Structure

The `frontend/` directory contains the React application:

- **`src/Components/`** - All React components (pages, UI elements)
- **`src/utils/`** - Utility functions, API client
- **`public/`** - Static assets (images, HTML, manifest)
- **`package.json`** - Frontend dependencies and scripts

## 🔧 Backend Structure

The `backend/` directory contains the Node.js/Express API:

- **`models/`** - Mongoose schemas for MongoDB
- **`routes/`** - API endpoint handlers
- **`middleware/`** - Express middleware (auth, etc.)
- **`scripts/`** - Utility scripts (seeding, verification)
- **`server.js`** - Main server entry point
- **`package.json`** - Backend dependencies and scripts

## 🚀 Running the Project

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build/ folder with a static server
```

## 📦 Dependencies

### Frontend Dependencies
Located in `frontend/package.json`:
- React & React DOM
- React Router
- Tailwind CSS
- Material-UI
- React Hot Toast
- And more...

### Backend Dependencies
Located in `backend/package.json`:
- Express
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

## 🔄 Data Flow

1. **Frontend** (`frontend/src/`) makes API calls via `utils/api.js`
2. **Backend** (`backend/routes/`) handles requests
3. **Models** (`backend/models/`) interact with MongoDB
4. **Database** stores all data (users, products, carts, orders)

## 📝 Environment Files

- **`backend/.env`** - Backend environment variables (MongoDB URI, JWT secret, etc.)
- **`frontend/.env`** - Frontend environment variables (API URL, etc.) - Optional

## 🗂️ Why This Structure?

- **Separation of Concerns**: Frontend and backend are completely separate
- **Independent Deployment**: Can deploy frontend and backend separately
- **Clear Organization**: Easy to find files and understand the project
- **Scalability**: Easy to add new features or services
- **Team Collaboration**: Frontend and backend teams can work independently



