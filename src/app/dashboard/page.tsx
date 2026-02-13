'use client'

import { trpc } from '@/lib/trpc-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Folder, Star } from 'lucide-react'
import Link from 'next/link'
import { CreateWorkspaceDialog } from '@/components/dashboard/create-workspace-dialog'
import { useState } from 'react'

export default function DashboardPage() {
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false)
  const { data: workspaces, isLoading } = trpc.workspace.getAll.useQuery()

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your workspaces and projects</p>
        </div>
        <Button onClick={() => setShowCreateWorkspace(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Workspace
        </Button>
      </div>

      {/* Workspaces */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Folder className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-semibold">Your Workspaces</h2>
        </div>

        {!workspaces || workspaces.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Folder className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">No workspaces yet</h3>
                <p className="text-gray-600 mb-4">
                  Create your first workspace to start organizing your projects
                </p>
                <Button onClick={() => setShowCreateWorkspace(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Workspace
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workspaces.map((workspace) => (
              <Link key={workspace.id} href={`/workspace/${workspace.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{workspace.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {workspace.description || 'No description'}
                        </CardDescription>
                      </div>
                      <Star className="h-5 w-5 text-gray-400 hover:text-yellow-500 transition" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{workspace.projects?.length || 0} projects</span>
                      <span>{workspace.members?.length || 0} members</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <CreateWorkspaceDialog open={showCreateWorkspace} onOpenChange={setShowCreateWorkspace} />
    </div>
  )
}
