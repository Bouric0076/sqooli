import { CircleCheckBig, CircleX, CreditCard, LoaderCircle, X } from 'lucide-react'
import { useState } from 'react'
import '../../styles/pages/teacher-wallet.css'

type WithdrawState = 'form' | 'pin' | 'loading' | 'success' | 'fail'

export default function TeacherWithdrawModal({ onClose }: { onClose: () => void }) {
    const [state, setState] = useState<WithdrawState>('form')
    const [amount, setAmount] = useState('')
    const [pin, setPin] = useState('')
    const [notice, setNotice] = useState('')
    const submitAmount = (event: React.FormEvent) => { event.preventDefault(); if (Number(amount) < 1000) { setNotice('Minimum Withdrawal: KES 1,000'); return } setNotice(''); setState('pin') }
    const submitPin = (event: React.FormEvent) => { event.preventDefault(); if (pin.length < 6) return; setState('loading'); window.setTimeout(() => setState('success'), 1100) }
    return <div className="teacher-wallet-modal-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
        <section className="teacher-withdraw-modal" role="dialog" aria-modal="true" aria-labelledby="withdraw-title">
            <header><h1 id="withdraw-title">Withdraw Earnings</h1><button type="button" aria-label="Close" onClick={onClose}><X size={21} /></button></header>
            {state === 'form' && <form onSubmit={submitAmount}><p className="teacher-withdraw-modal__warning">Please note: You can only make one withdrawal every 48 Hours.</p><label>Source of Funds<span className="teacher-withdraw-modal__balance">Available Balance<strong>KES 2,647.00</strong></span></label><label>Amount to withdraw<span className="teacher-withdraw-modal__input"><em>KES</em><input value={amount} onChange={event => setAmount(event.target.value.replace(/\D/g, ''))} inputMode="numeric" placeholder="0.00" /></span><small>Minimum Withdrawal: KES 1,000</small></label>{notice && <p className="teacher-wallet-modal__error">{notice}</p>}<button className="teacher-wallet-modal__submit" type="submit">Withdraw</button></form>}
            {state === 'pin' && <form className="teacher-withdraw-modal__pin" onSubmit={submitPin}><div className="teacher-withdraw-modal__icon"><CreditCard size={66} strokeWidth={1.4} /></div><p>Enter your PIN to proceed</p><div>{Array.from({ length: 6 }, (_, index) => <input key={index} autoFocus={index === 0} type="password" inputMode="numeric" maxLength={1} value={pin[index] ?? ''} onChange={event => { const value = event.target.value.replace(/\D/g, ''); setPin(current => current.slice(0, index) + value + current.slice(index + 1)) }} aria-label={`PIN digit ${index + 1}`} />)}</div><button className="teacher-wallet-modal__submit" type="submit">Confirm Withdrawal</button></form>}
            {state === 'loading' && <div className="teacher-withdraw-modal__result"><LoaderCircle className="is-spinning" size={58} /><p>Processing withdrawal...</p></div>}
            {state === 'success' && <div className="teacher-withdraw-modal__result is-success"><CircleCheckBig size={68} strokeWidth={1.4} /><h2>Withdrawal Initiated Successfully</h2><p>Your request to withdraw earnings has been received successfully.<br />We will approve the transaction within 24 hours.</p></div>}
            {state === 'fail' && <div className="teacher-withdraw-modal__result is-fail"><CircleX size={68} strokeWidth={1.4} /><h2>Withdrawal Failed</h2><p>Your withdrawal request failed. Try again later.</p></div>}
        </section>
    </div>
}
