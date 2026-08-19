import { Check, CircleCheckBig, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type TopUpModalProps = { onClose: () => void }

export default function TopUpModal({ onClose }: TopUpModalProps) {
	const [state, setState] = useState<'form' | 'loading' | 'success'>('form')
	const [method, setMethod] = useState<'mpesa' | 'airtel'>('mpesa')
	const [amount, setAmount] = useState('')
	const [phone, setPhone] = useState('')
	const [notice, setNotice] = useState('')
	useEffect(() => {
		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => { document.body.style.overflow = previousOverflow }
	}, [])
	const sendStk = (event: React.FormEvent) => {
		event.preventDefault()
		if (Number(amount) < 1000) {
			setNotice('Minimum Top-up: KES 1,000')
			return
		}
		setNotice('')
		setState('loading')
		window.setTimeout(() => setState('success'), 1200)
	}
	return <div className="student-dashboard__modal-backdrop student-dashboard__modal-backdrop--topup" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
		{state === 'loading' && <section className="shared-wallet-topup-status-modal" role="status" aria-label="Processing top-up"><span className="shared-wallet-topup-spinner" /></section>}
		{state === 'success' && <section className="shared-wallet-topup-success-modal" role="alertdialog" aria-modal="true" aria-labelledby="topup-success-title"><button type="button" className="student-profile-modal__close" aria-label="Close confirmation" onClick={onClose}><X size={22} /></button><div className="shared-wallet-topup-success-modal__icon"><CircleCheckBig size={62} strokeWidth={1.35} /></div><h1 id="topup-success-title">Top-up Initiated Successfully</h1><p>Your top-up of KES {Number(amount).toLocaleString('en-KE', { minimumFractionDigits: 2 })} has been completed successfully</p></section>}
		{state === 'form' && <>
		<section className="shared-wallet-topup-modal" role="dialog" aria-modal="true" aria-labelledby="topup-title">
			<header className="shared-wallet-topup-modal__header"><h1 id="topup-title">Top-up</h1><button type="button" className="student-profile-modal__close" aria-label="Close top-up" onClick={onClose}><X size={22} /></button></header>
			<form onSubmit={sendStk}>
				<label className="shared-wallet-topup-modal__field"><span>Amount to Top-up</span><span className="shared-wallet-topup-modal__amount"><em>KES</em><input value={amount} onChange={(event) => setAmount(event.target.value.replace(/\D/g, ''))} inputMode="numeric" placeholder="0.00" aria-label="Amount to top-up" /></span><small>Minimum Top-up: KES 1,000</small></label>
				<fieldset><legend>Select payment method</legend><div className="shared-wallet-modal__methods">
					<button type="button" className={method === 'mpesa' ? 'is-selected' : ''} onClick={() => setMethod('mpesa')}><b className="shared-wallet-modal__method-mark mpesa">MPESA</b><span>MPESA</span>{method === 'mpesa' && <Check size={15} />}</button>
					<button type="button" className={method === 'airtel' ? 'is-selected' : ''} onClick={() => setMethod('airtel')}><b className="shared-wallet-modal__method-mark airtel">A</b><span>Airtel Money</span>{method === 'airtel' && <Check size={15} />}</button>
				</div></fieldset>
				<label className="shared-wallet-topup-modal__field"><span>{method === 'mpesa' ? 'MPESA' : 'Airtel Money'} Phone Number</span><span className="shared-wallet-modal__phone"><b className="shared-wallet-modal__country">KE</b><i>⌄</i><em>+254</em><input value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 9))} inputMode="numeric" aria-label="Top-up phone number" /></span></label>
				<div className="shared-wallet-topup-modal__instructions"><strong>Or Use Payment Instructions</strong><ol><li>Go to M-PESA on your phone</li><li>Select Pay Bill option</li><li>Enter Business no. <b>5694730</b></li><li>Enter Account no. <b>YAFFEOGL</b></li><li>Enter the Amount.</li><li>Enter your M-PESA PIN and Send</li><li>You will receive a confirmation SMS from MPESA</li></ol></div>
				{notice && <p className="shared-wallet-topup-modal__notice" role="status">{notice}</p>}<button className="student-dashboard__go shared-wallet-topup-modal__submit" type="submit">Send STK</button>
			</form>
		</section>
		</>}
	</div>
}
