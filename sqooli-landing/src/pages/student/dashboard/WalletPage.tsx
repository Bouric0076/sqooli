import { ArrowLeft, CreditCard, EyeOff, Filter, MoreVertical, Pencil, Plus, Search, WalletCards } from 'lucide-react'
import { useMemo, useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import SharedTopUpModal from '../../../components/shared/SharedTopUpModal'
import EditWalletModal from './EditWalletModal'
import SharedWalletActivationModal from '../../../components/shared/SharedWalletActivationModal'
import SharedPaymentDetailsModal from '../../../components/shared/SharedPaymentDetailsModal'
import SharedResetPinRequestModal from '../../../components/shared/SharedResetPinRequestModal'

type Tab = 'topups' | 'payments'
type Transaction = { reference: string; amount: string; date: string; status: 'Complete' | 'Pending' | 'Failed' }

const topUps: Transaction[] = [
	{ reference: 'REF12345', amount: '+ KES 30.00', date: '16-02-25 11.00 AM', status: 'Complete' },
	{ reference: 'REF12345', amount: '+ KES 30.00', date: '16-02-25 11.00 AM', status: 'Complete' },
	{ reference: 'REF12345', amount: '+ KES 30.00', date: '16-02-25 11.00 AM', status: 'Complete' },
	{ reference: 'REF12345', amount: '+ KES 30.00', date: '16-02-25 11.00 AM', status: 'Complete' },
	{ reference: 'REF12345', amount: '+ KES 30.00', date: '16-02-25 11.00 AM', status: 'Complete' },
]

const payments: Transaction[] = [
	{ reference: 'REF#123456', amount: '- KES 30.00', date: '16-02-25 11.00 AM', status: 'Complete' },
	{ reference: 'REF#123456', amount: '- KES 30.00', date: '16-02-25 11.00 AM', status: 'Pending' },
	{ reference: 'REF#123456', amount: '- KES 30.00', date: '16-02-25 11.00 AM', status: 'Failed' },
	{ reference: 'REF#123456', amount: '- KES 30.00', date: '16-02-25 11.00 AM', status: 'Complete' },
]

export default function WalletPage() {
	const [tab, setTab] = useState<Tab>('topups')
	const [query, setQuery] = useState('')
	const [editWalletModalOpen, setEditWalletModalOpen] = useState(() => new URLSearchParams(window.location.search).has('edit'))
	const [topUpModalOpen, setTopUpModalOpen] = useState(() => new URLSearchParams(window.location.search).has('topup'))
	const [activationModalOpen, setActivationModalOpen] = useState(false)
	const [selectedPayment, setSelectedPayment] = useState<Transaction | null>(null)
	const [resetPinModalOpen, setResetPinModalOpen] = useState(false)
	const walletActive = Boolean(window.sessionStorage.getItem('sqooli-student-wallet'))
	const transactions = tab === 'topups' ? topUps : payments
	const filteredTransactions = useMemo(() => transactions.filter((item) => `${item.reference} ${item.status}`.toLowerCase().includes(query.toLowerCase())), [query, transactions])

	return <StudentDashboardLayout activePath="/student/wallet" showSidebar={false}>
		<section className="student-wallet-page" aria-labelledby="wallet-page-title">
			<a className="student-wallet-page__back" href="/student"><ArrowLeft size={17} /> Back to Dashboard</a>
			<h1 id="wallet-page-title">Wallet</h1>
			<div className="student-wallet-page__layout">
				<aside className={`student-wallet-page__balance-card${walletActive ? '' : ' is-empty'}`}>
					{walletActive ? <>
						<div className="student-wallet-page__balance-top"><span>Available Balance</span><button type="button" className="student-wallet-page__overflow" aria-label="Wallet options" onClick={() => setResetPinModalOpen(true)}><MoreVertical size={20} /></button><strong>KES 23,450.00</strong><span>Actual Balance</span><b>KES 23,450.00</b><EyeOff className="student-wallet-page__eye" size={19} /></div>
						<div className="student-wallet-page__saved"><span>Saved Method:</span><p><i className="student-wallet-page__mpesa">MP</i>Paybill: 2******7</p><p>Account No: 0**********5463</p></div>
						<div className="student-wallet-page__card-actions"><button type="button" onClick={() => setTopUpModalOpen(true)}><Plus size={17} /> Top-up</button><button type="button" onClick={() => setEditWalletModalOpen(true)}><Pencil size={17} /> Edit</button></div>
					</> : <>
						<div className="student-wallet-page__balance-top"><small>A/C 0000000</small><MoreVertical size={20} /><span>Available Balance</span><strong>KES 0.00</strong><span>Actual Balance</span><b>KES 0.00</b><EyeOff className="student-wallet-page__eye" size={19} /></div>
						<div className="student-wallet-page__activate"><p>Activate Wallet to top up method</p><button type="button" onClick={() => setActivationModalOpen(true)} aria-label="Activate Wallet" className="student-dashboard__go">Activate Wallet</button></div>
					</>}
				</aside>
				<div className="student-wallet-page__history">
					<label className="student-wallet-page__search"><Search size={20} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search wallet transactions" />{walletActive && <button type="button" aria-label="Filter transactions"><Filter size={18} /></button>}</label>
					<div className="student-wallet-page__panel">
						<div className="student-wallet-page__tabs"><button type="button" className={tab === 'topups' ? 'is-active' : ''} onClick={() => setTab('topups')}><WalletCards size={16} /> Top-Ups</button><button type="button" className={tab === 'payments' ? 'is-active' : ''} onClick={() => setTab('payments')}><WalletCards size={16} /> Payments</button></div>
						{walletActive ? <div className="student-wallet-page__transactions">{filteredTransactions.map((transaction, index) => <div className="student-wallet-page__group" key={`${transaction.reference}-${index}`}>
							{index === 0 || (tab === 'topups' && index === 2) || (tab === 'payments' && index === 2) ? <h2>{index < 2 ? '24 APR 2025' : '25 APR 2025'}</h2> : null}
							<article className={`student-wallet-page__transaction${tab === 'payments' ? ' is-interactive' : ''}`} role={tab === 'payments' ? 'button' : undefined} tabIndex={tab === 'payments' ? 0 : undefined} onClick={() => tab === 'payments' && setSelectedPayment(transaction)} onKeyDown={(event) => { if (tab === 'payments' && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); setSelectedPayment(transaction) } }}><span className="student-wallet-page__transaction-icon">S</span><div><strong>{tab === 'payments' ? 'Payment' : transaction.reference}</strong>{tab === 'payments' && <small>{transaction.reference}</small>}<em className={`is-${transaction.status.toLowerCase()}`}>{transaction.status}</em></div><p><b>{transaction.amount}</b><small>{transaction.date}</small></p></article>
						</div>)}</div> : <div className="student-wallet-page__empty-state"><CreditCard size={58} strokeWidth={1.4} /><p>Your commission settlements will display here.</p><span>Activate Wallet to get started</span></div>}
						{walletActive && <footer className="student-wallet-page__pagination"><span>Page <b>1</b> of 10</span><div><button type="button" disabled>Previous</button><button type="button">Next</button></div></footer>}
					</div>
				</div>
			</div>
		</section>
		{editWalletModalOpen && <EditWalletModal onClose={() => setEditWalletModalOpen(false)} onSaved={() => setEditWalletModalOpen(false)} />}
		{topUpModalOpen && <SharedTopUpModal onClose={() => setTopUpModalOpen(false)} />}
		{activationModalOpen && <SharedWalletActivationModal onClose={() => setActivationModalOpen(false)} onSaved={() => { setActivationModalOpen(false); window.location.reload() }} />}
		{selectedPayment && <SharedPaymentDetailsModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />}
		{resetPinModalOpen && <SharedResetPinRequestModal onClose={() => setResetPinModalOpen(false)} onContinue={() => { window.sessionStorage.setItem('sqooli-student-reset-pin-requested', 'true'); window.location.href = '/student/wallet/reset-pin' }} />}
	</StudentDashboardLayout>
}
