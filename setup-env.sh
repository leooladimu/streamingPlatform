#!/bin/bash

# Fly.io + Vercel Environment Variables Setup Helper
# This script helps you set environment variables for Fly.io backend and Vercel frontend

echo "🔐 Environment Variables Setup"
echo ""
echo "This script will help you set up environment variables for Fly.io backend and Vercel frontend."
echo ""

# Check if fly is installed
if ! command -v fly &> /dev/null; then
    echo "❌ Fly CLI is not installed."
    echo "Install it from: https://fly.io/docs/hands-on/install-flyctl/"
    exit 1
fi

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "Install it with: npm install -g vercel"
    exit 1
fi

echo "Setting up BACKEND environment variables on Fly.io..."
echo ""
read -p "Enter your MongoDB URI: " MONGODB_URI
read -p "Enter JWT Secret (min 32 chars): " JWT_SECRET
read -p "Enter Frontend URL (e.g., https://myapp.vercel.app): " CLIENT_URL

cd backend

echo "Adding backend environment variables to Fly.io..."
fly secrets set MONGODB_URI="$MONGODB_URI"
fly secrets set JWT_SECRET="$JWT_SECRET"
fly secrets set JWT_EXPIRE="7d"
fly secrets set CLIENT_URL="$CLIENT_URL"
fly secrets set NODE_ENV="production"

echo "✅ Backend environment variables added to Fly.io!"
echo ""

cd ../frontend

read -p "Enter Backend API URL (e.g., https://myapp.fly.dev/api): " API_URL

echo "Adding frontend environment variables to Vercel..."
vercel env add VITE_API_URL production <<< "$API_URL"

echo "✅ Frontend environment variables added to Vercel!"
echo ""
echo "🎉 All environment variables are set!"
echo ""
echo "Next steps:"
echo "1. Deploy backend: cd backend && fly deploy"
echo "2. Deploy frontend: cd frontend && vercel --prod"