#!/bin/bash

# 🚀 Git Commit and Push Script for Flowly

echo "📦 Staging all changes..."
git add .

echo "📝 Committing changes..."
git commit -m "feat: Complete Flowly project management SaaS application

- Built full-stack Next.js 15 app with TypeScript
- Implemented Prisma database with 13 models
- Added Clerk authentication (App Router pattern)
- Created tRPC API with 5 routers (workspace, project, board, card, user)
- Built Kanban board with drag-and-drop functionality
- Designed modern UI with shadcn/ui and Tailwind CSS
- Integrated Stripe for payments
- Added DeepL translation service
- Configured SQLite for local development
- Created comprehensive documentation (README, DEVELOPMENT, QUICKSTART)

Tech stack: Next.js 15, React 19, TypeScript, Prisma, tRPC, Clerk, Stripe, Tailwind"

echo "⬆️  Pushing to GitHub..."
git push origin main

echo "✅ Repository updated successfully!"
echo "🔗 View at: https://github.com/0xDaffy/Flowly"
