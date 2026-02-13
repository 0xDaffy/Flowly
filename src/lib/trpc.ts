import { initTRPC, TRPCError } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { auth } from '@clerk/nextjs/server'
import { db } from './db'
import superjson from 'superjson'

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { userId } = await auth()
  
  return {
    db,
    userId,
    ...opts,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

export const router = t.router
export const publicProcedure = t.procedure

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      userId: ctx.userId,
    },
  })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
