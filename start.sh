#!/bin/bash

echo "🚀 Starting Flowly Application..."
echo ""

# Navigate to project
cd /workspaces/Flowly

echo "📦 Setting up database..."
pnpm prisma db push --accept-data-loss

echo ""
echo "✅ Database ready!"
echo ""
echo "🌐 Starting development server..."
echo "Access the app at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

pnpm dev
