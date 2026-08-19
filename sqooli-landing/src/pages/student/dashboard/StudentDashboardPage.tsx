import { Check, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import StudentProfileModal from './StudentProfileModal'
import SharedWalletActivationModal from '../../../components/shared/SharedWalletActivationModal'
import CompletedStudentDashboard from './CompletedStudentDashboard'

const checklist = [
	{ number: '1', title: 'Add Student Information', description: "Add your student's profile picture, grade, and subjects", action: 'Go', href: '/student/profile' },
	{ number: '2', title: 'Activate Wallet', description: 'Setup your wallet payment methods for future withdrawals of your earnings', href: '/student/wallet' },
	{ number: '3', title: 'Book a Lesson', description: 'Book your first lesson', action: 'Go', href: '/student/ai' },
]

export default function StudentDashboardPage() {
	const [profileModalOpen, setProfileModalOpen] = useState(false)
	const [walletModalOpen, setWalletModalOpen] = useState(false)
	const [profileComplete, setProfileComplete] = useState(() => Boolean(window.sessionStorage.getItem('sqooli-student-profile')))
	const [walletComplete, setWalletComplete] = useState(() => Boolean(window.sessionStorage.getItem('sqooli-student-wallet') || window.sessionStorage.getItem('sqooli-student-wallet-skipped')))
	const [lessonComplete, setLessonComplete] = useState(() => Boolean(window.sessionStorage.getItem('sqooli-student-lesson')))
	const completeWalletBySkipping = () => {
		window.sessionStorage.setItem('sqooli-student-wallet-skipped', 'true')
		setWalletComplete(true)
	}
	if (profileComplete && walletComplete && lessonComplete) return <CompletedStudentDashboard />

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
							{index === 0 && profileComplete || index === 1 && walletComplete ? <ChevronRight className="student-dashboard__next" size={22} /> : index === 0 ? <button type="button" className="student-dashboard__go" onClick={() => setProfileModalOpen(true)}>{item.action}</button> : index === 1 ? <span className="student-dashboard__step-actions"><button type="button" className="student-dashboard__skip" onClick={completeWalletBySkipping}>Skip</button><button type="button" className="student-dashboard__go" onClick={() => setWalletModalOpen(true)}>Go</button></span> : walletComplete ? <button type="button" className="student-dashboard__go" onClick={() => { window.sessionStorage.setItem('sqooli-student-lesson', 'true'); setLessonComplete(true); window.location.href = item.href }}>{item.action}</button> : <ChevronRight className="student-dashboard__next" size={22} />}
						</div>
					))}
				</div>
			</section>
			{profileModalOpen && <StudentProfileModal onClose={() => setProfileModalOpen(false)} onSaved={() => { setProfileComplete(true); setProfileModalOpen(false) }} />}
			{walletModalOpen && <SharedWalletActivationModal onClose={() => setWalletModalOpen(false)} onSaved={() => { window.location.href = '/student/wallet' }} />}
		</StudentDashboardLayout>
	)
}
