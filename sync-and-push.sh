#!/bin/bash

echo "🔄 Syncing with remote repository..."

# Pull remote changes and merge
git pull origin main --rebase

echo "⬆️  Pushing to GitHub..."
git push origin main

echo "✅ Repository updated successfully!"
echo "🔗 View at: https://github.com/0xDaffy/Flowly"
