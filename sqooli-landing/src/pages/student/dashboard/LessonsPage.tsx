import { ChevronDown, Filter, Search, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import StudentDashboardLayout from './StudentDashboardLayout'
import { useLessons, useStudentEnrollments } from '../../../features/student/student.queries'
import '../../../styles/pages/student-lessons.css'

type LessonRecord = {
	id?: number | string
	name?: string
	description?: string
	subject?: { name?: string } | string
	subjectId?: number | string
	curriculumId?: number | string
	gradeLevelId?: number | string
	subProgramId?: number | string
	start?: string
	status?: string
	assignedTeachers?: Array<{ name?: string }>
	createdByUser?: { firstName?: string; lastName?: string; fullName?: string }
}

function extractLessons(payload: unknown): LessonRecord[] {
	if (Array.isArray(payload)) return payload as LessonRecord[]
	if (!payload || typeof payload !== 'object') return []
	const record = payload as Record<string, unknown>
	for (const key of ['data', 'items', 'results', 'lessons']) {
		const value = record[key]
		if (Array.isArray(value)) return value as LessonRecord[]
		if (value && typeof value === 'object') {
			const nested = extractLessons(value)
			if (nested.length) return nested
		}
	}
	return []
}

function displaySubject(subject: LessonRecord['subject']) {
	if (typeof subject === 'string') return subject
	return subject?.name || 'Learning'
}

function displayTutor(lesson: LessonRecord) {
	const assigned = lesson.assignedTeachers?.[0]?.name
	if (assigned) return assigned
	const creator = lesson.createdByUser
	return creator?.fullName || [creator?.firstName, creator?.lastName].filter(Boolean).join(' ') || 'Tutor to be assigned'
}

function displayLessonDate(value?: string) {
	if (!value) return 'Schedule pending'
	const date = new Date(value)
	return Number.isNaN(date.getTime()) ? 'Schedule pending' : date.toLocaleDateString()
}

function extractEnrollmentRecords(payload: unknown): Array<Record<string, unknown>> {
	if (Array.isArray(payload)) return payload.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
	if (!payload || typeof payload !== 'object') return []
	const record = payload as Record<string, unknown>
	for (const key of ['data', 'items', 'results', 'records', 'enrollments']) {
		if (Array.isArray(record[key])) return extractEnrollmentRecords(record[key])
		if (record[key] && typeof record[key] === 'object') {
			const nested = extractEnrollmentRecords(record[key])
			if (nested.length) return nested
		}
	}
	return []
}

function nestedId(value: unknown) {
	if (typeof value === 'number' || typeof value === 'string') return String(value)
	if (value && typeof value === 'object') {
		const id = (value as Record<string, unknown>).id
		if (typeof id === 'number' || typeof id === 'string') return String(id)
	}
	return ''
}

function lessonBelongsToEnrollment(lesson: LessonRecord, enrollment: Record<string, unknown>) {
	const curriculumId = nestedId(enrollment.curriculumId ?? enrollment.curriculum)
	const gradeLevelId = nestedId(enrollment.gradeLevelId ?? enrollment.gradeLevel)
	const subProgramId = nestedId(enrollment.subProgramId ?? enrollment.subProgram)
	const subjectIds = [
		...(Array.isArray(enrollment.subjectIds) ? enrollment.subjectIds.map(nestedId) : []),
		...(Array.isArray(enrollment.subjects) ? enrollment.subjects.map(nestedId) : []),
	].filter(Boolean)
	const matches = (lessonValue: unknown, enrollmentValue: string) => !enrollmentValue || !lessonValue || nestedId(lessonValue) === enrollmentValue
	return matches(lesson.curriculumId, curriculumId) && matches(lesson.gradeLevelId, gradeLevelId) && matches(lesson.subProgramId, subProgramId) && (!subjectIds.length || subjectIds.includes(nestedId(lesson.subjectId)))
}

export default function LessonsPage() {
	const [tab, setTab] = useState<'current' | 'past'>(() => new URLSearchParams(window.location.search).get('status') === 'past' ? 'past' : 'current')
	const [search, setSearch] = useState('')
	const { data, isLoading, isError, refetch } = useLessons({ page: 1, pageSize: 50, search: search.trim() || undefined })
	const enrollmentQuery = useStudentEnrollments()
	const enrollmentRecords = useMemo(() => extractEnrollmentRecords(enrollmentQuery.data), [enrollmentQuery.data])
	const lessons = useMemo(() => extractLessons(data).filter(lesson => {
		const status = lesson.status?.toLowerCase() || ''
		const isPast = ['completed', 'ended', 'past'].some(value => status.includes(value))
		return (tab === 'past' ? isPast : !isPast) && enrollmentRecords.some(enrollment => lessonBelongsToEnrollment(lesson, enrollment))
	}), [data, enrollmentRecords, tab])
	const isLoadingPage = isLoading || enrollmentQuery.isLoading
	const isErrorPage = isError || enrollmentQuery.isError
	return <StudentDashboardLayout activePath="/student/lessons" variant="complete">
		<section className="student-lessons-page" aria-labelledby="lessons-title">
			<header className="student-lessons-page__header"><div><h1 id="lessons-title">Lessons</h1><p>View and manage your lessons</p></div><div className="student-lessons-page__header-actions"><button type="button" aria-label="Filter lessons"><Filter size={15} /></button><button type="button" aria-label="Sort lessons">Current <ChevronDown size={14} /></button></div></header>
			<nav className="student-lessons-page__tabs" aria-label="Lesson status"><button type="button" className={tab === 'current' ? 'is-active' : ''} onClick={() => setTab('current')}>Current</button><button type="button" className={tab === 'past' ? 'is-active' : ''} onClick={() => setTab('past')}>Past</button></nav>
			<label className="student-lessons-page__search"><Search size={16} /><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Find Lessons" aria-label="Find lessons" /><Filter size={15} /></label>
			{isLoadingPage && <p role="status">Loading your lessons…</p>}
			{isErrorPage && <div className="student-dashboard__page-state is-error" role="alert"><span className="student-dashboard__page-state-icon"><Search size={20} /></span><h2>We couldn’t load your lessons</h2><p>Something interrupted the connection. Please try again in a moment.</p><div className="student-dashboard__page-state-actions"><button type="button" onClick={() => { void Promise.all([refetch(), enrollmentQuery.refetch()]) }}>Try again</button></div></div>}
			{!isLoadingPage && !isErrorPage && enrollmentRecords.length === 0 && <div className="student-lessons-page__empty" role="status"><strong>You’re not enrolled in a lesson yet</strong><p>Find a lesson that matches your learning goals and it will appear here after enrollment.</p><Link to="/search?tab=Classes&student=1">Find a lesson</Link></div>}
			{!isLoadingPage && !isErrorPage && enrollmentRecords.length > 0 && lessons.length === 0 && <p role="status">No {tab} lessons found in your enrollments.</p>}
			{!isLoadingPage && !isErrorPage && enrollmentRecords.length > 0 && <div className="student-lessons-page__grid">{lessons.map((lesson, index) => {
				const id = lesson.id == null ? '' : String(lesson.id).trim()
				const completed = tab === 'past'
				const content = <><div className="student-lesson-card__title">{lesson.name || 'Untitled lesson'}</div><div className="student-lesson-card__tutor"><span><UserRound size={13} /></span><strong>{displayTutor(lesson)}</strong></div><div className="student-lesson-card__progress"><i style={{ width: completed ? '100%' : '0%' }} /></div><div className="student-lesson-card__meta"><small>{completed ? 'Completed' : displayLessonDate(lesson.start)}</small><small>{lesson.status || 'Available'}</small></div><div className="student-lesson-card__footer"><em>{displaySubject(lesson.subject)}</em></div>{!id && <small className="student-lesson-card__unavailable">Details unavailable</small>}</>
				return id ? <Link className="student-lesson-card" to={`/student/lessons/${encodeURIComponent(id)}${completed ? '?status=completed' : ''}`} key={id}>{content}</Link> : <article className="student-lesson-card is-unavailable" key={`lesson-${index}`}>{content}</article>
			})}</div>}
		</section>
	</StudentDashboardLayout>
}
