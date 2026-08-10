import { useState } from 'react'
import { ArrowLeft, X, Check, Calendar, ShieldCheck } from 'lucide-react'
import '../styles/pages/search.css'

interface BookSlotModalProps {
  isOpen: boolean
  onClose: () => void
  courseTitle?: string
  tutorName?: string
  price?: string
}

export default function BookSlotModal({
  isOpen,
  onClose,
  courseTitle = 'The Ultimate Math Camp Kenya April 2026',
  tutorName = 'Lucy Atieno',
  price = 'KES 12,000.00'
}: BookSlotModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)

  // Step 1 Form State
  const [role, setRole] = useState<'Student' | 'Parent'>('Student')
  const [studentName, setStudentName] = useState('John Doe')
  const [parentName, setParentName] = useState('Sarah Doe')
  const [email, setEmail] = useState('student@example.com')
  const [phone, setPhone] = useState('0712345678')
  const [program, setProgram] = useState(courseTitle)
  const [bookingType, setBookingType] = useState<'40_lessons' | 'custom'>('40_lessons')
  const [startDate, setStartDate] = useState('2026-04-15')

  // Step 3 Payment State
  const [paymentMethod, setPaymentMethod] = useState<'MPESA' | 'Airtel'>('MPESA')
  const [mpesaPhone, setMpesaPhone] = useState('0712345678')
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [formError, setFormError] = useState('')

  const handleClose = () => {
    setStep(1)
    setPaymentSuccess(false)
    setFormError('')
    onClose()
  }

  if (!isOpen) return null

  const handleSendSTK = () => {
    if (mpesaPhone.replace(/\D/g, '').length < 9) {
      setFormError('Enter a valid Kenyan mobile number before sending the payment request.')
      return
    }
    setFormError('')
    setPaymentSuccess(true)
    setTimeout(() => {
      setPaymentSuccess(false)
      setStep(1)
      onClose()
    }, 2500)
  }

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div
        className="modal-picker-card"
        style={{
          maxWidth: 960,
          width: '92%',
          height: '88vh',
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          borderRadius: 24,
          padding: 0
        }}
      >
        {/* Left Sidebar Steps Tracker matching Desktop-116 */}
        <div style={{
          background: '#f8fafc',
          borderRight: '1px solid #e2e8f0',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ marginBottom: 28 }}>
              <button
                onClick={handleClose}
                className="back-link-clean"
                style={{ background: 'none', border: 0, cursor: 'pointer', padding: 0 }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '16px 0 0', color: '#0f172a' }}>Book a Slot</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Step 1 Indicator */}
              <div style={{ borderLeft: `3px solid ${step >= 1 ? '#0284c7' : '#cbd5e1'}`, paddingLeft: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: step >= 1 ? '#0284c7' : '#94a3b8' }}>
                  Step 1/3 {step > 1 && <Check size={12} style={{ display: 'inline' }} />}
                </span>
                <div style={{ fontSize: 13, fontWeight: step === 1 ? 700 : 500, color: step === 1 ? '#0f172a' : '#64748b' }}>
                  Booking Information
                </div>
              </div>

              {/* Step 2 Indicator */}
              <div style={{ borderLeft: `3px solid ${step >= 2 ? '#0284c7' : '#cbd5e1'}`, paddingLeft: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: step >= 2 ? '#0284c7' : '#94a3b8' }}>
                  Step 2/3 {step > 2 && <Check size={12} style={{ display: 'inline' }} />}
                </span>
                <div style={{ fontSize: 13, fontWeight: step === 2 ? 700 : 500, color: step === 2 ? '#0f172a' : '#64748b' }}>
                  Preview
                </div>
              </div>

              {/* Step 3 Indicator */}
              <div style={{ borderLeft: `3px solid ${step === 3 ? '#0284c7' : '#cbd5e1'}`, paddingLeft: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: step === 3 ? '#0284c7' : '#94a3b8' }}>
                  Step 3/3
                </span>
                <div style={{ fontSize: 13, fontWeight: step === 3 ? 700 : 500, color: step === 3 ? '#0f172a' : '#64748b' }}>
                  Payment
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: 11, color: '#94a3b8' }}>
            Sqooli Protected Booking
          </div>
        </div>

        {/* Right Main Content Pane */}
        <div style={{ padding: '36px 40px', overflowY: 'auto', position: 'relative' }}>
          <button
            onClick={handleClose}
            style={{
              position: 'absolute', top: 24, right: 24, background: 'none', border: 0,
              cursor: 'pointer', color: '#64748b'
            }}
          >
            <X size={20} />
          </button>

          {paymentSuccess ? (
            <div style={{ padding: '60px 0', textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', color: '#16a34a',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'
              }}>
                <ShieldCheck size={36} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>STK Push Sent!</h2>
              <p style={{ color: '#475569', fontSize: 15, maxWidth: 400, margin: '0 auto 20px' }}>
                Please check your phone ({mpesaPhone}) and enter your M-PESA PIN to complete payment of <strong>{price}</strong>.
              </p>
            </div>
          ) : step === 1 ? (
            /* STEP 1: Booking Information matching Desktop-116 */
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>Booking Information</h2>
              <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>Add basic information about your resource</p>

              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Student's Information</h4>
              <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                  <input type="radio" name="role" checked={role === 'Student'} onChange={() => setRole('Student')} />
                  <span>Student</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                  <input type="radio" name="role" checked={role === 'Parent'} onChange={() => setRole('Parent')} />
                  <span>Parent / Guardian</span>
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Student Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    style={{ width: '100%', height: 44, padding: '0 14px', borderRadius: 99, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Parent Name (Optional)</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={e => setParentName(e.target.value)}
                    style={{ width: '100%', height: 44, padding: '0 14px', borderRadius: 99, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', height: 44, padding: '0 14px', borderRadius: 99, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{ width: '100%', height: 44, padding: '0 14px', borderRadius: 99, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }}
                  />
                </div>
              </div>

              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Booking Details</h4>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Program</label>
                <select
                  value={program}
                  onChange={e => setProgram(e.target.value)}
                  style={{ width: '100%', height: 44, padding: '0 14px', borderRadius: 99, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none', background: '#fff' }}
                >
                  <option value={courseTitle}>{courseTitle} ({tutorName})</option>
                  <option value="Digital E-Learning Portal">Digital E-Learning Portal</option>
                  <option value="STEM & Robotics Lab">STEM & Robotics Lab</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {/* 40 Lesson Package */}
                <div
                  onClick={() => setBookingType('40_lessons')}
                  style={{
                    padding: 16, border: `2px solid ${bookingType === '40_lessons' ? '#0284c7' : '#e2e8f0'}`,
                    background: bookingType === '40_lessons' ? '#f0f9ff' : '#fff',
                    borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <input type="radio" checked={bookingType === '40_lessons'} readOnly />
                    <div>
                      <strong style={{ fontSize: 14, display: 'block' }}>40 Lesson Package</strong>
                      <span style={{ fontSize: 12, color: '#64748b' }}>All lessons in the sub-programm bundled together</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ fontSize: 14, color: '#0f172a' }}>KES 12,000.00</strong>
                    <span style={{ fontSize: 11, color: '#ef4444', textDecoration: 'line-through', marginLeft: 6 }}>KES 14,000.00</span>
                    <span style={{ display: 'block', background: '#dcfce7', color: '#16a34a', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, marginTop: 2 }}>
                      Save 10%
                    </span>
                  </div>
                </div>

                {/* Customized */}
                <div
                  onClick={() => setBookingType('custom')}
                  style={{
                    padding: 16, border: `2px solid ${bookingType === 'custom' ? '#0284c7' : '#e2e8f0'}`,
                    background: bookingType === 'custom' ? '#f0f9ff' : '#fff',
                    borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <input type="radio" checked={bookingType === 'custom'} readOnly />
                    <div>
                      <strong style={{ fontSize: 14, display: 'block' }}>Customized</strong>
                      <span style={{ fontSize: 12, color: '#64748b' }}>Pick specific subjects and number of lessons</span>
                    </div>
                  </div>
                  <strong style={{ fontSize: 13, color: '#0f172a' }}>From KES 500.00/ lesson</strong>
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Preferred Start Date</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    style={{ width: '100%', height: 44, padding: '0 16px', borderRadius: 99, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }}
                  />
                  <Calendar size={16} color="#94a3b8" style={{ position: 'absolute', right: 16, top: 14, pointerEvents: 'none' }} />
                </div>
              </div>

              {formError && <p className="booking-form-error" role="alert">{formError}</p>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <button className="btn-action-outline" onClick={handleClose}>Back</button>
                <button
                  className="btn-sidebar-apply"
                  style={{ width: 'auto', padding: '0 32px' }}
                  onClick={() => {
                    if (!studentName.trim() || !email.trim() || !phone.trim() || !program.trim() || !startDate) {
                      setFormError('Complete the required booking details before continuing.')
                      return
                    }
                    setFormError('')
                    setStep(2)
                  }}
                >
                  Save & Continue →
                </button>
              </div>
            </div>
          ) : step === 2 ? (
            /* STEP 2: Preview matching Desktop-117 */
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>Preview</h2>
              <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>Confirm your details</p>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, marginBottom: 24 }}>
                <h4 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>Student's Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13 }}>
                  <div><span style={{ color: '#64748b' }}>I Am A:</span> <strong>{role}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Student Name:</span> <strong>{studentName}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Parent Name:</span> <strong>{parentName || 'N/A'}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Email Address:</span> <strong>{email}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Phone Number:</span> <strong>{phone}</strong></div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, marginBottom: 28 }}>
                <h4 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>Booking Details</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13 }}>
                  <div><span style={{ color: '#64748b' }}>Program:</span> <strong>{program}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Booking Type:</span> <strong>{bookingType === '40_lessons' ? '40 Lesson Package' : 'Customized'}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Preferred Start Date:</span> <strong>{startDate}</strong></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <button className="btn-action-outline" onClick={() => setStep(1)}>← Back</button>
                <button
                  className="btn-sidebar-apply"
                  style={{ width: 'auto', padding: '0 32px' }}
                  onClick={() => setStep(3)}
                >
                  Confirm & Pay →
                </button>
              </div>
            </div>
          ) : (
            /* STEP 3: Payment matching Desktop-118 & Frame 2085664806 */
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>Make Payment</h2>
              <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>Confirm your details</p>

              <div style={{ background: '#f8fafc', borderRadius: 16, padding: 24, marginBottom: 24 }}>
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Amount to Pay</span>
                <div style={{ display: 'flex', gap: 4, margin: '6px 0 10px' }}>
                  <span className="periodic-tile tile-s" style={{ width: 22, height: 22, fontSize: 10 }}>s</span>
                  <span className="periodic-tile tile-q" style={{ width: 22, height: 22, fontSize: 10 }}>q</span>
                  <span className="periodic-tile tile-o1" style={{ width: 22, height: 22, fontSize: 10 }}>o</span>
                  <span className="periodic-tile tile-o2" style={{ width: 22, height: 22, fontSize: 10 }}>o</span>
                  <span className="periodic-tile tile-li" style={{ width: 22, height: 22, fontSize: 10 }}>li</span>
                </div>
                <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: '#0f172a' }}>{price}</h1>
              </div>

              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Select payment method</h4>
              <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                <button
                  onClick={() => setPaymentMethod('MPESA')}
                  style={{
                    flex: 1, padding: 12, borderRadius: 12,
                    border: `2px solid ${paymentMethod === 'MPESA' ? '#0284c7' : '#cbd5e1'}`,
                    background: paymentMethod === 'MPESA' ? '#f0f9ff' : '#fff',
                    fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                  }}
                >
                  <span style={{ background: '#16a34a', color: '#fff', padding: '2px 6px', borderRadius: 4, fontSize: 10 }}>M-PESA</span>
                  <span>MPESA</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('Airtel')}
                  style={{
                    flex: 1, padding: 12, borderRadius: 12,
                    border: `2px solid ${paymentMethod === 'Airtel' ? '#0284c7' : '#cbd5e1'}`,
                    background: paymentMethod === 'Airtel' ? '#f0f9ff' : '#fff',
                    fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                  }}
                >
                  <span style={{ background: '#dc2626', color: '#fff', padding: '2px 6px', borderRadius: 4, fontSize: 10 }}>airtel</span>
                  <span>Airtel Money</span>
                </button>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>
                  {paymentMethod} Phone Number
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{
                    height: 44, padding: '0 12px', borderRadius: 99, border: '1px solid #cbd5e1',
                    background: '#f8fafc', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700
                  }}>
                    🇰🇪 +254
                  </div>
                  <input
                    type="tel"
                    value={mpesaPhone}
                    onChange={e => setMpesaPhone(e.target.value)}
                    placeholder="712345678"
                    style={{ flex: 1, height: 44, padding: '0 16px', borderRadius: 99, border: '1px solid #cbd5e1', fontSize: 14, outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16, marginBottom: 28 }}>
                <h5 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700 }}>Or Use Payment Instructions</h5>
                <ol style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: '#475569', lineHeight: 1.6 }}>
                  <li>Go to M-PESA on your phone</li>
                  <li>Select Pay Bill option</li>
                  <li>Enter Business no. <strong>5694730</strong></li>
                  <li>Enter Account no. <strong>YAFEOGL</strong></li>
                  <li>Enter the Amount.</li>
                  <li>Enter your M-PESA PIN and Send</li>
                </ol>
              </div>

              {formError && <p className="booking-form-error" role="alert">{formError}</p>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <button className="btn-action-outline" onClick={() => setStep(2)}>← Back</button>
                <button
                  className="btn-sidebar-apply"
                  style={{ width: 'auto', padding: '0 36px', background: '#0284c7' }}
                  onClick={handleSendSTK}
                >
                  Send STK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
