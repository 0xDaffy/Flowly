#!/bin/bash

# 🚀 Flowly Quick Setup Script
# This will set up the local database

echo "🚀 Setting up Flowly..."
echo ""

# Setup database
echo "📦 Setting up SQLite database..."
pnpm prisma db push --accept-data-loss

echo ""
echo "✅ Database setup complete!"
echo ""
echo "⚠️  IMPORTANT: You still need Clerk authentication keys"
echo ""
echo "📝 To get Clerk keys (takes 2 minutes):"
echo "   1. Go to https://clerk.com and create a free account"
echo "   2. Create a new application"
echo "   3. Go to Dashboard -> API Keys"
echo "   4. Copy the keys and paste them in .env.local"
echo ""
echo "🎯 Once you have Clerk keys, run:"
echo "   pnpm dev"
echo ""
echo "📖 Or view the landing page without auth:"
echo "   Just start the dev server and visit http://localhost:3000"
echo ""
