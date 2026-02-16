#!/bin/bash

# 🚀 FLOWLY DEPLOYMENT - RUN THIS SCRIPT
# Copy and paste these commands one by one in your terminal

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

# Step 3: Deploy directly (this will prompt for project setup)
echo "Step 3: Deploying to Vercel..."
echo ""
echo "When prompted:"
echo "  - Set up and deploy? → Yes"
echo "  - Which scope? → Select your account"
echo "  - Link to existing project? → Yes (if you have one) or No"
echo "  - What's your project's name? → flowly (or flowly3)"
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
echo "   postgresql://neondb_owner:npg_ReDa3FWqiVw6@ep-solitary-bread-a8k9p8v4-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require"
echo ""
echo "2. CLERK_SECRET_KEY"
echo "   sk_test_yCisoniqjLm0UZKWu61J3x6a7Y2iBkxmc8M7klKYzC"
echo ""
echo "3. NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
echo "   pk_test_aW4tdHJlZWZyb2ctNDQuY2xlcmsuYWNjb3VudHMuZGV2JA"
echo ""
echo "4. STRIPE_SECRET_KEY"
echo "   sk_test_51T1P4yF4I6lnNP2s52XmFBXkCVJUSDGCHjgqHvYqL5yqRzowxULiQnXqFnnI7d8nCl1wIinke4xY2Ejj5UHG7kj900aS8SNDOn"
echo ""
echo "5. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo "   pk_test_51T1P4yF4I6lnNP2s8xGd1qTvmmsqsHtFazbt7f0Eg7JpQCPIvR8Pb9mRsKSLxDTXe0DuqG9fxuYFamrjdSLKqB3R00Nymr5Y2E"
echo ""
echo "Then redeploy: vercel --prod"
echo ""
