import { AlertCircle, ArrowRight, BookOpen, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import AssignmentQuizModal from './AssignmentQuizModal'
import { useStudentAssessments } from '../../../features/student/student.queries'
import '../../../styles/pages/student-assignments.css'

type Assessment = { id?: number | string; lessonId?: number | string; lessonName?: string; title?: string; name?: string; description?: string; endTime?: string; dueDate?: string; status?: string; submissionStatus?: string; submittedAt?: string; questions?: unknown[] }

function isSubmitted(assessment: Assessment) {
	const status = `${assessment.submissionStatus || assessment.status || ''}`.toLowerCase()
	return Boolean(assessment.submittedAt) || ['submitted', 'completed', 'graded', 'marked', 'passed', 'failed'].some(value => status.includes(value))
}

function formatDueDate(value?: string) {
	if (!value) return 'Due date unavailable'
	const date = new Date(value)
	return Number.isNaN(date.getTime()) ? 'Due date unavailable' : `Due ${date.toLocaleString()}`
}

export default function AssignmentsPage() {
	const [tab, setTab] = useState<'upcoming' | 'submitted'>('upcoming')
	const [selected, setSelected] = useState<Assessment | null>(null)
	const [search, setSearch] = useState('')
	const lessonIdValue = new URLSearchParams(window.location.search).get('lessonId')
	const lessonId = lessonIdValue ? Number(lessonIdValue) : undefined
	const { data, isLoading, isError, refetch } = useStudentAssessments()
	const assessments = useMemo(() => (data as Assessment[] | undefined || []).filter(item => (tab === 'submitted' ? isSubmitted(item) : !isSubmitted(item)) && (lessonId === undefined || Number(item.lessonId) === lessonId) && `${item.title || item.name || ''} ${item.description || ''} ${item.lessonName || ''}`.toLowerCase().includes(search.toLowerCase())), [data, lessonId, search, tab])

	return <StudentDashboardLayout activePath="/student/assignments" variant="complete">
		<section className="student-assignments-page" aria-labelledby="assignments-title">
			<header className="student-assignments-page__header"><div><h1 id="assignments-title">Assignments</h1><p>View and manage your lessons</p></div><label><Search size={16} /><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search assignments" aria-label="Search assignments" /></label></header>
			<nav className="student-assignments-page__tabs" aria-label="Assignment status"><button type="button" className={tab === 'upcoming' ? 'is-active' : ''} onClick={() => setTab('upcoming')}>Upcoming assignments</button><button type="button" className={tab === 'submitted' ? 'is-active' : ''} onClick={() => setTab('submitted')}>Submitted assignments</button></nav>
			{isLoading && <div className="student-assignments-page__state" role="status"><span className="is-loading"><BookOpen size={18} /></span><div><strong>Loading assignments</strong><p>We’re retrieving the latest assessments.</p></div></div>}
			{isError && <div className="student-assignments-page__state is-error" role="alert"><span><AlertCircle size={18} /></span><div><strong>We couldn’t load assignments</strong><p>Check your connection and try again.</p><button type="button" onClick={() => refetch()}>Try again</button></div></div>}
			{!isLoading && !isError && assessments.length === 0 && <div className="student-assignments-page__state" role="status"><span><BookOpen size={18} /></span><div><strong>No {tab} assignments yet</strong><p>{lessonId ? 'Assignments from this lesson will appear here when they’re available.' : 'Your assigned assessments will appear here when they’re available.'}</p></div></div>}
			{!isLoading && !isError && assessments.length > 0 && <div className="student-assignments-page__grid">{assessments.map((assessment, index) => { const id = `${assessment.lessonId ?? 'lesson'}-${assessment.id ?? index}`; return <article className="student-assignments-page__card" key={id}><div className="student-assignments-page__art"><BookOpen size={34} /><span><ArrowRight size={19} /></span></div><div className="student-assignments-page__body"><strong>{assessment.title || assessment.name || 'Assessment'}</strong><small>{assessment.lessonName ? `${assessment.lessonName} • ` : ''}{tab === 'submitted' && assessment.submittedAt ? `Submitted ${formatDueDate(assessment.submittedAt).replace(/^Due /, '')}` : formatDueDate(assessment.endTime || assessment.dueDate)}</small><p>{assessment.description || (tab === 'submitted' ? 'Review your submitted assessment.' : 'Assessment details are available when you open this item.')}</p><button type="button" onClick={() => setSelected(assessment)}>{tab === 'submitted' ? 'Review' : 'Open'} <ArrowRight size={15} /></button></div></article> })}</div>}
			{selected && <AssignmentQuizModal assessment={selected} onClose={() => setSelected(null)} />}
		</section>
	</StudentDashboardLayout>
}
