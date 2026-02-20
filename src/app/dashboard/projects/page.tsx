'use client'

import { useState } from 'react'
import { trpc } from '@/lib/trpc-client'
import { Button } from '@/components/ui/button'
import { CreateProjectDialog } from '@/components/workspace/create-project-dialog'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ProjectsPage() {
  const [showCreateProject, setShowCreateProject] = useState(false)
  const searchParams = useSearchParams()
  const workspaceSlug = searchParams.get('workspace')

  const { data: workspaces } = trpc.workspace.getAll.useQuery()

  // Get current workspace and projects
  const currentWorkspace = workspaceSlug 
    ? workspaces?.find(ws => ws.slug === workspaceSlug)
    : workspaces?.[0]

  const allProjects = workspaces?.flatMap(ws => 
    ws.projects.map(p => ({ ...p, workspaceName: ws.name, workspaceId: ws.id }))
  ) || []

  return (
    <div className="flex-1">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Projects</h1>
          {currentWorkspace && (
            <Button onClick={() => setShowCreateProject(true)}>
              + New Project
            </Button>
          )}
        </div>

        {allProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No projects yet</p>
            <p className="text-sm text-gray-400">Create a workspace first to add projects</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProjects.map(project => (
              <Link
                key={project.id}
                href={`/workspace/${project.workspaceName}`}
              >
                <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="font-semibold mb-1">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.workspaceName}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {currentWorkspace && (
        <CreateProjectDialog 
          open={showCreateProject}
          onOpenChange={setShowCreateProject}
          workspaceId={currentWorkspace.id}
        />
      )}
    </div>
  )
}
