# Deployment Guide - Ọleoflix Streaming Platform

This guide will help you deploy your streaming platform to production using Fly.io for the backend and Vercel for the frontend.

## 📋 Prerequisites

1. A [Fly.io account](https://fly.io/app/sign-up) (free tier available)
2. A [Vercel account](https://vercel.com/signup) (free tier works)
3. A [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) (free tier works)
4. [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/) installed
5. [Vercel CLI](https://vercel.com/docs/cli) installed: `npm i -g vercel`

## 🗄️ Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free M0 tier is fine)
3. Create a database user with username and password
4. Add `0.0.0.0/0` to IP Access List (or your specific IPs)
5. Get your connection string (looks like `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

## 🚀 Step 2: Deploy Backend to Fly.io

### Create fly.toml configuration

In your `backend` directory, create a `fly.toml` file:

```toml
app = "your-app-name"
primary_region = "sjc"

[build]

[env]
  PORT = "8080"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256
```

### Deploy to Fly.io

```bash
cd backend

# Login to Fly.io
fly auth login

# Launch your app (this will create the app and fly.toml if it doesn't exist)
fly launch

# Follow the prompts:
# - Choose an app name
# - Select a region
# - Don't add a database (we're using MongoDB Atlas)
# - Deploy now? Y
```

### Set Environment Variables

```bash
# Set your environment variables
fly secrets set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/netflix-clone"
fly secrets set JWT_SECRET="your_super_secret_jwt_key_minimum_32_characters_long"
fly secrets set JWT_EXPIRE="7d"
fly secrets set CLIENT_URL="https://your-frontend-domain.vercel.app"
fly secrets set NODE_ENV="production"

# Deploy with the new secrets
fly deploy
```

Your backend URL will be something like: `https://your-app-name.fly.dev`

## 🎨 Step 3: Deploy Frontend to Vercel

### Create .env.production file in frontend

```bash
cd frontend
```

Create `.env.production` with:
```
VITE_API_URL=https://your-app-name.fly.dev/api
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
VITE_API_URL=https://your-app-name.fly.dev/api
```

Deploy to production:
```bash
vercel --prod
```

Your frontend URL will be something like: `https://streaming-platform-frontend.vercel.app`

## 🔄 Step 4: Update CORS Settings

After getting your frontend URL, update the backend environment variable:

```bash
# Update CLIENT_URL with your frontend URL
fly secrets set CLIENT_URL="https://streaming-platform-frontend.vercel.app"

# Deploy the changes
fly deploy
```

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
fly deploy

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
- Backend API: `https://your-app-name.fly.dev/api`

## 📚 Additional Resources

- [Fly.io Documentation](https://fly.io/docs/)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
