import { Check, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import TeacherDashboardLayout from './TeacherDashboardLayout'
import TeacherWalletActivationModal from './TeacherWalletActivationModal'
import TeacherCreateLessonModal from './TeacherCreateLessonModal'
import TeacherTwoFactorModal from './TeacherTwoFactorModal'
import TeacherOptionalSetupModal from './TeacherOptionalSetupModal'
import TeacherDashboardPage from './TeacherDashboardPage'
import '../../styles/pages/teacher-onboarding.css'

const steps = [
	{ title: 'Activate Wallet', description: 'Setup your wallet payment methods for future withdrawals of your earnings' },
	{ title: 'Create Lesson', description: 'Create a campaign and share with your audience to start earning' },
	{ title: 'Two Factor Authentication Setup', description: 'Setup your contact details for two factor authentication' },
	{ title: 'Add Tutors (Optional)', description: 'Invite other users with different roles to your account' },
	{ title: 'Social Media Links (optional)', description: 'Setup your social media links to grow your audience' },
]

export default function TeacherOnboardingPage() {
	const [walletModalOpen, setWalletModalOpen] = useState(false)
	const [createLessonOpen, setCreateLessonOpen] = useState(false)
	const [twoFactorOpen, setTwoFactorOpen] = useState(false)
	const [optionalSetup, setOptionalSetup] = useState<'tutors' | 'social' | null>(null)
	const [walletComplete, setWalletComplete] = useState(() => Boolean(window.sessionStorage.getItem('sqooli-teacher-wallet')))
	const [lessonComplete, setLessonComplete] = useState(() => Boolean(window.sessionStorage.getItem('sqooli-teacher-lesson-created')))
	const [twoFactorComplete, setTwoFactorComplete] = useState(() => Boolean(window.sessionStorage.getItem('sqooli-teacher-2fa')))
	const [tutorsComplete, setTutorsComplete] = useState(() => Boolean(window.sessionStorage.getItem('sqooli-teacher-tutors')))
	const [socialComplete, setSocialComplete] = useState(() => Boolean(window.sessionStorage.getItem('sqooli-teacher-social')))
	const activeStep = walletComplete ? (lessonComplete ? (twoFactorComplete ? (tutorsComplete ? (socialComplete ? 5 : 4) : 3) : 2) : 1) : 0
	const allComplete = activeStep === 5

	const completeWallet = () => {
		window.sessionStorage.setItem('sqooli-teacher-wallet', 'true')
		setWalletComplete(true)
		setWalletModalOpen(false)
	}
	const completeOptional = (kind: 'tutors' | 'social') => { window.sessionStorage.setItem(`sqooli-teacher-${kind}`, 'true'); if (kind === 'tutors') setTutorsComplete(true); else setSocialComplete(true); setOptionalSetup(null) }
	const skipOptional = (kind: 'tutors' | 'social') => { window.sessionStorage.setItem(`sqooli-teacher-${kind}`, 'skipped'); if (kind === 'tutors') setTutorsComplete(true); else setSocialComplete(true); setOptionalSetup(null) }
	if (allComplete) return <TeacherDashboardPage />

	return (
		<TeacherDashboardLayout>
			<section className="teacher-onboarding" aria-labelledby="teacher-onboarding-title">
			<div className="teacher-onboarding__shell">
				<header className="teacher-onboarding__intro">
					<h1 id="teacher-onboarding-title">Welcome to Sqooli</h1>
					<p>Complete the following steps to activate your profile</p>
				</header>

				<section className="teacher-onboarding__steps" aria-label="Teacher profile activation steps">
					{steps.map((step, index) => {
						const isComplete = (index === 0 && walletComplete) || (index === 1 && lessonComplete) || (index === 2 && twoFactorComplete) || (index === 3 && tutorsComplete) || (index === 4 && socialComplete)
						const isCurrent = index === activeStep
						return <div className={`teacher-onboarding__step${isCurrent ? ' is-current' : ''}${isComplete ? ' is-complete' : ''}`} key={step.title}>
							<span className="teacher-onboarding__number">{isComplete ? <Check size={20} strokeWidth={2.5} /> : index + 1}</span>
							<span className="teacher-onboarding__copy"><strong>{step.title}</strong><small>{step.description}</small></span>
							{isCurrent && index === 0 ? <button type="button" className="teacher-onboarding__go" onClick={() => setWalletModalOpen(true)}>Go</button> : isCurrent && index === 1 ? <button type="button" className="teacher-onboarding__go" onClick={() => setCreateLessonOpen(true)}>Go</button> : isCurrent && index === 2 ? <button type="button" className="teacher-onboarding__go" onClick={() => setTwoFactorOpen(true)}>Go</button> : isCurrent && (index === 3 || index === 4) ? <span className="teacher-onboarding__optional-actions"><button type="button" className="teacher-onboarding__skip" onClick={() => skipOptional(index === 3 ? 'tutors' : 'social')}>Skip</button><button type="button" className="teacher-onboarding__go" onClick={() => setOptionalSetup(index === 3 ? 'tutors' : 'social')}>Go</button></span> : <ChevronRight className="teacher-onboarding__next" size={22} aria-hidden="true" />}
						</div>
					})}
				</section>
			</div>
			</section>
			{walletModalOpen && <TeacherWalletActivationModal onClose={() => setWalletModalOpen(false)} onSaved={completeWallet} />}
			{createLessonOpen && <TeacherCreateLessonModal onClose={() => setCreateLessonOpen(false)} onSubmitted={() => setLessonComplete(true)} />}
			{twoFactorOpen && <TeacherTwoFactorModal onClose={() => setTwoFactorOpen(false)} onSaved={() => setTwoFactorComplete(true)} />}
			{optionalSetup && <TeacherOptionalSetupModal kind={optionalSetup} onClose={() => setOptionalSetup(null)} onSaved={() => completeOptional(optionalSetup)} onSkipped={() => skipOptional(optionalSetup)} />}
		</TeacherDashboardLayout>
	)
}
