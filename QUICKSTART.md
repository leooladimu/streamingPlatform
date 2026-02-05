# Quick Start Guide

## 🚀 Deploy in 5 Minutes

### Prerequisites
1. [Fly.io Account](https://fly.io/app/sign-up) - Free
2. [Vercel Account](https://vercel.com/signup) - Free
3. [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas/register) - Free

### Step 1: Set Up MongoDB Atlas (2 minutes)
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Build a Database" → Choose FREE (M0)
3. Choose a cloud provider and region
4. Click "Create"
5. Create database user: username + password (save these!)
6. Add IP: 0.0.0.0/0 (allows all IPs)
7. Click "Connect" → "Connect your application"
8. Copy connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/`)

### Step 2: Deploy Backend to Fly.io (1 minute)
```bash
# Install Fly CLI (if not installed)
curl -L https://fly.io/install.sh | sh

# Navigate to backend
cd backend

# Login and deploy
fly auth login
fly launch

# When prompted:
# - App name? streaming-backend (or your choice)
# - Region? Choose closest to you
# - Add database? No (we're using MongoDB Atlas)
# - Deploy now? Yes
```

**Copy the deployment URL** (e.g., https://streaming-backend.fly.dev)

### Step 3: Add Backend Environment Variables (1 minute)
Set environment variables on Fly.io:

```bash
cd backend
fly secrets set MONGODB_URI="mongodb+srv://your-user:your-pass@cluster.mongodb.net/netflix-clone"
fly secrets set JWT_SECRET="any-random-string-at-least-32-characters-long-make-it-secure"
fly secrets set JWT_EXPIRE="7d"
fly secrets set CLIENT_URL="https://your-frontend-url.vercel.app"
fly secrets set NODE_ENV="production"

# Deploy with new secrets
fly deploy
```

### Step 4: Deploy Frontend to Vercel (1 minute)
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Navigate to frontend
cd ../frontend

# Create production env file
echo "VITE_API_URL=https://your-backend-url.fly.dev/api" > .env.production

# Deploy
vercel

# When prompted:
# - Link to existing project? No
# - Project name? streaming-frontend (or your choice)
# - Directory? ./
```

**Copy the deployment URL** (e.g., https://streaming-frontend.vercel.app)

### Step 5: Update Backend CORS
```bash
cd ../backend
fly secrets set CLIENT_URL="https://your-frontend-url.vercel.app"
fly deploy
```

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
