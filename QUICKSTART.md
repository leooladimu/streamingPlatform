# Quick Start Guide

## 🚀 Deploy to Vercel in 5 Minutes

### Prerequisites
1. [Vercel Account](https://vercel.com/signup) - Free
2. [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas/register) - Free

### Step 1: Set Up MongoDB Atlas (2 minutes)
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Build a Database" → Choose FREE (M0)
3. Choose a cloud provider and region
4. Click "Create"
5. Create database user: username + password (save these!)
6. Add IP: 0.0.0.0/0 (allows all IPs)
7. Click "Connect" → "Connect your application"
8. Copy connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/`)

### Step 2: Deploy Backend (1 minute)
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to backend
cd backend

# Deploy
vercel

# When prompted:
# - Link to existing project? No
# - Project name? streaming-backend (or your choice)
# - Directory? ./
# - Override settings? No
```

**Copy the deployment URL** (e.g., https://streaming-backend.vercel.app)

### Step 3: Add Backend Environment Variables (1 minute)
Go to: [Vercel Dashboard](https://vercel.com/dashboard) → Your Backend Project → Settings → Environment Variables

Add these:
```
MONGODB_URI = mongodb+srv://your-user:your-pass@cluster.mongodb.net/netflix-clone
JWT_SECRET = any-random-string-at-least-32-characters-long-make-it-secure
JWT_EXPIRE = 7d
PORT = 5000
CLIENT_URL = https://your-frontend-url.vercel.app
NODE_ENV = production
```

Click "Redeploy" after adding variables.

### Step 4: Deploy Frontend (1 minute)
```bash
# Navigate to frontend
cd ../frontend

# Create production env file
echo "VITE_API_URL=https://your-backend-url.vercel.app/api" > .env.production

# Deploy
vercel

# When prompted:
# - Link to existing project? No
# - Project name? streaming-frontend (or your choice)
# - Directory? ./
```

**Copy the deployment URL** (e.g., https://streaming-frontend.vercel.app)

### Step 5: Update Backend CORS
1. Go to Backend Project → Settings → Environment Variables
2. Update `CLIENT_URL` to your frontend URL
3. Click "Redeploy"

### Step 6: Seed Database (Optional)
```bash
# Update backend/.env with your MongoDB Atlas URI
cd backend
npm run seed
```

## 🎉 Done!

Visit your frontend URL and start using your streaming platform!

## 🆘 Having Issues?

Check [README-DEPLOYMENT.md](./README-DEPLOYMENT.md) for detailed troubleshooting.

### Common Fixes:
- **CORS Error**: Make sure CLIENT_URL matches frontend URL exactly
- **Database Error**: Check MongoDB IP whitelist and connection string
- **API Not Working**: Verify VITE_API_URL in frontend environment variables
- **After changing env vars**: Always redeploy the project

## 📞 Need Help?
- Check browser console (F12) for errors
- Check Vercel deployment logs
- See DEPLOYMENT-CHECKLIST.md for complete checklist
