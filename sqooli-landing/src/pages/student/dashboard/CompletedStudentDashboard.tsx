import { EyeOff, Flame, WalletCards } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StudentDashboardLayout from './StudentDashboardLayout'
import { getMyEnrollments } from '../../../api/student'
import { useAppSelector } from '../../../store'
import { selectAuthUser } from '../../../auth/auth.selectors'
import { useWalletBalance } from '../../../features/student/wallet.queries'
import { useLessons } from '../../../features/student/student.queries'
import '../../../styles/pages/student-complete.css'

export default function CompletedStudentDashboard() {
	const user = useAppSelector(selectAuthUser)
	const navigate = useNavigate()
	const balanceQuery = useWalletBalance()
	const lessonsQuery = useLessons({ page: 1, pageSize: 3 })
	const [learningTab, setLearningTab] = useState<'assignments' | 'lessons'>('assignments')
	const [enrollment, setEnrollment] = useState<Record<string, unknown> | null>(null)
	const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.email || 'Student'
	const balance = extractAmount(balanceQuery.data)
	const walletConfigured = Boolean(window.sessionStorage.getItem('sqooli-student-wallet'))
	useEffect(() => {
		let active = true
		getMyEnrollments().then(payload => { if (active) setEnrollment(findFirstRecord(payload)) }).catch(() => {})
		return () => { active = false }
	}, [])
	const curriculum = nestedName(enrollment?.curriculum) || textValue(enrollment?.curriculumName) || 'Enrollment details unavailable'
	const school = nestedName(enrollment?.school) || textValue(enrollment?.schoolName) || 'Independent student'
	const grade = nestedName(enrollment?.gradeLevel) || textValue(enrollment?.gradeName) || textValue(enrollment?.grade) || 'Grade not selected'
	const subjects = Array.isArray(enrollment?.subjects) ? enrollment.subjects.map(item => nestedName(item) || textValue(item)).filter((item): item is string => Boolean(item)).join(', ') : 'Subjects not selected'
	const formattedBalance = `KES ${balance.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`
	const lessons = extractRecords(lessonsQuery.data)
	return <StudentDashboardLayout variant="complete">
		<section className="student-complete-page" aria-labelledby="student-complete-title">
			<div className="student-complete-page__content">
				<h1 id="student-complete-title">Welcome back, {displayName}</h1>
				<section className="student-complete-page__balance" aria-label="Wallet balance">
					<div className="student-complete-page__balance-card"><span>Available Balance</span><b>{balanceQuery.isLoading ? 'Loading…' : formattedBalance}</b><span>Actual Balance</span><strong>{balanceQuery.isLoading ? 'Loading…' : formattedBalance}</strong><EyeOff className="student-complete-page__balance-icon" size={20} /></div>
					<div className="student-complete-page__withdrawal"><span>Wallet</span><p>{balanceQuery.isError ? 'Wallet balance unavailable' : walletConfigured ? 'Your current wallet balance is shown here.' : 'Activate your wallet to add a payment method and top up.'}</p><button type="button" onClick={() => navigate(walletConfigured ? '/student/wallet?topup=1' : '/student/wallet')}> <WalletCards size={16} /> {walletConfigured ? 'Manage wallet' : 'Activate wallet'}</button></div>
				</section>
				<section className="student-complete-page__learning" aria-labelledby="learning-title"><h2 id="learning-title">{lessons.length > 0 ? 'Continue Learning' : 'Start your first lesson'}</h2><div className="student-complete-page__learning-tabs"><button type="button" className={learningTab === 'assignments' ? 'is-active' : ''} onClick={() => setLearningTab('assignments')}>Upcoming Assignments</button><button type="button" className={learningTab === 'lessons' ? 'is-active' : ''} onClick={() => setLearningTab('lessons')}>Lessons</button></div>{learningTab === 'lessons' && lessonsQuery.isLoading && <div className="student-complete-page__data-empty" role="status">Loading your lessons…</div>}{learningTab === 'lessons' && lessonsQuery.isError && <div className="student-complete-page__data-empty" role="alert">We couldn’t load your lessons. Please open Lessons to try again.</div>}{learningTab === 'lessons' && !lessonsQuery.isLoading && !lessonsQuery.isError && lessons.length === 0 && <div className="student-complete-page__data-empty">Find a lesson that matches your learning goals and start building your learning journey.</div>}{learningTab === 'lessons' && lessons.length > 0 && <div className="student-complete-page__assignment-list">{lessons.map((lesson, index) => <Link className="student-complete-page__assignment-link" to={`/student/lessons/${encodeURIComponent(String(lesson.id || lesson.lessonId || index))}`} key={String(lesson.id || lesson.lessonId || index)}>{textValue(lesson.title) || textValue(lesson.name) || 'Lesson'}<span>Open lesson →</span></Link>)}</div>}{learningTab === 'assignments' && <div className="student-complete-page__data-empty">Your upcoming assignments will appear here once they are assigned.</div>}</section>
				<section className="student-complete-page__activity" aria-labelledby="activity-title"><h2 id="activity-title">Activity Feed</h2><div className="student-complete-page__data-empty">Your learning activity will appear here.</div></section>
			</div>
			<aside className="student-complete-page__rail"><h2>Student’s Corner</h2><div className="student-complete-page__corner"><div className="student-complete-page__corner-art" /><div><span className="student-complete-page__corner-avatar">{displayName.slice(0, 1).toUpperCase()}</span><strong>{displayName}</strong><small>{school}</small><b>{curriculum}</b><small>{grade}</small><small>{subjects}</small></div><Link to="/student/profile">View Profile</Link></div><div className="student-complete-page__rail-section"><header><span><Flame size={14} /> Weekly Streak</span><Link to="/student">View</Link></header><div className="student-complete-page__empty-rail">Your learning streak will appear after your first activity.</div></div><div className="student-complete-page__rail-section"><header><span>TimeTable <small>• Today</small></span><Link to="/student/timetable">View Calendar</Link></header><div className="student-complete-page__empty-rail">No lessons scheduled today.</div></div><div className="student-complete-page__rail-section"><header><span>Grade Reports</span></header><div className="student-complete-page__empty-rail">Grade reports will appear when available.</div></div></aside>
		</section>
	</StudentDashboardLayout>
}

function extractAmount(payload: unknown): number {
	if (typeof payload === 'number' || typeof payload === 'string') return Number(payload) || 0
	if (!payload || typeof payload !== 'object') return 0
	const record = payload as Record<string, unknown>
	return Number(record.availableBalance ?? record.balance ?? record.actualBalance ?? record.amount ?? 0) || 0
}

function findFirstRecord(payload: unknown): Record<string, unknown> | null {
	if (Array.isArray(payload)) return (payload[0] as Record<string, unknown>) || null
	if (!payload || typeof payload !== 'object') return null
	const record = payload as Record<string, unknown>
	for (const key of ['data', 'items', 'results', 'records', 'enrollments']) {
		const found = findFirstRecord(record[key])
		if (found) return found
	}
	return record.id || record.curriculum || record.curriculumName ? record : null
}

function textValue(value: unknown): string | null {
	return typeof value === 'string' || typeof value === 'number' ? String(value) : null
}

function nestedName(value: unknown): string | null {
	if (!value || typeof value !== 'object') return textValue(value)
	return textValue((value as Record<string, unknown>).name) || textValue((value as Record<string, unknown>).title)
}

function extractRecords(payload: unknown): Record<string, unknown>[] {
	if (Array.isArray(payload)) return payload.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
	if (!payload || typeof payload !== 'object') return []
	const record = payload as Record<string, unknown>
	for (const key of ['data', 'items', 'results', 'lessons']) {
		const found = extractRecords(record[key])
		if (found.length) return found
	}
	return []
}
