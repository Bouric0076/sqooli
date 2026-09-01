import { Check, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../../auth/auth.service'
import { updateUser } from '../../../auth/auth.slice'
import { getMyEnrollments } from '../../../api/student'
import { useAppDispatch, useAppSelector } from '../../../store'
import StudentDashboardLayout from './StudentDashboardLayout'
import StudentProfileModal from './StudentProfileModal'
import SharedWalletActivationModal from '../../../components/shared/SharedWalletActivationModal'
import CompletedStudentDashboard from './CompletedStudentDashboard'

const checklist = [
	{ number: '1', title: 'Add Student Information', description: 'Add your photo, school, curriculum, grade, subjects, and interests', action: 'Go', href: '/student/profile' },
	{ number: '2', title: 'Set up your wallet', description: 'Save a payment method for secure lesson top-ups when you need them', href: '/student/wallet' },
	{ number: '3', title: 'Find a Lesson', description: 'Explore lessons that match your learning goals', action: 'Go', href: '/search?tab=Classes&student=1' },
]

export default function StudentDashboardPage() {
	const user = useAppSelector((state) => state.auth.user)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const hydratedUserId = useRef('')
	const [profileModalOpen, setProfileModalOpen] = useState(false)
	const [walletModalOpen, setWalletModalOpen] = useState(false)
	const welcomeKey = user?.userId ? `sqooli-student-welcome-seen:${user.userId}` : ''
	const [welcomeSeen] = useState(() => Boolean(user?.userId && window.localStorage.getItem(`sqooli-student-welcome-seen:${user.userId}`)))
	const [profileComplete, setProfileComplete] = useState(() => Boolean(window.sessionStorage.getItem('sqooli-student-profile')))
	const [walletComplete, setWalletComplete] = useState(() => Boolean(window.sessionStorage.getItem('sqooli-student-wallet') || window.sessionStorage.getItem('sqooli-student-wallet-skipped')))
	const [lessonComplete, setLessonComplete] = useState(() => Boolean(window.sessionStorage.getItem('sqooli-student-lesson')))
	useEffect(() => {
		if (!welcomeKey) return
		if (!window.localStorage.getItem(welcomeKey)) window.localStorage.setItem(welcomeKey, 'true')
	}, [welcomeKey])
	useEffect(() => {
		if (!user?.userId || hydratedUserId.current === user.userId) return
		hydratedUserId.current = user.userId
		let active = true
		Promise.all([getCurrentUser(user), getMyEnrollments()]).then(([refreshed, enrollments]) => {
			if (!active) return
			dispatch(updateUser(refreshed))
			const persisted = refreshed.isProfileComplete === true || hasEnrollmentRecords(enrollments)
			if (persisted) window.sessionStorage.setItem('sqooli-student-profile', 'true')
			else window.sessionStorage.removeItem('sqooli-student-profile')
			setProfileComplete(persisted)
		}).catch(() => {
			// Keep the existing local state if the optional hydration check is unavailable.
		})
		return () => { active = false }
	}, [dispatch, user])
	const completeWalletBySkipping = () => {
		window.sessionStorage.setItem('sqooli-student-wallet-skipped', 'true')
		setWalletComplete(true)
	}
	if (welcomeSeen || (profileComplete && walletComplete && lessonComplete)) return <CompletedStudentDashboard />

	return (
		<StudentDashboardLayout>
			<section className="student-dashboard__welcome" aria-labelledby="student-dashboard-title">
				<h1 id="student-dashboard-title">Welcome to Sqooli</h1>
				<p>Complete the following steps to activate your profile</p>
				<div className="student-dashboard__checklist">
						{checklist.map((item, index) => (
							<div className={`student-dashboard__checklist-item${(index === 0 && !profileComplete) || (index === 2 && walletComplete) ? ' is-current' : ''}${(index === 0 && profileComplete) || (index === 1 && walletComplete) ? ' is-complete' : ''}${index === 1 ? ' is-wallet-step' : ''}`} key={item.number}>
							<span className="student-dashboard__step-number">{(index === 0 && profileComplete) || (index === 1 && walletComplete) ? <Check size={21} /> : item.number}</span>
							<span className="student-dashboard__step-copy"><strong>{item.title}</strong><small>{item.description}</small></span>
							{index === 0 && profileComplete || index === 1 && walletComplete ? <ChevronRight className="student-dashboard__next" size={22} /> : index === 0 ? <button type="button" className="student-dashboard__go" onClick={() => setProfileModalOpen(true)}>{item.action}</button> : index === 1 ? <span className="student-dashboard__step-actions"><button type="button" className="student-dashboard__skip" onClick={completeWalletBySkipping}>Skip</button><button type="button" className="student-dashboard__go" onClick={() => setWalletModalOpen(true)}>Go</button></span> : walletComplete ? <button type="button" className="student-dashboard__go" onClick={() => { window.sessionStorage.setItem('sqooli-student-lesson', 'true'); setLessonComplete(true); navigate(item.href) }}>{item.action}</button> : <ChevronRight className="student-dashboard__next" size={22} />}
						</div>
					))}
				</div>
			</section>
			{profileModalOpen && <StudentProfileModal onClose={() => setProfileModalOpen(false)} onSaved={(updatedUser) => { setProfileComplete(updatedUser?.isProfileComplete === true); setProfileModalOpen(false) }} />}
			{walletModalOpen && <SharedWalletActivationModal onClose={() => setWalletModalOpen(false)} onSaved={() => navigate('/student/wallet')} />}
		</StudentDashboardLayout>
	)
}

function hasEnrollmentRecords(payload: unknown): boolean {
	if (Array.isArray(payload)) return payload.length > 0
	if (!payload || typeof payload !== 'object') return false
	const record = payload as Record<string, unknown>
	return ['data', 'items', 'results', 'records', 'enrollments'].some((key) => hasEnrollmentRecords(record[key]))
}
