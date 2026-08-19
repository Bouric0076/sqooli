import { ChevronRight, Copy, FileCheck2, Filter, Search, School, X } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import TeacherDashboardLayout from './TeacherDashboardLayout'
import speaker from '../../assets/images/student-flow/speaker.svg'
import emptyBooks from '../../assets/images/student-flow/empty-books.svg'
import '../../styles/pages/teacher-assignments.css'

type SubmissionStatus = 'Passed' | 'Failed'

type Submission = {
	id: number
	student: string
	email: string
	date: string
	grade: string
	status: SubmissionStatus
}

const submissions: Submission[] = [
	{ id: 1, student: 'Olivia Rhye', email: 'oliviaryhe@gmail.com', date: '12 Jan 2025', grade: '16/20', status: 'Passed' },
	{ id: 2, student: 'John Kamau', email: 'johnkamau@gmail.com', date: '12 Jan 2025', grade: '14/20', status: 'Passed' },
	{ id: 3, student: 'Lucy Atieno', email: 'lucyatieno@gmail.com', date: '12 Jan 2025', grade: '8/20', status: 'Failed' },
	{ id: 4, student: 'Peter Okumu', email: 'peterokumu@gmail.com', date: '12 Jan 2025', grade: '10/20', status: 'Failed' },
	{ id: 5, student: 'Amina Yusuf', email: 'aminayusuf@gmail.com', date: '12 Jan 2025', grade: '9/20', status: 'Failed' },
	{ id: 6, student: 'Brian Otieno', email: 'brianotieno@gmail.com', date: '12 Jan 2025', grade: '16/20', status: 'Passed' },
	{ id: 7, student: 'Wanjiku Njeri', email: 'wanjikunjeri@gmail.com', date: '12 Jan 2025', grade: '15/20', status: 'Passed' },
	{ id: 8, student: 'David Mwangi', email: 'davidmwangi@gmail.com', date: '12 Jan 2025', grade: '18/20', status: 'Passed' },
]

const questions = [
	{ number: 1, selected: 'Option D', correct: true },
	{ number: 2, selected: 'Option C', correct: false },
	{ number: 3, selected: 'Option D', correct: true },
]

function CloseButton({ onClick, label }: { onClick: () => void; label: string }) {
	return <button className="teacher-assignment-flow__close" type="button" aria-label={label} onClick={onClick}><X size={22} /></button>
}

function ModalShell({ children, onClose, className = '', elevated = false }: { children: ReactNode; onClose: () => void; className?: string; elevated?: boolean }) {
	return <div className={`teacher-assignment-flow__backdrop${elevated ? ' is-elevated' : ''}`} onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
		<section className={`teacher-assignment-flow__modal ${className}`} role="dialog" aria-modal="true">
			{children}
		</section>
	</div>
}

function Breadcrumb({ current }: { current: string }) {
	return <div className="teacher-assignment-flow__breadcrumb"><FileCheck2 size={16} /><span>Assignments</span><ChevronRight size={15} /><b>{current}</b></div>
}

function SubmissionReview({ submission, onClose, elevated = false }: { submission: Submission; onClose: () => void; elevated?: boolean }) {
	const [questionIndex, setQuestionIndex] = useState(0)
	const question = questions[questionIndex]
	const isCorrect = submission.status === 'Passed' ? question.correct : !question.correct

	return <ModalShell onClose={onClose} className="teacher-submission-review" elevated={elevated}>
		<header className="teacher-assignment-flow__header"><Breadcrumb current="Test 1" /><CloseButton onClick={onClose} label="Close submission review" /></header>
		<div className="teacher-submission-review__meta">
			<div className="teacher-submission-review__student"><span className="teacher-submission-review__avatar">{submission.student[0]}</span><div><small>Student</small><strong>{submission.student}</strong><span>{submission.email}</span></div></div>
			<div><small>Assignment Name</small><strong>Test 1</strong></div><div><small>Lesson ID</small><strong>12345</strong></div><div><small>Submission Date</small><strong>{submission.date}</strong></div><div><small>Grade</small><strong>{submission.grade}</strong></div><div><small>Status</small><b className="teacher-assignment-flow__status is-active">Active</b></div>
		</div>
		<div className="teacher-submission-review__heading"><h1>Module 4 - Content Questions</h1><p>Quiz 4 <span /> 20 Questions</p></div>
		<article className={`teacher-submission-review__question ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
			<strong className="teacher-submission-review__answer-state">{isCorrect ? 'Correct Answer' : 'Wrong Answer'}</strong>
			<h2>Question {question.number}</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<fieldset>{['Option A', 'Option B', 'Option C', 'Option D'].map(option => <label key={option}><input type="radio" name={`question-${question.number}`} checked={option === question.selected} readOnly /><span>{option}</span></label>)}</fieldset>
		</article>
		{!isCorrect && <section className="teacher-submission-review__explanation"><h2>Correct Answer is Option D</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></section>}
		<footer className="teacher-submission-review__actions"><button type="button" disabled={questionIndex === 0} onClick={() => setQuestionIndex(index => Math.max(0, index - 1))}>Previous</button><button type="button" onClick={() => setQuestionIndex(index => Math.min(questions.length - 1, index + 1))}>{questionIndex === questions.length - 1 ? 'Done' : 'Next'} <ChevronRight size={16} /></button></footer>
	</ModalShell>
}

type AssignmentTab = 'upcoming' | 'ongoing' | 'completed'

export function SubmissionsModal({ onClose, elevated = false, status = 'ongoing', empty = false }: { onClose: () => void; elevated?: boolean; status?: AssignmentTab; empty?: boolean }) {
	const [query, setQuery] = useState('')
	const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
	const filtered = submissions.filter(item => `${item.student} ${item.email}`.toLowerCase().includes(query.toLowerCase()))
	const submitSearch = (event: FormEvent) => event.preventDefault()
	const statusLabel = status[0].toUpperCase() + status.slice(1)

	if (selectedSubmission) return <SubmissionReview submission={selectedSubmission} onClose={() => setSelectedSubmission(null)} elevated={elevated} />
	return <ModalShell onClose={onClose} className="teacher-submissions-modal" elevated={elevated}>
		<header className="teacher-assignment-flow__header"><Breadcrumb current="Test 1" /><CloseButton onClick={onClose} label="Close submissions" /></header>
		<div className="teacher-submissions-modal__layout">
			<aside className="teacher-submissions-modal__summary"><div className="teacher-submissions-modal__cover" /><h1>Test 1</h1><dl><div><dt>Lesson ID:</dt><dd>12345</dd></div><div><dt>Start Date</dt><dd>11 Jan 2025 11.00 AM</dd></div><div><dt>No of Students:</dt><dd>10</dd></div><div><dt>Status:</dt><dd><b className={`teacher-assignment-flow__status is-${status}`}>{statusLabel}</b></dd></div></dl></aside>
			<section className="teacher-submissions-modal__content"><h1>Submissions</h1><form className="teacher-assignment-flow__search" onSubmit={submitSearch}><Search size={20} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search" aria-label="Search submissions" /><button type="submit" aria-label="Filter submissions"><Filter size={19} /></button></form>{empty ? <div className="teacher-submissions-modal__empty"><img src={emptyBooks} alt="" /><h2>Submissions will show up here</h2></div> : <><div className="teacher-submissions-modal__table-wrap"><table><thead><tr><th>Student Name</th><th>Submission Date</th><th>Grade</th><th>Status</th><th>Action</th></tr></thead><tbody>{filtered.map(item => <tr key={item.id}><td data-label="Student Name">{item.student}</td><td data-label="Submission Date">{item.date}</td><td data-label="Grade">{item.grade}</td><td data-label="Status"><b className={`teacher-assignment-flow__status ${item.status === 'Passed' ? 'is-passed' : 'is-failed'}`}>{item.status}</b></td><td data-label=""><button type="button" onClick={() => setSelectedSubmission(item)}>View</button></td></tr>)}</tbody></table></div><footer className="teacher-submissions-modal__pagination"><span>Page <b>1</b> of 10</span><div><button type="button" disabled>Previous</button><button type="button">Next <ChevronRight size={15} /></button></div></footer></>}</section>
		</div>
	</ModalShell>
}

export default function TeacherAssignmentsPage() {
	const [activeTab, setActiveTab] = useState<AssignmentTab>('upcoming')
	const [query, setQuery] = useState('')
	const [submissionsOpen, setSubmissionsOpen] = useState(false)
	const rows = Array.from({ length: 10 }, (_, index) => ({ id: index, name: 'Test 1', lessonId: '1232345', startDate: '12 Jan 2026', dueDate: index === 0 ? '3 days' : '12 Jan 2026', students: '24', submitted: '24', pending: '24', notSubmitted: '24', completionDate: '12 Jan 2026' }))
	const visibleRows = rows.filter(row => `${row.name} ${row.lessonId}`.toLowerCase().includes(query.toLowerCase()))
	const openSubmissions = () => setSubmissionsOpen(true)
	return <TeacherDashboardLayout activePath="/teacher/assignments"><section className="teacher-assignments-page" aria-labelledby="teacher-assignments-title"><div className="teacher-assignments-page__layout"><TeacherAssignmentsAccountRail /><div className="teacher-assignments-page__content"><header className="teacher-assignments-page__header"><div><h1 id="teacher-assignments-title">Assignments</h1><p>Manage assignment submissions</p></div></header><form className="teacher-assignments-page__search" onSubmit={event => event.preventDefault()}><Search size={19} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search" aria-label="Search assignments" /><button type="submit" aria-label="Filter assignments"><Filter size={18} /></button></form><nav className="teacher-assignments-page__tabs" aria-label="Assignment status"><button className={activeTab === 'upcoming' ? 'is-active' : ''} type="button" onClick={() => setActiveTab('upcoming')}>Upcoming Assignments</button><button className={activeTab === 'ongoing' ? 'is-active' : ''} type="button" onClick={() => setActiveTab('ongoing')}>Ongoing</button><button className={activeTab === 'completed' ? 'is-active' : ''} type="button" onClick={() => setActiveTab('completed')}>Completed</button></nav><AssignmentTable rows={visibleRows} status={activeTab} onView={openSubmissions} /></div></div></section>{submissionsOpen && <SubmissionsModal onClose={() => setSubmissionsOpen(false)} status={activeTab} empty={activeTab === 'upcoming'} />}</TeacherDashboardLayout>
}

function TeacherAssignmentsAccountRail() { return <aside className="teacher-assignments-page__account"><div className="teacher-assignments-page__school-mark"><School size={28} /></div><h2>Mathematic Excellence<br />Academy</h2><span className="teacher-assignments-page__school-tag">Online School</span><p>Contact Information</p><strong>+254712 345 678</strong><strong>mathematicexcel@gmail.com</strong><button className="teacher-assignments-page__switch" type="button">Switch Account</button><div className="teacher-assignments-page__referral"><img src={speaker} alt="" /><div><b>Refer &amp; Earn with Sqooli</b><small>Share your unique link to students &amp; parents to join Sqooli</small><button type="button"><Copy size={15} /> Copy Link</button></div></div></aside> }

function AssignmentTable({ rows, status, onView }: { rows: Array<{ id: number; name: string; lessonId: string; startDate: string; dueDate: string; students: string; submitted: string; pending: string; notSubmitted: string; completionDate: string }>; status: AssignmentTab; onView: () => void }) {
	const columns = status === 'upcoming' ? ['Assignment Name', 'Lesson ID', 'Start Date', 'No of Students'] : status === 'ongoing' ? ['Assignment Name', 'Lesson ID', 'Submitted', 'Pending', 'Start Date', 'Due Date'] : ['Assignment Name', 'Start Date', 'Lesson ID', 'Submitted', 'Not Submitted', 'Completion Date']
	return <div className="teacher-assignments-page__table-wrap"><table><thead><tr>{columns.map(column => <th key={column}>{column}</th>)}<th /></tr></thead><tbody>{rows.map(row => <tr key={row.id}><td data-label="Assignment Name"><strong>{row.name}</strong></td>{status === 'upcoming' && <><td data-label="Lesson ID">{row.lessonId}</td><td data-label="Start Date" className={row.id === 0 ? 'is-urgent' : ''}>{row.dueDate}</td><td data-label="No of Students">{row.students}</td></>}{status === 'ongoing' && <><td data-label="Lesson ID">{row.lessonId}</td><td data-label="Submitted">{row.submitted}</td><td data-label="Pending">{row.pending}</td><td data-label="Start Date">{row.startDate}</td><td data-label="Due Date" className={row.id === 0 ? 'is-urgent' : ''}>{row.dueDate}</td></>}{status === 'completed' && <><td data-label="Start Date">{row.startDate}</td><td data-label="Lesson ID">{row.lessonId}</td><td data-label="Submitted">{row.submitted}</td><td data-label="Not Submitted">{row.notSubmitted}</td><td data-label="Completion Date">{row.completionDate}</td></>}<td data-label=""><button type="button" onClick={onView}>View</button></td></tr>)}</tbody><tfoot><tr><td colSpan={columns.length + 1}><span>Page <b>1</b> of 10</span><div><button type="button" disabled>Previous</button><button type="button">Next</button></div></td></tr></tfoot></table></div>
}
