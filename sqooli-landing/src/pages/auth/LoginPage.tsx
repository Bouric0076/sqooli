import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import logo from '../../assets/images/student-flow/sqooli-logo-v2.svg'
import studentsImage from '../../assets/images/student-flow/students.webp'
import { EmailVerificationRequiredError, login, loginWithGoogle } from '../../auth/auth.service'
import { setSession } from '../../auth/auth.slice'
import { getDashboardPath, getSafeReturnTo, hasAssignedDashboard } from '../../auth/dashboard-routing'
import { useAppDispatch } from '../../store'
import '../../styles/pages/auth.css'
import { isApiError, showError } from '../../lib/notifications'
import { toast } from 'sonner'
import GoogleSignInButton from './GoogleSignInButton'

const loginSchema = z.object({
	email: z.string().email('Enter a valid email address.'),
	password: z.string().min(1, 'Enter your password.'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const dispatch = useAppDispatch()
	const [showPassword, setShowPassword] = useState(false)
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })
	useEffect(() => {
		if (searchParams.get('verified') === '1') toast.success('Email verified', { description: 'Sign in to finish setting up your profile.' })
		if (searchParams.get('expired') === '1') toast.info('Please sign in again', { description: 'Your previous session is no longer active.' })
		if (searchParams.get('completed') === '1') toast.success('Profile details saved', { description: 'Sign in to continue to your Sqooli dashboard.' })
	}, [searchParams])

	const submit = async (values: LoginForm) => {
		try {
			const session = await login(values)
			dispatch(setSession(session))
			if (!hasAssignedDashboard(session.user)) {
				const params = new URLSearchParams({ email: session.user.email ?? values.email })
				if (session.user.userId) params.set('userId', session.user.userId)
				for (const key of ['firstName', 'lastName', 'role']) {
					const value = searchParams.get(key)
					if (value) params.set(key, value)
				}
				navigate(`/onboarding/complete?${params.toString()}&source=login`, { replace: true })
				return
			}
		navigate(getSafeReturnTo(searchParams.get('returnTo')) ?? getDashboardPath(session.user), { replace: true })
		} catch (error) {
			if (error instanceof EmailVerificationRequiredError) {
				navigate(`/onboarding/verification-sent?email=${encodeURIComponent(error.email)}&source=login`, { replace: true })
				return
			}
			if (isApiError(error) && error.status === 401) {
				showError(new Error('Invalid credentials'), 'Invalid email or password. Please check your details and try again.')
				return
			}
			showError(error, 'We could not sign you in. Check your details and try again.')
		}
	}

	const submitGoogleLogin = async (idToken: string) => {
		try {
			const session = await loginWithGoogle(idToken)
			dispatch(setSession(session))
			if (!hasAssignedDashboard(session.user)) {
				const params = new URLSearchParams({ email: session.user.email ?? '', source: 'google-login' })
				navigate(`/onboarding/complete?${params.toString()}`, { replace: true })
				return
			}
			navigate(getSafeReturnTo(searchParams.get('returnTo')) ?? getDashboardPath(session.user), { replace: true })
		} catch (error) {
			showError(error, 'We could not sign you in with Google. Please try again.')
		}
	}

	return (
		<main className="student-account student-login" aria-labelledby="sign-in-title">
			<section className="student-account__visual" aria-label="Learning with Sqooli">
				<div className="student-account__visual-copy"><h1>Welcome to Sqooli</h1><p>The ultimate school management tool<br />designed for everyone</p></div>
				<img src={studentsImage} alt="Two children holding books" fetchPriority="high" decoding="async" />
			</section>

			<section className="student-account__form-panel">
				<a className="student-onboarding__logo-link" href="/" aria-label="Return to Sqooli home"><img className="student-onboarding__logo" src={logo} alt="Sqooli" /></a>
				<header className="student-account__intro student-login__intro"><h1 id="sign-in-title">Sign In</h1><p>Please provide your credentials to proceed</p></header>

				<GoogleSignInButton onCredential={submitGoogleLogin} onError={(message) => toast.error(message)} />
				<div className="student-account__divider"><span /> <b>or</b> <span /></div>

				<form className="student-account__form student-login__form" onSubmit={handleSubmit(submit)} noValidate>
					<label htmlFor="login-email">Email Address</label>
					<input id="login-email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'login-email-error' : undefined} {...register('email')} />
					{errors.email && <p id="login-email-error" className="student-account__field-error" role="alert">{errors.email.message}</p>}

					<label htmlFor="login-password">Password</label>
					<div className="student-account__password-field">
						<input id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'login-password-error' : undefined} {...register('password')} />
						<button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((current) => !current)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
					</div>
					{errors.password && <p id="login-password-error" className="student-account__field-error" role="alert">{errors.password.message}</p>}

					<button type="submit" className="student-account__submit" disabled={isSubmitting}>{isSubmitting ? 'Signing In…' : 'Sign In'}</button>
				</form>

				<p className="student-account__login">Don’t have an account? <a href="/onboarding">Learn how to Get Started</a></p>
			</section>
		</main>
	)
}
