#!/bin/bash

echo "🚀 Setting up Vercel deployment..."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is ready"
echo ""

# Deploy backend
echo "📦 Deploying Backend..."
cd backend
vercel --prod
BACKEND_URL=$(vercel ls --prod | grep -o 'https://[^ ]*' | head -1)
cd ..

echo ""
echo "✅ Backend deployed!"
echo "Backend URL: $BACKEND_URL"
echo ""

# Update frontend env
echo "🔧 Configuring Frontend..."
cd frontend
echo "VITE_API_URL=${BACKEND_URL}/api" > .env.production

# Deploy frontend
echo "📦 Deploying Frontend..."
vercel --prod
FRONTEND_URL=$(vercel ls --prod | grep -o 'https://[^ ]*' | head -1)
cd ..

echo ""
echo "✅ Frontend deployed!"
echo "Frontend URL: $FRONTEND_URL"
echo ""

echo "⚠️  IMPORTANT: Update your backend environment variables in Vercel Dashboard:"
echo "   CLIENT_URL=${FRONTEND_URL}"
echo ""
echo "🎉 Deployment complete!"
echo "📖 Check README-DEPLOYMENT.md for detailed instructions"
