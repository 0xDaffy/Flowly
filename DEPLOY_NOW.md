# 🚀 QUICK DEPLOYMENT GUIDE

## Current Issue: Vercel Link Error

The `vercel link` command failed. Here's how to fix it:

---

## ✅ EASIEST METHOD: Use Vercel Dashboard

### Step 1: Pushmit to GitHub (if not done)
```bash
git add -A
git commit -m "chore: ready for deployment"
git push origin deploy
```

### Step 2: Deploy via Vercel Dashboard
1. Go to: **https://vercel.com/new**
2. Click **"Import Project"**
3. Select **"Import Git Repository"**
4. Choose your **"Flowly"** repo
5. Select **"deploy"** branch
6. Click **"Deploy"**

### Step 3: Add Environment Variables
While deployment is running:
1. Click **"Environment Variables"** (during setup)
2. OR go to: Settings → Environment Variables
3. Add these 5 variables:

```
DATABASE_URL = postgresql://neondb_owner:npg_ReDa3FWqiVw6@ep-solitary-bread-a8k9p8v4-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require

CLERK_SECRET_KEY = sk_test_yCisoniqjLm0UZKWu61J3x6a7Y2iBkxmc8M7klKYzC

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_test_aW4tdHJlZWZyb2ctNDQuY2xlcmsuYWNjb3VudHMuZGV2JA

STRIPE_SECRET_KEY = sk_test_51T1P4yF4I6lnNP2s52XmFBXkCVJUSDGCHjgqHvYqL5yqRzowxULiQnXqFnnI7d8nCl1wIinke4xY2Ejj5UHG7kj900aS8SNDOn

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_51T1P4yF4I6lnNP2s8xGd1qTvmmsqsHtFazbt7f0Eg7JpQCPIvR8Pb9mRsKSLxDTXe0DuqG9fxuYFamrjdSLKqB3R00Nymr5Y2E
```

4. Check: ☑️ Production, Preview, Development for each
5. Click **"Save"**

### Step 4: Wait & Test
- Deployment takes 5-10 minutes
- You'll get a URL like: `flowly3.vercel.app`
- Test by visiting the URL
- Try signing up!

---

## 🔧 ALTERNATIVE: Fix CLI and Deploy

If you want to use CLI:

### Fix 1: Logout and Login Again
```bash
vercel logout
vercel login
```

### Fix 2: Remove Existing Config
```bash
rm -rf .vercel
vercel link
```

### Fix 3: Deploy Without Link
```bash
vercel --prod
```
(This will prompt you to set up project during deployment)

---

## 📊 Check Deployment Status

```bash
vercel ls
```

---

## 🎯 Your App Will Be Live At:

`https://[your-project-name].vercel.app`

✅ Done!
