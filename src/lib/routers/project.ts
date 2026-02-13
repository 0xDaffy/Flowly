import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'

export const projectRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        description: z.string().optional(),
        color: z.string().optional(),
        workspaceId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.create({
        data: {
          name: input.name,
          description: input.description,
          color: input.color || '#3b82f6',
          workspaceId: input.workspaceId,
          boards: {
            create: {
              name: 'Main Board',
              isDefault: true,
              columns: {
                create: [
                  { name: 'To Do', position: 0, color: '#94a3b8' },
                  { name: 'In Progress', position: 1, color: '#3b82f6' },
                  { name: 'Review', position: 2, color: '#f59e0b' },
                  { name: 'Done', position: 3, color: '#10b981' },
                ],
              },
            },
          },
        },
        include: {
          boards: {
            include: {
              columns: true,
            },
          },
        },
      })

      return project
    }),

  getAll: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .query(async ({ ctx, input }) => {
      const projects = await ctx.db.project.findMany({
        where: {
          workspaceId: input.workspaceId,
          isArchived: false,
        },
        include: {
          boards: {
            include: {
              columns: {
                include: {
                  cards: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return projects
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: { id: input.id },
        include: {
          workspace: true,
          boards: {
            include: {
              columns: {
                include: {
                  cards: {
                    include: {
                      assignees: true,
                      labels: true,
                    },
                  },
                },
                orderBy: {
                  position: 'asc',
                },
              },
            },
          },
        },
      })

      return project
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        color: z.string().optional(),
        isFavorite: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input

      const project = await ctx.db.project.update({
        where: { id },
        data,
      })

      return project
    }),

  archive: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.update({
        where: { id: input.id },
        data: { isArchived: true },
      })

      return project
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.project.delete({
        where: { id: input.id },
      })

      return { success: true }
    }),
})
