import { X } from 'lucide-react'
import { useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import doneArt from '../../../assets/images/student-flow/Done.svg'

const emptyPin = () => Array(6).fill('')

export default function ResetPinPage() {
	const [pin, setPin] = useState(emptyPin)
	const [confirmation, setConfirmation] = useState(emptyPin)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	const submit = (event: React.FormEvent) => {
		event.preventDefault()
		const entered = pin.join('')
		if (entered.length !== 6 || entered !== confirmation.join('')) {
			setError('Enter matching six-digit PINs to continue.')
			return
		}
		setError('')
		window.sessionStorage.setItem('sqooli-student-wallet-pin-reset', 'true')
		setSuccess(true)
	}

	return <StudentDashboardLayout showSidebar={false}>
		<section className="student-reset-pin-page" aria-labelledby="reset-pin-title">
			{success ? <section className="student-reset-success" role="alertdialog" aria-modal="true" aria-labelledby="reset-success-title"><button type="button" className="student-reset-success__close" aria-label="Close PIN reset confirmation" onClick={() => { window.location.href = '/student/wallet' }}><X size={22} /></button><img src={doneArt} alt="" /><h1 id="reset-success-title">PIN reset Successfully</h1><button type="button" className="student-dashboard__go" onClick={() => { window.location.href = '/student/wallet' }}>Okay</button></section> : <form className="student-reset-pin-card" onSubmit={submit}><h1 id="reset-pin-title">Reset PIN</h1><p>Setup your new PIN</p><PinRow label="Enter New PIN" value={pin} onChange={setPin} /><PinRow label="Confirm PIN" value={confirmation} onChange={setConfirmation} />{error && <p className="student-reset-pin-card__error" role="alert">{error}</p>}<button type="submit" className="student-dashboard__go">Submit</button></form>}
		</section>
	</StudentDashboardLayout>
}

function PinRow({ label, value, onChange }: { label: string; value: string[]; onChange: (value: string[]) => void }) {
	return <label className="student-reset-pin-card__row"><span>{label}</span><div>{value.map((digit, index) => <input key={index} type="password" inputMode="numeric" maxLength={1} value={digit} aria-label={`${label} digit ${index + 1}`} onChange={(event) => { const next = [...value]; next[index] = event.target.value.replace(/\D/g, '').slice(-1); onChange(next); if (event.target.value && event.currentTarget.nextElementSibling instanceof HTMLInputElement) event.currentTarget.nextElementSibling.focus() }} onKeyDown={(event) => { if (event.key === 'Backspace' && !value[index] && event.currentTarget.previousElementSibling instanceof HTMLInputElement) event.currentTarget.previousElementSibling.focus() }} />)}</div></label>
}
