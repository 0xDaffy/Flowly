import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { auth } from '@clerk/nextjs/server'
import { appRouter } from '@/lib/root'
import { createTRPCContext } from '@/lib/trpc'

async function handler(req: Request) {
  const { userId } = await auth()
  
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async () => createTRPCContext({ req, userId }),
  })
}

export { handler as GET, handler as POST }
