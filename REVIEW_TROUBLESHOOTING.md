# Review Writing Troubleshooting Guide

If you're unable to write reviews, follow these steps:

## 1. Check if You're Logged In

- Reviews can only be written by logged-in users
- Make sure you're logged in before trying to write a review
- If not logged in, you'll see: "Please login to write a review"

## 2. Check Backend Server

Make sure the backend server is running:

```bash
cd backend
npm start
```

You should see:
```
Server is running on port 5000
✅ Connected to MongoDB successfully!
```

## 3. Check Browser Console

Open browser developer tools (F12) and check the Console tab for errors:
- Look for API errors
- Check if productId is being passed correctly
- Look for network errors

## 4. Verify Product ID

The review form needs a valid product ID. Check:
- Are you on a product page? (not the main page)
- Does the product have an ID?

## 5. Test Review API

Test if the review API is working:

```bash
# Test with curl (replace YOUR_TOKEN with actual token)
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"productId": 1, "rating": 5, "comment": "Great product!"}'
```

## 6. Common Issues

### Issue: "Please select a rating"
- **Solution**: Click on the stars to select a rating (1-5 stars)

### Issue: "Review must be at least 10 characters long"
- **Solution**: Write at least 10 characters in your review

### Issue: "You have already reviewed this product"
- **Solution**: You can only write one review per product. Edit your existing review instead.

### Issue: "Failed to submit review"
- **Check**: 
  1. Backend server is running
  2. You're logged in
  3. Product ID is valid
  4. Check browser console for detailed error

### Issue: Review form not showing
- **Check**:
  1. Are you logged in?
  2. Are you on a product detail page?
  3. Does the product have an ID?

## 7. Manual Testing Steps

1. **Login**: Go to `/account` and login
2. **Navigate**: Go to a product page (click on any shoe)
3. **Scroll**: Scroll down to the "Customer Reviews" section
4. **Write Review**: 
   - Select a rating (click stars)
   - Write a comment (at least 10 characters)
   - Click "Submit Review"

## 8. Check MongoDB

Verify reviews are being saved:

```bash
cd backend
npm run verify
```

Or check MongoDB Compass:
- Connect: `mongodb://127.0.0.1:27017`
- Database: `futwrk`
- Collection: `reviews`

## 9. Reset Review Form

If the form seems stuck:
1. Refresh the page
2. Make sure you're logged in
3. Try again

## Still Having Issues?

1. Check browser console for errors
2. Check backend server logs
3. Verify MongoDB connection
4. Make sure all dependencies are installed:
   ```bash
   cd backend
   npm install
   
   cd ../frontend
   npm install
   ```


