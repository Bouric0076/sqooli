import { ArrowRight, BookOpen, ChevronRight, Play, X } from 'lucide-react'
import { useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import AssignmentQuizModal from './AssignmentQuizModal'
import studentsArt from '../../../assets/images/student-flow/students.webp'
import '../../../styles/pages/student-assignments.css'

const assignments = [
	{ id: 1, due: 'Due in 2 days', meta: '1 Attempt Left  •  120 Min' },
	{ id: 2, due: 'Due in 2 days', meta: '1 Attempt Left  •  120 Min' },
	{ id: 3, due: 'Due in 2 days', meta: '1 Attempt Left  •  120 Min' },
]
const submittedAssignments = [{ id: 1, status: 'Pass' }, { id: 2, status: 'Fail' }, { id: 3, status: 'Pass' }]

export default function AssignmentsPage() {
	const [tab, setTab] = useState<'upcoming' | 'submitted'>('upcoming')
	const [selectedAssignment, setSelectedAssignment] = useState<number | null>(() => {
		const match = window.location.pathname.match(/\/student\/assignments\/(\d+)/)
		return match ? Number(match[1]) : null
	})
	const [started, setStarted] = useState(false)
	const [submittedStatus, setSubmittedStatus] = useState<'Pass' | 'Fail' | null>(null)
	const closeAssignment = () => { setStarted(false); setSelectedAssignment(null); setSubmittedStatus(null) }
	const openUpcoming = (id: number) => { setStarted(false); setSubmittedStatus(null); setSelectedAssignment(id) }
	const openSubmitted = (id: number, status: 'Pass' | 'Fail') => { setStarted(true); setSubmittedStatus(status); setSelectedAssignment(id) }

	return <StudentDashboardLayout activePath="/student/assignments" variant="complete">
		<section className="student-assignments-page" aria-labelledby="assignments-title">
			<header className="student-assignments-page__header"><h1 id="assignments-title">Assignments</h1><p>View and manage your Lessons</p></header>
			<nav className="student-assignments-page__tabs" aria-label="Assignment status"><button type="button" className={tab === 'upcoming' ? 'is-active' : ''} onClick={() => setTab('upcoming')}>Upcoming Assignment</button><button type="button" className={tab === 'submitted' ? 'is-active' : ''} onClick={() => setTab('submitted')}>Submitted Assignments</button></nav>
			{tab === 'upcoming' ? <div className="student-assignments-page__grid">{assignments.map(assignment => <article className="student-assignments-page__card" key={assignment.id}><div className="student-assignments-page__art"><img src={studentsArt} alt="" loading="lazy" decoding="async" /><span><Play size={19} fill="currentColor" /></span></div><div className="student-assignments-page__body"><strong>Chemistry Test</strong><small>Due in <b>{assignment.due.replace('Due in ', '')}</b></small><p>{assignment.meta}</p><button type="button" onClick={() => openUpcoming(assignment.id)}>Start <ArrowRight size={15} /></button></div></article>)}</div> : <div className="student-assignments-page__submitted">{submittedAssignments.map(assignment => <button type="button" className="student-assignments-page__submitted-row" key={assignment.id} onClick={() => openSubmitted(assignment.id, assignment.status as 'Pass' | 'Fail')}><span><strong>First Term Opening Exams 2025</strong><small>12 Jan 2025 11.00 AM <b className={assignment.status === 'Pass' ? 'is-pass' : 'is-fail'}>{assignment.status}</b></small></span><ChevronRight size={19} /></button>)}</div>}
		</section>
		{selectedAssignment && (started ? <AssignmentQuizModal resultMode={submittedStatus === 'Pass' ? 'passed' : submittedStatus === 'Fail' ? 'failed' : undefined} onClose={closeAssignment} /> : <div className="student-assignment-modal__backdrop" onMouseDown={event => { if (event.target === event.currentTarget) closeAssignment() }}><section className="student-assignment-modal" role="dialog" aria-modal="true" aria-labelledby="assignment-modal-title"><div className="student-assignment-modal__art"><img src={studentsArt} alt="" decoding="async" /></div><button type="button" className="student-assignment-modal__close" aria-label="Close assignment details" onClick={closeAssignment}><X size={22} /></button><div className="student-assignment-modal__body"><div className="student-assignment-modal__label"><BookOpen size={16} /> Chemistry Test</div><h2 id="assignment-modal-title">Module 4 - Content Questions</h2><div className="student-assignment-modal__meta"><span>Quiz 4</span><span>20 Questions</span><span>Due Date: <b>12 Jan 2025 11.59 PM</b></span></div><button type="button" className="student-assignment-modal__start" onClick={() => setStarted(true)}>Start Assignment</button><p className="student-assignment-modal__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><h3>What you’ll learn:</h3><ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing</li></ul></div></section></div>)}
	</StudentDashboardLayout>
}
