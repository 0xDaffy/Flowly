# 📚 Flowly Development Guide

## Table of Contents
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Authentication Setup](#authentication-setup)
- [Stripe Setup](#stripe-setup)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

### System Requirements
- Node.js 18.17 or later
- pnpm 8.0 or later
- PostgreSQL 14 or later (or Neon account)
- Git

### Installation Steps

1. **Clone and Install**
```bash
git clone https://github.com/yourusername/flowly.git
cd flowly
pnpm install
```

2. **Environment Variables**
Copy the example environment file:
```bash
cp .env.example .env.local
```

---

## Environment Setup

### Required Environment Variables

#### Database (Neon/PostgreSQL)
```env
DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"
```

- Get a free PostgreSQL database from [Neon](https://neon.tech)
- Or use local PostgreSQL: `postgresql://postgres:password@localhost:5432/flowly`

#### Clerk Authentication
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
```

**Setup Steps:**
1. Create account at [Clerk.com](https://clerk.com)
2. Create new application
3. Copy API keys from Dashboard → API Keys
4. Set up webhook endpoint for `/api/webhooks/clerk`

#### Stripe Payments
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Setup Steps:**
1. Create account at [Stripe.com](https://stripe.com)
2. Get test API keys from Dashboard → Developers → API keys
3. Install Stripe CLI for webhook testing
4. Set up webhook endpoint for `/api/webhooks/stripe`

#### DeepL Translation (Optional)
```env
NEXT_PUBLIC_DEEPL_API_KEY=your_deepl_api_key
```

**Setup Steps:**
1. Create account at [DeepL.com](https://www.deepl.com/pro-api)
2. Get API key from account settings
3. Free tier includes 500,000 characters/month

#### App Configuration
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Database Setup

### Initialize Database

1. **Push schema to database**
```bash
pnpm prisma db push
```

2. **Generate Prisma Client**
```bash
pnpm prisma generate
```

3. **Open Prisma Studio** (Optional - GUI for database)
```bash
pnpm prisma studio
```

### Database Migrations

For production, use migrations instead of db push:
```bash
pnpm prisma migrate dev --name init
pnpm prisma migrate deploy  # For production
```

### Seed Database (Optional)

Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Add seed data here
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Run seeding:
```bash
pnpm prisma db seed
```

---

## Authentication Setup

### Clerk Configuration

1. **Create Clerk Application**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Create new application
   - Choose authentication providers (Google, GitHub, etc.)

2. **Configure Redirect URLs**
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`

3. **Set up Webhooks**
   - Add webhook endpoint: `https://yourdomain.com/api/webhooks/clerk`
   - Subscribe to events: `user.created`, `user.updated`, `user.deleted`
   - Copy webhook secret to `CLERK_WEBHOOK_SECRET`

### Testing Authentication Locally

Use Clerk's development mode:
```bash
pnpm dev
```

Clerk automatically handles localhost development.

---

## Stripe Setup

### Create Products and Prices

1. **Go to Stripe Dashboard → Products**
2. **Create subscription products:**

**Free Plan**
- Price: $0/month
- Features: 3 projects, 10 team members

**Pro Plan**
- Price: $29/month
- Features: Unlimited projects, 50 team members, AI translation

**Enterprise Plan**
- Price: $99/month
- Features: Everything + priority support, custom integrations

3. **Copy Price IDs** for your application

### Webhook Testing

Use Stripe CLI for local development:
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

---

## Development Workflow

### Running the Development Server

```bash
pnpm dev
```

Server will start at [http://localhost:3000](http://localhost:3000)

### Project Scripts

```json
{
  "dev": "next dev",              // Start dev server
  "build": "next build",          // Build for production
  "start": "next start",          // Start production server
  "lint": "next lint",            // Run ESLint
  "db:push": "prisma db push",    // Push schema changes
  "db:studio": "prisma studio"    // Open database GUI
}
```

### Code Structure

```
src/
├── app/                  # Next.js pages and routing
│   ├── api/             # API endpoints
│   ├── dashboard/       # Protected dashboard pages
│   └── workspace/       # Workspace pages
├── components/
│   ├── board/          # Kanban board components
│   ├── dashboard/      # Dashboard UI
│   ├── ui/            # Reusable UI components
│   └── workspace/     # Workspace components
└── lib/
    ├── routers/       # tRPC API routers
    ├── db.ts          # Database client
    ├── trpc.ts        # tRPC configuration
    └── utils.ts       # Utility functions
```

### Adding New Features

1. **Database Changes**
   - Update `prisma/schema.prisma`
   - Run `pnpm prisma db push`
   - Generate client: `pnpm prisma generate`

2. **API Routes**
   - Create router in `src/lib/routers/`
   - Add to `src/lib/root.ts`

3. **UI Components**
   - Create component in appropriate folder
   - Use tRPC hooks for data fetching

---

## Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Create workspace
- [ ] Create project
- [ ] Add board columns
- [ ] Create and move cards
- [ ] Add comments
- [ ] Invite team members
- [ ] Test payment flow
- [ ] Test translation (if enabled)

### Testing Payments

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Requires authentication: `4000 0025 0000 3155`
- Declined: `4000 0000 0000 9995`

---

## Troubleshooting

### Common Issues

#### Database Connection Error
```
Error: P1001: Can't reach database server
```
**Solution:** Check DATABASE_URL and ensure PostgreSQL is running

#### Clerk Authentication Not Working
```
Clerk: Missing publishable key
```
**Solution:** Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set correctly

#### tRPC Query Error
```
TRPCClientError: fetch failed
```
**Solution:** Ensure dev server is running and API routes are accessible

#### Prisma Client Not Generated
```
Error: Cannot find module '@prisma/client'
```
**Solution:** Run `pnpm prisma generate`

#### Stripe Webhook Signature Verification Failed
```
Webhook signature verification failed
```
**Solution:** Check `STRIPE_WEBHOOK_SECRET` matches your webhook endpoint secret

### Debug Mode

Enable verbose logging:
```env
DEBUG=trpc:*
NODE_ENV=development
```

### Getting Help

- 📖 [Documentation](https://docs.flowly.app)
- 💬 [Discord Community](https://discord.gg/flowly)
- 🐛 [GitHub Issues](https://github.com/yourusername/flowly/issues)
- 📧 [Email Support](mailto:support@flowly.app)

---

## Best Practices

### Security
- Never commit `.env.local` to version control
- Use environment variables for all secrets
- Enable webhook signature verification
- Implement rate limiting for APIs

### Performance
- Use React Query caching effectively
- Optimize database queries with proper indexes
- Lazy load heavy components
- Use Next.js Image optimization

### Code Quality
- Follow TypeScript best practices
- Write meaningful commit messages
- Keep components small and focused
- Add JSDoc comments for complex functions

---

## Deployment Checklist

- [ ] Set all production environment variables
- [ ] Run database migrations
- [ ] Set up Clerk production instance
- [ ] Configure Stripe live mode
- [ ] Set up webhook endpoints
- [ ] Configure custom domain
- [ ] Enable error monitoring (Sentry)
- [ ] Set up analytics
- [ ] Test payment flows
- [ ] Verify email notifications

---

**Happy Coding! 🚀**
