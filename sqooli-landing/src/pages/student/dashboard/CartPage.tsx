import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react'
import { useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import '../../../styles/pages/student-cart.css'
import MakePaymentModal from './MakePaymentModal'

type CartItem = { id: number; name: string; code: string; quantity: number; total: string }

const initialItems: CartItem[] = [
	{ id: 1, name: 'Credits', code: 'PRO-1234', quantity: 100, total: 'KES 1,302.00' },
	{ id: 2, name: 'Credits', code: 'PRO-1234', quantity: 100, total: 'KES 1,302.00' },
]

export default function CartPage() {
	const [items, setItems] = useState(initialItems)
	const [voucher, setVoucher] = useState('')
	const [notice, setNotice] = useState('')
	const [paymentOpen, setPaymentOpen] = useState(false)
	const removeItem = (id: number) => setItems(current => current.filter(item => item.id !== id))
	const applyVoucher = (event: React.FormEvent) => {
		event.preventDefault()
		setNotice(voucher.trim() ? `Voucher ${voucher.trim()} applied.` : 'Enter a voucher code to apply.')
	}

	return <StudentDashboardLayout showSidebar={false} activePath="/student/cart">
		<section className="student-cart-page" aria-labelledby="student-cart-title">
			<a className="student-cart-page__back" href="/student"><ArrowLeft size={17} /> Back to Dashboard</a>
			<div className="student-cart-page__heading"><h1 id="student-cart-title">Shopping Cart</h1><span>{items.length} {items.length === 1 ? 'item' : 'items'}</span></div>
			<div className="student-cart-page__layout">
				<section className="student-cart-page__items" aria-label="Cart items">
					<div className="student-cart-page__table-head"><span>Product Code</span><span>Quantity</span><span>Total</span><span>Action</span></div>
					{items.length === 0 ? <p className="student-cart-page__empty">Your cart is empty.</p> : items.map(item => <article className="student-cart-page__row" key={item.id}>
						<div className="student-cart-page__product"><span className="student-cart-page__product-icon"><ShoppingBag size={25} /></span><span><strong>{item.name}</strong><small>{item.code}</small></span></div>
						<span>{item.quantity}</span><strong>{item.total}</strong><button type="button" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)}><Trash2 size={18} /></button>
					</article>)}
				</section>
				<aside className="student-cart-page__summary" aria-labelledby="cart-summary-title">
					<h2 id="cart-summary-title">Order Summary</h2>
					<form className="student-cart-page__voucher" onSubmit={applyVoucher}><input value={voucher} onChange={event => setVoucher(event.target.value)} placeholder="Discount Voucher" aria-label="Discount voucher" /><button type="submit">Apply</button></form>
					{notice && <p className="student-cart-page__notice" role="status">{notice}</p>}
					<div className="student-cart-page__totals"><p><span>Sub Total</span><b>KES 1,452.00</b></p><p><span>Discount</span><b>KES 200.00</b></p><p className="is-total"><span>Total</span><b>KES 1,252.00</b></p></div>
					<button type="button" className="student-cart-page__checkout" onClick={() => setPaymentOpen(true)} disabled={items.length === 0}>Checkout Now</button>
				</aside>
			</div>
		</section>
		{paymentOpen && <MakePaymentModal onClose={() => setPaymentOpen(false)} />}
	</StudentDashboardLayout>
}
