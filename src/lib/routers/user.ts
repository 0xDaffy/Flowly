import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'

export const userRouter = router({
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { clerkId: ctx.userId },
      include: {
        workspaces: true,
        members: {
          include: {
            workspace: true,
          },
        },
      },
    })

    return user
  }),

  create: protectedProcedure
    .input(
      z.object({
        clerkId: z.string(),
        email: z.string().email(),
        name: z.string().optional(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { clerkId: input.clerkId },
      })

      if (existingUser) {
        return existingUser
      }

      const user = await ctx.db.user.create({
        data: {
          clerkId: input.clerkId,
          email: input.email,
          name: input.name,
          imageUrl: input.imageUrl,
        },
      })

      return user
    }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: { clerkId: ctx.userId },
        data: input,
      })

      return user
    }),
})
