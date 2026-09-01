import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import logo from '../../assets/images/student-flow/sqooli-logo-v2.svg'
import { setPassword } from '../../api/account'
import { getCurrentUser } from '../../auth/auth.service'
import { updateUser } from '../../auth/auth.slice'
import { useAppDispatch, useAppSelector } from '../../store'
import { showError } from '../../lib/notifications'
import { toast } from 'sonner'
import '../../styles/pages/auth.css'

const passwordRules = [
	{ label: '8 or more characters', test: (value: string) => value.length >= 8 },
	{ label: 'one uppercase letter', test: (value: string) => /[A-Z]/.test(value) },
	{ label: 'one lowercase letter', test: (value: string) => /[a-z]/.test(value) },
	{ label: 'one number', test: (value: string) => /\d/.test(value) },
	{ label: 'one symbol', test: (value: string) => /[^A-Za-z0-9\s]/.test(value) },
]

export default function SetPasswordPage() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [searchParams] = useSearchParams()
	const user = useAppSelector((state) => state.auth.user)
	const redirectTo = useMemo(() => safeRedirect(searchParams.get('redirect')), [searchParams])
	const email = searchParams.get('email') ?? user?.email ?? ''
	const [password, setPasswordValue] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isComplete, setIsComplete] = useState(false)

	const allRulesPass = passwordRules.every((rule) => rule.test(password))
	const passwordsMatch = password.length > 0 && password === confirmPassword

	useEffect(() => {
		if (!isComplete) return
		const destination = user ? redirectTo : `/login?passwordSet=1&returnTo=${encodeURIComponent(redirectTo)}`
		const timer = window.setTimeout(() => navigate(destination, { replace: true }), 1100)
		return () => window.clearTimeout(timer)
	}, [isComplete, navigate, redirectTo, user])

	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!allRulesPass || !passwordsMatch) return
		setIsSubmitting(true)
		try {
			await setPassword({ password, confirmPassword, currentPassword: null })
			if (user) {
				try { dispatch(updateUser(await getCurrentUser(user))) } catch { /* session refresh is best effort */ }
			}
			setIsComplete(true)
			toast.success('Password set successfully')
		} catch (error) {
			showError(error, 'We could not set your password. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	if (isComplete) return <main className="student-password-page" aria-live="polite"><section className="student-password-card is-success"><div className="student-password-card__success-icon"><CheckCircle2 size={34} /></div><h1>Password set</h1><p>Your account is secure. Redirecting you to Sqooli…</p></section></main>

	return <main className="student-password-page" aria-labelledby="set-password-title"><section className="student-password-card"><a className="student-onboarding__logo-link" href="/" aria-label="Return to Sqooli home"><img className="student-onboarding__logo" src={logo} alt="Sqooli" /></a><div className="student-password-card__icon" aria-hidden="true"><LockKeyhole size={28} /></div><header className="student-password-card__intro"><span className="student-password-card__eyebrow"><ShieldCheck size={15} /> Email verified</span><h1 id="set-password-title">Set your password</h1><p>{email ? <>Create a password for <strong>{email}</strong> to finish setting up your Sqooli account.</> : 'Create a password to finish setting up your Sqooli account.'}</p></header><form className="student-password-card__form" onSubmit={submit} noValidate><label htmlFor="set-password">New password</label><div className="student-password-card__input"><LockKeyhole size={17} aria-hidden="true" /><input id="set-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPasswordValue(event.target.value)} autoComplete="new-password" placeholder="Enter new password" aria-describedby="set-password-rules" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div><ul id="set-password-rules" className="student-password-card__rules">{passwordRules.map((rule) => <li key={rule.label} className={rule.test(password) ? 'is-valid' : ''}>{rule.label}</li>)}</ul><label htmlFor="confirm-set-password">Confirm password</label><div className="student-password-card__input"><LockKeyhole size={17} aria-hidden="true" /><input id="confirm-set-password" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" placeholder="Re-enter your password" aria-invalid={confirmPassword.length > 0 && !passwordsMatch} /><button type="button" aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'} onClick={() => setShowConfirmPassword((value) => !value)}>{showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>{confirmPassword.length > 0 && <p className={`student-password-card__match ${passwordsMatch ? 'is-valid' : ''}`}>{passwordsMatch ? 'Passwords match.' : 'Passwords do not match yet.'}</p>}<button type="submit" className="student-password-card__submit" disabled={isSubmitting || !allRulesPass || !passwordsMatch}>{isSubmitting ? 'Saving password…' : 'Set password'}</button></form>{!user && <p className="student-password-card__note">After saving, you may be asked to sign in once so we can open your student dashboard securely.</p>}</section></main>
}

function safeRedirect(value: string | null) {
	return value?.startsWith('/') && !value.startsWith('//') ? value : '/student'
}
