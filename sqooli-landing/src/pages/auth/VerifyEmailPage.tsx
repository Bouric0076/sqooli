import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Mail, RefreshCw } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import logo from '../../assets/images/student-flow/sqooli-logo-v2.svg'
import { resendVerificationEmail, verifyEmail } from '../../api/account'
import '../../styles/pages/auth.css'
import { showError } from '../../lib/notifications'
import { toast } from 'sonner'

function getLinkValue(searchParams: URLSearchParams, names: string[]) {
	for (const name of names) {
		const value = searchParams.get(name)
		if (value) return value
	}
	return ''
}

export default function VerifyEmailPage() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const email = searchParams.get('email') ?? ''
	const userId = getLinkValue(searchParams, ['userId', 'userID', 'id'])
	const token = getLinkValue(searchParams, ['token', 'verificationToken', 'verification_token', 'code'])
	const requestKey = `${userId}:${token}`
	const attemptedRequest = useRef('')
	const [status, setStatus] = useState<'waiting' | 'verifying' | 'failed'>('waiting')
	const [isResending, setIsResending] = useState(false)

	useEffect(() => {
		if (!userId || !token || attemptedRequest.current === requestKey) return
		attemptedRequest.current = requestKey
		setStatus('verifying')
		verifyEmail({ userId, token }).then(async () => {
			const completionParams = new URLSearchParams()
			if (email) completionParams.set('email', email)
			if (userId) completionParams.set('userId', userId)
			const pending = readPendingRegistration()
			if (pending) {
				completionParams.set('firstName', pending.firstName)
				completionParams.set('lastName', pending.lastName)
				if (pending.role) completionParams.set('role', pending.role.toLowerCase())
			}
			navigate(`/login?verified=1&${completionParams.toString()}`, { replace: true })
		}).catch((error: unknown) => {
			setStatus('failed')
			showError(error, 'This verification link could not be completed. Request a new link and try again.')
		})
	}, [email, navigate, requestKey, token, userId])

	const resend = async () => {
		if (!email) {
			toast.info('Open this page from your registration email so we can identify your account.')
			return
		}
		setIsResending(true)
		try {
			await resendVerificationEmail(email)
			toast.success('New verification link sent', { description: 'Check your inbox and spam folder.' })
		} catch (error) {
			showError(error, 'We could not send a new verification link. Please try again shortly.')
		} finally {
			setIsResending(false)
		}
	}

	return <main className="student-account student-account--verification" aria-labelledby="verify-email-title"><section className="student-account__verification-card"><a className="student-onboarding__logo-link" href="/" aria-label="Return to Sqooli home"><img className="student-onboarding__logo" src={logo} alt="Sqooli" /></a><div className={`student-account__verification-icon ${status === 'failed' ? 'is-failed' : ''}`} aria-hidden="true">{status === 'verifying' ? <RefreshCw className="is-spinning" size={28} /> : status === 'failed' ? <Mail size={28} /> : <CheckCircle2 size={28} />}</div><header className="student-account__intro"><h1 id="verify-email-title">{status === 'verifying' ? 'Verifying your email…' : status === 'failed' ? 'Verification link expired?' : 'Check your inbox'}</h1><p>{status === 'verifying' ? 'We are confirming your email securely.' : status === 'failed' ? 'This link may have expired or already been used. Request a fresh link below.' : <>We sent a verification link to <strong>{email || 'your email address'}</strong>.</>}</p></header>{status !== 'verifying' && <><div className="student-account__verification-help"><strong>Almost there</strong><span>Open the email and tap <b>Verify Email</b>. If you do not see it, check your spam or promotions folder.</span></div><button type="button" className="student-account__submit" onClick={resend} disabled={isResending}>{isResending ? 'Sending…' : 'Resend verification email'}</button><a className="student-account__verification-back" href="/login">Already verified? Sign in</a></>}</section></main>
}

function readPendingRegistration() {
	try {
		const raw = window.localStorage.getItem('sqooli-pending-registration')
		if (!raw) return null
		const value = JSON.parse(raw) as { firstName?: string; lastName?: string; phone?: string; role?: string }
		if (!value.firstName || !value.lastName) return null
		return { firstName: value.firstName, lastName: value.lastName, phone: value.phone ?? '', role: value.role }
	} catch {
		return null
	}
}
