import { Check, CreditCard, Landmark, Smartphone, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import '../../styles/pages/teacher-wallet.css'

type Method = 'mpesa' | 'airtel'
type Withdrawal = 'mobile' | 'bank' | 'pesapal'
type TopUpSource = 'mobile' | 'bank' | 'other'
type TeacherWalletActivationModalProps = { onClose: () => void; onSaved: () => void }

export default function TeacherWalletActivationModal({ onClose, onSaved }: TeacherWalletActivationModalProps) {
	const [step, setStep] = useState<1 | 2 | 3>(1)
	const [withdrawal, setWithdrawal] = useState<Withdrawal>('mobile')
	const [topUpSource, setTopUpSource] = useState<TopUpSource>('mobile')
	const [method, setMethod] = useState<Method>('mpesa')
	const [option, setOption] = useState<'phone' | 'till' | 'paybill'>('phone')
	const [phone, setPhone] = useState('')
	const [paybillNumber, setPaybillNumber] = useState('')
	const [accountNumber, setAccountNumber] = useState('')
	const [bankPaybill, setBankPaybill] = useState('')
	const [bankAccount, setBankAccount] = useState('')
	const [pin, setPin] = useState<string[]>(Array(6).fill(''))
	const [confirmation, setConfirmation] = useState<string[]>(Array(6).fill(''))
	const [error, setError] = useState('')

	const submitDetails = (event: React.FormEvent) => {
		event.preventDefault()
		if (withdrawal === 'bank' && (!bankPaybill || !bankAccount)) return setError('Enter your bank payment and account numbers.')
		if (withdrawal === 'mobile' && option !== 'paybill' && !phone) return setError(`Enter a ${option === 'till' ? 'till' : 'phone'} number to continue.`)
		if (withdrawal === 'mobile' && option === 'paybill' && (!paybillNumber || !accountNumber)) return setError('Enter both the Paybill and Account Numbers to continue.')
		setError(''); setStep(2)
	}

	const submitTopUp = (event: React.FormEvent) => {
		event.preventDefault()
		if (topUpSource === 'mobile' && !phone) return setError('Enter a phone number to continue.')
		if (topUpSource === 'bank' && (!bankPaybill || !bankAccount)) return setError('Enter your bank payment and account numbers.')
		setError(''); setStep(3)
	}
	const submitPin = (event: React.FormEvent) => {
		event.preventDefault()
		if (pin.join('').length !== 6 || pin.join('') !== confirmation.join('')) return setError('Enter matching six-digit PINs to continue.')
		window.sessionStorage.setItem('sqooli-teacher-wallet', JSON.stringify({ withdrawal, method, phone, bankPaybill, bankAccount, pinSet: true }))
		onSaved()
	}

	return <div className="teacher-wallet-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
		<section className="teacher-wallet-modal" role="dialog" aria-modal="true" aria-labelledby="teacher-wallet-modal-title">
			<header className="teacher-wallet-modal__header"><div><h1 id="teacher-wallet-modal-title">Activate Wallet</h1><p>Setup withdrawal settings to access your earnings</p></div><button type="button" aria-label="Close wallet activation" onClick={onClose}><X size={22} /></button></header>
			<div className="teacher-wallet-modal__steps"><div className={step === 1 ? 'is-active' : 'is-complete'}><strong>Setup Withdrawal Method</strong><small>Setup how you will withdraw earnings from your account</small></div><div className={step === 2 ? 'is-active' : ''}><strong>Setup Top-up Method</strong><small>Setup how you will withdraw earnings from your account</small></div><div className={step === 3 ? 'is-active' : ''}><strong>PIN Setup</strong><small>Setup your wallet PIN</small></div></div>
			{step === 1 && <form className="teacher-wallet-modal__body" onSubmit={submitDetails}><fieldset><legend>Select withdrawal method</legend><div className="teacher-wallet-modal__cards">
				<Choice selected={withdrawal === 'mobile'} onClick={() => setWithdrawal('mobile')} icon={<Smartphone />} title="Mobile Money" description="Setup withdrawal method manually through mobile money" />
				<Choice selected={withdrawal === 'bank'} onClick={() => setWithdrawal('bank')} icon={<Landmark />} title="Bank Account" description="Withdraw your earnings directly to bank account" />
				<Choice selected={withdrawal === 'pesapal'} onClick={() => setWithdrawal('pesapal')} icon={<CreditCard />} title={withdrawal === 'pesapal' ? 'Pesapal' : 'Others'} description="Automatically withdraw your earnings through Pesapal checkout" />
			</div></fieldset>{withdrawal === 'mobile' && <><fieldset><legend>Select method</legend><MethodButtons method={method} setMethod={setMethod} /></fieldset><fieldset><legend>Select option below</legend><div className="teacher-wallet-modal__radios">{[['phone', 'Phone Number'], ['till', 'Till Number'], ['paybill', 'Paybill Number']].map(([value, label]) => <label key={value}><input type="radio" name="withdrawal-option" checked={option === value} onChange={() => setOption(value as typeof option)} />{label}</label>)}</div></fieldset>{option === 'paybill' ? <><Field label="Paybill Number" value={paybillNumber} onChange={setPaybillNumber} /><Field label="Account Number" value={accountNumber} onChange={setAccountNumber} /></> : <Field label={`${method === 'mpesa' ? 'MPESA' : 'Airtel'} ${option === 'phone' ? 'Phone' : 'Till'} Number`} value={phone} onChange={setPhone} prefix={option === 'phone' ? '+254' : undefined} />}</>}{withdrawal === 'bank' && <><Field label="Bank Paybill Number" value={bankPaybill} onChange={setBankPaybill} /><Field label="Bank Account Number" value={bankAccount} onChange={setBankAccount} /></>}{error && <p className="teacher-wallet-modal__error" role="alert">{error}</p>}<button className="teacher-wallet-modal__submit" type="submit">Save &amp; Continue</button></form>}
			{step === 2 && <form className="teacher-wallet-modal__body" onSubmit={submitTopUp}><fieldset><legend>Select top-up method</legend><div className="teacher-wallet-modal__cards teacher-wallet-modal__cards--compact"><Choice selected={topUpSource === 'mobile'} icon={<Smartphone />} title="Mobile Money" description="Top-up using a mobile money account" onClick={() => setTopUpSource('mobile')} /><Choice selected={topUpSource === 'bank'} icon={<Landmark />} title="Bank Account" description="Top-up directly from your bank account" onClick={() => setTopUpSource('bank')} /><Choice selected={topUpSource === 'other'} icon={<CreditCard />} title="Others" description="Use other methods to top-up your wallet" onClick={() => setTopUpSource('other')} /></div></fieldset>{topUpSource === 'mobile' && <><fieldset><legend>Select method</legend><MethodButtons method={method} setMethod={setMethod} /></fieldset><Field label={`${method === 'mpesa' ? 'MPESA' : 'Airtel'} Phone Number`} value={phone} onChange={setPhone} prefix="+254" /></>}{topUpSource === 'bank' && <><Field label="Bank Paybill Number" value={bankPaybill} onChange={setBankPaybill} /><Field label="Bank Account Number" value={bankAccount} onChange={setBankAccount} /></>}{error && <p className="teacher-wallet-modal__error" role="alert">{error}</p>}<button className="teacher-wallet-modal__submit" type="submit">Save &amp; Continue</button></form>}
			{step === 3 && <form className="teacher-wallet-modal__body teacher-wallet-modal__pin" onSubmit={submitPin}><PinRow label="Enter PIN" value={pin} onChange={setPin} /><PinRow label="Confirm PIN" value={confirmation} onChange={setConfirmation} />{error && <p className="teacher-wallet-modal__error" role="alert">{error}</p>}<button className="teacher-wallet-modal__submit" type="submit">Submit</button></form>}
		</section>
	</div>
}

function Choice({ selected, onClick, icon, title, description }: { selected?: boolean; onClick: () => void; icon: ReactNode; title: string; description: string }) { return <button type="button" className={`teacher-wallet-modal__choice${selected ? ' is-selected' : ''}`} onClick={onClick}><span>{icon}</span><strong>{title}</strong><small>{description}</small>{selected && <Check className="is-check" size={16} />}</button> }
function MethodButtons({ method, setMethod }: { method: Method; setMethod: (method: Method) => void }) { return <div className="teacher-wallet-modal__methods"><button type="button" className={method === 'mpesa' ? 'is-selected' : ''} onClick={() => setMethod('mpesa')}><b>MPESA</b><span>MPESA</span></button><button type="button" className={method === 'airtel' ? 'is-selected' : ''} onClick={() => setMethod('airtel')}><b>A</b><span>Airtel Money</span></button></div> }
function Field({ label, value, onChange, prefix }: { label: string; value: string; onChange: (value: string) => void; prefix?: string }) { return <label className="teacher-wallet-modal__field"><span>{label}</span><span className="teacher-wallet-modal__input">{prefix && <em>{prefix}</em>}<input value={value} onChange={(event) => onChange(event.target.value)} inputMode="numeric" /></span></label> }
function PinRow({ label, value, onChange }: { label: string; value: string[]; onChange: (value: string[]) => void }) { return <label className="teacher-wallet-modal__pin-row"><span>{label}</span><div>{value.map((digit, index) => <input key={index} value={digit} type="password" inputMode="numeric" maxLength={1} onChange={(event) => { const next = [...value]; next[index] = event.target.value.replace(/\D/g, '').slice(-1); onChange(next); if (event.target.value && event.currentTarget.nextElementSibling instanceof HTMLInputElement) event.currentTarget.nextElementSibling.focus() }} />)}</div></label> }
