# Fix: "Unexpected token '<', "<!DOCTYPE ... is not valid JSON" Error

## Problem
This error occurs when the API returns HTML (usually a 404 error page) instead of JSON. This means the reviews route is not being found by the backend server.

## Solution

### Step 1: Restart Backend Server

The reviews route was added but the server needs to be restarted to load it:

1. **Stop the current backend server:**
   - Press `Ctrl+C` in the terminal where backend is running

2. **Restart the backend server:**
   ```bash
   cd backend
   npm start
   ```

3. **Verify the server started:**
   You should see:
   ```
   Server is running on port 5000
   ✅ Connected to MongoDB successfully!
   ```

### Step 2: Test the Reviews Route

After restarting, test if the route works:

```bash
# Test GET reviews (no auth needed)
curl http://localhost:5000/api/reviews/product/1
```

You should get JSON response (empty array if no reviews):
```json
[]
```

### Step 3: Verify Frontend Can Connect

1. Open browser console (F12)
2. Go to a product page
3. Try to write a review
4. Check console for API calls

## Why This Happens

- The reviews route was added to `server.js` but the server was already running
- Node.js requires a restart to load new routes
- The server was returning a 404 HTML page instead of JSON

## Quick Fix Checklist

- [ ] Backend server is running on port 5000
- [ ] Backend server was restarted after adding reviews route
- [ ] Reviews route file exists: `backend/routes/reviews.js`
- [ ] Review model exists: `backend/models/Review.js`
- [ ] Server.js includes: `app.use('/api/reviews', require('./routes/reviews'));`

## After Restart

Once you restart the backend server, the review writing should work!

1. Login to your account
2. Go to a product page
3. Scroll to reviews section
4. Write a review
5. It should work now! ✅


