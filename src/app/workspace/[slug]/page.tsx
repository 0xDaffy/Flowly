'use client'

import { trpc } from '@/lib/trpc-client'
import { notFound } from 'next/navigation'
import { KanbanBoard } from '@/components/board/kanban-board'
import { Button } from '@/components/ui/button'
import { Plus, Settings } from 'lucide-react'
import { useState } from 'react'
import { CreateProjectDialog } from '@/components/workspace/create-project-dialog'

interface WorkspacePageProps {
  params: {
    slug: string
  }
}

export default function WorkspacePage({ params }: WorkspacePageProps) {
  const [showCreateProject, setShowCreateProject] = useState(false)
  const { data: workspace, isLoading } = trpc.workspace.getBySlug.useQuery({ 
    slug: params.slug 
  })

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!workspace) {
    notFound()
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{workspace.name}</h1>
            <p className="text-gray-600 text-sm mt-1">{workspace.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm" onClick={() => setShowCreateProject(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="flex-1 overflow-auto p-8">
        {!workspace.projects || workspace.projects.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Plus className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-4">
                  Create your first project to start managing tasks
                </p>
                <Button onClick={() => setShowCreateProject(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {workspace.projects.map((project) => (
              <div key={project.id}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: project.color || '#3b82f6' }}
                  />
                  <h2 className="text-xl font-bold">{project.name}</h2>
                </div>
                {project.boards && project.boards.length > 0 && (
                  <KanbanBoard boardId={project.boards[0].id} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateProjectDialog
        open={showCreateProject}
        onOpenChange={setShowCreateProject}
        workspaceId={workspace.id}
      />
    </div>
  )
}
