import { Check, X } from 'lucide-react'
import { useState } from 'react'
import doneArt from '../../../assets/images/student-flow/Done.svg'

type WalletActivationModalProps = { onClose: () => void; onSaved?: () => void }

export default function WalletActivationModal({ onClose, onSaved }: WalletActivationModalProps) {
	const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
	const [method, setMethod] = useState<'mpesa' | 'airtel'>('mpesa')
	const [phone, setPhone] = useState('')
	const [pin, setPin] = useState<string[]>(Array(6).fill(''))
	const [confirmation, setConfirmation] = useState<string[]>(Array(6).fill(''))
	const [otp, setOtp] = useState('')
	const [error, setError] = useState('')

	const saveTopUpMethod = (event: React.FormEvent) => {
		event.preventDefault()
		setStep(2)
	}

	const savePin = (event: React.FormEvent) => {
		event.preventDefault()
		const enteredPin = pin.join('')
		const confirmedPin = confirmation.join('')
		if (enteredPin.length !== 6 || confirmedPin.length !== 6 || enteredPin !== confirmedPin) {
			setError('Enter matching six-digit PINs to continue.')
			return
		}
		setError('')
		setStep(3)
	}

	const verifyOtp = (event: React.FormEvent) => {
		event.preventDefault()
		if (otp.replace(/\D/g, '').length < 6) {
			setError('Enter the six-digit verification code to continue.')
			return
		}
		window.sessionStorage.setItem('sqooli-student-wallet', JSON.stringify({ method, phone, pinSet: true, otpVerified: true }))
		setError('')
		setStep(4)
	}

	return (
		<div className="student-dashboard__modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
			<section className={`shared-wallet-modal${step >= 3 ? ' is-verification' : ''}`} role="dialog" aria-modal="true" aria-labelledby="wallet-modal-title">
				<header className="shared-wallet-modal__header">
					<div><h1 id="wallet-modal-title">Activate Wallet</h1><p>Setup top up &amp; PIN settings for your wallet</p></div>
					<button type="button" className="student-profile-modal__close" aria-label="Close wallet activation" onClick={onClose}><X size={22} /></button>
				</header>
				<div className="shared-wallet-modal__steps" aria-label="Wallet activation steps">
					<button type="button" className={step === 1 ? 'is-active' : 'is-complete'} onClick={() => setStep(1)}><span>Setup Top-up Method</span><small>Setup how you will top-up your wallet</small></button>
					<button type="button" className={step === 2 ? 'is-active' : ''} disabled={step === 1}><span>PIN Setup</span><small>Setup your wallet PIN</small></button>
				</div>
				{step === 1 ? <form className="shared-wallet-modal__body" onSubmit={saveTopUpMethod}>
					<fieldset><legend>Select payment method</legend><div className="shared-wallet-modal__methods">
						<button type="button" className={method === 'mpesa' ? 'is-selected' : ''} onClick={() => setMethod('mpesa')}><b className="shared-wallet-modal__method-mark mpesa">MPESA</b><span>MPESA</span>{method === 'mpesa' && <Check size={15} />}</button>
						<button type="button" className={method === 'airtel' ? 'is-selected' : ''} onClick={() => setMethod('airtel')}><b className="shared-wallet-modal__method-mark airtel">A</b><span>Airtel Money</span>{method === 'airtel' && <Check size={15} />}</button>
					</div></fieldset>
					<label className="shared-wallet-modal__field"><span>{method === 'mpesa' ? 'MPESA' : 'Airtel Money'} Phone Number</span><span className="shared-wallet-modal__phone"><b>🇰🇪</b><i>⌄</i><em>+254</em><input value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 9))} inputMode="numeric" aria-label="Wallet phone number" /></span><small>This phone number will receive an STK push when you request to top-up wallet</small></label>
					<button className="student-dashboard__go shared-wallet-modal__submit" type="submit">Save &amp; Continue</button>
				</form> : step === 2 ? <form className="shared-wallet-modal__body" onSubmit={savePin}>
					<PinRow label="Enter PIN" value={pin} onChange={setPin} />
					<PinRow label="Confirm PIN" value={confirmation} onChange={setConfirmation} />
					{error && <p className="shared-wallet-modal__error" role="alert">{error}</p>}
					<button className="student-dashboard__go shared-wallet-modal__submit" type="submit">Submit</button>
				</form> : step === 3 ? <form className="shared-wallet-modal__body student-wallet-otp-modal" onSubmit={verifyOtp}>
					<button type="button" className="student-wallet-otp-modal__close" aria-label="Close OTP verification" onClick={onClose}><X size={22} /></button><div className="student-wallet-otp-modal__heading"><h1>OTP Verification</h1><p>We have sent verification code to your phone number and email address</p></div>
					<label><span>Enter OTP</span><input type="password" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="********" value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} aria-label="Enter OTP" /></label>
					{error && <p className="shared-wallet-modal__error" role="alert">{error}</p>}
					<button className="student-dashboard__go shared-wallet-modal__submit" type="submit">Verify</button>
				</form> : <section className="student-wallet-activated" aria-labelledby="wallet-activated-title">
					<button type="button" className="student-wallet-activated__close" aria-label="Close wallet activation" onClick={onClose}><X size={22} /></button><img src={doneArt} alt="" /><h1 id="wallet-activated-title">Wallet activated successfully</h1><button className="student-dashboard__go" type="button" onClick={() => onSaved?.()}>Okay</button>
				</section>}
			</section>
		</div>
	)
}

function PinRow({ label, value, onChange }: { label: string; value: string[]; onChange: (value: string[]) => void }) {
		return <label className="shared-wallet-modal__pin-row"><span>{label}</span><div>{value.map((digit, index) => <input key={index} value={digit} type="password" inputMode="numeric" maxLength={1} aria-label={`${label} digit ${index + 1}`} onChange={(event) => { const next = [...value]; next[index] = event.target.value.replace(/\D/g, '').slice(-1); onChange(next); if (event.target.value && event.currentTarget.nextElementSibling instanceof HTMLInputElement) event.currentTarget.nextElementSibling.focus() }} onKeyDown={(event) => { if (event.key === 'Backspace' && !value[index] && event.currentTarget.previousElementSibling instanceof HTMLInputElement) event.currentTarget.previousElementSibling.focus() }} />)}</div></label>
}
