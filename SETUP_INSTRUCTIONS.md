# Setup Instructions

## 🚀 Complete Setup Guide

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Backend Environment

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/futwrk
JWT_SECRET=your_secure_jwt_secret_key_here
```

### Step 3: Seed Products Database

```bash
cd backend
npm run seed
```

This will populate your database with 20 products.

### Step 4: Start Backend Server

```bash
cd backend
npm start
```

Backend will run on `http://localhost:5000`

### Step 5: Install Frontend Dependencies

Open a **new terminal** and run:

```bash
cd frontend
npm install
```

### Step 6: Start Frontend Development Server

```bash
cd frontend
npm start
```

Frontend will run on `http://localhost:3000`

## ✅ Verification

1. **Backend is running**: Check `http://localhost:5000/api/health`
2. **Frontend is running**: Check `http://localhost:3000`
3. **Database has products**: Run `cd backend && npm run verify`

## 📝 Quick Commands Reference

### Backend Commands
```bash
cd backend
npm install      # Install dependencies
npm start        # Start server
npm run dev      # Start with auto-reload
npm run seed     # Seed products
npm run verify   # Verify database
```

### Frontend Commands
```bash
cd frontend
npm install      # Install dependencies
npm start        # Start dev server
npm run build    # Build for production
npm test         # Run tests
```

## 🔧 Troubleshooting

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/package.json` or use `PORT=3001 npm start`

### MongoDB Connection Issues
- Make sure MongoDB is running
- Check `MONGODB_URI` in `backend/.env`
- See `backend/TROUBLESHOOTING.md` for more help

### Dependencies Not Installing
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Make sure you're in the correct directory (backend or frontend)



