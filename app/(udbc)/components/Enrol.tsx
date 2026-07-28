import './Enrol.css';
import { photo5 } from '../assets/images';

const STEPS = [
  { icon: '⚏', title: 'Scan or Visit', desc: 'Scan the QR code on our flier or visit udbc.sqooli.africa. No app needed.', tint: 'blue' },
  { icon: '📞', title: 'Register', desc: 'Enter name, phone & email. Get a 6-digit OTP via SMS to verify.', tint: 'yellow' },
  { icon: '📋', title: 'Choose Grade', desc: 'Select Certificate or Diploma and your starting grade. G1 recommended for new students.', tint: 'blue' },
  { icon: '💰', title: 'Pay', desc: 'Pay via M-PESA, Tigopesa, or Airtel Money. Instant confirmation.', tint: 'yellow' },
  { icon: '🎓', title: 'Start Learning', desc: 'Welcome Kit delivered to WhatsApp & email instantly. First lesson ready in minutes.', tint: 'blue' },
];

const PAYMENTS = [
  ['M-PESA', 'Tanzania (primary) — STK Push to your phone', 'mpesa'],
  ['Tigo Pesa', 'Tanzania — same digital wallet flow', 'tigopesa'],
  ['Airtel Money', 'Tanzania — Airtel subscribers', 'airtel'],
  ['M-PESA Kenya', 'Kenya — KES equivalent at checkout', 'mpesa'],
  ['Voucher / Lesson Code', 'All countries — church-distributed codes', 'voucher'],
];

const REFERRAL_REWARDS = [
  ['1 successful referral', '1 week free grade extension'],
  ['3 successful referrals', '3 weeks free grade extension'],
  ['5 successful referrals', 'One grade fee waiver'],
];

export default function Enrol() {
  return (
    <section id="enrol" className="enrol section-pad">
      <div className="container">
        <div className="enrol__top">
          <div>
            <p className="eyebrow">How to Enrol</p>
            <h2 className="enrol__title">Enrolment takes under 10 minutes</h2>
            <p className="enrol__lead">Start from your phone. No paperwork. No travel.</p>

            <div className="enrol__steps">
              {STEPS.map((s) => (
                <div className="estep" key={s.title}>
                  <span className={`estep__icon estep__icon--${s.tint}`}>{s.icon}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="https://udbc.sqooli.africa/intake-landing" className="btn btn-yellow enrol__cta">Enrol Now – July 2026 Intake</a>
          </div>

          <div className="enrol__media">
            <img src={photo5.src} alt="Students enrolling at UDBC" />
          </div>
        </div>

        <div className="enrol__tables">
          <div>
            <p className="eyebrow">Payment Options</p>
            <div className="ptable">
              <div className="ptable__row ptable__head"><span>Method</span><span>Available In</span></div>
              {PAYMENTS.map(([method, avail, brand]) => (
                <div className="ptable__row" key={method}>
                  <span className={`ptable__method ptable__method--${brand}`}>{method}</span>
                  <span>{avail}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Referral Rewards Programme</p>
            <div className="ptable">
              <div className="ptable__row ptable__head"><span>Referrals Made</span><span>Reward</span></div>
              {REFERRAL_REWARDS.map(([referrals, reward]) => (
                <div className="ptable__row" key={referrals}>
                  <span>{referrals}</span>
                  <span>{reward}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
