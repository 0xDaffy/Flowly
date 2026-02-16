# 🚀 Flowly Deployment Guide - Vercel (Free)

## Quick Deployment Steps

### 1. **Sign Up on Vercel**
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub (recommended)

### 2. **Connect Your Repository**
- Click "New Project"
- Select "Flowly" from your GitHub repositories
- Vercel will auto-detect Next.js framework

### 3. **Set Environment Variables**
In Vercel dashboard, add these under "Environment Variables":

```env
# Database
DATABASE_URL=postgresql://user:password@neon.tech:5432/flowly?sslmode=require

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Stripe Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Translation (Optional)
DEEPL_API_KEY=your_deepl_api_key
```

### 4. **Get Free Database (Neon)**
- Go to [neon.tech](https://neon.tech)
- Sign up (free tier includes hosting)
- Create a new PostgreSQL database
- Copy connection string to `DATABASE_URL`

### 5. **Get Free Clerk (Authentication)**
- Go to [clerk.com](https://clerk.com)
- Sign up (free tier)
- Create application
- Copy keys to environment variables

### 6. **Get Free Stripe (Payments)**
- Go to [stripe.com](https://stripe.com)
- Sign up (test mode is free)
- Copy keys to environment variables

### 7. **Deploy**
- Click "Deploy" in Vercel
- Vercel will build and deploy automatically
- Your app is live at `your-project.vercel.app`

---

## Environment Variables Guide

| Variable | Service | How to Get |
|----------|---------|-----------|
| `DATABASE_URL` | Neon PostgreSQL | Create account, copy connection string |
| `CLERK_SECRET_KEY` | Clerk | Dashboard → API Keys → Copy secret |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk | Dashboard → API Keys → Copy publishable |
| `STRIPE_SECRET_KEY` | Stripe | Dashboard → API Keys → Copy secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe | Dashboard → API Keys → Copy publishable |

---

## Production Checklist

- [ ] Database configured (Neon)
- [ ] Clerk authentication keys added
- [ ] Stripe integration keys added
- [ ] Environment variables set in Vercel
- [ ] Clerk OAuth redirect URLs updated
- [ ] Stripe webhook endpoints configured
- [ ] Domain configured (optional)

---

## Free Tier Limits

| Service | Free Tier |
|---------|-----------|
| **Vercel** | 100GB bandwidth/month, unlimited deployments |
| **Neon PostgreSQL** | 3 branches, 0.5GB storage |
| **Clerk** | Up to 10k users |
| **Stripe** | Unlimited (pay 2.9% + $0.30 per transaction) |

---

## Monitoring & Support

- Check Vercel logs: Dashboard → Deployments → Logs
- Monitor database: Neon dashboard
- Check Clerk logs: Clerk dashboard → Instances
- Test payments: Use Stripe test cards

---

## Troubleshooting

### Build Fails
```bash
# Check build locally
pnpm build

# Clear Prisma cache
pnpm prisma generate
```

### Database Connection Issues
- Verify DATABASE_URL format
- Check Neon firewall settings
- Ensure schema deployed: `pnpm prisma db push`

### Clerk Not Working
- Add Vercel deployment URL to Clerk redirect URLs
- Example: `https://your-project.vercel.app`

---

## Next Steps

1. Deploy on Vercel
2. Configure custom domain (optional)
3. Set up CI/CD for auto-deployments
4. Monitor and scale as needed

Happy deploying! 🎉
