# 📋 Environment Variables Setup Guide - Step by Step

This guide walks you through getting each service and configuring environment variables for Vercel deployment.

---

## 🗂️ Environment Variables Overview

Your Flowly needs these variables:

```
DATABASE_URL              → 
psql 'postgresql://neondb_owner:npg_ReDa3FWqiVw6@ep-solitary-bread-a8k9p8v4-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'

CLERK_SECRET_KEY         → sk_test_yCisoniqjLm0UZKWu61J3x6a7Y2iBkxmc8M7klKYzC

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY → pk_test_aW4tdHJlZWZyb2ctNDQuY2xlcmsuYWNjb3VudHMuZGV2JA

STRIPE_SECRET_KEY        → sk_test_51T1P4yF4I6lnNP2s52XmFBXkCVJUSDGCHjgqHvYqL5yqRzowxULiQnXqFnnI7d8nCl1wIinke4xY2Ejj5UHG7kj900aS8SNDOn

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY → pk_test_51T1P4yF4I6lnNP2s8xGd1qTvmmsqsHtFazbt7f0Eg7JpQCPIvR8Pb9mRsKSLxDTXe0DuqG9fxuYFamrjdSLKqB3R00Nymr5Y2E
```

---

# PART 1: Setup Neon PostgreSQL Database 🗄️

## Step 1.1: Create Neon Account
1. Go to **[neon.tech](https://neon.tech)**
2. Click **"Sign up"** (top right)
3. Choose: **Sign up with GitHub** (recommended)
4. Authorize Neon to access your GitHub
5. Click **"Authorize"**

## Step 1.2: Create Database
1. After sign up, click **"Create a project"**
2. Enter project name: `flowly`
3. Choose region closest to you
4. Click **"Create project"**
5. Wait for database to be created (takes ~30 seconds)

## Step 1.3: Get Connection String
1. Click on your project name
2. In left sidebar, click **"Connection strings"**
3. Copy the **"pooled"** connection string
4. It looks like: 
   ```
   postgresql://user:password@host:5432/db?sslmode=require
   ```

## Step 1.4: Save DATABASE_URL
```
📌 COPY THIS VALUE:
postgresql://your_user:your_password@xxx.us-east-1.neon.tech/flowly?sslmode=require

⚠️ Don't share this publicly!
```

✅ **Neon Complete!**

---

# PART 2: Setup Clerk Authentication 🔐

## Step 2.1: Create Clerk Account
1. Go to **[clerk.com](https://clerk.com)**
2. Click **"Sign up"** (top right)
3. Enter your email or sign up with GitHub
4. Verify your email
5. Click **"Create application"**

## Step 2.2: Create Application
1. Choose **"Web"** as application type
2. Choose your preferred sign-in methods (Email, Google, GitHub, etc.)
3. Click **"Create application"**

## Step 2.3: Get Your Keys
1. Go to **"API Keys"** in left sidebar
2. You'll see two keys:
   - **Secret Key** (looks like: `sk_test_...`)
   - **Publishable Key** (looks like: `pk_test_...`)

## Step 2.4: Save Both Keys
```
📌 CLERK_SECRET_KEY
sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

📌 NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Note: The "NEXT_PUBLIC_" prefix means it's sent to frontend
```

## Step 2.5: Add Vercel Domain to Clerk
1. In Clerk dashboard, go to **"Configure"** → **"Domains"**
2. Click **"Add domain"**
3. Enter your Vercel URL: `https://your-project.vercel.app`
4. Also add localhost for testing: `http://localhost:3000`
5. Click **"Add"**

✅ **Clerk Complete!**

---

# PART 3: Setup Stripe Payments 💳

## Step 3.1: Create Stripe Account
1. Go to **[stripe.com](https://stripe.com)**
2. Click **"Sign up"** (top right)
3. Enter email and create password
4. Fill in business details
5. Verify email

## Step 3.2: Access API Keys
1. Go to **"Developers"** in left sidebar
2. Click **"API keys"**
3. Make sure **"Test mode"** is ON (toggle on right)
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

## Step 3.3: Save Both Keys
```
📌 STRIPE_SECRET_KEY
sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

📌 NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 3.4: Setup Webhook (Optional for testing)
1. In Stripe, go to **"Webhooks"** (left sidebar)
2. Click **"Add endpoint"**
3. Enter: `https://your-project.vercel.app/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `customer.subscription.updated`
5. Click **"Add endpoint"**
6. Copy the **"Signing secret"** (starts with `whsec_`)

✅ **Stripe Complete!**

---

# PART 4: Add Variables to Vercel ✅

## Step 4.1: Go to Vercel Project
1. Go to **[vercel.com](https://vercel.com)**
2. Click on your **"Flowly"** project
3. Go to **"Settings"** (top navigation)
4. Click **"Environment Variables"** (left sidebar)

## Step 4.2: Add Each Variable

### Add DATABASE_URL
1. Click **"Add New"**
2. **Name:** `DATABASE_URL`
3. **Value:** Paste your Neon connection string
4. **Production / Preview / Development:** Check all
5. Click **"Save"**

### Add CLERK_SECRET_KEY
1. Click **"Add New"**
2. **Name:** `CLERK_SECRET_KEY`
3. **Value:** Paste your Clerk secret key (sk_test_...)
4. **Production / Preview / Development:** Check all
5. Click **"Save"**

### Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
1. Click **"Add New"**
2. **Name:** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
3. **Value:** Paste your Clerk publishable key (pk_test_...)
4. **Production / Preview / Development:** Check all
5. Click **"Save"**

### Add STRIPE_SECRET_KEY
1. Click **"Add New"**
2. **Name:** `STRIPE_SECRET_KEY`
3. **Value:** Paste your Stripe secret key (sk_test_...)
4. **Production / Preview / Development:** Check all
5. Click **"Save"**

### Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
1. Click **"Add New"**
2. **Name:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. **Value:** Paste your Stripe publishable key (pk_test_...)
4. **Production / Preview / Development:** Check all
5. Click **"Save"**

## Step 4.3: Verify All Variables
Your Vercel environment variables should now show:
```
✅ DATABASE_URL
✅ CLERK_SECRET_KEY
✅ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
✅ STRIPE_SECRET_KEY
✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

---

# PART 5: Redeploy Your App 🚀

## Step 5.1: Trigger New Deployment
1. In Vercel, go to **"Deployments"** tab
2. Click the three dots (•••) on the latest deployment
3. Click **"Redeploy"**
4. Infrastructure will rebuild with new env variables

## Step 5.2: Wait for Build
- Shows "Building..." then "Ready"
- Takes 2-5 minutes

## Step 5.3: Test Your App
1. Click deployment of your **Flowly** app
2. Visit: `https://your-project.vercel.app`
3. Try to **Sign up** with Clerk
4. Verify authentication works! ✅

---

# 📝 Quick Reference Checklist

Copy-paste this checklist as you complete each step:

```
DATABASE SETUP (Neon)
☐ Created Neon account
☐ Created database project
☐ Copied DATABASE_URL
☐ Added to Vercel

AUTHENTICATION SETUP (Clerk)
☐ Created Clerk account
☐ Created application
☐ Copied CLERK_SECRET_KEY
☐ Copied NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
☐ Added Vercel domain in Clerk
☐ Added to Vercel

PAYMENTS SETUP (Stripe)
☐ Created Stripe account
☐ Copied STRIPE_SECRET_KEY
☐ Copied NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
☐ (Optional) Setup webhooks
☐ Added to Vercel

VERCEL DEPLOYMENT
☐ All 5 env variables added
☐ Redeployed app
☐ Tested sign up
☐ App working! 🎉
```

---

# 🐛 Troubleshooting

## Database Connection Failed
**Error:** `Can't reach database server`

**Fix:**
- Check DATABASE_URL is correct (copy from Neon again)
- Ensure Neon project is active
- Add Vercel IP to Neon firewall (if applicable)

## Clerk authentication not working
**Error:** `Clerk key not found` or sign up doesn't work

**Fix:**
- Verify CLERK_SECRET_KEY starts with `sk_test_`
- Verify NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY starts with `pk_test_`
- Add your Vercel domain to Clerk "Domains"
- Run: `git push origin deploy` and redeploy

## Stripe integration errors
**Error:** `Stripe key invalid` or payments fail

**Fix:**
- Verify you're using TEST keys (pk_test_, sk_test_)
- Check STRIPE_SECRET_KEY is secret (starts with sk_test_)
- Check NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is public
- Use Stripe test card: `4242 4242 4242 4242`

## Build fails after adding env variables
**Fix:**
1. Go to Vercel Deployments
2. Click "Redeploy" on latest
3. Wait for clean rebuild

---

# ✨ Optional: DeepL Translation

If you want multilingual support:

1. Go to **[deepl.com/pro](https://www.deepl.com/pro)**
2. Sign up and get API key
3. In Vercel, add environment variable:
   - **Name:** `DEEPL_API_KEY`
   - **Value:** Your DeepL API key
4. Redeploy

---

# 🎯 What Happens Now?

After completing all steps, your Flowly will have:
- ✅ Secure database (Neon PostgreSQL)
- ✅ User authentication (Clerk with OAuth)
- ✅ Payment processing (Stripe)
- ✅ All data encrypted and secured
- ✅ Live at: `https://your-project.vercel.app`

---

# 📞 Need Help?

| Service | Support |
|---------|---------|
| Neon | [neon.tech/docs](https://neon.tech/docs) |
| Clerk | [clerk.com/docs](https://clerk.com/docs) |
| Stripe | [stripe.com/docs](https://stripe.com/docs) |
| Vercel | [vercel.com/docs](https://vercel.com/docs) |

Happy deploying! 🚀
