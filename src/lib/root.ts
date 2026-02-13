import { router } from './trpc'
import { workspaceRouter } from './routers/workspace'
import { projectRouter } from './routers/project'
import { boardRouter } from './routers/board'
import { cardRouter } from './routers/card'
import { userRouter } from './routers/user'

export const appRouter = router({
  workspace: workspaceRouter,
  project: projectRouter,
  board: boardRouter,
  card: cardRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
