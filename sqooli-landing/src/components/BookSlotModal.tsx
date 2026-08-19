import { ArrowLeft, Calendar, Check, ChevronRight, CreditCard, X } from 'lucide-react'
import { useState } from 'react'
import doneArt from '../assets/images/student-flow/Done.svg'
import '../styles/pages/search.css'

interface BookSlotModalProps {
	isOpen: boolean
	onClose: () => void
	courseTitle?: string
	tutorName?: string
	price?: string
}

type BookingType = 'package' | 'customized' | 'single'

export default function BookSlotModal({ isOpen, onClose, courseTitle = 'The Ultimate Math Camp Kenya April 2026', tutorName = 'Lucy Atieno', price = 'KES 12,000.00' }: BookSlotModalProps) {
	const [step, setStep] = useState<1 | 2 | 3>(1)
	const [program, setProgram] = useState(courseTitle)
	const [bookingType, setBookingType] = useState<BookingType>('package')
	const [startDate, setStartDate] = useState('')
	const [phone, setPhone] = useState('')
	const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'airtel'>('mpesa')
	const [paymentState, setPaymentState] = useState<'form' | 'loading' | 'success'>('form')
	const [error, setError] = useState('')

	if (!isOpen) return null

	const close = () => {
		setStep(1)
		setPaymentState('form')
		setError('')
		onClose()
	}
	const continueToPreview = () => {
		if (!program || !startDate) {
			setError('Select a program and preferred start date to continue.')
			return
		}
		setError('')
		setStep(2)
	}
	const sendStk = () => {
		if (phone.replace(/\D/g, '').length < 9) {
			setError(`Enter a valid ${paymentMethod === 'mpesa' ? 'M-PESA' : 'Airtel Money'} number.`)
			return
		}
		setError('')
		setPaymentState('loading')
		window.setTimeout(() => setPaymentState('success'), 900)
	}

	return <div className="booking-flow-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) close() }}>
		<section className="booking-flow-modal" role="dialog" aria-modal="true" aria-labelledby="booking-flow-title">
			<header className="booking-flow-modal__header"><button type="button" className="booking-flow-modal__back" onClick={step === 1 ? close : () => { setStep((step - 1) as 1 | 2 | 3); setError('') }}><ArrowLeft size={17} /> Back</button><button type="button" className="booking-flow-modal__close" aria-label="Close booking" onClick={close}><X size={21} /></button><h1 id="booking-flow-title">Book a Slot</h1></header>
			<div className="booking-flow-modal__body">
				<aside className="booking-flow-modal__steps" aria-label="Booking progress"><Step number="1/2" label="Booking Information" active={step === 1} complete={step > 1} /><Step number="2/2" label="Preview" active={step === 2} complete={step > 2} /><Step number="4/6" label="Payment" active={step === 3} /></aside>
				<main className="booking-flow-modal__content">
					{step === 1 && <BookingInformation program={program} setProgram={setProgram} bookingType={bookingType} setBookingType={setBookingType} startDate={startDate} setStartDate={setStartDate} error={error} onContinue={continueToPreview} />}
					{step === 2 && <BookingPreview program={program} bookingType={bookingType} startDate={startDate} onBack={() => setStep(1)} onContinue={() => setStep(3)} />}
					{step === 3 && paymentState === 'form' && <BookingPayment price={price} tutorName={tutorName} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} phone={phone} setPhone={setPhone} error={error} onBack={() => setStep(2)} onPay={sendStk} />}
					{step === 3 && paymentState === 'loading' && <div className="booking-flow-loading" role="status" aria-label="Processing payment"><span /></div>}
					{step === 3 && paymentState === 'success' && <div className="booking-flow-success"><img src={doneArt} alt="" /><h2>Booking Payment Initiated</h2><p>Check your phone to complete payment for {tutorName}.</p><button type="button" className="btn-sidebar-apply" onClick={close}>Okay</button></div>}
				</main>
			</div>
		</section>
	</div>
}

function Step({ number, label, active = false, complete = false }: { number: string; label: string; active?: boolean; complete?: boolean }) {
	return <div className={`booking-flow-modal__step${active ? ' is-active' : ''}${complete ? ' is-complete' : ''}`}><span>Step {number} {complete && <Check size={12} />}</span><strong>{label}</strong></div>
}

function BookingInformation({ program, setProgram, bookingType, setBookingType, startDate, setStartDate, error, onContinue }: { program: string; setProgram: (value: string) => void; bookingType: BookingType; setBookingType: (value: BookingType) => void; startDate: string; setStartDate: (value: string) => void; error: string; onContinue: () => void }) {
	return <div className="booking-flow-section"><h2>Booking Information</h2><p className="booking-flow-section__intro">Add basic information about your resource</p><h3>Booking Details</h3><label className="booking-flow-field"><span>Program</span><select value={program} onChange={event => setProgram(event.target.value)}><option value={program}>{program}</option><option value="Digital E-Learning Portal">Digital E-Learning Portal</option><option value="STEM & Robotics Lab">STEM &amp; Robotics Lab</option></select></label><fieldset className="booking-flow-options"><legend>Booking Type</legend><BookingOption active={bookingType === 'package'} onClick={() => setBookingType('package')} title="Full Package" copy="All lessons in the sub-program bundled together" price="KES 12,000.00" detail="KES 14,000.00" /><BookingOption active={bookingType === 'customized'} onClick={() => setBookingType('customized')} title="Customized" copy="Pick specific subjects and number of lessons" price="From KES 500.00/ lesson" /><BookingOption active={bookingType === 'single'} onClick={() => setBookingType('single')} title="Single Lesson" copy="Try one lesson before committing" price="KES 800.00" /></fieldset><label className="booking-flow-field"><span>Preferred Start Date</span><span className="booking-flow-date"><input type="date" value={startDate} onChange={event => setStartDate(event.target.value)} placeholder="DD/MM/YYYY" /><Calendar size={17} /></span></label>{error && <p className="booking-form-error" role="alert">{error}</p>}<div className="booking-flow-actions"><button type="button" className="btn-action-outline" onClick={() => window.history.back()}><ArrowLeft size={16} /> Back</button><button type="button" className="btn-sidebar-apply" onClick={onContinue}>Save &amp; Continue <ChevronRight size={16} /></button></div></div>
}

function BookingOption({ active, onClick, title, copy, price, detail }: { active: boolean; onClick: () => void; title: string; copy: string; price: string; detail?: string }) {
	return <button type="button" className={`booking-flow-option${active ? ' is-active' : ''}`} onClick={onClick}><span className="booking-flow-option__radio" /><span className="booking-flow-option__copy"><strong>{title}</strong><small>{copy}</small></span><span className="booking-flow-option__price"><b>{price}</b>{detail && <><del>{detail}</del><em>Save 10%</em></>}</span></button>
}

function BookingPreview({ program, bookingType, startDate, onBack, onContinue }: { program: string; bookingType: BookingType; startDate: string; onBack: () => void; onContinue: () => void }) {
	return <div className="booking-flow-section"><h2>Preview</h2><p className="booking-flow-section__intro">Confirm your details</p><div className="booking-flow-preview"><h3>Booking Details</h3><p><span>Program</span><b>{program}</b></p><p><span>Booking Type</span><b>{bookingType === 'package' ? 'Full Package' : bookingType === 'customized' ? 'Customized' : 'Single Lesson'}</b></p><p><span>Preferred Start Date</span><b>{startDate}</b></p></div><div className="booking-flow-actions"><button type="button" className="btn-action-outline" onClick={onBack}><ArrowLeft size={16} /> Back</button><button type="button" className="btn-sidebar-apply" onClick={onContinue}>Confirm &amp; Pay <ChevronRight size={16} /></button></div></div>
}

function BookingPayment({ price, tutorName, paymentMethod, setPaymentMethod, phone, setPhone, error, onBack, onPay }: { price: string; tutorName: string; paymentMethod: 'mpesa' | 'airtel'; setPaymentMethod: (value: 'mpesa' | 'airtel') => void; phone: string; setPhone: (value: string) => void; error: string; onBack: () => void; onPay: () => void }) {
	return <div className="booking-flow-section"><h2>Make Payment</h2><p className="booking-flow-section__intro">Confirm your details</p><div className="booking-flow-amount"><span>Amount to Pay</span><strong>{price}</strong></div><fieldset className="booking-flow-payment-methods"><legend>Select payment method</legend><button type="button" className={paymentMethod === 'mpesa' ? 'is-active' : ''} onClick={() => setPaymentMethod('mpesa')}><b>MPESA</b> MPESA</button><button type="button" className={paymentMethod === 'airtel' ? 'is-active' : ''} onClick={() => setPaymentMethod('airtel')}><b className="is-airtel">A</b> Airtel Money</button></fieldset><label className="booking-flow-field"><span>{paymentMethod === 'mpesa' ? 'MPESA' : 'Airtel Money'} Phone Number</span><span className="booking-flow-phone"><b>🇰🇪</b><em>+254</em><input value={phone} onChange={event => setPhone(event.target.value.replace(/\D/g, '').slice(0, 9))} inputMode="numeric" placeholder="712345678" aria-label="Payment phone number" /></span></label><div className="booking-flow-instructions"><strong>Or Use Payment Instructions</strong><ol><li>Go to M-PESA on your phone</li><li>Select Pay Bill option</li><li>Enter Business no. <b>5694730</b></li><li>Enter Account no. <b>YAFEOGL</b></li><li>Enter the Amount.</li><li>Enter your M-PESA PIN and Send</li><li>You will receive a confirmation SMS from MPESA</li></ol></div>{error && <p className="booking-form-error" role="alert">{error}</p>}<div className="booking-flow-actions"><button type="button" className="btn-action-outline" onClick={onBack}><ArrowLeft size={16} /> Back</button><button type="button" className="btn-sidebar-apply" onClick={onPay}>Send STK <ChevronRight size={16} /></button></div><small className="booking-flow-payment-note"><CreditCard size={13} /> Secure booking payment for {tutorName}</small></div>
}
