'use client'

import { useState } from 'react'
import { trpc } from '@/lib/trpc-client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, MessageSquare, Paperclip, Trash2, User } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface CardDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cardId: string
}

export function CardDetailDialog({ open, onOpenChange, cardId }: CardDetailDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [comment, setComment] = useState('')

  const utils = trpc.useContext()
  const { data: card } = trpc.board.getById.useQuery(
    { id: cardId },
    { enabled: !!cardId }
  )

  const updateCard = trpc.card.update.useMutation({
    onSuccess: () => {
      utils.board.getById.invalidate()
      setIsEditing(false)
    },
  })

  const deleteCard = trpc.card.delete.useMutation({
    onSuccess: () => {
      utils.board.getById.invalidate()
      onOpenChange(false)
    },
  })

  const addComment = trpc.card.addComment.useMutation({
    onSuccess: () => {
      utils.board.getById.invalidate()
      setComment('')
    },
  })

  if (!card) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            {isEditing ? (
              <Input
                value={title || card.title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-bold"
              />
            ) : (
              <DialogTitle className="text-2xl">{card.title}</DialogTitle>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteCard.mutate({ id: cardId })}
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <Label className="text-sm font-semibold mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Description
            </Label>
            {isEditing ? (
              <Textarea
                value={description || card.description || ''}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Add a description..."
              />
            ) : (
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {card.description || 'No description'}
              </p>
            )}
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-gray-600">Priority</Label>
              <p className="text-sm font-medium">{card.priority}</p>
            </div>
            <div>
              <Label className="text-xs text-gray-600">Created</Label>
              <p className="text-sm">{formatDate(card.createdAt)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  size="sm"
                  onClick={() => {
                    updateCard.mutate({
                      id: cardId,
                      title: title || card.title,
                      description: description || card.description,
                    })
                  }}
                >
                  Save Changes
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
          </div>

          {/* Comments */}
          <div>
            <Label className="text-sm font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Comments
            </Label>
            <div className="space-y-3">
              {card.comments?.map((c: any) => (
                <div key={c.id} className="bg-gray-50 p-3 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{c.user.name}</span>
                    <span className="text-xs text-gray-500">
                      {formatDate(c.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{c.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                size="sm"
                onClick={() => {
                  if (comment.trim()) {
                    addComment.mutate({ cardId, content: comment })
                  }
                }}
                disabled={!comment.trim()}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
