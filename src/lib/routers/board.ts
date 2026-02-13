import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'

export const boardRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        description: z.string().optional(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const board = await ctx.db.board.create({
        data: {
          name: input.name,
          description: input.description,
          projectId: input.projectId,
        },
      })

      return board
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const board = await ctx.db.board.findUnique({
        where: { id: input.id },
        include: {
          project: true,
          columns: {
            include: {
              cards: {
                include: {
                  assignees: true,
                  labels: true,
                  comments: {
                    include: {
                      user: true,
                    },
                  },
                  attachments: true,
                },
                orderBy: {
                  position: 'asc',
                },
              },
            },
            orderBy: {
              position: 'asc',
            },
          },
        },
      })

      return board
    }),

  addColumn: protectedProcedure
    .input(
      z.object({
        boardId: z.string(),
        name: z.string().min(1),
        color: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const maxPosition = await ctx.db.column.findFirst({
        where: { boardId: input.boardId },
        orderBy: { position: 'desc' },
      })

      const column = await ctx.db.column.create({
        data: {
          name: input.name,
          color: input.color || '#6b7280',
          position: (maxPosition?.position || -1) + 1,
          boardId: input.boardId,
        },
      })

      return column
    }),

  updateColumn: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        color: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input

      const column = await ctx.db.column.update({
        where: { id },
        data,
      })

      return column
    }),

  deleteColumn: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.column.delete({
        where: { id: input.id },
      })

      return { success: true }
    }),
})
