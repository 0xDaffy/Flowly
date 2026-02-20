'use client'

import { trpc } from '@/lib/trpc-client'
import { useSearchParams } from 'next/navigation'

export default function TeamPage() {
  const searchParams = useSearchParams()
  const workspaceSlug = searchParams.get('workspace')

  const { data: workspaces } = trpc.workspace.getAll.useQuery()
  
  // Find the current workspace
  const currentWorkspace = workspaces?.find(ws => ws.slug === workspaceSlug)

  return (
    <div className="flex-1">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Team Members</h1>

        {!currentWorkspace ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Select a workspace first</p>
            <p className="text-sm text-gray-400">Go to Dashboard to select a workspace</p>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{currentWorkspace.name}</h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentWorkspace.members?.map(member => (
                      <tr key={member.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-3 text-sm">{member.user.name || 'Unknown'}</td>
                        <td className="px-6 py-3 text-sm">{member.user.email}</td>
                        <td className="px-6 py-3 text-sm">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {member.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
