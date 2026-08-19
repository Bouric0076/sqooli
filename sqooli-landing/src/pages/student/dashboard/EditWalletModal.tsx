import { Check, X } from 'lucide-react'
import { useState } from 'react'

type EditWalletModalProps = { onClose: () => void; onSaved?: () => void }

export default function EditWalletModal({ onClose, onSaved }: EditWalletModalProps) {
	const [method, setMethod] = useState<'mpesa' | 'airtel'>('mpesa')
	const [phone, setPhone] = useState('')
	const saveChanges = (event: React.FormEvent) => {
		event.preventDefault()
		window.sessionStorage.setItem('sqooli-student-wallet-method', JSON.stringify({ method, phone }))
		onSaved?.()
	}

	return <div className="student-dashboard__modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
		<section className="student-wallet-edit-modal" role="dialog" aria-modal="true" aria-labelledby="edit-wallet-title">
			<header className="student-wallet-edit-modal__header"><div><h1 id="edit-wallet-title">Edit Wallet Setup</h1><p>Setup withdrawal settings to access your earnings</p></div><button type="button" className="student-profile-modal__close" aria-label="Close wallet setup" onClick={onClose}><X size={22} /></button></header>
			<form onSubmit={saveChanges}>
				<fieldset><legend>Select payment method</legend><div className="shared-wallet-modal__methods">
					<button type="button" className={method === 'mpesa' ? 'is-selected' : ''} onClick={() => setMethod('mpesa')}><b className="shared-wallet-modal__method-mark mpesa">MPESA</b><span>MPESA</span>{method === 'mpesa' && <Check size={15} />}</button>
					<button type="button" className={method === 'airtel' ? 'is-selected' : ''} onClick={() => setMethod('airtel')}><b className="shared-wallet-modal__method-mark airtel">A</b><span>Airtel Money</span>{method === 'airtel' && <Check size={15} />}</button>
				</div></fieldset>
				<label className="student-wallet-edit-modal__field"><span>{method === 'mpesa' ? 'MPESA' : 'Airtel Money'} Phone Number</span><span className="shared-wallet-modal__phone"><b>🇰🇪</b><i>⌄</i><em>+254</em><input value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 9))} inputMode="numeric" aria-label="Wallet phone number" /></span><small>This phone number will receive an STK push when you request to top-up wallet</small></label>
				<button className="student-dashboard__go student-wallet-edit-modal__submit" type="submit">Save Changes</button>
			</form>
		</section>
	</div>
}
