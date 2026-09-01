import { BarChart3, BookOpenCheck, Target, TrendingUp } from 'lucide-react'
import StudentDashboardLayout from './StudentDashboardLayout'
import { useStudentAssessments, useStudentEnrollments } from '../../../features/student/student.queries'
import '../../../styles/pages/student-performance.css'

function countRecords(payload: unknown) {
	if (Array.isArray(payload)) return payload.length
	if (!payload || typeof payload !== 'object') return 0
	const record = payload as Record<string, unknown>
	for (const key of ['data', 'items', 'results', 'enrollments', 'assessments']) {
		if (Array.isArray(record[key])) return record[key].length
	}
	return 0
}

export default function PerformancePage() {
	const enrollments = useStudentEnrollments()
	const assessments = useStudentAssessments()
	const enrollmentCount = countRecords(enrollments.data)
	const assessmentCount = countRecords(assessments.data)
	const loading = enrollments.isLoading || assessments.isLoading
	const error = enrollments.isError || assessments.isError
	const retry = () => { void enrollments.refetch(); void assessments.refetch() }
	return <StudentDashboardLayout activePath="/student/performance" variant="complete">
		<section className="student-performance-page" aria-labelledby="performance-title">
			<header className="student-performance-page__header"><div><p className="student-performance-page__eyebrow">Your learning journey</p><h1 id="performance-title">Performance</h1><p>Track your learning progress and outcomes.</p></div><div className="student-performance-page__header-icon"><TrendingUp size={21} /></div></header>
			<section className="student-performance-page__overview" aria-label="Performance overview"><div className="student-performance-page__overview-icon"><BarChart3 size={25} /></div><div><span>Learning overview</span><h2>{enrollmentCount ? 'Keep building your momentum' : 'Your learning insights are on the way'}</h2><p>{enrollmentCount ? 'Complete lessons and assessments to build a clear picture of your progress.' : 'Enrol in a lesson and complete an assessment to start tracking your progress.'}</p></div></section>
			{loading && <p className="student-performance-page__notice" role="status">Updating your learning overview…</p>}
			{error && <p className="student-performance-page__notice is-error" role="alert">We couldn’t update your performance data. <button type="button" onClick={retry}>Try again</button></p>}
			<div className="student-performance-page__metrics"><Metric icon={BookOpenCheck} value={enrollmentCount} label={enrollmentCount === 1 ? 'Enrolled lesson' : 'Enrolled lessons'} /><Metric icon={Target} value={assessmentCount} label={assessmentCount === 1 ? 'Available assessment' : 'Available assessments'} /><article className="student-performance-page__metric is-muted"><BarChart3 size={20} /><strong>—</strong><span>Average performance</span></article></div>
			<section className="student-performance-page__results" aria-labelledby="results-title"><header><div><h2 id="results-title">Performance results</h2><p>Your scores, progress, and subject insights will appear here.</p></div><span>Coming soon</span></header><div className="student-performance-page__results-empty"><div><BarChart3 size={22} /></div><strong>No results yet</strong><p>Complete an assessment to see your results and learning trends.</p></div></section>
		</section>
	</StudentDashboardLayout>
}

function Metric({ icon: Icon, value, label }: { icon: typeof BookOpenCheck; value: number; label: string }) {
	return <article className="student-performance-page__metric"><Icon size={20} /><strong>{value}</strong><span>{label}</span></article>
}
