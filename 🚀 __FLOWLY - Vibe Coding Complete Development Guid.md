<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# 🚀 **FLOWLY - Vibe Coding Complete Development Guide**

*Copy this ENTIRE Markdown → Cursor/VS Code → Vibe Code your SaaS to \$500K ARR*

## 🎯 **Project Overview**

Multilingual PM SaaS (Trello + Asana + AI Translation). **May 1 Launch → 5K users Year 1**.

**Stack**: Next.js 15 + shadcn + tRPC + Prisma + Clerk + Stripe + DeepL

***

## **1. BOILERPLATE SETUP (5 minutes)**

```bash
# Create project
npx create-next-app@15 flowly --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd flowly

# Core deps
pnpm i @trpc/server @trpc/client @trpc/react-query @tanstack/react-query zustand lucide-react framer-motion react-hook-form @hookform/resolvers react-dnd react-dnd-html5-backend prisma @prisma/client stripe @stripe/stripe-js @stripe/react-stripe-js recharts date-fns clsx tailwind-merge @radix-ui/react-icons

# Auth + Payments
pnpm i clerk/nextjs @clerk/nextjs

# shadcn + components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card dialog dropdown-menu input label popover separator sheet table tabs tooltip badge avatar progress skeleton

# Dev deps
pnpm i -D @types/node typescript @types/react @types/react-dom prisma zx
```


***

## **2. ENVIRONMENT (.env.local)**

```
# Database
DATABASE_URL="postgresql://postgres:password@neon-host/db?sslmode=require"

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# DeepL AI Translation
NEXT_PUBLIC_DEEPL_API_KEY=your_deepl_key

# Vercel
NEXT_PUBLIC_VERCEL_URL=http://localhost:3000
```


***

## **3. DATABASE SCHEMA (prisma/schema.prisma)**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  workspaces    Workspace[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Workspace {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  ownerId     String
  owner       User      @relation(fields: [ownerId], references: [id])
  projects    Project[]
  members     Member[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Member {
  id         String   @id @default(cuid())
  workspaceId String
  userId     String
  role       String   @default("member")
  workspace  Workspace @relation(fields: [workspaceId], references: [id])
  user       User     @relation(fields: [userId], references: [id])
}

model Project {
  id          String   @id @default(cuid())
  name        String
  color       String?
  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  boards      Board[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Board {
  id        String    @id @default(cuid())
  name      String
  projectId String
  project   Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
  columns   Column[]
}

model Column {
  id        String @id @default(cuid())
  name      String
  position  Int
  boardId   String
  board     Board  @relation(fields: [boardId], references: [id], onDelete: Cascade)
  cards     Card[]
  @@unique([boardId, position])
}

model Card {
  id          String    @id @default(cuid())
  title       String
  description String?
  position    Float     @default(0)
  columnId    String
  column      Column    @relation(fields
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.youtube.com/watch?v=1gzCvATzUdM
[^2]: https://marmelab.com/blog/2026/01/15/building-a-kanban-board-with-shadcn.html
[^3]: https://github.com/talha4real/next-trpc-zod-prisma-postgresql-boilerplate
[^4]: http://github.com/mctrinh/saas-fast-vibe
[^5]: https://www.youtube.com/watch?v=JAWZ3pJcp3o
[^6]: https://dev.to/francescoxx/typescript-crud-api-with-trpc-4689
[^7]: https://github.com/humanstack/vibe-coding-template
[^8]: https://www.shadcn.io/components/data/kanban
[^9]: https://vercel.com/kb/guide/nextjs-prisma-postgres
[^10]: https://dev.to/wasp/a-structured-workflow-for-vibe-coding-full-stack-apps-352l```

