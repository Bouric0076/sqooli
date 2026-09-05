import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import logo from '../../assets/images/student-flow/sqooli-logo-v2.svg'
import studentsImage from '../../assets/images/student-flow/students.webp'
import { initiateRegistration } from '../../api/account'
import { showError } from '../../lib/notifications'
import { toast } from 'sonner'
import GoogleSignInButton from './GoogleSignInButton'
import { loginWithGoogle } from '../../auth/auth.service'
import { setSession } from '../../auth/auth.slice'
import { getPostAuthPath, hasAssignedDashboard } from '../../auth/dashboard-routing'
import { useAppDispatch } from '../../store'
import '../../styles/pages/auth.css'

const registerSchema = z.object({
	firstName: z.string().trim().min(1, 'Enter your first name.'),
	lastName: z.string().trim().min(1, 'Enter your last name.'),
	email: z.string().email('Enter a valid email address.'),
	phone: z.string().trim().refine((value) => value === '' || /^[+]?[0-9 ()-]{7,20}$/.test(value), 'Enter a valid phone number.'),
	password: z.string()
		.min(8, 'Use at least 8 characters.')
		.refine((value) => /[A-Z]/.test(value), 'Include at least one uppercase letter.')
		.refine((value) => /[a-z]/.test(value), 'Include at least one lowercase letter.')
		.refine((value) => /\d/.test(value), 'Include at least one number.')
		.refine((value) => /[^A-Za-z0-9\s]/.test(value), 'Include at least one symbol, such as ! or @.'),
	confirmPassword: z.string().min(1, 'Confirm your password.'),
}).refine((values) => values.password === values.confirmPassword, {
	path: ['confirmPassword'],
	message: 'Passwords do not match.',
})

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [searchParams] = useSearchParams()
	const selectedRole = normalizeRole(searchParams.get('role'))
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) })

	const submit = async ({ firstName, lastName, email, phone, password }: RegisterForm) => {
		try {
			await initiateRegistration({ firstName, lastName, email, phone: phone || undefined, password })
			toast.success('Registration started', { description: 'Check your email for the verification link.' })
			window.localStorage.setItem('sqooli-pending-registration', JSON.stringify({ firstName, lastName, email, phone, role: selectedRole }))
			navigate(`/onboarding/verification-sent?email=${encodeURIComponent(email)}&role=${selectedRole}`)
		} catch (error) {
			showError(error, 'We could not start your registration. Please try again.')
		}
	}

	const submitGoogleRegistration = async (idToken: string) => {
		try {
			const session = await loginWithGoogle(idToken)
			dispatch(setSession(session))
			if (hasAssignedDashboard(session.user)) {
				navigate(getPostAuthPath(session.user), { replace: true })
				return
			}
			navigate(`/onboarding/complete?email=${encodeURIComponent(session.user.email ?? '')}&role=${selectedRole}&source=google-login`, { replace: true })
		} catch (error) {
			showError(error, 'We could not continue with Google. Please try again.')
		}
	}

	return (
		<main className="student-account" aria-labelledby="create-account-title">
			<section className="student-account__visual" aria-label="Learning with Sqooli"><div className="student-account__visual-copy"><h1>Welcome to Sqooli</h1><p>The ultimate school management tool<br />designed for everyone</p></div><img src={studentsImage} alt="Two children holding books" fetchPriority="high" decoding="async" /></section>
			<section className="student-account__form-panel">
				<a className="student-onboarding__logo-link" href="/" aria-label="Return to Sqooli home"><img className="student-onboarding__logo" src={logo} alt="Sqooli" /></a>
				<header className="student-account__intro"><h2 id="create-account-title">Create your Sqooli account</h2><p>We’ll send a verification link to your email. Your profile type is confirmed after verification.</p></header>
				<GoogleSignInButton onCredential={submitGoogleRegistration} onError={(message) => toast.error(message)} />
				<div className="student-account__divider"><span /> <b>or</b> <span /></div>
				<form className="student-account__form" onSubmit={handleSubmit(submit)} noValidate>
					<div className="student-account__name-grid"><div><label htmlFor="account-first-name">First Name</label><input id="account-first-name" autoComplete="given-name" aria-invalid={Boolean(errors.firstName)} {...register('firstName')} />{errors.firstName && <p className="student-account__field-error" role="alert">{errors.firstName.message}</p>}</div><div><label htmlFor="account-last-name">Last Name</label><input id="account-last-name" autoComplete="family-name" aria-invalid={Boolean(errors.lastName)} {...register('lastName')} />{errors.lastName && <p className="student-account__field-error" role="alert">{errors.lastName.message}</p>}</div></div>
					<label htmlFor="account-email">Email Address</label><input id="account-email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register('email')} />{errors.email && <p className="student-account__field-error" role="alert">{errors.email.message}</p>}
					<label htmlFor="account-phone">Phone Number <span>(optional)</span></label><div className="student-account__phone-field"><span aria-hidden="true">🇰🇪</span><span className="student-account__country-code">+254</span><input id="account-phone" type="tel" inputMode="tel" placeholder="7XX XXX XXX" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'account-phone-error' : undefined} {...register('phone')} /></div>{errors.phone && <p id="account-phone-error" className="student-account__field-error" role="alert">{errors.phone.message}</p>}
					<label htmlFor="account-password">Password</label><div className="student-account__password-field"><input id="account-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" aria-invalid={Boolean(errors.password)} aria-describedby="account-password-hint" {...register('password')} /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((current) => !current)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div><p id="account-password-hint" className="student-account__field-hint">Use 8+ characters with an uppercase letter, lowercase letter, number, and symbol.</p>{errors.password && <p className="student-account__field-error" role="alert">{errors.password.message}</p>}
					<label htmlFor="account-confirm-password">Confirm Password</label><div className="student-account__password-field"><input id="account-confirm-password" type={showConfirmPassword ? 'text' : 'password'} autoComplete="new-password" aria-invalid={Boolean(errors.confirmPassword)} {...register('confirmPassword')} /><button type="button" aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'} onClick={() => setShowConfirmPassword((current) => !current)}>{showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>{errors.confirmPassword && <p className="student-account__field-error" role="alert">{errors.confirmPassword.message}</p>}
					<button type="submit" className="student-account__submit" disabled={isSubmitting}>{isSubmitting ? 'Creating Account…' : 'Create Account'}</button>
				</form>
				<p className="student-account__login">Already have an account? <a href="/login">Login</a></p>
			</section>
		</main>
	)
}

function normalizeRole(value: string | null) {
	return value === 'teacher' || value === 'parent' || value === 'school' ? value : 'student'
}
