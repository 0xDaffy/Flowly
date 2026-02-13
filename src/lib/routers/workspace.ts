import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'
import { generateSlug } from '../utils'

export const workspaceRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { clerkId: ctx.userId },
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      const slug = generateSlug(input.name)

      const workspace = await ctx.db.workspace.create({
        data: {
          name: input.name,
          description: input.description,
          slug: `${slug}-${Date.now()}`,
          ownerId: user.id,
          members: {
            create: {
              userId: user.id,
              role: 'OWNER',
            },
          },
        },
        include: {
          owner: true,
          members: {
            include: {
              user: true,
            },
          },
        },
      })

      return workspace
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { clerkId: ctx.userId },
      include: {
        workspaces: {
          include: {
            members: {
              include: {
                user: true,
              },
            },
            projects: {
              take: 5,
            },
          },
        },
        members: {
          include: {
            workspace: {
              include: {
                owner: true,
                projects: {
                  take: 5,
                },
              },
            },
          },
        },
      },
    })

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      })
    }

    const ownedWorkspaces = user.workspaces
    const memberWorkspaces = user.members.map((m) => m.workspace)
    
    return [...ownedWorkspaces, ...memberWorkspaces]
  }),

  getBySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const workspace = await ctx.db.workspace.findUnique({
        where: { slug: input.slug },
        include: {
          owner: true,
          members: {
            include: {
              user: true,
            },
          },
          projects: {
            where: { isArchived: false },
            include: {
              boards: true,
            },
          },
        },
      })

      if (!workspace) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Workspace not found',
        })
      }

      return workspace
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(100).optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input

      const workspace = await ctx.db.workspace.update({
        where: { id },
        data,
      })

      return workspace
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.workspace.delete({
        where: { id: input.id },
      })

      return { success: true }
    }),

  inviteMember: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        email: z.string().email(),
        role: z.enum(['OWNER', 'ADMIN', 'MEMBER', 'GUEST']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      const member = await ctx.db.member.create({
        data: {
          workspaceId: input.workspaceId,
          userId: user.id,
          role: input.role,
        },
        include: {
          user: true,
        },
      })

      return member
    }),
})
