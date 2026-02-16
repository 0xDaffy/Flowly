import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'

export const cardRouter = router({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const card = await ctx.db.card.findUnique({
        where: { id: input.id },
        include: {
          column: true,
          assignees: true,
          labels: true,
          comments: {
            include: {
              user: true,
            },
          },
          attachments: true,
          activities: {
            include: {
              user: true,
            },
          },
        },
      })

      return card
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(500),
        description: z.string().optional(),
        columnId: z.string(),
        priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const maxPosition = await ctx.db.card.findFirst({
        where: { columnId: input.columnId },
        orderBy: { position: 'desc' },
      })

      const card = await ctx.db.card.create({
        data: {
          title: input.title,
          description: input.description,
          columnId: input.columnId,
          priority: input.priority || 'MEDIUM',
          position: (maxPosition?.position || 0) + 1,
        },
        include: {
          assignees: true,
          labels: true,
        },
      })

      // Create activity log
      const user = await ctx.db.user.findUnique({
        where: { clerkId: ctx.userId },
      })

      if (user) {
        await ctx.db.activity.create({
          data: {
            type: 'CARD_CREATED',
            content: `Created card "${card.title}"`,
            cardId: card.id,
            userId: user.id,
          },
        })
      }

      return card
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
        dueDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input

      const card = await ctx.db.card.update({
        where: { id },
        data,
        include: {
          assignees: true,
          labels: true,
          comments: {
            include: {
              user: true,
            },
          },
        },
      })

      return card
    }),

  move: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        columnId: z.string(),
        position: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const card = await ctx.db.card.update({
        where: { id: input.id },
        data: {
          columnId: input.columnId,
          position: input.position,
        },
      })

      // Log activity
      const user = await ctx.db.user.findUnique({
        where: { clerkId: ctx.userId },
      })

      if (user) {
        await ctx.db.activity.create({
          data: {
            type: 'CARD_MOVED',
            content: `Moved card "${card.title}"`,
            cardId: card.id,
            userId: user.id,
          },
        })
      }

      return card
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const card = await ctx.db.card.findUnique({
        where: { id: input.id },
      })

      await ctx.db.card.delete({
        where: { id: input.id },
      })

      // Log activity
      const user = await ctx.db.user.findUnique({
        where: { clerkId: ctx.userId },
      })

      if (user && card) {
        await ctx.db.activity.create({
          data: {
            type: 'CARD_DELETED',
            content: `Deleted card "${card.title}"`,
            userId: user.id,
          },
        })
      }

      return { success: true }
    }),

  addComment: protectedProcedure
    .input(
      z.object({
        cardId: z.string(),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { clerkId: ctx.userId },
      })

      if (!user) throw new Error('User not found')

      const comment = await ctx.db.comment.create({
        data: {
          content: input.content,
          cardId: input.cardId,
          userId: user.id,
        },
        include: {
          user: true,
        },
      })

      return comment
    }),

  assignUser: protectedProcedure
    .input(
      z.object({
        cardId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const card = await ctx.db.card.update({
        where: { id: input.cardId },
        data: {
          assignees: {
            connect: { id: input.userId },
          },
        },
        include: {
          assignees: true,
        },
      })

      return card
    }),
})
