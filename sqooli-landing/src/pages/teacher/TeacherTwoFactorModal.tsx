import { Check, X } from 'lucide-react'
import { useState } from 'react'
import '../../styles/pages/teacher-two-factor.css'

type Props = { onClose: () => void; onSaved?: () => void }

export default function TeacherTwoFactorModal({ onClose, onSaved }: Props) {
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [phoneSent, setPhoneSent] = useState(false)
	const [emailSent, setEmailSent] = useState(false)
	const [phoneCode, setPhoneCode] = useState('')
	const [emailCode, setEmailCode] = useState('')
	const [phoneVerified, setPhoneVerified] = useState(false)
	const [emailVerified, setEmailVerified] = useState(false)
	const [success, setSuccess] = useState(false)

	const verifyPhone = () => { if (phoneCode.trim().length >= 4) setPhoneVerified(true) }
	const verifyEmail = () => { if (emailCode.trim().length >= 4) setEmailVerified(true) }
	const complete = () => { window.sessionStorage.setItem('sqooli-teacher-2fa', 'true'); onSaved?.(); onClose() }

	return <div className="teacher-two-factor-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
		<section className={`teacher-two-factor-modal${success ? ' is-success' : ''}`} role={success ? 'alertdialog' : 'dialog'} aria-modal="true" aria-labelledby="teacher-two-factor-title">
			{success ? <><button type="button" className="teacher-two-factor__close" aria-label="Close confirmation" onClick={complete}><X size={21} /></button><div className="teacher-two-factor__success-icon"><Check size={42} strokeWidth={1.5} /></div><h1 id="teacher-two-factor-title">2FA Completed Successfully</h1><p>You have successfully setup your 2FA contact details</p><button type="button" className="teacher-two-factor__okay" onClick={complete}>Okay</button></> : <>
				<header className="teacher-two-factor__header"><div><h1 id="teacher-two-factor-title">Two Factor Authentication Setup</h1><p>Setup your contact details for 2FA</p></div><button type="button" className="teacher-two-factor__close" aria-label="Close two factor setup" onClick={onClose}><X size={21} /></button></header>
				<div className="teacher-two-factor__body">
					<VerificationChannel title="Phone" description="We will send an OTP code to phone number for verification" label="Phone Number" value={phone} onChange={setPhone} sent={phoneSent} code={phoneCode} onCodeChange={setPhoneCode} verified={phoneVerified} onSend={() => setPhoneSent(true)} onVerify={verifyPhone} phone />
					<VerificationChannel title="Email Address" description="We will send an OTP code to email address for verification" label="Email Address" value={email} onChange={setEmail} sent={emailSent} code={emailCode} onCodeChange={setEmailCode} verified={emailVerified} onSend={() => setEmailSent(true)} onVerify={verifyEmail} />
				</div>
				{phoneVerified && emailVerified && <button type="button" className="teacher-two-factor__complete" onClick={() => setSuccess(true)}>Complete Setup</button>}
			</>}
		</section>
	</div>
}

function VerificationChannel({ title, description, label, value, onChange, sent, code, onCodeChange, verified, onSend, onVerify, phone = false }: { title: string; description: string; label: string; value: string; onChange: (value: string) => void; sent: boolean; code: string; onCodeChange: (value: string) => void; verified: boolean; onSend: () => void; onVerify: () => void; phone?: boolean }) {
	return <section className="teacher-two-factor__channel"><h2>{title}</h2><p>{description}</p><label>{label}<span className="teacher-two-factor__input"><>{phone && <><b>🇰🇪</b><i>⌄</i><em>+254</em></>}<input type={phone ? 'tel' : 'email'} value={value} onChange={(event) => onChange(phone ? event.target.value.replace(/\D/g, '').slice(0, 9) : event.target.value)} /></><button type="button" disabled={!value || verified} onClick={onSend}>{sent ? 'Resend Code' : 'Send Code'}</button></span></label>{sent && !verified && <div className="teacher-two-factor__verification"><label>Enter Code<input value={code} onChange={(event) => onCodeChange(event.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" placeholder="*****" /></label><button type="button" className="teacher-two-factor__verify" disabled={code.length < 4} onClick={onVerify}>Verify</button></div>}{verified && <p className="teacher-two-factor__verified"><Check size={14} /> Verified</p>}</section>
}
