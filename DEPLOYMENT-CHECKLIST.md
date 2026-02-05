# 📋 Pre-Deployment Checklist

Use this checklist before deploying to Fly.io (backend) and Vercel (frontend).

## 🔧 Backend Preparation

- [ ] Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Create MongoDB Atlas account
- [ ] Create a MongoDB cluster (free M0 tier)
- [ ] Create database user with strong password
- [ ] Add `0.0.0.0/0` to IP Access List
- [ ] Get MongoDB connection string
- [ ] Generate strong JWT secret (32+ characters)
- [ ] Test backend locally with production MongoDB URI

## 🎨 Frontend Preparation

- [ ] Update API URL in code if hardcoded
- [ ] Test frontend locally
- [ ] Check browser console for errors
- [ ] Verify all images load correctly
- [ ] Test on mobile/tablet views

## 🔐 Environment Variables Ready

### Backend (.env)
- [ ] `MONGODB_URI` - MongoDB Atlas connection string
- [ ] `JWT_SECRET` - Strong random secret (32+ chars)
- [ ] `JWT_EXPIRE` - Token expiration (e.g., "7d")
- [ ] `CLIENT_URL` - Will be updated after frontend deployment
- [ ] `NODE_ENV` - Set to "production"

### Frontend (.env.production)
- [ ] `VITE_API_URL` - Will be updated after backend deployment

## 📦 Git Repository

- [ ] Initialize git: `git init`
- [ ] Add .gitignore file
- [ ] Commit all code: `git add . && git commit -m "Initial commit"`
- [ ] Create GitHub/GitLab repository
- [ ] Push code: `git remote add origin <url> && git push -u origin main`

## 🚀 Deployment Steps

### Step 1: Deploy Backend to Fly.io
- [ ] `cd backend`
- [ ] `fly auth login`
- [ ] `fly launch`
- [ ] Follow prompts, choose app name and region
- [ ] Copy backend URL (e.g., https://xyz.fly.dev)
- [ ] Set environment variables: `fly secrets set KEY="value"`
- [ ] Deploy: `fly deploy`

### Step 2: Deploy Frontend
- [ ] Create `.env.production` with backend API URL
- [ ] `cd frontend`
- [ ] `vercel`
- [ ] Follow prompts, name project
- [ ] Add `VITE_API_URL` in Vercel Dashboard
- [ ] Copy frontend URL
- [ ] Redeploy: `vercel --prod`

### Step 3: Update CORS
- [ ] `cd backend`
- [ ] Update CLIENT_URL: `fly secrets set CLIENT_URL="https://frontend-url.vercel.app"`
- [ ] Deploy: `fly deploy`

### Step 4: Seed Database (Optional)
- [ ] Update local .env with production MongoDB URI
- [ ] Run: `npm run seed`
- [ ] Or create seed API endpoint and call it once

## ✅ Post-Deployment Testing

- [ ] Visit frontend URL
- [ ] Register new account
- [ ] Login successfully
- [ ] Browse videos
- [ ] Add video to "My List"
- [ ] Play a video
- [ ] Check video progress saves
- [ ] Test on mobile device
- [ ] Check browser console for errors
- [ ] Test all navigation links
- [ ] Verify recommendations work
- [ ] Test search functionality

## 🔍 Troubleshooting

If something doesn't work:
- [ ] Check Fly.io deployment logs: `fly logs`
- [ ] Check Vercel deployment logs
- [ ] Check browser console (F12)
- [ ] Verify environment variables are set correctly
- [ ] Ensure MongoDB Atlas IP whitelist is correct
- [ ] Check CORS settings
- [ ] Verify API endpoints return expected data

## 📱 Optional Enhancements

- [ ] Set up custom domain in Vercel
- [ ] Configure SSL (automatic with Vercel)
- [ ] Set up analytics
- [ ] Add error monitoring (Sentry)
- [ ] Configure CDN for videos
- [ ] Set up staging environment
- [ ] Add CI/CD pipeline
- [ ] Configure automatic deployments from Git

## 📊 Monitor

- [ ] Check Vercel analytics dashboard
- [ ] Monitor MongoDB Atlas metrics
- [ ] Set up alerts for errors
- [ ] Monitor API response times
- [ ] Check user activity

---

✨ **You're ready to deploy!** Run `./deploy.sh` or follow manual steps in README-DEPLOYMENT.md
