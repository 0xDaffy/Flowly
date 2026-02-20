#!/bin/bash

# 🚀 Simplified Vercel Deployment Script
# This will deploy directly to Vercel

echo "========================================"
echo "🚀 Flowly - Vercel Deployment"
echo "========================================"
echo ""

# Check if logged in
echo "Checking Vercel login status..."
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel"
    echo "Run: vercel login"
    exit 1
fi

echo "✅ Logged in to Vercel"
echo ""

# Deploy directly (Vercel will prompt to link if needed)
echo "🚀 Deploying to Vercel..."
echo ""
echo "This will:"
echo "  1. Prompt you to link the project (if not already linked)"
echo "  2. Build your application"
echo "  3. Deploy to production"
echo ""

vercel --prod

echo ""
echo "========================================"
echo "✅ Deployment Complete!"
echo "========================================"
echo ""
echo "⚠️  IMPORTANT: Add environment variables in Vercel Dashboard:"
echo ""
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Select your Flowly project"
echo "3. Settings → Environment Variables"
echo "4. Add these 5 variables:"
echo ""
echo "   DATABASE_URL"
echo "   CLERK_SECRET_KEY"
echo "   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
echo "   STRIPE_SECRET_KEY"
echo "   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo""
echo "5. Redeploy after adding env vars"
echo ""
