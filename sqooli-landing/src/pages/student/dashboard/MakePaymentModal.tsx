import { Check, CreditCard, X } from 'lucide-react'
import { useState } from 'react'
import logo from '../../../assets/images/student-flow/sqooli-logo-v2.svg'
import doneArt from '../../../assets/images/student-flow/Done.svg'
import failArt from '../../../assets/images/student-flow/fail.svg'

type PaymentMethod = 'mpesa' | 'other' | 'wallet'
type PaymentState = 'form' | 'loading' | 'success' | 'failure'
type Props = { onClose: () => void }

export default function MakePaymentModal({ onClose }: Props) {
	const [method, setMethod] = useState<PaymentMethod>('mpesa')
	const [state, setState] = useState<PaymentState>('form')
	const [phone, setPhone] = useState('')

	const makePayment = (event: React.FormEvent) => {
		event.preventDefault()
		setState('loading')
		window.setTimeout(() => setState(method === 'other' ? 'failure' : 'success'), 900)
	}

	return <div className="shared-payment-checkout-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
		{state === 'form' && <section className="shared-payment-checkout-modal" role="dialog" aria-modal="true" aria-labelledby="make-payment-title">
			<header><h1 id="make-payment-title">Make Payment</h1><button type="button" aria-label="Close payment" onClick={onClose}><X size={21} /></button></header>
			<form onSubmit={makePayment}>
				<fieldset><legend>Select payment method</legend><div className="shared-payment-checkout__methods">
					<MethodButton active={method === 'mpesa'} onClick={() => setMethod('mpesa')}><b className="shared-wallet-modal__method-mark mpesa">MPESA</b><span>MPESA</span></MethodButton>
					<MethodButton active={method === 'other'} onClick={() => setMethod('other')}><CreditCard size={22} className="shared-payment-checkout__other-icon" /><span>Other Payments</span></MethodButton>
					<MethodButton active={method === 'wallet'} onClick={() => setMethod('wallet')}><CreditCard size={21} /><span>Wallet</span></MethodButton>
				</div></fieldset>
				{method === 'mpesa' && <><p className="shared-payment-checkout__expiry">This transaction session will expire in <b>9m 53s</b></p><label className="shared-payment-checkout__field"><span>MPESA Phone Number</span><span className="shared-wallet-modal__phone"><b className="shared-wallet-modal__country">KE</b><i>⌄</i><em>+254</em><input value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 9))} inputMode="numeric" aria-label="MPESA phone number" /></span></label></>}
				{method === 'wallet' && <div className="shared-payment-checkout__source"><span>Available Balance</span><b>KES 2,647.00</b><button type="button">Top-up</button></div>}
				<label className="shared-payment-checkout__field"><span>Amount to pay</span><span className="shared-payment-checkout__amount"><img src={logo} alt="Sqooli" /><strong>$200.00</strong><button type="submit">{method === 'mpesa' ? 'Send STK' : 'Make Payment'}</button></span></label>
				{method === 'mpesa' && <div className="shared-payment-checkout__instructions"><strong>Or Use Payment Instructions</strong><ol><li>Go to M-PESA on your phone</li><li>Select Pay Bill option</li><li>Enter Business no. <b>5694730</b></li><li>Enter Account no. <b>YAFFEOGL</b></li><li>Enter the Amount. <b>KES 25,000</b></li><li>Enter your M-PESA PIN and Send</li><li>You will receive a confirmation SMS from MPESA</li></ol></div>}
			</form>
		</section>}
		{state === 'loading' && <section className="shared-payment-loading" role="status" aria-label="Processing payment"><span /></section>}
		{state === 'success' && <PaymentResult success onClose={onClose} image={doneArt} title="Payment Completed Successfully" message="You have successfully paid for your Sqooli website subscription" />}
		{state === 'failure' && <PaymentResult onClose={onClose} image={failArt} title="Payment Failed" message="Your payment request failed. Try again later." />}
	</div>
}

function MethodButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
	return <button type="button" className={`shared-payment-checkout__method${active ? ' is-active' : ''}`} onClick={onClick}>{children}{active && <Check size={15} />}</button>
}

function PaymentResult({ success = false, onClose, image, title, message }: { success?: boolean; onClose: () => void; image: string; title: string; message: string }) {
	return <section className={`shared-payment-result${success ? ' is-success' : ' is-failure'}`} role="alertdialog" aria-modal="true" aria-labelledby="payment-result-title"><button type="button" className="shared-payment-result__close" aria-label="Close payment result" onClick={onClose}><X size={21} /></button><img src={image} alt="" /><h1 id="payment-result-title">{title}</h1><p>{message}</p><button type="button" className="student-dashboard__go" onClick={onClose}>Okay</button></section>
}
