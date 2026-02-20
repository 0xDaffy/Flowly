import { initTRPC, TRPCError } from '@trpc/server'
import { db } from './db'
import superjson from 'superjson'

interface CreateContextOptions {
  userId?: string | null
}

export const createTRPCContext = async (opts?: CreateContextOptions) => {
  return {
    db,
    userId: opts?.userId || null,
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
