import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { getAuth } from '@clerk/nextjs/server'
import { appRouter } from '@/lib/root'
import { createTRPCContext } from '@/lib/trpc'
import { headers } from 'next/headers'

async function handler(req: Request) {
  try {
    const headersList = await headers()
    const auth = getAuth({ headers: headersList })
    const userId = auth?.userId || null
    
    return fetchRequestHandler({
      endpoint: '/api/trpc',
      req,
      router: appRouter,
      createContext: async () => createTRPCContext({ userId }),
    })
  } catch (error) {
    console.error('Error in tRPC handler:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export { handler as GET, handler as POST }
