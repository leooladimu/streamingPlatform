# Deployment Guide - Ọleoflix Streaming Platform

This guide will help you deploy your streaming platform to production using Vercel.

## 📋 Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier works)
2. A [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) (free tier works)
3. [Vercel CLI](https://vercel.com/docs/cli) installed: `npm i -g vercel`

## 🗄️ Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free M0 tier is fine)
3. Create a database user with username and password
4. Add `0.0.0.0/0` to IP Access List (or your specific IPs)
5. Get your connection string (looks like `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

## 🚀 Step 2: Deploy Backend to Vercel

### Option A: Using Vercel CLI

```bash
cd backend
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? `streaming-platform-backend`
- Directory? `./`
- Override settings? **N**

### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository
4. Set Root Directory to `backend`
5. Click "Deploy"

### Configure Backend Environment Variables

In Vercel Dashboard → Your Backend Project → Settings → Environment Variables, add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix-clone
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d
PORT=5000
CLIENT_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
```

**Important:** Replace with your actual MongoDB URI and generate a secure JWT_SECRET!

After adding environment variables, redeploy:
```bash
vercel --prod
```

Your backend URL will be something like: `https://streaming-platform-backend.vercel.app`

## 🎨 Step 3: Deploy Frontend to Vercel

### Create .env.production file in frontend

```bash
cd frontend
```

Create `.env.production` with:
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

### Deploy Frontend

```bash
vercel
```

Follow the same prompts as backend:
- Project name? `streaming-platform-frontend`
- Directory? `./`

### Configure Frontend Environment Variables

In Vercel Dashboard → Your Frontend Project → Settings → Environment Variables, add:

```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

Deploy to production:
```bash
vercel --prod
```

Your frontend URL will be something like: `https://streaming-platform-frontend.vercel.app`

## 🔄 Step 4: Update CORS Settings

After getting your frontend URL, update the backend environment variable:

1. Go to Backend Project → Settings → Environment Variables
2. Update `CLIENT_URL` to your frontend URL: `https://streaming-platform-frontend.vercel.app`
3. Redeploy backend

## 📦 Step 5: Seed Database (Optional)

You can seed your production database:

```bash
cd backend
# Temporarily update .env to use your MongoDB Atlas URI
npm run seed
```

Or create a one-time Vercel function to seed data.

## ✅ Step 6: Test Your Deployment

1. Visit your frontend URL
2. Try registering a new account
3. Test logging in
4. Try adding videos to your list
5. Check the browser console for any errors

## 🔧 Troubleshooting

### CORS Errors
- Make sure `CLIENT_URL` in backend matches your frontend URL exactly
- Check that CORS is properly configured in `server.js`

### Database Connection Errors
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check your connection string is correct
- Ensure database user has proper permissions

### Environment Variables Not Working
- Make sure to redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)
- For Vite, variables must start with `VITE_`

### API Requests Failing
- Check the Network tab in browser DevTools
- Verify `VITE_API_URL` is set correctly
- Ensure backend is deployed and accessible

## 🔄 Continuous Deployment

### With Git Integration (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. In Vercel Dashboard, import from Git
3. Every push to `main` branch will auto-deploy
4. Set up preview deployments for branches

### Manual Deployment

```bash
# Deploy backend
cd backend
vercel --prod

# Deploy frontend
cd frontend
vercel --prod
```

## 📝 Important Notes

1. **Never commit `.env` files** - they're gitignored
2. **Use strong JWT secrets** - generate random strings for production
3. **Secure your MongoDB** - use strong passwords and limit IP access
4. **Monitor usage** - check Vercel and MongoDB Atlas dashboards
5. **Set up custom domain** - in Vercel Dashboard → Settings → Domains

## 🎉 You're Live!

Your streaming platform is now deployed and accessible worldwide!

- Frontend: `https://your-frontend.vercel.app`
- Backend API: `https://your-backend.vercel.app/api`

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
