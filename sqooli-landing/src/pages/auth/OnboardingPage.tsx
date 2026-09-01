import { ArrowLeft, ArrowRight, Check, GraduationCap, School, UsersRound } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import logo from '../../assets/images/student-flow/sqooli-logo-v2.svg'
import '../../styles/pages/auth.css'
import { useAppSelector } from '../../store'

type Profile = 'school' | 'teacher' | 'student' | 'parent'

const profiles: Array<{ id: Profile; label: string; tone: string }> = [
	{ id: 'school', label: 'School', tone: 'yellow' },
	{ id: 'teacher', label: 'Teacher', tone: 'green' },
	{ id: 'student', label: 'Student', tone: 'mint' },
	{ id: 'parent', label: 'Parent', tone: 'yellow' },
]

function ProfileIcon({ profile, selected }: { profile: Profile; selected: boolean }) {
	if (selected) return <Check aria-hidden="true" strokeWidth={2.5} />
	if (profile === 'school' || profile === 'parent') return <School aria-hidden="true" strokeWidth={1.7} />
	if (profile === 'teacher') return <GraduationCap aria-hidden="true" strokeWidth={1.7} />
	return <UsersRound aria-hidden="true" strokeWidth={1.7} />
}

export default function OnboardingPage() {
	const [searchParams] = useSearchParams()
	const authenticatedUser = useAppSelector((state) => state.auth.user)
	const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
	const [continued, setContinued] = useState(false)

	const selectProfile = (profile: Profile) => {
		setSelectedProfile(profile)
		setContinued(false)
	}

	const continueFlow = () => {
		if (!selectedProfile) return
		window.sessionStorage.setItem('sqooli-onboarding-profile', selectedProfile)
		if (searchParams.get('source') === 'google-login' && authenticatedUser) {
			const params = new URLSearchParams({ email: authenticatedUser.email ?? '', role: selectedProfile, source: 'google-login' })
			if (authenticatedUser.userId) params.set('userId', authenticatedUser.userId)
			window.location.href = `/onboarding/complete?${params.toString()}`
			return
		}
		window.location.href = `/onboarding/account?role=${selectedProfile}`
	}

	return (
		<main className="student-onboarding" aria-labelledby="onboarding-title">
			<div className="student-onboarding__content">
				<a className="student-onboarding__logo-link" href="/" aria-label="Return to Sqooli home">
					<img className="student-onboarding__logo" src={logo} alt="Sqooli" />
				</a>

				<header className="student-onboarding__intro">
					<h1 id="onboarding-title">Welcome to Sqooli</h1>
					<p>Select which profile best suits you</p>
				</header>

				<div className="student-onboarding__choices" role="group" aria-label="Choose your Sqooli profile">
					{profiles.map((profile) => {
						const isSelected = selectedProfile === profile.id
						return (
							<button
								key={profile.id}
								type="button"
								className={`student-onboarding__choice${isSelected ? ' is-selected' : ''}`}
								aria-pressed={isSelected}
								onClick={() => selectProfile(profile.id)}
							>
								<span className={`student-onboarding__icon student-onboarding__icon--${profile.tone}${isSelected ? ' is-selected' : ''}`}>
									<ProfileIcon profile={profile.id} selected={isSelected} />
								</span>
								<span>{profile.label}</span>
							</button>
						)
					})}
				</div>

				<div className="student-onboarding__actions">
					<button type="button" className="student-onboarding__back" onClick={() => {
						if (window.history.length > 1) window.history.back()
						else window.location.href = '/'
					}}>
						<ArrowLeft aria-hidden="true" size={18} />
						<span>Back</span>
					</button>
					<button type="button" className="student-onboarding__continue" onClick={continueFlow} disabled={!selectedProfile}>
						<span>Save &amp; Continue</span>
						<ArrowRight aria-hidden="true" size={18} />
					</button>
				</div>

				<p className={`student-onboarding__status${continued ? ' is-visible' : ''}`} role="status" aria-live="polite">
					{continued && selectedProfile ? `${profiles.find((profile) => profile.id === selectedProfile)?.label} profile selected. Next step saved.` : ''}
				</p>
			</div>
		</main>
	)
}
