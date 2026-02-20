'use client'

import { useSearchParams } from 'next/navigation'
import { trpc } from '@/lib/trpc-client'

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const workspaceSlug = searchParams.get('workspace')

  const { data: workspaces } = trpc.workspace.getAll.useQuery()
  
  // Find the current workspace
  const currentWorkspace = workspaces?.find(ws => ws.slug === workspaceSlug)

  return (
    <div className="flex-1">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {!currentWorkspace ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Select a workspace first</p>
            <p className="text-sm text-gray-400">Go to Dashboard to select a workspace</p>
          </div>
        ) : (
          <div className="max-w-2xl">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Workspace Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workspace Name
                  </label>
                  <p className="text-gray-900">{currentWorkspace.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workspace Slug
                  </label>
                  <p className="text-gray-900 font-mono text-sm">{currentWorkspace.slug}</p>
                </div>

                {currentWorkspace.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <p className="text-gray-900">{currentWorkspace.description}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Created
                  </label>
                  <p className="text-gray-900">
                    {new Date(currentWorkspace.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
