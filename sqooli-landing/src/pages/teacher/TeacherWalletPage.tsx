import { ArrowDownToLine, ArrowLeft, ArrowUpFromLine, Building2, CreditCard, EyeOff, Filter, MoreVertical, Pencil, Search, WalletCards, X } from 'lucide-react'
import { useState } from 'react'
import TeacherDashboardLayout from './TeacherDashboardLayout'
import TeacherWalletActivationModal from './TeacherWalletActivationModal'
import TeacherWithdrawModal from './TeacherWithdrawModal'
import SharedPaymentDetailsModal from '../../components/shared/SharedPaymentDetailsModal'
import SharedResetPinRequestModal from '../../components/shared/SharedResetPinRequestModal'
import SharedTopUpModal from '../../components/shared/SharedTopUpModal'
import speaker from '../../assets/images/student-flow/speaker.svg'
import '../../styles/pages/teacher-wallet.css'
import '../../styles/pages/student-dashboard.css'

type WalletTab = 'earnings' | 'topups' | 'withdrawals'
type Payment = { reference: string; amount: string; date: string; status: 'Complete' | 'Pending' | 'Failed'; title: string; subtitle: string }

const payments: Record<WalletTab, Payment[]> = {
    earnings: [
        { title: 'Commission', subtitle: 'Campaign #123456', reference: '123456', amount: '30.00', date: '16 Feb 2025 11.00 AM', status: 'Complete' },
        { title: 'Referral', subtitle: '#123456', reference: '123457', amount: '30.00', date: '16 Feb 2025 11.00 AM', status: 'Complete' },
        { title: 'Commission', subtitle: 'Campaign #123456', reference: '123458', amount: '30.00', date: '25 Apr 2025 11.00 AM', status: 'Complete' },
    ],
    topups: [
        { title: 'Top-up', subtitle: 'REF#123456', reference: '123456', amount: '30.00', date: '16 Feb 2025 11.00 AM', status: 'Complete' },
        { title: 'Top-up', subtitle: 'REF#123456', reference: '123457', amount: '30.00', date: '16 Feb 2025 11.00 AM', status: 'Pending' },
        { title: 'Top-up', subtitle: 'REF#123456', reference: '123458', amount: '30.00', date: '25 Apr 2025 11.00 AM', status: 'Failed' },
        { title: 'Top-up', subtitle: 'REF#123456', reference: '123459', amount: '30.00', date: '25 Apr 2025 11.00 AM', status: 'Complete' },
    ],
    withdrawals: [
        { title: 'Withdrawal', subtitle: 'REF#123456', reference: '123460', amount: '30.00', date: '16 Feb 2025 11.00 AM', status: 'Complete' },
        { title: 'Withdrawal', subtitle: 'REF#123456', reference: '123461', amount: '30.00', date: '16 Feb 2025 11.00 AM', status: 'Pending' },
        { title: 'Withdrawal', subtitle: 'REF#123456', reference: '123462', amount: '30.00', date: '25 Apr 2025 11.00 AM', status: 'Failed' },
        { title: 'Withdrawal', subtitle: 'REF#123456', reference: '123463', amount: '30.00', date: '25 Apr 2025 11.00 AM', status: 'Complete' },
    ],
}

export default function TeacherWalletPage() {
    const [active, setActive] = useState(() => Boolean(window.sessionStorage.getItem('sqooli-teacher-wallet')))
    const [activationOpen, setActivationOpen] = useState(false)
    const [topUpOpen, setTopUpOpen] = useState(false)
    const [withdrawOpen, setWithdrawOpen] = useState(false)
    const [tab, setTab] = useState<WalletTab>('earnings')
    const [actionsOpen, setActionsOpen] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
    const [resetPinOpen, setResetPinOpen] = useState(false)
    const shownPayments = active ? payments[tab] : []

    return <TeacherDashboardLayout activePath="/teacher/wallet">
        <section className="teacher-wallet-page">
            <a className="teacher-wallet-page__back" href="/teacher/dashboard"><ArrowLeft size={16} /> Back to Dashboard</a>
            <div className="teacher-wallet-page__layout">
                <aside className="teacher-wallet-page__account">
                    <div className="teacher-wallet-page__school-mark"><Building2 size={28} /></div><h2>Mathematic Excellence<br />Academy</h2><b>Online School</b>
                    <p>Contact Information</p><span>+254712 345 678</span><span>mathematicexcel@gmail.com</span><button type="button">Switch Account</button>
                    <div className="teacher-wallet-page__referral"><img src={speaker} alt="" /><strong>Refer &amp; Earn with Sqooli</strong><small>Share your unique link to students &amp; parents to join Sqooli</small><button type="button">Copy Link</button></div>
                </aside>
                <section className="teacher-wallet-page__content">
                    <header><h1>Wallet</h1><p>View your transactions and manage your wallet</p></header>
                    <div className="teacher-wallet-page__columns">
                        <aside className={`teacher-wallet-page__card${active ? ' is-active' : ''}`}>
                            <div className="teacher-wallet-page__balance"><small>A/C 0000000</small><button className="teacher-wallet-page__more" type="button" aria-label="Wallet actions" aria-expanded={actionsOpen} onClick={() => setActionsOpen(value => !value)}><MoreVertical size={19} /></button><span>Available Balance</span><strong>KES 0.00</strong><span>Actual Balance</span><strong>KES 0.00</strong><EyeOff size={19} />{actionsOpen && <div className="teacher-wallet-page__actions"><button type="button" onClick={() => { setActionsOpen(false); setActivationOpen(true) }}><Pencil size={15} /> Edit Wallet Setup</button><button className="is-danger" type="button" onClick={() => { setActionsOpen(false); setResetPinOpen(true) }}><X size={15} /> Reset PIN</button></div>}</div>
                            {active ? <div className="teacher-wallet-page__saved"><span>Saved Method:</span><p>Paybill: 2******7</p><p>Account No: 0**********5463</p><div><button type="button" onClick={() => setWithdrawOpen(true)}><ArrowUpFromLine size={15} /> Withdraw</button><button type="button" onClick={() => setActivationOpen(true)}><Pencil size={15} /> Edit</button></div></div> : <div className="teacher-wallet-page__activate"><p>Activate Wallet to withdraw your earnings</p><button type="button" onClick={() => setActivationOpen(true)}>Activate Wallet</button></div>}
                        </aside>
                        <div className="teacher-wallet-page__history">
                            <label className="teacher-wallet-page__search"><Search size={19} /><input placeholder="Search" /><Filter size={17} /></label>
                            <div className="teacher-wallet-page__panel"><nav><button className={tab === 'earnings' ? 'is-active' : ''} onClick={() => setTab('earnings')} type="button"><WalletCards size={16} /> Earnings</button><button className={tab === 'topups' ? 'is-active' : ''} onClick={() => setTab('topups')} type="button"><ArrowDownToLine size={16} /> Top-Ups</button><button className={tab === 'withdrawals' ? 'is-active' : ''} onClick={() => setTab('withdrawals')} type="button"><ArrowUpFromLine size={16} /> Withdrawals</button></nav>{active && tab === 'topups' && <button className="teacher-wallet-page__quick-action" type="button" onClick={() => setTopUpOpen(true)}><CreditCard size={15} /> Top-up Wallet</button>}{active && tab === 'withdrawals' && <p className="teacher-wallet-page__warning">Withdrawals may take up to 24 hours to reach your account</p>}{shownPayments.length ? <div className="teacher-wallet-page__transactions">{shownPayments.map((item, index) => <button className="teacher-wallet-page__transaction" type="button" key={`${item.reference}-${index}`} onClick={() => setSelectedPayment(item)}><span>S</span><div><strong>{item.title}</strong><small>{item.subtitle} <em className={`is-${item.status.toLowerCase()}`}>{item.status}</em></small></div><p><b>{tab === 'withdrawals' ? '- ' : '+ '}KES {item.amount}</b><small>{item.date}</small></p></button>)}</div> : <div className="teacher-wallet-page__empty"><div className="teacher-wallet-page__empty-art"><WalletCards size={60} /></div><p>Your commission settlements will display here.</p><span>Activate Wallet to get started</span></div>}{active && <footer>Page <b>1</b> of 10 <div><button type="button">Previous</button><button type="button">Next</button></div></footer>}</div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
        {activationOpen && <TeacherWalletActivationModal onClose={() => setActivationOpen(false)} onSaved={() => { setActive(true); setActivationOpen(false) }} />}
        {topUpOpen && <SharedTopUpModal onClose={() => setTopUpOpen(false)} />}
        {withdrawOpen && <TeacherWithdrawModal onClose={() => setWithdrawOpen(false)} />}
        {selectedPayment && <SharedPaymentDetailsModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />}
        {resetPinOpen && <SharedResetPinRequestModal onClose={() => setResetPinOpen(false)} onContinue={() => setResetPinOpen(false)} />}
    </TeacherDashboardLayout>
}
