import { CreditCard, Download, X } from 'lucide-react'
import { useState } from 'react'
import logo from '../../../assets/images/student-flow/sqooli-logo-v2.svg'

type PaymentDetails = { reference: string; amount: string; date: string; status: 'Complete' | 'Pending' | 'Failed' }
type Props = { payment: PaymentDetails; onClose: () => void }

export default function PaymentDetailsModal({ payment, onClose }: Props) {
    const [receiptOpen, setReceiptOpen] = useState(false)
    const failed = payment.status === 'Failed'
    const numericAmount = Math.abs(Number(payment.amount.replace(/[^0-9.]/g, ''))) || 724
    const formattedAmount = `KES ${numericAmount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`
    const amount = `${failed ? '-' : '+'}${formattedAmount}`
    const code = `TID${payment.reference.replace(/[^0-9]/g, '') || '12345678'}`

    return <div className="shared-payment-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
        {!receiptOpen ? <section className="shared-payment-modal" role="dialog" aria-modal="true" aria-labelledby="payment-details-title">
            <header><span><CreditCard size={17} /> Payments <b>›</b> <a href="#payment-details">#{payment.reference.replace(/^REF#?/, '')}</a></span><button type="button" aria-label="Close payment details" onClick={onClose}><X size={21} /></button></header>
            <em className={`shared-payment-modal__status is-${payment.status.toLowerCase()}`}>{payment.status}</em>
            <h1 id="payment-details-title">{amount}</h1><p className="shared-payment-modal__code">{code}</p>
            <dl><div><dt>Transaction Date</dt><dd>{payment.date}</dd></div><div><dt>Transaction Code</dt><dd>{code}</dd></div>{failed && <div><dt>Lesson Code</dt><dd>{code}</dd></div>}<div><dt>Invoice Type</dt><dd>{failed ? 'Top-up' : 'Commission Payment'}</dd></div></dl>
            <button type="button" className="student-dashboard__go shared-payment-modal__receipt" onClick={() => setReceiptOpen(true)}><Download size={16} /> Download Receipt</button>
        </section> : <ReceiptModal amount={amount} code={code} date={payment.date} failed={failed} onClose={() => setReceiptOpen(false)} />}
    </div>
}

function ReceiptModal({ amount, code, date, failed, onClose }: { amount: string; code: string; date: string; failed: boolean; onClose: () => void }) {
    return <section className="shared-receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <header><div><img src={logo} alt="Sqooli" /><h1 id="receipt-title">RECEIPT</h1></div><button type="button" aria-label="Close receipt" onClick={onClose}><X size={21} /></button></header>
        <h2>TRANSACTION DETAILS</h2><div className="shared-receipt-modal__details"><span>Transaction Code<strong>{code}</strong></span><span>Transaction Date<strong>{date}</strong></span><span>Payment For<strong>{failed ? 'Top-up' : 'Commission'}</strong></span><span>Payment Method<strong>MPESA</strong></span></div>
        <h2>ITEMS</h2><div className="shared-receipt-modal__table"><b>No.</b><b>Item</b><b>Quantity</b><b>Total Amount</b><span>1</span><span>Lesson Name</span><span>1</span><span>{amount}</span><strong>SUBTOTAL</strong><strong>{amount}</strong><strong>Discount</strong><strong>KES 0.00</strong><strong>TOTAL</strong><strong>{amount}</strong></div>
    </section>
}
