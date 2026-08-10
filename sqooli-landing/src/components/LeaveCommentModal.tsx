import { useState } from 'react'
import { X } from 'lucide-react'
import '../styles/components/leave-comment-modal.css'

interface LeaveCommentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (comment: string) => void
}

export default function LeaveCommentModal({ isOpen, onClose, onSubmit }: LeaveCommentModalProps) {
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleClose = () => {
    setComment('')
    setError('')
    onClose()
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!comment.trim()) {
      setError('Write a comment before posting.')
      return
    }
    onSubmit(comment.trim())
    setComment('')
    setError('')
  }

  return (
    <div className="leave-comment-overlay" role="presentation" onMouseDown={handleClose}>
      <div className="leave-comment-modal" role="dialog" aria-modal="true" aria-labelledby="leave-comment-title" onMouseDown={event => event.stopPropagation()}>
        <div className="leave-comment-header">
          <h2 id="leave-comment-title">Leave a Comment</h2>
          <button type="button" onClick={handleClose} aria-label="Close comment dialog"><X size={22} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="course-comment">Comment</label>
          <textarea
            id="course-comment"
            value={comment}
            onChange={event => setComment(event.target.value)}
            placeholder="Enter a description..."
            aria-describedby={error ? 'course-comment-error' : undefined}
            aria-invalid={Boolean(error)}
            autoFocus
          />
          {error && <p id="course-comment-error" className="leave-comment-error" role="alert">{error}</p>}
          <div className="leave-comment-actions">
            <button type="submit" className="leave-comment-submit">Post Comment</button>
          </div>
        </form>
      </div>
    </div>
  )
}
