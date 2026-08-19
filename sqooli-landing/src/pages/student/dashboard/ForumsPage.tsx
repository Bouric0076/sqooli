import { MessageCircle, Plus, Search, Share2, ThumbsDown, ThumbsUp, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import '../../../styles/pages/student-forums.css'

const posts = [1, 2, 3, 4, 5]

function ForumPost({ compact = false, onView }: { compact?: boolean; onView?: () => void }) {
	return <article className={`student-forum-post${compact ? ' is-compact' : ''}`}><div className="student-forum-post__author"><span><UserRound size={18} /></span><div><strong>Lucy</strong><small>{compact ? 'Parent' : 'Student'}</small><em>{compact ? '20 Sep 2025 11.00 AM' : '3 days ago'}</em></div></div><h2>What is an atom?</h2><b className="student-forum-post__tag">Chemistry</b><div className="student-forum-post__actions"><span><ThumbsDown size={15} /> 20</span><span><ThumbsUp size={15} /> 20</span><span><MessageCircle size={15} /> 20</span><span><Share2 size={15} /> 20</span></div>{!compact && <button type="button" onClick={onView}>View</button>}</article>
}

function ForumDetailModal({ onClose }: { onClose: () => void }) {
	const replies = [1, 2, 3, 4, 5]
	return <div className="student-forum-detail-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="student-forum-detail-modal" role="dialog" aria-modal="true" aria-labelledby="forum-detail-title"><header className="student-forum-detail-modal__topbar"><button type="button" onClick={onClose}><span aria-hidden="true">◉</span> Back to Forums</button><button type="button" aria-label="Close forum post" onClick={onClose}><X size={22} /></button></header><article className="student-forum-detail-modal__post"><div className="student-forum-post__author"><span><UserRound size={18} /></span><div><strong>Lucy</strong><small>Student</small><em>3 days ago</em></div></div><h1 id="forum-detail-title">What is an atom?</h1><b className="student-forum-post__tag">Chemistry</b><div className="student-forum-post__actions"><span><ThumbsDown size={15} /> 20</span><span><ThumbsUp size={15} /> 20</span><span><MessageCircle size={15} /> 20</span><span><Share2 size={15} /> 20</span></div></article><div className="student-forum-detail-modal__answers"><form className="student-forum-detail-modal__answer-form"><input placeholder="Share your thoughts" aria-label="Share your thoughts" /><button type="submit">Post Answer</button></form><div className="student-forum-detail-modal__thread">{replies.map((reply, index) => <article className={`student-forum-reply${index > 0 && index < 4 ? ' is-nested' : ''}`} key={reply}><span className="student-forum-reply__avatar">OR</span><div><header><strong>Olivia Rhye</strong><small>2 mins ago</small></header>{index < 4 && <div className="student-forum-reply__vote"><ThumbsUp size={15} /> 20</div>}<p>{index < 4 && <b>Neutral</b>} “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id.”</p>{index < 4 && <footer><span><ThumbsDown size={15} /> 20</span><button type="button"><MessageCircle size={14} /> Reply</button><button type="button"><Share2 size={14} /> Share</button></footer>}</div></article>)}</div></div></section></div>
}

export default function ForumsPage() {
	const [createPostOpen, setCreatePostOpen] = useState(false)
	const [detailOpen, setDetailOpen] = useState(false)
	const [comment, setComment] = useState('')
	const submitPost = (event: React.FormEvent) => {
		event.preventDefault()
		if (!comment.trim()) return
		setComment('')
		setCreatePostOpen(false)
	}

	return <StudentDashboardLayout activePath="/student/forums" variant="complete"><section className="student-forums-page" aria-labelledby="forums-title"><header className="student-forums-page__header"><div><h1 id="forums-title">Forums</h1><p>Contribute to the Sqooli question boards and forums</p></div><button type="button" onClick={() => setCreatePostOpen(true)}><Plus size={16} /> Create Post</button></header><div className="student-forums-page__layout"><main><label className="student-forums-page__search"><Search size={18} /><input placeholder="Search Questions" aria-label="Search questions" /></label>{posts.map(post => <ForumPost key={post} onView={() => setDetailOpen(true)} />)}</main><aside><h2>Recent Posts</h2><ForumPost compact /><ForumPost compact /><button type="button" className="student-forums-page__more">Show more results</button></aside></div></section>{createPostOpen && <div className="student-create-post-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setCreatePostOpen(false) }}><section className="student-create-post-modal" role="dialog" aria-modal="true" aria-labelledby="create-post-title"><header><h2 id="create-post-title">Create Post</h2><button type="button" aria-label="Close create post" onClick={() => setCreatePostOpen(false)}><X size={22} /></button></header><form onSubmit={submitPost}><label htmlFor="forum-comment">Comment</label><textarea id="forum-comment" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Enter a description..." autoFocus /><button type="submit" disabled={!comment.trim()}>Send Post</button></form></section></div>}{detailOpen && <ForumDetailModal onClose={() => setDetailOpen(false)} />}</StudentDashboardLayout>
}
