import { useState, type FormEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import logo from '../../assets/images/student-flow/sqooli-logo-v2.svg'
import studentsImage from '../../assets/images/student-flow/students.webp'
import GoogleMark from './GoogleMark'
import '../../styles/pages/student-flow.css'

type FormValues = { email: string; phone: string; password: string; confirmPassword: string }

export default function CreateAccountPage() {
	const role = new URLSearchParams(window.location.search).get('role') || window.sessionStorage.getItem('sqooli-onboarding-profile') || 'student'
	const [values, setValues] = useState<FormValues>({ email: '', phone: '', password: '', confirmPassword: '' })
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [notice, setNotice] = useState('')

	const updateField = (field: keyof FormValues, value: string) => {
		setValues((current) => ({ ...current, [field]: value }))
		setNotice('')
	}

	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!values.email || !values.phone || !values.password || !values.confirmPassword) {
			setNotice('Please complete all fields to continue.')
			return
		}
		if (values.password.length < 8) {
			setNotice('Your password must contain at least 8 characters.')
			return
		}
		if (values.password !== values.confirmPassword) {
			setNotice('Passwords do not match.')
			return
		}
		window.sessionStorage.setItem('sqooli-onboarding-account', JSON.stringify({ email: values.email, phone: values.phone }))
		if (role === 'teacher') {
			window.sessionStorage.setItem('sqooli-teacher-account', JSON.stringify({ email: values.email, phone: values.phone }))
			window.location.href = '/teacher/application/role'
			return
		}
		setNotice('Account details saved. The next onboarding step will be connected next.')
	}

	return (
		<main className="student-account" aria-labelledby="create-account-title">
			<section className="student-account__visual" aria-label="Learning with Sqooli">
				<div className="student-account__visual-copy">
					<h1>Welcome to Sqooli</h1>
					<p>The ultimate school management tool<br />designed for everyone</p>
				</div>
				<img src={studentsImage} alt="Two children holding books" fetchPriority="high" decoding="async" />
			</section>

			<section className="student-account__form-panel">
				<a className="student-onboarding__logo-link" href="/" aria-label="Return to Sqooli home">
					<img className="student-onboarding__logo" src={logo} alt="Sqooli" />
				</a>
				<header className="student-account__intro">
					<h2 id="create-account-title">Create Account</h2>
					<p>Please provide your details to proceed</p>
				</header>

				<button type="button" className="student-account__google" onClick={() => setNotice('Google sign-in will be connected with the authentication service.') }>
					<GoogleMark />
					<span>Sign in with Google</span>
				</button>
				<div className="student-account__divider"><span /> <b>or</b> <span /></div>

				<form className="student-account__form" onSubmit={submit} noValidate>
					<label htmlFor="account-email">Email Address</label>
					<input id="account-email" type="email" autoComplete="email" value={values.email} onChange={(event) => updateField('email', event.target.value)} />

					<label htmlFor="account-phone">Phone Number</label>
					<div className="student-account__phone-field">
						<span aria-hidden="true">🇰🇪</span><span className="student-account__country-code">+254</span>
						<input id="account-phone" type="tel" autoComplete="tel" value={values.phone} onChange={(event) => updateField('phone', event.target.value)} />
					</div>

					<label htmlFor="account-password">Password</label>
					<div className="student-account__password-field">
						<input id="account-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={values.password} onChange={(event) => updateField('password', event.target.value)} />
						<button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((current) => !current)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
					</div>

					<label htmlFor="account-confirm-password">Confirm Password</label>
					<div className="student-account__password-field">
						<input id="account-confirm-password" type={showConfirmPassword ? 'text' : 'password'} autoComplete="new-password" value={values.confirmPassword} onChange={(event) => updateField('confirmPassword', event.target.value)} />
						<button type="button" aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'} onClick={() => setShowConfirmPassword((current) => !current)}>{showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
					</div>

					<button type="submit" className="student-account__submit">Create Account</button>
				</form>

				<p className={`student-account__notice${notice ? ' is-visible' : ''}`} role="status" aria-live="polite">{notice}</p>
				<p className="student-account__login">Already have an account? <a href="/login">Login</a></p>
			</section>
		</main>
	)
}
