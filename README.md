<<<<<<< HEAD
# Flowly
Project Management app
=======
# 🚀 Flowly - Multilingual Project Management SaaS

<div align="center">

![Flowly Banner](https://img.shields.io/badge/Flowly-Project%20Management-blue?style=for-the-badge&logo=trello)

**Powerful project management with AI-powered translation**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![tRPC](https://img.shields.io/badge/tRPC-API-2596BE?style=flat-square)](https://trpc.io/)

</div>

---

## ✨ Features

### 🎯 Core Features
- **📋 Kanban Boards** - Visual project management with drag-and-drop cards
- **🌍 AI Translation** - Real-time translation powered by DeepL API
- **👥 Team Collaboration** - Workspaces, projects, and team member management
- **🎨 Customizable** - Color-coded projects, priority labels, and custom columns
- **💬 Comments & Activity** - Real-time collaboration with activity logs
- **📎 Attachments** - File management for cards and tasks
- **✅ Checklists** - Break down tasks into actionable items

### 🔐 Authentication & Security
- **Clerk Authentication** - Secure user management with OAuth
- **Role-Based Access** - Owner, Admin, Member, and Guest roles
- **Protected Routes** - Middleware-based route protection

### 💳 Payments & Subscriptions
- **Stripe Integration** - Seamless payment processing
- **Subscription Plans** - Free, Pro, and Enterprise tiers
- **Webhook Support** - Automatic subscription management

### 🎨 Modern UI/UX
- **Responsive Design** - Mobile-first, works on all devices
- **Dark Mode Ready** - Beautiful theming with Tailwind CSS
- **shadcn/ui Components** - High-quality, accessible components
- **Smooth Animations** - Framer Motion for delightful interactions

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma |
| **API** | tRPC |
| **Auth** | Clerk |
| **Payments** | Stripe |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui + Radix UI |
| **State Management** | Zustand + React Query |
| **AI Translation** | DeepL API |
| **Drag & Drop** | react-dnd |
| **Deployment** | Vercel |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL database (Neon recommended)
- Clerk account
- Stripe account
- DeepL API key (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/flowly.git
cd flowly
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Database
DATABASE_URL="postgresql://user:password@host/database"

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# DeepL AI Translation (Optional)
NEXT_PUBLIC_DEEPL_API_KEY=your_deepl_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Set up the database**
```bash
pnpm prisma db push
pnpm prisma generate
```

5. **Run the development server**
```bash
pnpm dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
flowly/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js app router
│   │   ├── api/              # API routes
│   │   │   ├── trpc/        # tRPC handlers
│   │   │   └── webhooks/    # Clerk & Stripe webhooks
│   │   ├── dashboard/        # Dashboard pages
│   │   ├── workspace/        # Workspace pages
│   │   ├── sign-in/          # Auth pages
│   │   ├── sign-up/
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Landing page
│   ├── components/           # React components
│   │   ├── board/           # Kanban board components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── workspace/       # Workspace components
│   │   ├── ui/             # shadcn/ui components
│   │   └── providers/      # Context providers
│   ├── lib/                 # Utilities & configs
│   │   ├── db.ts           # Prisma client
│   │   ├── trpc.ts         # tRPC setup
│   │   ├── stripe.ts       # Stripe helpers
│   │   ├── translation.ts  # DeepL integration
│   │   ├── routers/        # tRPC routers
│   │   └── utils.ts        # Utility functions
│   ├── styles/
│   │   └── globals.css     # Global styles
│   └── middleware.ts       # Clerk auth middleware
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🎨 Key Features Implementation

### Kanban Board with Drag & Drop
```typescript
// Uses react-dnd for smooth drag-and-drop
<DndProvider backend={HTML5Backend}>
  <KanbanBoard boardId={boardId} />
</DndProvider>
```

### AI Translation
```typescript
import { translationService } from '@/lib/translation'

const translated = await translationService.translate({
  text: 'Hello World',
  targetLang: 'ES',
})
```

### Real-time Collaboration
```typescript
// Activity tracking for all actions
await db.activity.create({
  type: 'CARD_MOVED',
  content: `Moved card "${card.title}"`,
  cardId: card.id,
  userId: user.id,
})
```

---

## 🔒 Security Features

- ✅ Clerk authentication with OAuth support
- ✅ Role-based access control (RBAC)
- ✅ Protected API routes with middleware
- ✅ Webhook signature verification
- ✅ CSRF protection
- ✅ SQL injection prevention via Prisma
- ✅ XSS protection

---

## 🌍 API Routes

### tRPC Routers

| Router | Endpoints |
|--------|-----------|
| **workspace** | create, getAll, getBySlug, update, delete, inviteMember |
| **project** | create, getAll, getById, update, archive, delete |
| **board** | create, getById, addColumn, updateColumn, deleteColumn |
| **card** | create, update, move, delete, addComment, assignUser |
| **user** | getCurrent, create, update |

---

## 📊 Database Schema

Built with Prisma ORM:

- **User** - User accounts with Clerk integration
- **Workspace** - Organization-level container
- **Member** - Workspace membership with roles
- **Project** - Projects within workspaces
- **Board** - Kanban boards
- **Column** - Board columns (To Do, In Progress, Done, etc.)
- **Card** - Individual tasks/cards
- **Label** - Color-coded labels
- **Comment** - Card comments
- **Activity** - Activity logs
- **CheckList** - Task checklists
- **Attachment** - File attachments
- **Subscription** - Stripe subscriptions

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your repository
- Add environment variables
- Deploy!

3. **Set up webhooks**
- Clerk webhook: `https://yourdomain.com/api/webhooks/clerk`
- Stripe webhook: `https://yourdomain.com/api/webhooks/stripe`

### Database Migration
```bash
pnpm prisma migrate deploy
```

---

## 🎯 Roadmap

- [ ] Real-time collaboration with WebSockets
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Calendar view
- [ ] Time tracking
- [ ] Custom fields
- [ ] API for third-party integrations
- [ ] Export/Import functionality
- [ ] Templates marketplace

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Clerk](https://clerk.com/) - Authentication made easy
- [Stripe](https://stripe.com/) - Payment processing
- [DeepL](https://www.deepl.com/) - AI translation
- [Vercel](https://vercel.com/) - Deployment platform

---

<div align="center">

**Made with ❤️ by the Flowly Team**

[Website](https://flowly.app) · [Documentation](https://docs.flowly.app) · [Support](https://support.flowly.app)

</div>
>>>>>>> 98e1373 (Initial commit)
