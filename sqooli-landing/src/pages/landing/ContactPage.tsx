import React, { useState } from 'react'
import { Headphones, Phone, X, CheckCircle2 } from 'lucide-react'
import '../../styles/pages/landing/landing.css'
import '../../styles/responsive/final-mobile.css'
import '../../styles/pages/landing/contact.css'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

export default function ContactPage() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [selectedRole, setSelectedRole] = useState<'Student/ Parent' | 'School' | 'Partner'>('Student/ Parent')
  const [message, setMessage] = useState<string>('')
  const [notice, setNotice] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      setNotice('Please complete all required fields.')
      return
    }
    setNotice('Thank you! Your message has been sent successfully. We will reach back to you shortly.')
    setName('')
    setEmail('')
    setMessage('')
    setTimeout(() => setNotice(''), 4000)
  }

  return (
    <div className="contact-page-wrapper">
      {notice && (
        <div className="contact-toast-notice">
          <CheckCircle2 size={18} />
          <span>{notice}</span>
          <button onClick={() => setNotice('')} aria-label="Close notification">
            <X size={16} />
          </button>
        </div>
      )}

      <Header />

      <main className="contact-main-content container">
        {/* PAGE HEADER TITLE & SUBTITLE */}
        <div className="contact-page-header">
          <h1 className="contact-main-title">Get in Touch</h1>
          <p className="contact-main-subtitle">
            The Sqooli team is ready to provide the best solution for your specific needs
          </p>
        </div>

        {/* MAIN CONTACT CONTAINER (Matches contact-design.png & responsive.png) */}
        <div className="contact-unified-card">
          {/* LEFT SIDEBAR PANEL: CONTACT INFO (Shows first on desktop, stacked below on mobile in responsive.png) */}
          <div className="contact-info-panel">
            <h3 className="contact-info-title">Contact Info</h3>
            <p className="contact-info-subtitle">
              Reach us through the contacts listed below or send us a message
            </p>

            <div className="contact-info-blocks">
              {/* CHAT OUR SUPPORT TEAM */}
              <div className="contact-info-block">
                <div className="info-icon-badge">
                  <Headphones size={22} />
                </div>
                <h4 className="info-block-heading">Chat our support team</h4>
                <a href="mailto:support@sqooli.com" className="info-block-value">
                  support@sqooli.com
                </a>
              </div>

              {/* CALL US */}
              <div className="contact-info-block">
                <div className="info-icon-badge">
                  <Phone size={22} />
                </div>
                <h4 className="info-block-heading">Call us</h4>
                <p className="info-block-hours">Mon-Fri from 8am to 5pm</p>
                <div className="info-phone-numbers">
                  <a href="tel:+254700000000">2547 00 000 000</a>
                  <a href="tel:+254700000000">2547 00 000 000</a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: REACH US FORM */}
          <div className="contact-form-panel">
            <h2 className="reach-us-title">Reach us</h2>

            <form onSubmit={handleSubmit} className="reach-us-form" noValidate>
              {/* NAME FIELD */}
              <div className="contact-field-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=""
                  required
                />
              </div>

              {/* EMAIL ADDRESS FIELD */}
              <div className="contact-field-group">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  required
                />
              </div>

              {/* SELECT ONE RADIO GROUP */}
              <div className="contact-field-group">
                <span className="contact-group-label" id="contact-role-label">Select One</span>
                <div className="role-radio-group" role="radiogroup" aria-labelledby="contact-role-label">
                  {(['Student/ Parent', 'School', 'Partner'] as const).map((role) => {
                    const isSelected = selectedRole === role
                    return (
                      <button
                        key={role}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        className={`role-radio-pill ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedRole(role)}
                      >
                        <span className={`custom-radio-circle ${isSelected ? 'checked' : ''}`}>
                          {isSelected && <span className="radio-inner-dot" />}
                        </span>
                        <span className="role-radio-label">{role}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* MESSAGE FIELD */}
              <div className="contact-field-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder=""
                  rows={5}
                  required
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="contact-submit-row">
                <button type="submit" className="btn-reach-us-submit">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
