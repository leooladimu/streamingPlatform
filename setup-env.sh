#!/bin/bash

# Vercel Environment Variables Setup Helper
# This script helps you set environment variables in Vercel

echo "🔐 Vercel Environment Variables Setup"
echo ""
echo "This script will help you set up environment variables for both backend and frontend."
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "Install it with: npm install -g vercel"
    exit 1
fi

echo "Setting up BACKEND environment variables..."
echo ""
read -p "Enter your MongoDB URI: " MONGODB_URI
read -p "Enter JWT Secret (min 32 chars): " JWT_SECRET
read -p "Enter Frontend URL (e.g., https://myapp.vercel.app): " CLIENT_URL

cd backend

echo "Adding backend environment variables to Vercel..."
vercel env add MONGODB_URI production <<< "$MONGODB_URI"
vercel env add JWT_SECRET production <<< "$JWT_SECRET"
vercel env add JWT_EXPIRE production <<< "7d"
vercel env add PORT production <<< "5000"
vercel env add CLIENT_URL production <<< "$CLIENT_URL"
vercel env add NODE_ENV production <<< "production"

echo "✅ Backend environment variables added!"
echo ""

cd ../frontend

read -p "Enter Backend API URL (e.g., https://myapi.vercel.app/api): " API_URL

echo "Adding frontend environment variables to Vercel..."
vercel env add VITE_API_URL production <<< "$API_URL"

echo "✅ Frontend environment variables added!"
echo ""
echo "🎉 All environment variables are set!"
echo ""
echo "Next steps:"
echo "1. Redeploy backend: cd backend && vercel --prod"
echo "2. Redeploy frontend: cd frontend && vercel --prod"
