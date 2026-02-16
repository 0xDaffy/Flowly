#!/bin/bash

# 🚀 Vercel Environment Variables Setup Script
# This script adds all environment variables to your Vercel project

echo "📝 Vercel Environment Variables Setup"
echo "===================================="
echo ""
echo "Make sure you have Vercel CLI installed:"
echo "npm i -g vercel"
echo ""
echo "Run this script with:"
echo "chmod +x setup-vercel-env.sh"
echo "./setup-vercel-env.sh"
echo ""
echo "===================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found!"
    echo "Install it with: npm i -g vercel"
    exit 1
fi

echo "✅ Vercel CLI found!"
echo ""
echo "Adding environment variables to Vercel..."
echo ""

# Add DATABASE_URL
echo "1️⃣  Adding DATABASE_URL..."
vercel env add DATABASE_URL production preview development << EOF
postgresql://neondb_owner:npg_ReDa3FWqiVw6@ep-solitary-bread-a8k9p8v4-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require
EOF

# Add CLERK_SECRET_KEY
echo ""
echo "2️⃣  Adding CLERK_SECRET_KEY..."
vercel env add CLERK_SECRET_KEY production preview development << EOF
sk_test_yCisoniqjLm0UZKWu61J3x6a7Y2iBkxmc8M7klKYzC
EOF

# Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
echo ""
echo "3️⃣  Adding NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY..."
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production preview development << EOF
pk_test_aW4tdHJlZWZyb2ctNDQuY2xlcmsuYWNjb3VudHMuZGV2JA
EOF

# Add STRIPE_SECRET_KEY
echo ""
echo "4️⃣  Adding STRIPE_SECRET_KEY..."
vercel env add STRIPE_SECRET_KEY production preview development << EOF
sk_test_51T1P4yF4I6lnNP2s52XmFBXkCVJUSDGCHjgqHvYqL5yqRzowxULiQnXqFnnI7d8nCl1wIinke4xY2Ejj5UHG7kj900aS8SNDOn
EOF

# Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
echo ""
echo "5️⃣  Adding NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY..."
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production preview development << EOF
pk_test_51T1P4yF4I6lnNP2s8xGd1qTvmmsqsHtFazbt7f0Eg7JpQCPIvR8Pb9mRsKSLxDTXe0DuqG9fxuYFamrjdSLKqB3R00Nymr5Y2E
EOF

echo ""
echo "======================================"
echo "✅ All environment variables added!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Verify variables in Vercel dashboard"
echo "2. Redeploy your app"
echo "3. Test at https://your-project.vercel.app"
echo ""
