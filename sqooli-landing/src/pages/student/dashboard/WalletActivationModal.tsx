import { Check, Eye, EyeOff, X } from 'lucide-react'
import { useState } from 'react'
import { setupWallet } from '../../../api/wallet'
import doneArt from '../../../assets/images/student-flow/Done.svg'

type WalletActivationModalProps = { onClose: () => void; onSaved?: () => void }

export default function WalletActivationModal({ onClose, onSaved }: WalletActivationModalProps) {
	const [step, setStep] = useState<1 | 2 | 3>(1)
	const [method, setMethod] = useState<'mpesa' | 'airtel'>('mpesa')
	const [phone, setPhone] = useState('')
	const [pin, setPin] = useState<string[]>(Array(6).fill(''))
	const [confirmation, setConfirmation] = useState<string[]>(Array(6).fill(''))
	const [error, setError] = useState('')
	const [showPin, setShowPin] = useState(false)
	const [isSaving, setIsSaving] = useState(false)

	const saveTopUpMethod = (event: React.FormEvent) => {
		event.preventDefault()
		if (phone.length < 9) {
			setError('Enter a valid nine-digit mobile number to continue.')
			return
		}
		setError('')
		setStep(2)
	}

	const savePin = async (event: React.FormEvent) => {
		event.preventDefault()
		const enteredPin = pin.join('')
		const confirmedPin = confirmation.join('')
		if (enteredPin.length !== 6 || confirmedPin.length !== 6 || enteredPin !== confirmedPin) {
			setError(enteredPin.length !== 6 || confirmedPin.length !== 6 ? 'Enter all six digits in both PIN fields.' : 'The PINs do not match. Check both entries and try again.')
			return
		}
		setError('')
		setIsSaving(true)
		try {
			await setupWallet({ pin: enteredPin, confirmPin: confirmedPin, topUpMethodType: method === 'mpesa' ? 'MPESA' : 'AIRTEL_MONEY', topUpPhoneNumber: phone, topUpProvider: method === 'mpesa' ? 'MPESA' : 'AIRTEL' })
			window.sessionStorage.setItem('sqooli-student-wallet', JSON.stringify({ method, phone, pinSet: true }))
			setStep(3)
		} catch (requestError) {
			setError(requestError instanceof Error ? requestError.message : 'We could not activate your wallet. Please try again.')
		} finally { setIsSaving(false) }
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
					<div className="shared-wallet-modal__pin-heading"><p>Choose a six-digit PIN for your wallet.</p><button type="button" onClick={() => setShowPin((value) => !value)} aria-pressed={showPin}>{showPin ? <EyeOff size={15} /> : <Eye size={15} />} {showPin ? 'Hide PIN' : 'Show PIN'}</button></div>
					<PinRow label="Enter PIN" value={pin} onChange={setPin} visible={showPin} />
					<PinRow label="Confirm PIN" value={confirmation} onChange={setConfirmation} visible={showPin} />
					{pin.join('').length === 6 && confirmation.join('').length === 6 && <p className={`shared-wallet-modal__match${pin.join('') === confirmation.join('') ? ' is-valid' : ' is-invalid'}`} role="status">{pin.join('') === confirmation.join('') ? 'PINs match.' : 'PINs do not match yet.'}</p>}
					{error && <p className="shared-wallet-modal__error" role="alert">{error}</p>}
					<button className="student-dashboard__go shared-wallet-modal__submit" type="submit" disabled={isSaving}>{isSaving ? 'Activating…' : 'Activate Wallet'}</button>
				</form> : <section className="student-wallet-activated" aria-labelledby="wallet-activated-title">
					<button type="button" className="student-wallet-activated__close" aria-label="Close wallet activation" onClick={onClose}><X size={22} /></button><img src={doneArt} alt="" /><h1 id="wallet-activated-title">Wallet activated successfully</h1><button className="student-dashboard__go" type="button" onClick={() => onSaved?.()}>Okay</button>
				</section>}
			</section>
		</div>
	)
}

function PinRow({ label, value, onChange, visible }: { label: string; value: string[]; onChange: (value: string[]) => void; visible: boolean }) {
		return <label className="shared-wallet-modal__pin-row"><span>{label}</span><div>{value.map((digit, index) => <input key={index} value={digit} type={visible ? 'text' : 'password'} inputMode="numeric" maxLength={1} aria-label={`${label} digit ${index + 1}`} onChange={(event) => { const next = [...value]; next[index] = event.target.value.replace(/\D/g, '').slice(-1); onChange(next); if (event.target.value && event.currentTarget.nextElementSibling instanceof HTMLInputElement) event.currentTarget.nextElementSibling.focus() }} onKeyDown={(event) => { if (event.key === 'Backspace' && !value[index] && event.currentTarget.previousElementSibling instanceof HTMLInputElement) event.currentTarget.previousElementSibling.focus() }} />)}</div></label>
}
