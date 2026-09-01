import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import logo from '../../assets/images/student-flow/sqooli-logo-v2.svg'
import { completeRegistration, type RegistrationRole } from '../../api/account'
import { getCurrentUser } from '../../auth/auth.service'
import { getDashboardPath, hasAssignedDashboard } from '../../auth/dashboard-routing'
import { updateUser } from '../../auth/auth.slice'
import { showError } from '../../lib/notifications'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from '../../store'
import '../../styles/pages/auth.css'

type PendingRegistration = {
	firstName: string
	lastName: string
	email: string
	phone?: string
	role?: RegistrationRole
}

export default function RegistrationCompletionPage() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const currentUser = useAppSelector((state) => state.auth.user)
	const dispatch = useAppDispatch()
	const pending = readPendingRegistration()
	const [firstName] = useState(searchParams.get('firstName') ?? pending?.firstName ?? currentUser?.firstName ?? '')
	const [lastName] = useState(searchParams.get('lastName') ?? pending?.lastName ?? currentUser?.lastName ?? '')
	const [email] = useState(searchParams.get('email') ?? pending?.email ?? currentUser?.email ?? '')
	const [phone, setPhone] = useState(pending?.phone ?? currentUser?.phone ?? '')
	const [gender, setGender] = useState(normalizeGender(currentUser?.gender))
	const [dob, setDob] = useState(currentUser?.dob ?? '')
	const [address, setAddress] = useState(currentUser?.address ?? '')
	const [role, setRole] = useState<RegistrationRole | ''>(normalizeRole(searchParams.get('role')) ?? pending?.role ?? roleFromUser(currentUser) ?? '')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!email.trim() || !role || !gender || !dob || !address.trim()) {
			toast.error(!role ? 'Choose your Sqooli profile before continuing.' : !gender ? 'Select your gender before continuing.' : 'Complete your date of birth and address before continuing.')
			return
		}
		setIsSubmitting(true)
		try {
			await completeRegistration({ email, role: role as RegistrationRole, firstName: firstName || undefined, lastName: lastName || undefined, phone: phone.trim(), gender, dob, address: address.trim() })
			const refreshedUser = await getCurrentUser(currentUser ?? undefined)
			dispatch(updateUser(refreshedUser))
			window.localStorage.removeItem('sqooli-pending-registration')
			if (!hasAssignedDashboard(refreshedUser)) {
				toast.error('Your profile was saved, but Sqooli has not assigned a dashboard yet.')
				return
			}
			toast.success(refreshedUser.isProfileComplete === true ? 'Your Sqooli profile is ready.' : 'Your profile is saved. You can finish setup from your dashboard.')
			navigate(getDashboardPath(refreshedUser), { replace: true })
		} catch (error) {
			showError(error, 'We could not complete your registration. Please review your details and try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return <main className="student-account student-account--completion" aria-labelledby="completion-title"><section className="student-account__form-panel"><a className="student-onboarding__logo-link" href="/" aria-label="Return to Sqooli home"><img className="student-onboarding__logo" src={logo} alt="Sqooli" /></a><header className="student-account__intro"><h1 id="completion-title">Complete your registration</h1><p>Your email is verified. Confirm your Sqooli profile and remaining details to continue.</p></header><div className="student-account__completion-summary"><strong>{firstName && lastName ? `${firstName} ${lastName}` : 'Your registration details'}</strong><span>{email || 'Email captured during registration'}</span></div><form className="student-account__form" onSubmit={submit} noValidate><label htmlFor="completion-role">Choose your Sqooli profile</label><select id="completion-role" value={role} onChange={(event) => setRole(event.target.value as RegistrationRole | '')} required><option value="">Select your profile</option><option value="Student">Student</option><option value="Teacher">Teacher</option><option value="Parent">Parent</option><option value="School">School</option></select><div className="student-account__completion-grid"><div><label htmlFor="completion-gender">Gender</label><select id="completion-gender" value={gender} onChange={(event) => setGender(event.target.value)} required><option value="">Select gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div><div><label htmlFor="completion-dob">Date of birth</label><input id="completion-dob" type="date" value={dob} onChange={(event) => setDob(event.target.value)} max={new Date().toISOString().slice(0, 10)} required /></div></div><label htmlFor="completion-address">Address</label><input id="completion-address" type="text" value={address} onChange={(event) => setAddress(event.target.value)} autoComplete="street-address" required /><label htmlFor="completion-phone">Phone Number <span>(optional)</span></label><input id="completion-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" /><button type="submit" className="student-account__submit" disabled={isSubmitting}>{isSubmitting ? 'Completing registration…' : 'Complete registration'}</button></form></section></main>
}

function normalizeRole(value: string | null): RegistrationRole | null {
	return ({ student: 'Student', teacher: 'Teacher', parent: 'Parent', school: 'School' } as const)[value?.toLowerCase() as 'student' | 'teacher' | 'parent' | 'school'] ?? null
}

function roleFromUser(user: { dashboard?: string; userRole?: string } | null): RegistrationRole | null {
	return normalizeRole(user?.userRole ?? user?.dashboard ?? null)
}

function normalizeGender(value: string | null | undefined) {
	return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : ''
}

function readPendingRegistration(): PendingRegistration | null {
	try {
		const raw = window.localStorage.getItem('sqooli-pending-registration')
		if (!raw) return null
		const value = JSON.parse(raw) as Partial<PendingRegistration>
		if (!value.firstName || !value.lastName || !value.email) return null
		const role = ({ student: 'Student', teacher: 'Teacher', parent: 'Parent', school: 'School' } as const)[value.role as string]
		return { firstName: value.firstName, lastName: value.lastName, email: value.email, phone: value.phone, role }
	} catch {
		return null
	}
}
