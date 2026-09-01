import { CreditCard, Download, X } from 'lucide-react'

type PaymentDetails = { reference: string; amount: string; date: string; status: 'Complete' | 'Pending' | 'Failed' }
type Props = { payment: PaymentDetails; onClose: () => void }

export default function PaymentDetailsModal({ payment, onClose }: Props) {
    const failed = payment.status === 'Failed'
    const completed = payment.status === 'Complete'
    const numericAmount = Math.abs(Number(payment.amount.replace(/[^0-9.]/g, ''))) || 724
    const formattedAmount = `KES ${numericAmount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`
    const amount = `${failed ? '-' : '+'}${formattedAmount}`
    const code = `TID${payment.reference.replace(/[^0-9]/g, '') || '12345678'}`

    return <div className="shared-payment-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
        <section className="shared-payment-modal" role="dialog" aria-modal="true" aria-labelledby="payment-details-title">
            <header><span><CreditCard size={17} /> Payments <b>›</b> <a href="#payment-details">#{payment.reference.replace(/^REF#?/, '')}</a></span><button type="button" aria-label="Close payment details" onClick={onClose}><X size={21} /></button></header>
            <em className={`shared-payment-modal__status is-${payment.status.toLowerCase()}`}>{payment.status}</em>
            <h1 id="payment-details-title">{amount}</h1><p className="shared-payment-modal__code">{code}</p>
            <dl><div><dt>Transaction Date</dt><dd>{payment.date}</dd></div><div><dt>Transaction Code</dt><dd>{code}</dd></div>{failed && <div><dt>Lesson Code</dt><dd>{code}</dd></div>}<div><dt>Invoice Type</dt><dd>{failed ? 'Top-up' : 'Commission Payment'}</dd></div></dl>
            {completed ? <button type="button" className="student-dashboard__go shared-payment-modal__receipt" onClick={() => downloadReceipt({ amount, code, date: payment.date })}><Download size={16} /> Download Receipt</button> : <p className="shared-payment-modal__receipt-note" role="status">{failed ? 'A receipt is unavailable for failed transactions.' : 'Your receipt will be available after this transaction is completed.'}</p>}
        </section>
    </div>
}

function downloadReceipt(receipt: { amount: string; code: string; date: string }) {
    const pdf = createReceiptPdf(receipt)
    const url = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `sqooli-receipt-${receipt.code}.pdf`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function createReceiptPdf(receipt: { amount: string; code: string; date: string }) {
    const lines = [
        'SQOOLI RECEIPT',
        '',
        `Transaction code: ${receipt.code}`,
        `Transaction date: ${receipt.date}`,
        'Payment for: Top-up',
        'Payment method: M-PESA',
        '',
        `Total amount: ${receipt.amount}`,
        '',
        'Thank you for using Sqooli.',
    ].map(toPdfText)
    const content = ['BT', '/F1 18 Tf', '50 760 Td', `(${lines[0]}) Tj`, '/F1 11 Tf', ...lines.slice(1).map(line => `0 -28 Td (${line}) Tj`), 'ET'].join('\n')
    const objects = [
        '<< /Type /Catalog /Pages 2 0 R >>',
        '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
        '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
        `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
        '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    ]
    let pdf = '%PDF-1.4\n'
    const offsets = [0]
    objects.forEach((object, index) => {
        offsets.push(pdf.length)
        pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
    })
    const xrefOffset = pdf.length
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map(offset => `${String(offset).padStart(10, '0')} 00000 n `).join('\n')}\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
    return pdf
}

function toPdfText(value: string) {
    return value.replace(/[^\x20-\x7E]/g, '?').replace(/([\\()])/g, '\\$1')
}
