'use client'

import { useEffect, useState, useRef } from 'react'
import { trpc } from '@/lib/trpc-client'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Plus, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CardDetailDialog } from './card-detail-dialog'
import { CreateCardDialog } from './create-card-dialog'

interface KanbanBoardProps {
  boardId: string
}

export function KanbanBoard({ boardId }: KanbanBoardProps) {
  const { data: board, isLoading } = trpc.board.getById.useQuery({ id: boardId })

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-80 h-64 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!board) {
    return <div>Board not found</div>
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {board.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <AddColumnButton boardId={boardId} />
      </div>
    </DndProvider>
  )
}

interface ColumnProps {
  column: any
}

function Column({ column }: ColumnProps) {
  const [showCreateCard, setShowCreateCard] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const utils = trpc.useContext()
  const moveCard = trpc.card.move.useMutation({
    onSuccess: () => {
      utils.board.getById.invalidate()
    },
  })

  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item: any) => {
      if (item.columnId !== column.id) {
        moveCard.mutate({
          id: item.id,
          columnId: column.id,
          position: column.cards.length,
        })
      }
    },
  })

  // Connect the drop target to the ref
  drop(divRef)

  return (
    <div
      ref={divRef}
      className="bg-gray-100 rounded-lg p-4 w-80 flex-shrink-0 flex flex-col max-h-[calc(100vh-300px)]"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: column.color }}
          />
          <h3 className="font-semibold text-sm">
            {column.name}
            <span className="ml-2 text-gray-500 font-normal">
              {column.cards?.length || 0}
            </span>
          </h3>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto">
        {column.cards?.map((card: any) => (
          <KanbanCard key={card.id} card={card} />
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="mt-2 w-full justify-start text-gray-600"
        onClick={() => setShowCreateCard(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Card
      </Button>

      <CreateCardDialog
        open={showCreateCard}
        onOpenChange={setShowCreateCard}
        columnId={column.id}
      />
    </div>
  )
}

interface KanbanCardProps {
  card: any
}

function KanbanCard({ card }: KanbanCardProps) {
  const [showDetail, setShowDetail] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: card.id, columnId: card.columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // Connect the drag source to the ref
  drag(cardRef)

  const priorityColors = {
    LOW: 'bg-gray-200 text-gray-700',
    MEDIUM: 'bg-blue-100 text-blue-700',
    HIGH: 'bg-orange-100 text-orange-700',
    URGENT: 'bg-red-100 text-red-700',
  }

  return (
    <>
      <div
        ref={cardRef}
        className={cn(
          'p-3 cursor-move hover:shadow-md transition-shadow bg-white rounded-lg border',
          isDragging && 'opacity-50'
        )}
        onClick={() => setShowDetail(true)}
      >
        {card.labels && card.labels.length > 0 && (
          <div className="flex gap-1 mb-2 flex-wrap">
            {card.labels.map((label: any) => (
              <span
                key={label.id}
                className="text-xs px-2 py-0.5 rounded"
                style={{ backgroundColor: label.color, color: 'white' }}
              >
                {label.name}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm font-medium mb-2">{card.title}</p>

        {card.description && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {card.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          <span
            className={cn(
              'text-xs px-2 py-0.5 rounded',
              priorityColors[card.priority as keyof typeof priorityColors]
            )}
          >
            {card.priority}
          </span>
          
          {card.assignees && card.assignees.length > 0 && (
            <div className="flex -space-x-2">
              {card.assignees.slice(0, 3).map((assignee: any) => (
                <div
                  key={assignee.id}
                  className="h-6 w-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white"
                  title={assignee.name}
                >
                  {assignee.name?.[0] || assignee.email[0]}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CardDetailDialog
        open={showDetail}
        onOpenChange={setShowDetail}
        cardId={card.id}
      />
    </>
  )
}

function AddColumnButton({ boardId }: { boardId: string }) {
  const [isAdding, setIsAdding] = useState(false)
  const [columnName, setColumnName] = useState('')
  const utils = trpc.useContext()
  
  const addColumn = trpc.board.addColumn.useMutation({
    onSuccess: () => {
      utils.board.getById.invalidate()
      setColumnName('')
      setIsAdding(false)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (columnName.trim()) {
      addColumn.mutate({ boardId, name: columnName })
    }
  }

  if (!isAdding) {
    return (
      <Button
        variant="outline"
        className="w-80 h-full min-h-[100px] flex-shrink-0"
        onClick={() => setIsAdding(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Column
      </Button>
    )
  }

  return (
    <div className="bg-gray-100 rounded-lg p-4 w-80 flex-shrink-0">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Column name..."
          className="w-full px-3 py-2 border rounded mb-2"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
          autoFocus
        />
        <div className="flex gap-2">
          <Button type="submit" size="sm" disabled={!columnName.trim()}>
            Add
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsAdding(false)
              setColumnName('')
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
