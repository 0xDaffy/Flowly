# 🚀 FLOWLY - FINAL DEPLOYMENT INSTRUCTIONS

## ⚡ QUICK START (3 Steps)

### Step 1: Run Deployment Script
```bash
chmod +x DEPLOY.sh
./DEPLOY.sh
```

### Step 2: Add Environment Variables
While deployment is running, go to:
1. **https://vercel.com/dashboard**
2. Click your **Flowly** project
3. **Settings** → **Environment Variables**
4. Click **"Add New"** for each:

```
DATABASE_URL
postgresql://neondb_owner:npg_ReDa3FWqiVw6@ep-solitary-bread-a8k9p8v4-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require

CLERK_SECRET_KEY
sk_test_yCisoniqjLm0UZKWu61J3x6a7Y2iBkxmc8M7klKYzC

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
pk_test_aW4tdHJlZWZyb2ctNDQuY2xlcmsuYWNjb3VudHMuZGV2JA

STRIPE_SECRET_KEY
sk_test_51T1P4yF4I6lnNP2s52XmFBXkCVJUSDGCHjgqHvYqL5yqRzowxULiQnXqFnnI7d8nCl1wIinke4xY2Ejj5UHG7kj900aS8SNDOn

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
pk_test_51T1P4yF4I6lnNP2s8xGd1qTvmmsqsHtFazbt7f0Eg7JpQCPIvR8Pb9mRsKSLxDTXe0DuqG9fxuYFamrjdSLKqB3R00Nymr5Y2E
```

5. For each variable: ☑️ Check **Production**, **Preview**, **Development**
6. Click **"Save"**

### Step 3: Redeploy
```bash
vercel --prod
```

---

## 🎉 YOUR APP WILL BE LIVE!

Visit: `https://[your-project].vercel.app`

---

## 🔧 IF SCRIPT FAILS - Manual Commands:

```bash
# Clean start
rm -rf .vercel

# Deploy
vercel --prod

# Follow prompts to link/create project
```

---

## 📊 VERIFY DEPLOYMENT:

```bash
# List deployments
vercel ls

# Check logs
vercel logs [deployment-url]
```

---

## ✅ CHECKLIST:

- [ ] Run DEPLOY.sh
- [ ] Add 5 environment variables in Vercel dashboard
- [ ] Redeploy after adding variables
- [ ] Visit your live URL
- [ ] Test sign up with Clerk
- [ ] Verify database connection

---

**YOU'RE ALMOST THERE!** 🚀

Just run the script and add the environment variables!
