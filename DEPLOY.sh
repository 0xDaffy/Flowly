#!/bin/bash

# 🚀 FLOWLY DEPLOYMENT - RUN THIS SCRIPT

set -e

echo "========================================"
echo "🚀 FLOWLY DEPLOYMENT"
echo "========================================"
echo ""

# Step 1: Check Vercel login
echo "Step 1: Checking Vercel login..."
if ! vercel whoami 2>/dev/null; then
    echo "❌ Not logged in. Logging in now..."
    vercel login
else
    echo "✅ Already logged in"
fi

echo ""

# Step 2: Clean any existing config
echo "Step 2: Cleaning old configuration..."
rm -rf .vercel 2>/dev/null || true
echo "✅ Clean"

echo ""

# Step 3: Install dependencies and build locally first to verify
echo "Step 3: Installing dependencies..."
pnpm install

echo ""
echo "Step 4: Building locally to verify..."
pnpm build

echo ""
echo "Step 5: Deploying to Vercel..."
echo "Deploying with project name: flowly"
echo ""

# Deploy with explicit project name (must be lowercase)
vercel --prod --yes --name flowly
echo ""
echo "This will deploy your verified build to Vercel production"
echo ""

vercel --prod --yes

echo ""
echo "========================================"
echo "✅ DEPLOYMENT INITIATED!"
echo "========================================"
echo ""
echo "⚠️  NEXT: Add these environment variables in Vercel Dashboard:"
echo ""
echo "Go to: https://vercel.com/dashboard"
echo "→ Select your project"
echo "→ Settings → Environment Variables"
echo ""
echo "Add each variable (Production, Preview, Development):"
echo ""
echo "1. DATABASE_URL"
echo "   postgresql://YOUR_DATABASE_URL"
echo ""
echo "2. CLERK_SECRET_KEY"
echo "   sk_test_YOUR_CLERK_SECRET_KEY"
echo ""
echo "3. NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
echo "   pk_test_YOUR_CLERK_PUBLISHABLE_KEY"
echo ""
echo "4. STRIPE_SECRET_KEY"
echo "   sk_test_YOUR_STRIPE_SECRET_KEY"
echo ""
echo "5. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo "   pk_test_YOUR_STRIPE_PUBLISHABLE_KEY"
echo ""
echo "6. NEXT_PUBLIC_CLERK_SIGN_IN_URL"
echo "   /sign-in"
echo ""
echo "7. NEXT_PUBLIC_CLERK_SIGN_UP_URL"
echo "   /sign-up"
echo ""
echo "8. NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL"
echo "   /dashboard"
echo ""
echo "9. NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL"
echo "   /dashboard"
echo ""
echo "Check each variable for: ☑️ Production, Preview, Development"
echo ""
echo "Then the app will auto-redeploy with the env vars!"
echo ""
