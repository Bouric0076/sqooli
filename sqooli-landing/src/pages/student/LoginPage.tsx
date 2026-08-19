import { useState, type FormEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import logo from '../../assets/images/student-flow/sqooli-logo-v2.svg'
import studentsImage from '../../assets/images/student-flow/students.webp'
import GoogleMark from './GoogleMark'
import '../../styles/pages/student-flow.css'

type LoginMethod = 'email' | 'phone'

export default function LoginPage() {
	const role = new URLSearchParams(window.location.search).get('role') || window.sessionStorage.getItem('sqooli-onboarding-profile') || 'student'
	const [method, setMethod] = useState<LoginMethod>('email')
	const [identifier, setIdentifier] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [notice, setNotice] = useState('')

	const openDashboard = () => {
		window.sessionStorage.setItem('sqooli-demo-authenticated', 'true')
		window.location.href = role === 'teacher' ? '/teacher/onboarding' : '/student'
	}

	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		openDashboard()
	}

	return (
		<main className="student-account student-login" aria-labelledby="sign-in-title">
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
				<header className="student-account__intro student-login__intro">
					<h1 id="sign-in-title">Sign In</h1>
					<p>Please provide your credentials to proceed</p>
				</header>

				<button type="button" className="student-account__google" onClick={openDashboard}>
					<GoogleMark />
					<span>Sign in with Google</span>
				</button>
				<div className="student-account__divider"><span /> <b>or</b> <span /></div>

				<form className="student-account__form student-login__form" onSubmit={submit} noValidate>
					<fieldset className="student-login__methods">
						<legend>Login with</legend>
						<label>
							<input type="radio" name="login-method" checked={method === 'email'} onChange={() => { setMethod('email'); setIdentifier(''); setNotice('') }} />
							<span>Email Address</span>
						</label>
						<label>
							<input type="radio" name="login-method" checked={method === 'phone'} onChange={() => { setMethod('phone'); setIdentifier(''); setNotice('') }} />
							<span>Phone Number</span>
						</label>
					</fieldset>

					<label htmlFor="login-identifier">{method === 'email' ? 'Email Address' : 'Phone Number'}</label>
					{method === 'phone' ? (
						<div className="student-account__phone-field">
							<span aria-hidden="true">🇰🇪</span><span className="student-account__country-code">+254</span>
							<input id="login-identifier" type="tel" autoComplete="tel" value={identifier} onChange={(event) => { setIdentifier(event.target.value); setNotice('') }} />
						</div>
					) : (
						<input id="login-identifier" type="email" autoComplete="email" value={identifier} onChange={(event) => { setIdentifier(event.target.value); setNotice('') }} />
					)}

					<label htmlFor="login-password">Password</label>
					<div className="student-account__password-field">
						<input id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setNotice('') }} />
						<button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((current) => !current)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
					</div>

					<button type="submit" className="student-account__submit">Sign In</button>
				</form>

				<p className={`student-account__notice${notice ? ' is-visible' : ''}`} role="status" aria-live="polite">{notice}</p>
				<p className="student-account__login">Don’t have an account? <a href="/onboarding">Learn how to Get Started</a></p>
			</section>
		</main>
	)
}
