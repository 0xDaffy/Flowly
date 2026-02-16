import { initTRPC, TRPCError } from '@trpc/server'
import { auth } from '@clerk/nextjs/server'
import { db } from './db'
import superjson from 'superjson'

interface CreateContextOptions {
  req?: Request
}

export const createTRPCContext = async (opts?: CreateContextOptions) => {
  const { userId } = await auth()
  
  return {
    db,
    userId,
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
