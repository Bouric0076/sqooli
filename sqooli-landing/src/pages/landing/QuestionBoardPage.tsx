import React, { useState } from 'react'
import {
  Search,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  X,
  ArrowLeft,
  MinusCircle,
  PlusCircle,
  MessageSquare
} from 'lucide-react'
import '../../styles/pages/landing/landing.css'
import '../../styles/responsive/final-mobile.css'
import '../../styles/pages/landing/questions.css'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

import lucyAvatar from '../../assets/images/whats-popular/teacher.webp'

export interface CommentItem {
  id: string
  author: string
  avatarInitials: string
  timeAgo: string
  upvotes: number
  downvotes: number
  sentiment?: string
  content: string
  collapsed?: boolean
  replies?: CommentItem[]
}

export interface QuestionData {
  id: string
  author: string
  authorAvatar?: string
  authorRole: 'Student' | 'Parent' | 'Tutor' | 'Teacher'
  dateStr: string
  title: string
  subject: string
  downvotes: number
  upvotes: number
  commentsCount: number
  sharesCount: number
  hasMediaAttachment?: boolean
  comments: CommentItem[]
}

// Sample questions matching page-design.png, modal-design.png, and modal-design2.png
const INITIAL_QUESTIONS: QuestionData[] = [
  {
    id: 'q1',
    author: 'Lucy',
    authorAvatar: lucyAvatar,
    authorRole: 'Student',
    dateStr: '3 days ago',
    title: 'What is an atom?',
    subject: 'Chemistry',
    downvotes: 20,
    upvotes: 20,
    commentsCount: 20,
    sharesCount: 20,
    hasMediaAttachment: false,
    comments: [
      {
        id: 'c1',
        author: 'Olivia Rhye',
        avatarInitials: 'OR',
        timeAgo: '2 mins ago',
        upvotes: 20,
        downvotes: 20,
        sentiment: 'Neutral',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id.',
        collapsed: false,
        replies: [
          {
            id: 'c1-1',
            author: 'Olivia Rhye',
            avatarInitials: 'OR',
            timeAgo: '2 mins ago',
            upvotes: 20,
            downvotes: 20,
            sentiment: 'Neutral',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id.',
            collapsed: false,
            replies: [
              {
                id: 'c1-1-1',
                author: 'Olivia Rhye',
                avatarInitials: 'OR',
                timeAgo: '2 mins ago',
                upvotes: 20,
                downvotes: 20,
                sentiment: 'Neutral',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id.',
                collapsed: false,
                replies: [
                  {
                    id: 'c1-1-1-1',
                    author: 'Olivia Rhye',
                    avatarInitials: 'OR',
                    timeAgo: '2 mins ago',
                    upvotes: 20,
                    downvotes: 20,
                    sentiment: 'Neutral',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id.',
                    collapsed: false,
                    replies: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'c2',
        author: 'Olivia Rhye',
        avatarInitials: 'OR',
        timeAgo: '2 mins ago',
        upvotes: 20,
        downvotes: 20,
        sentiment: 'Neutral',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id.',
        collapsed: true, // plus circle toggle on design
        replies: []
      },
      {
        id: 'c3',
        author: 'Olivia Rhye',
        avatarInitials: 'OR',
        timeAgo: '2 mins ago',
        upvotes: 20,
        downvotes: 20,
        sentiment: 'Neutral',
        content: 'An atom is the basic unit of a chemical element, consisting of a dense central nucleus surrounded by a cloud of negatively charged electrons.',
        collapsed: false,
        replies: []
      }
    ]
  },
  {
    id: 'q2',
    author: 'Lucy',
    authorAvatar: lucyAvatar,
    authorRole: 'Parent',
    dateStr: '20 Sep 2025 11.00 AM',
    title: 'What is an atom?',
    subject: 'Chemistry',
    downvotes: 20,
    upvotes: 20,
    commentsCount: 20,
    sharesCount: 20,
    hasMediaAttachment: true, // modal-design2.png preview
    comments: [
      {
        id: 'c2-1',
        author: 'Olivia Rhye',
        avatarInitials: 'OR',
        timeAgo: '2 mins ago',
        upvotes: 20,
        downvotes: 20,
        sentiment: 'Neutral',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id.',
        collapsed: false,
        replies: [
          {
            id: 'c2-1-1',
            author: 'Olivia Rhye',
            avatarInitials: 'OR',
            timeAgo: '2 mins ago',
            upvotes: 20,
            downvotes: 20,
            sentiment: 'Neutral',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id.',
            collapsed: false,
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 'q3',
    author: 'Lucy',
    authorAvatar: lucyAvatar,
    authorRole: 'Student',
    dateStr: '20 Sep 2025 11.00 AM',
    title: 'What is an atom?',
    subject: 'Chemistry',
    downvotes: 20,
    upvotes: 20,
    commentsCount: 20,
    sharesCount: 20,
    hasMediaAttachment: false,
    comments: []
  },
  {
    id: 'q4',
    author: 'Lucy',
    authorAvatar: lucyAvatar,
    authorRole: 'Student',
    dateStr: '20 Sep 2025 11.00 AM',
    title: 'What is an atom?',
    subject: 'Chemistry',
    downvotes: 20,
    upvotes: 20,
    commentsCount: 20,
    sharesCount: 20,
    hasMediaAttachment: false,
    comments: []
  },
  {
    id: 'q5',
    author: 'Lucy',
    authorAvatar: lucyAvatar,
    authorRole: 'Student',
    dateStr: '20 Sep 2025 11.00 AM',
    title: 'What is an atom?',
    subject: 'Chemistry',
    downvotes: 20,
    upvotes: 20,
    commentsCount: 20,
    sharesCount: 20,
    hasMediaAttachment: false,
    comments: []
  }
]

export default function QuestionBoardPage() {
  const [questions, setQuestions] = useState<QuestionData[]>(INITIAL_QUESTIONS)
  const [searchQuery, setSearchQuery] = useState<string>(() => new URLSearchParams(window.location.search).get('q') || 'Atom')
  const [selectedQuestionModal, setSelectedQuestionModal] = useState<QuestionData | null>(null)

  // State for posting new answer inside modal
  const [newAnswerText, setNewAnswerText] = useState<string>('')
  const [replyToId, setReplyToId] = useState<string | null>(null)
  const [replyInputText, setReplyInputText] = useState<string>('')
  const [notice, setNotice] = useState<string>('')

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value)
    const next = new URLSearchParams(window.location.search)
    if (value.trim()) next.set('q', value.trim())
    else next.delete('q')
    window.history.replaceState({}, '', `/questions?${next.toString()}`)
  }

  const handleAction = (msg: string) => {
    setNotice(msg)
    setTimeout(() => setNotice(''), 3000)
  }

  const handleUpvoteQuestion = (qId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, upvotes: q.upvotes + 1 } : q))
    )
    if (selectedQuestionModal && selectedQuestionModal.id === qId) {
      setSelectedQuestionModal((prev) => prev ? { ...prev, upvotes: prev.upvotes + 1 } : null)
    }
    handleAction('Upvoted!')
  }

  const handleDownvoteQuestion = (qId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, downvotes: q.downvotes + 1 } : q))
    )
    if (selectedQuestionModal && selectedQuestionModal.id === qId) {
      setSelectedQuestionModal((prev) => prev ? { ...prev, downvotes: prev.downvotes + 1 } : null)
    }
    handleAction('Downvoted!')
  }

  const handlePostAnswer = () => {
    if (!newAnswerText.trim() || !selectedQuestionModal) {
      if (!newAnswerText.trim()) handleAction('Write an answer before posting.')
      return
    }
    const newComment: CommentItem = {
      id: `comment-${Date.now()}`,
      author: 'You (Student)',
      avatarInitials: 'YS',
      timeAgo: 'Just now',
      upvotes: 1,
      downvotes: 0,
      sentiment: 'Helpful',
      content: newAnswerText,
      collapsed: false,
      replies: []
    }

    const updatedComments = [newComment, ...selectedQuestionModal.comments]
    const updatedQuestion = {
      ...selectedQuestionModal,
      commentsCount: selectedQuestionModal.commentsCount + 1,
      comments: updatedComments
    }

    setSelectedQuestionModal(updatedQuestion)
    setQuestions((prev) => prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)))
    setNewAnswerText('')
    handleAction('Answer posted successfully!')
  }

  const toggleCollapseComment = (commentId: string) => {
    if (!selectedQuestionModal) return
    const toggleRecursive = (items: CommentItem[]): CommentItem[] => {
      return items.map((item) => {
        if (item.id === commentId) {
          return { ...item, collapsed: !item.collapsed }
        }
        if (item.replies && item.replies.length > 0) {
          return { ...item, replies: toggleRecursive(item.replies) }
        }
        return item
      })
    }

    const updated = {
      ...selectedQuestionModal,
      comments: toggleRecursive(selectedQuestionModal.comments)
    }
    setSelectedQuestionModal(updated)
  }

  const handleAddReplyToComment = (parentCommentId: string) => {
    if (!replyInputText.trim() || !selectedQuestionModal) return
    const newReplyItem: CommentItem = {
      id: `reply-${Date.now()}`,
      author: 'You (Student)',
      avatarInitials: 'YS',
      timeAgo: 'Just now',
      upvotes: 1,
      downvotes: 0,
      sentiment: 'Neutral',
      content: replyInputText,
      collapsed: false,
      replies: []
    }

    const addRecursive = (items: CommentItem[]): CommentItem[] => {
      return items.map((item) => {
        if (item.id === parentCommentId) {
          return {
            ...item,
            collapsed: false,
            replies: [...(item.replies || []), newReplyItem]
          }
        }
        if (item.replies && item.replies.length > 0) {
          return { ...item, replies: addRecursive(item.replies) }
        }
        return item
      })
    }

    const updated = {
      ...selectedQuestionModal,
      commentsCount: selectedQuestionModal.commentsCount + 1,
      comments: addRecursive(selectedQuestionModal.comments)
    }
    setSelectedQuestionModal(updated)
    setReplyToId(null)
    setReplyInputText('')
    handleAction('Reply added!')
  }

  const filteredQuestions = questions.filter((q) => {
    if (!searchQuery.trim()) return true
    const qry = searchQuery.toLowerCase().trim()
    return (
      q.title.toLowerCase().includes(qry) ||
      q.subject.toLowerCase().includes(qry) ||
      q.author.toLowerCase().includes(qry)
    )
  })

  // Component to render recursive threaded comment tree matching modal-design.png
  const renderThreadedComments = (commentList: CommentItem[], level: number = 0) => {
    return (
      <div className={`threaded-comments-container level-${level}`}>
        {commentList.map((comment) => {
          const hasChildren = comment.replies && comment.replies.length > 0
          return (
            <div key={comment.id} className="comment-tree-node">
              <div className="comment-node-row">
                {/* Tree connector line & expand/collapse toggle */}
                <div className="tree-connector-column">
                  <div className="tree-vertical-line" />
                  {hasChildren ? (
                    <button
                      className="tree-toggle-btn"
                      onClick={() => toggleCollapseComment(comment.id)}
                      title={comment.collapsed ? 'Expand replies' : 'Collapse replies'}
                    >
                      {comment.collapsed ? (
                        <PlusCircle size={14} className="toggle-icon" />
                      ) : (
                        <MinusCircle size={14} className="toggle-icon" />
                      )}
                    </button>
                  ) : level > 0 ? (
                    <div className="tree-node-bullet" />
                  ) : null}
                </div>

                {/* Main Comment Content Card */}
                <div className="comment-content-box">
                  <div className="comment-header-line">
                    <div className="comment-author-group">
                      <div className="comment-avatar-circle">{comment.avatarInitials}</div>
                      <span className="comment-author-name">{comment.author}</span>
                      <span className="comment-time-ago">{comment.timeAgo}</span>
                    </div>
                  </div>

                  {/* Top Upvote Badge Pill (Matches image 👍 20 above body) */}
                  <div className="comment-top-rating-row">
                    <button className="upvote-pill-sm">
                      <ThumbsUp size={13} /> {comment.upvotes}
                    </button>
                  </div>

                  {/* Sentiment Badge & Body Text */}
                  <div className="comment-body-wrapper">
                    {comment.sentiment && (
                      <span className="sentiment-badge">{comment.sentiment}</span>
                    )}
                    <p className="comment-body-text">"{comment.content}"</p>
                  </div>

                  {/* Comment Action Pills Row */}
                  <div className="comment-actions-row">
                    <button className="action-pill">
                      <ThumbsDown size={13} /> {comment.downvotes}
                    </button>
                    <button
                      className="action-pill reply-pill"
                      onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                    >
                      <MessageSquare size={13} /> Reply
                    </button>
                    <button className="action-pill" onClick={() => handleAction('Comment link copied')}>
                      <Share2 size={13} /> Share
                    </button>
                  </div>

                  {/* Inline Reply Input if Reply clicked */}
                  {replyToId === comment.id && (
                    <div className="inline-reply-box">
                      <input
                        type="text"
                        aria-label="Write a reply"
                        placeholder="Write a reply..."
                        value={replyInputText}
                        onChange={(e) => setReplyInputText(e.target.value)}
                        autoFocus
                      />
                      <button onClick={() => handleAddReplyToComment(comment.id)}>Send</button>
                      <button className="cancel-reply-btn" onClick={() => setReplyToId(null)}>
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Nested Children Tree */}
              {!comment.collapsed && hasChildren && (
                <div className="comment-children-branch">
                  {renderThreadedComments(comment.replies!, level + 1)}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="sq-qb-wrapper">
      {notice && (
        <div className="qb-toast-notice">
          <span>{notice}</span>
          <button onClick={() => setNotice('')}>
            <X size={16} />
          </button>
        </div>
      )}

      <Header />

      <main className="sq-qb-main container">
        {/* PAGE HEADER TITLE & SUBTITLE */}
        <div className="sq-qb-header-text">
          <h1 className="sq-qb-title">Sqooli Question Board</h1>
          <p className="sq-qb-subtitle">
            Ask questions about any topic and have hundreds of responses from our community
          </p>
        </div>

        {/* FULL WIDTH PILL SEARCH BAR (page-design.png) */}
        <div className="sq-qb-search-wrapper" role="search">
          <div className="sq-qb-search-bar">
            <Search className="search-left-icon" size={20} />
            <input
              type="text"
              placeholder="Atom..."
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => updateSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* TWO COLUMN GRID LAYOUT */}
        <div className="sq-qb-grid-layout">
          {/* LEFT FEED COLUMN */}
          <div className="sq-qb-feed-column">
            {filteredQuestions.length === 0 ? (
              <div className="question-empty-state" role="status">
                <h2>No questions found</h2>
                <p>Try a different topic or clear the search to browse the community questions.</p>
                <button type="button" onClick={() => updateSearchQuery('')}>Clear search</button>
              </div>
            ) : filteredQuestions.map((q) => (
              <article key={q.id} className="sq-qb-card">
                {/* Author Info Header Row */}
                <div className="sq-qb-author-row">
                  <img
                    src={q.authorAvatar || lucyAvatar}
                    alt={q.author}
                    className="author-avatar-img"
                  />
                  <div className="author-details">
                    <div className="author-name-line">
                      <span className="author-name">{q.author}</span>
                      <span className="author-role-badge">{q.authorRole}</span>
                    </div>
                    <span className="post-date-str">{q.dateStr}</span>
                  </div>
                </div>

                {/* Question Title */}
                <h2
                  className="sq-qb-card-title"
                  onClick={() => setSelectedQuestionModal(q)}
                >
                  {q.title}
                </h2>

                {/* Chemistry Subject Tag (Bright Green Pill) */}
                <div className="sq-qb-tag-row">
                  <span className="subject-tag-green">{q.subject}</span>
                </div>

                {/* Action Pills & View Button Row */}
                <div className="sq-qb-card-actions-row">
                  <div className="stat-pills-group">
                    <button
                      className="stat-pill-btn"
                      onClick={(e) => handleDownvoteQuestion(q.id, e)}
                    >
                      <ThumbsDown size={15} /> <span>{q.downvotes}</span>
                    </button>
                    <button
                      className="stat-pill-btn"
                      onClick={(e) => handleUpvoteQuestion(q.id, e)}
                    >
                      <ThumbsUp size={15} /> <span>{q.upvotes}</span>
                    </button>
                    <button
                      className="stat-pill-btn"
                      onClick={() => setSelectedQuestionModal(q)}
                    >
                      <MessageCircle size={15} /> <span>{q.commentsCount}</span>
                    </button>
                    <button
                      className="stat-pill-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAction('Question link copied!')
                      }}
                    >
                      <Share2 size={15} /> <span>{q.sharesCount}</span>
                    </button>
                  </div>

                  <button
                    className="view-card-btn"
                    onClick={() => setSelectedQuestionModal(q)}
                  >
                    View
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* RIGHT SIDEBAR COLUMN ("Recent Posts") */}
          <aside className="sq-qb-sidebar-column">
            <div className="recent-posts-card">
              <h3 className="recent-posts-title">Recent Posts</h3>

              <div className="recent-posts-list">
                {questions.slice(0, 2).map((q, idx) => (
                  <div className="recent-post-item" key={`recent-${idx}`}>
                    <div className="sq-qb-author-row">
                      <img
                        src={q.authorAvatar || lucyAvatar}
                        alt={q.author}
                        className="author-avatar-img-sm"
                      />
                      <div className="author-details">
                        <div className="author-name-line">
                          <span className="author-name">{q.author}</span>
                          <span className="author-role-badge">Parent</span>
                        </div>
                        <span className="post-date-str">20 Sep 2025 11.00 AM</span>
                      </div>
                    </div>

                    <h4
                      className="recent-post-item-title"
                      onClick={() => setSelectedQuestionModal(q)}
                    >
                      {q.title}
                    </h4>

                    <div className="sq-qb-tag-row">
                      <span className="subject-tag-green">{q.subject}</span>
                    </div>

                    <div className="recent-post-actions-row">
                      <div className="stat-pills-group-sm">
                        <span className="stat-pill-sm"><ThumbsDown size={13} /> {q.downvotes}</span>
                        <span className="stat-pill-sm"><ThumbsUp size={13} /> {q.upvotes}</span>
                        <span className="stat-pill-sm"><MessageCircle size={13} /> {q.commentsCount}</span>
                        <span className="stat-pill-sm"><Share2 size={13} /> {q.sharesCount}</span>
                      </div>

                      <button
                        className="view-card-btn-sm"
                        onClick={() => setSelectedQuestionModal(q)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="show-more-results-btn"
                onClick={() => handleAction('Showing additional results')}
              >
                Show more results
              </button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      {/* QUESTION DETAIL MODAL (Matches modal-design.png & modal-design2.png) */}
      {selectedQuestionModal && (
        <div
          className="modal-backdrop-overlay"
          onClick={() => setSelectedQuestionModal(null)}
        >
          <div className="modal-card-wrapper" onClick={(e) => e.stopPropagation()}>
            {/* Modal Top Header Nav (Back button & Close button) */}
            <div className="modal-nav-header">
              <button
                className="modal-back-btn"
                onClick={() => setSelectedQuestionModal(null)}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                className="modal-close-icon-btn"
                onClick={() => setSelectedQuestionModal(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Question Details Header */}
            <div className="modal-question-header">
              <div className="sq-qb-author-row">
                <img
                  src={selectedQuestionModal.authorAvatar || lucyAvatar}
                  alt={selectedQuestionModal.author}
                  className="author-avatar-img"
                />
                <div className="author-details">
                  <div className="author-name-line">
                    <span className="author-name">{selectedQuestionModal.author}</span>
                    <span className="author-role-badge">
                      {selectedQuestionModal.authorRole}
                    </span>
                  </div>
                  <span className="post-date-str">{selectedQuestionModal.dateStr}</span>
                </div>
              </div>

              <h2 className="modal-question-title">{selectedQuestionModal.title}</h2>

              <div className="sq-qb-tag-row" style={{ margin: '8px 0 16px' }}>
                <span className="subject-tag-green">{selectedQuestionModal.subject}</span>
              </div>

              {/* MEDIA ATTACHMENT PREVIEW IF HAS ATTACHMENT (modal-design2.png) */}
              {selectedQuestionModal.hasMediaAttachment && (
                <div className="modal-media-attachment-box">
                  <svg className="cross-wireframe-svg" viewBox="0 0 400 180" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="400" y2="180" stroke="#cbd5e1" strokeWidth="1.5" />
                    <line x1="400" y1="0" x2="0" y2="180" stroke="#cbd5e1" strokeWidth="1.5" />
                  </svg>
                </div>
              )}

              {/* Stats Bar */}
              <div className="modal-question-stats-row">
                <div className="stat-pills-group">
                  <button
                    className="stat-pill-btn"
                    onClick={() => handleDownvoteQuestion(selectedQuestionModal.id)}
                  >
                    <ThumbsDown size={15} /> <span>{selectedQuestionModal.downvotes}</span>
                  </button>
                  <button
                    className="stat-pill-btn"
                    onClick={() => handleUpvoteQuestion(selectedQuestionModal.id)}
                  >
                    <ThumbsUp size={15} /> <span>{selectedQuestionModal.upvotes}</span>
                  </button>
                  <button className="stat-pill-btn">
                    <MessageCircle size={15} /> <span>{selectedQuestionModal.commentsCount}</span>
                  </button>
                  <button
                    className="stat-pill-btn"
                    onClick={() => handleAction('Question link copied')}
                  >
                    <Share2 size={15} /> <span>{selectedQuestionModal.sharesCount}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-divider-line" />

            {/* Answer Input Bar ("Share your thoughts" + "Post Answer") */}
            <div className="modal-input-section">
              <div className="answer-input-pill-wrapper">
                <input
                  type="text"
                  className="answer-input-pill"
                  placeholder="Share your thoughts"
                  value={newAnswerText}
                  onChange={(e) => setNewAnswerText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePostAnswer()
                  }}
                />
                <button className="post-answer-blue-btn" onClick={handlePostAnswer}>
                  Post Answer
                </button>
              </div>
            </div>

            {/* Threaded Comments Tree Feed */}
            <div className="modal-comments-feed">
              {selectedQuestionModal.comments.length > 0 ? (
                renderThreadedComments(selectedQuestionModal.comments)
              ) : (
                <div className="no-comments-box">
                  <p>No answers posted yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
