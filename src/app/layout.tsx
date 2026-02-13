import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { TRPCProvider } from '@/components/providers/trpc-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flowly - Multilingual Project Management',
  description: 'Powerful project management with AI translation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <TRPCProvider>{children}</TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
