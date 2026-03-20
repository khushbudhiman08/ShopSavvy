# Environment Variables Setup

Create a `.env` file in the `server/` directory with the following variables:

## Required Variables

```env
# Server Port
PORT=5000

# MongoDB Connection String
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/futwrk

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/futwrk

# JWT Secret Key (change this to a secure random string)
JWT_SECRET=your_secure_jwt_secret_key_here_change_this_in_production
```

## Setup Instructions

1. **Create `.env` file** in the `server/` directory:
   ```bash
   cd server
   touch .env  # Mac/Linux
   # Or create .env file manually in Windows
   ```

2. **Copy the template above** and paste into `.env`

3. **Update the values:**
   - `PORT`: Keep as 5000 (or change if needed)
   - `MONGODB_URI`: 
     - Local: `mongodb://localhost:27017/futwrk`
     - Atlas: Your Atlas connection string
   - `JWT_SECRET`: Generate a secure random string
     ```bash
     # Generate a random secret (Mac/Linux)
     openssl rand -base64 32
     ```

## MongoDB Compass Connection

To connect MongoDB Compass to your database:

### Local MongoDB
```
mongodb://localhost:27017
```

### MongoDB Atlas
Use the full connection string from Atlas dashboard:
```
mongodb+srv://username:password@cluster.mongodb.net
```

## Security Notes

⚠️ **Important:**
- Never commit `.env` file to version control
- Use strong, random JWT_SECRET in production
- Keep MongoDB credentials secure
- `.env` is already in `.gitignore`

## Verification

After setting up `.env`, start the server:
```bash
npm start
```

You should see:
```
✅ Connected to MongoDB successfully!
📊 Database: mongodb://localhost:27017/futwrk
💡 Connect to MongoDB Compass using: mongodb://localhost:27017
```

