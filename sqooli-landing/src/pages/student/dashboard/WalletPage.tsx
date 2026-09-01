import { ArrowLeft, CreditCard, EyeOff, MoreVertical, Pencil, Plus, RefreshCw, Search, WalletCards } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StudentDashboardLayout from './StudentDashboardLayout'
import SharedTopUpModal from '../../../components/shared/SharedTopUpModal'
import EditWalletModal from './EditWalletModal'
import SharedWalletActivationModal from '../../../components/shared/SharedWalletActivationModal'
import SharedPaymentDetailsModal from '../../../components/shared/SharedPaymentDetailsModal'
import SharedResetPinRequestModal from '../../../components/shared/SharedResetPinRequestModal'
import { useWalletBalance, useWalletTransactions } from '../../../features/student/wallet.queries'

type Tab = 'topups' | 'payments'
type Transaction = { reference?: string; amount?: number | string; date?: string; status?: string | number; paymentStatus?: string | number; provider?: string; createdAt?: string; paidAt?: string; gatewayResponse?: string }
type PaymentView = { reference: string; amount: string; date: string; status: 'Complete' | 'Pending' | 'Failed' }
type SavedWallet = { method?: 'mpesa' | 'airtel'; phone?: string; pinSet?: boolean }

function extractRecords(payload: unknown): Transaction[] {
	if (Array.isArray(payload)) return payload as Transaction[]
	if (!payload || typeof payload !== 'object') return []
	const record = payload as Record<string, unknown>
	for (const key of ['data', 'items', 'results', 'transactions']) {
		if (Array.isArray(record[key])) return record[key] as Transaction[]
		if (record[key] && typeof record[key] === 'object') {
			const nested = extractRecords(record[key])
			if (nested.length) return nested
		}
	}
	return []
}

function extractAmount(payload: unknown) {
	if (typeof payload === 'number' || typeof payload === 'string') return Number(payload) || 0
	if (!payload || typeof payload !== 'object') return 0
	const record = payload as Record<string, unknown>
	return Number(record.availableBalance ?? record.balance ?? record.actualBalance ?? record.amount ?? 0) || 0
}

function normalizePaymentStatus(transaction: Transaction): PaymentView['status'] {
	// The generated contract represents PaymentStatus as an integer. The API has
	// historically returned both enum values and display strings, so accept both
	// shapes and use settlement fields when they are available.
	if (transaction.paidAt) return 'Complete'
	const raw = transaction.paymentStatus ?? transaction.status
	const value = String(raw ?? '').trim().toLowerCase()
	if (value === '1' || ['complete', 'completed', 'success', 'successful', 'succeeded', 'paid', 'settled'].includes(value)) return 'Complete'
	if (value === '2' || ['failed', 'failure', 'error', 'cancelled', 'canceled', 'rejected'].includes(value)) return 'Failed'
	if (typeof transaction.gatewayResponse === 'string' && /\b(success|successful|completed|paid|settled)\b/i.test(transaction.gatewayResponse)) return 'Complete'
	if (typeof transaction.gatewayResponse === 'string' && /\b(failed|failure|error|cancelled|rejected)\b/i.test(transaction.gatewayResponse)) return 'Failed'
	return 'Pending'
}

function toPaymentView(transaction: Transaction): PaymentView {
	return {
		reference: transaction.reference || 'No reference',
		amount: String(transaction.amount || 0),
		date: transaction.createdAt ? new Date(transaction.createdAt).toLocaleString() : 'Date unavailable',
		status: normalizePaymentStatus(transaction),
	}
}

function extractWalletStatus(payload: unknown): boolean | undefined {
	if (!payload || typeof payload !== 'object') return undefined
	const record = payload as Record<string, unknown>
	for (const key of ['isActive', 'isActivated', 'active', 'walletActive', 'setupComplete']) {
		if (typeof record[key] === 'boolean') return record[key] as boolean
	}
	for (const key of ['data', 'wallet', 'account']) {
		const nested = extractWalletStatus(record[key])
		if (nested !== undefined) return nested
	}
	return undefined
}

function readSavedWallet(): SavedWallet | null {
	try {
		const value = window.sessionStorage.getItem('sqooli-student-wallet')
		return value ? JSON.parse(value) as SavedWallet : null
	} catch { return null }
}

function readWalletMethod(): SavedWallet | null {
	try {
		const value = window.sessionStorage.getItem('sqooli-student-wallet-method')
		return value ? JSON.parse(value) as SavedWallet : null
	} catch { return null }
}

function maskPhone(phone?: string) {
	if (!phone) return 'Phone number unavailable'
	const normalized = phone.replace(/\D/g, '')
	return normalized.length > 4 ? `+254 ${normalized.slice(0, 2)}*****${normalized.slice(-2)}` : phone
}

export default function WalletPage() {
	const navigate = useNavigate()
	const [tab, setTab] = useState<Tab>('topups')
	const [query, setQuery] = useState('')
	const [editWalletModalOpen, setEditWalletModalOpen] = useState(() => new URLSearchParams(window.location.search).has('edit'))
	const [topUpModalOpen, setTopUpModalOpen] = useState(() => new URLSearchParams(window.location.search).has('topup'))
	const [activationModalOpen, setActivationModalOpen] = useState(false)
	const [selectedPayment, setSelectedPayment] = useState<PaymentView | null>(null)
	const [resetPinModalOpen, setResetPinModalOpen] = useState(false)
	const [, refreshWallet] = useState(0)
	const balanceQuery = useWalletBalance()
	const transactionsQuery = useWalletTransactions({ page: 1, pageSize: 50, search: query.trim() || undefined })
	const savedWallet = readSavedWallet()
	const editedWallet = readWalletMethod()
	const balance = extractAmount(balanceQuery.data)
	const transactions = useMemo(() => extractRecords(transactionsQuery.data), [transactionsQuery.data])
	const filteredTransactions = useMemo(() => transactions.filter(item => {
		const reference = `${item.reference || ''} ${item.status || ''} ${item.provider || ''}`.toLowerCase()
		return reference.includes(query.toLowerCase())
	}), [query, transactions])
	const walletStatus = extractWalletStatus(balanceQuery.data)
	const walletActive = savedWallet?.pinSet === true || walletStatus === true || (!balanceQuery.isError && (balance > 0 || transactions.length > 0))
	const savedMethod = editedWallet?.method || savedWallet?.method
	const savedPhone = editedWallet?.phone || savedWallet?.phone
	const isLoading = balanceQuery.isLoading || transactionsQuery.isLoading
	const hasError = balanceQuery.isError || transactionsQuery.isError
	const isRefreshing = balanceQuery.isFetching || transactionsQuery.isFetching
	const formattedBalance = `KES ${balance.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`

	return <StudentDashboardLayout activePath="/student/wallet" showSidebar={false}>
		<section className="student-wallet-page" aria-labelledby="wallet-page-title">
			<Link className="student-wallet-page__back" to="/student"><ArrowLeft size={17} /> Back to Dashboard</Link>
			<h1 id="wallet-page-title">Wallet</h1>
			{isLoading && <p role="status">Loading wallet…</p>}
			{hasError && <div className="student-dashboard__page-state is-error" role="alert"><span className="student-dashboard__page-state-icon"><WalletCards size={20} /></span><h2>We couldn’t load your wallet</h2><p>Something interrupted the connection. Please try again in a moment.</p></div>}
			<div className="student-wallet-page__layout">
				<aside className={`student-wallet-page__balance-card${walletActive ? '' : ' is-empty'}`}>
					{walletActive ? <>
						<div className="student-wallet-page__balance-top"><span>Available Balance</span><button type="button" className="student-wallet-page__overflow" aria-label="Wallet options" onClick={() => setResetPinModalOpen(true)}><MoreVertical size={20} /></button><strong>{formattedBalance}</strong><span>Actual Balance</span><b>{formattedBalance}</b><EyeOff className="student-wallet-page__eye" size={19} /></div>
						<div className="student-wallet-page__saved"><span>Saved top-up method:</span><p><i className={`student-wallet-page__mpesa${savedMethod === 'airtel' ? ' is-airtel' : ''}`}>{savedMethod === 'airtel' ? 'A' : 'MP'}</i>{savedMethod === 'airtel' ? 'Airtel Money' : 'M-PESA'}</p><p>{maskPhone(savedPhone)}</p></div>
						<div className="student-wallet-page__card-actions"><button type="button" onClick={() => setTopUpModalOpen(true)}><Plus size={17} /> Top-up</button><button type="button" onClick={() => setEditWalletModalOpen(true)}><Pencil size={17} /> Edit</button></div>
					</> : <>
						<div className="student-wallet-page__balance-top"><small>A/C 0000000</small><MoreVertical size={20} /><span>Available Balance</span><strong>KES 0.00</strong><span>Actual Balance</span><b>KES 0.00</b><EyeOff className="student-wallet-page__eye" size={19} /></div>
						<div className="student-wallet-page__activate"><p>Activate Wallet to top up method</p><button type="button" onClick={() => setActivationModalOpen(true)} aria-label="Activate Wallet" className="student-dashboard__go">Activate Wallet</button></div>
					</>}
				</aside>
				<div className="student-wallet-page__history">
					<label className="student-wallet-page__search"><Search size={20} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search wallet transactions" />{walletActive && <button type="button" aria-label="Refresh wallet" disabled={isRefreshing} onClick={() => { void Promise.all([balanceQuery.refetch(), transactionsQuery.refetch()]) }}><RefreshCw className={isRefreshing ? 'is-spinning' : ''} size={18} /></button>}</label>
					<div className="student-wallet-page__panel">
						<div className="student-wallet-page__tabs"><button type="button" className={tab === 'topups' ? 'is-active' : ''} onClick={() => setTab('topups')}><WalletCards size={16} /> Top-Ups</button><button type="button" className={tab === 'payments' ? 'is-active' : ''} onClick={() => setTab('payments')}><WalletCards size={16} /> Payments</button></div>
						{walletActive ? <div className="student-wallet-page__transactions">{filteredTransactions.length ? filteredTransactions.map((transaction, index) => <div className="student-wallet-page__group" key={`${transaction.reference || 'transaction'}-${index}`}>
							{index === 0 ? <h2>{transaction.createdAt ? new Date(transaction.createdAt).toLocaleDateString() : 'Recent activity'}</h2> : null}
							<article className={`student-wallet-page__transaction${tab === 'payments' ? ' is-interactive' : ''}`} role={tab === 'payments' ? 'button' : undefined} tabIndex={tab === 'payments' ? 0 : undefined} onClick={() => tab === 'payments' && setSelectedPayment(toPaymentView(transaction))} onKeyDown={(event) => { if (tab === 'payments' && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); setSelectedPayment(toPaymentView(transaction)) } }}><span className="student-wallet-page__transaction-icon">{transaction.provider?.slice(0, 1) || 'S'}</span><div><strong>{tab === 'payments' ? 'Payment' : transaction.reference || 'Wallet transaction'}</strong>{tab === 'payments' && <small>{transaction.reference || 'No reference'}</small>}<em className={`is-${normalizePaymentStatus(transaction).toLowerCase()}`}>{normalizePaymentStatus(transaction)}</em></div><p><b>{transaction.amount === undefined ? '—' : `KES ${Number(transaction.amount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}`}</b><small>{transaction.createdAt ? new Date(transaction.createdAt).toLocaleString() : 'Date unavailable'}</small></p></article>
						</div>) : <div className="student-wallet-page__empty-state"><CreditCard size={58} strokeWidth={1.4} /><p>{query ? 'No wallet activity matches your search.' : 'Your wallet is ready. Transactions will appear here after your first top-up or payment.'}</p>{!query && <span>Wallet activated successfully</span>}</div>}</div> : <div className="student-wallet-page__empty-state"><CreditCard size={58} strokeWidth={1.4} /><p>Your wallet activity will appear here after activation.</p><span>Activate Wallet to get started</span></div>}
						{walletActive && <footer className="student-wallet-page__pagination"><span>Page <b>1</b> of 10</span><div><button type="button" disabled>Previous</button><button type="button">Next</button></div></footer>}
					</div>
				</div>
			</div>
		</section>
		{editWalletModalOpen && <EditWalletModal onClose={() => setEditWalletModalOpen(false)} onSaved={() => { setEditWalletModalOpen(false); refreshWallet((value) => value + 1) }} />}
		{topUpModalOpen && <SharedTopUpModal onClose={() => setTopUpModalOpen(false)} />}
		{activationModalOpen && <SharedWalletActivationModal onClose={() => setActivationModalOpen(false)} onSaved={() => { setActivationModalOpen(false); window.location.reload() }} />}
		{selectedPayment && <SharedPaymentDetailsModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />}
		{resetPinModalOpen && <SharedResetPinRequestModal onClose={() => setResetPinModalOpen(false)} onContinue={() => { window.sessionStorage.setItem('sqooli-student-reset-pin-requested', 'true'); navigate('/student/wallet/reset-pin') }} />}
	</StudentDashboardLayout>
}
