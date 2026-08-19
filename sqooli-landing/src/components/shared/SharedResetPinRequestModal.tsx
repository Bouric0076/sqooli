import { X } from 'lucide-react'
import logo from '../../assets/images/student-flow/sqooli-logo-v2.svg'

type Props = { onClose: () => void; onContinue: () => void }

/** Shared confirmation used by every role before entering the PIN reset flow. */
export default function SharedResetPinRequestModal({ onClose, onContinue }: Props) {
    return <div className="shared-modal-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
        <section className="shared-reset-pin-request-modal" role="dialog" aria-modal="true" aria-labelledby="reset-request-title">
            <button type="button" className="shared-reset-pin-request-modal__close" aria-label="Close reset PIN" onClick={onClose}><X size={21} /></button>
            <img src={logo} alt="Sqooli" />
            <h1 id="reset-request-title">Reset PIN</h1>
            <p>We have sent you instructions to your email to reset your PIN</p>
            <button type="button" className="shared-reset-pin-request-modal__continue" onClick={onContinue}>Okay</button>
        </section>
    </div>
}
