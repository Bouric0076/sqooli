import { useState } from 'react'
import { Mail, RefreshCw } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import logo from '../../assets/images/student-flow/sqooli-logo-v2.svg'
import { resendVerificationEmail } from '../../api/account'
import { showError } from '../../lib/notifications'
import { toast } from 'sonner'
import '../../styles/pages/auth.css'

export default function VerificationSentPage() {
	const [searchParams] = useSearchParams()
	const email = searchParams.get('email') ?? ''
	const [isResending, setIsResending] = useState(false)

	const resend = async () => {
		if (!email) {
			toast.info('Enter your email address from the sign-in page to request a new link.')
			return
		}
		setIsResending(true)
		try {
			await resendVerificationEmail(email)
			toast.success('Verification email sent', { description: 'Check your inbox and spam folder.' })
		} catch (error) {
			showError(error, 'We could not send a new verification email. Please try again shortly.')
		} finally {
			setIsResending(false)
		}
	}

	return <main className="student-account student-account--verification" aria-labelledby="verification-sent-title"><section className="student-account__verification-card"><a className="student-onboarding__logo-link" href="/" aria-label="Return to Sqooli home"><img className="student-onboarding__logo" src={logo} alt="Sqooli" /></a><div className="student-account__verification-icon" aria-hidden="true"><Mail size={28} /></div><header className="student-account__intro"><h1 id="verification-sent-title">Check your inbox</h1><p>We sent a verification link to <strong>{email || 'your email address'}</strong>.</p></header><div className="student-account__verification-help"><strong>Almost there</strong><span>Open the email and tap <b>Verify Email</b>. If you do not see it, check your spam or promotions folder.</span></div><button type="button" className="student-account__submit" onClick={resend} disabled={isResending}>{isResending ? <><RefreshCw className="is-spinning" size={16} /> Sending…</> : 'Resend verification email'}</button><a className="student-account__verification-back" href="/login">Already verified? Sign in</a></section></main>
}
