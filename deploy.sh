#!/bin/bash

echo "🚀 Setting up deployment..."
echo ""

# Check if fly CLI is installed
if ! command -v fly &> /dev/null; then
    echo "❌ Fly CLI is not installed."
    echo "📦 Please install Fly CLI: https://fly.io/docs/hands-on/install-flyctl/"
    exit 1
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ CLIs are ready"
echo ""

# Deploy backend to Fly.io
echo "📦 Deploying Backend to Fly.io..."
cd backend

# Check if fly.toml exists, if not create it
if [ ! -f "fly.toml" ]; then
    echo "Creating fly.toml configuration..."
    fly launch --no-deploy
fi

fly deploy
BACKEND_URL=$(fly status --json | jq -r '.Hostname' | sed 's/^/https:\/\//')
cd ..

echo ""
echo "✅ Backend deployed to Fly.io!"
echo "Backend URL: $BACKEND_URL"
echo ""

# Update frontend env
echo "🔧 Configuring Frontend..."
cd frontend
echo "VITE_API_URL=${BACKEND_URL}/api" > .env.production

# Deploy frontend to Vercel
echo "📦 Deploying Frontend to Vercel..."
vercel --prod
FRONTEND_URL=$(vercel ls --prod | grep -o 'https://[^ ]*' | head -1)
cd ..

echo ""
echo "✅ Frontend deployed to Vercel!"
echo "Frontend URL: $FRONTEND_URL"
echo ""

echo "🔄 Updating backend CORS settings..."
cd backend
fly secrets set CLIENT_URL="$FRONTEND_URL"
fly deploy
cd ..

echo ""
echo "✅ CORS settings updated!"
echo ""
echo "🎉 Deployment complete!"
echo "Frontend: $FRONTEND_URL"
echo "Backend: $BACKEND_URL"
echo "📚 Check README-DEPLOYMENT.md for detailed instructions"