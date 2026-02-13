# 🚀 QUICK START GUIDE

## ⚡ Fastest Way to See the App

Run these commands in your terminal:

```bash
# 1. Setup database (takes 10 seconds)
pnpm prisma db push --accept-data-loss

# 2. Start the development server
pnpm dev
```

Then visit **http://localhost:3000** to see the landing page!

---

## 🔑 To Use Full Features (Authentication Required)

The app needs **Clerk** for authentication. Here's how to set it up in 2 minutes:

### Step 1: Get Clerk Keys (FREE)

1. Go to **https://clerk.com**
2. Click "Sign up" (it's free for 10,000 users/month)
3. Create a new application (choose any name)
4. You'll see your API keys immediately

### Step 2: Copy Keys to `.env.local`

From the Clerk dashboard:
- Copy **Publishable Key** → paste in `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- Copy **Secret Key** → paste in `CLERK_SECRET_KEY`

Your `.env.local` should look like:
```env
DATABASE_URL="file:./dev.db"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y2xlcmsuZXhhbXBsZS5jb20k
CLERK_SECRET_KEY=sk_test_1234567890abcdef
CLERK_WEBHOOK_SECRET=whsec_not_needed_for_local_dev

# Optional (can add later)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

### Step 3: Restart the Server

```bash
# Stop the server (Ctrl+C) then restart
pnpm dev
```

Now you can:
- ✅ Sign up / Sign in
- ✅ Create workspaces
- ✅ Create projects  
- ✅ Use the Kanban board
- ✅ Collaborate with team members

---

## 🎯 What Works Without API Keys?

Without Clerk:
- ✅ View the landing page
- ✅ See the design and UI
- ❌ Cannot sign in or use features

With Clerk only:
- ✅ Full authentication
- ✅ All app features
- ✅ Database operations
- ❌ No payment functionality (add Stripe later)

---

## 📚 Optional: Add Stripe (For Payments)

If you want to test the subscription features:

1. Go to **https://stripe.com** → Sign up (free test mode)
2. Get your test API keys from Dashboard → Developers → API keys
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

---

## 🆘 Need Help?

- **Can't access Clerk?** - The app will show an error but the landing page still works
- **Database errors?** - Run: `pnpm prisma db push --accept-data-loss`
- **Port 3000 in use?** - Run: `pnpm dev -p 3001` (use port 3001 instead)

---

## ✅ Quick Checklist

- [x] Dependencies installed (`pnpm install`)
- [ ] Database initialized (`pnpm prisma db push`)
- [ ] Clerk keys added to `.env.local` (optional for landing page)
- [ ] Dev server running (`pnpm dev`)
- [ ] Visit http://localhost:3000

**You're ready to go! 🎉**
