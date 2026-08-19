import React, { useState } from 'react'
import { Check, Megaphone, HeartHandshake, X } from 'lucide-react'
import '../../styles/pages/landing/landing.css'
import '../../styles/responsive/final-mobile.css'
import '../../styles/pages/landing/partners.css'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

// Import All Partner Asset Images from Directory
import heroKidsImg from '../../assets/images/partners/2573792_1580 1.webp'
import pointingGirlImg from '../../assets/images/partners/small-school-girl-pointing-up 2.webp'
import heroBlobsImg from '../../assets/images/partners/Group.png'
import heroCrownImg from '../../assets/images/partners/Group (1).png'
import contactBlobsImg from '../../assets/images/partners/Group (2).png'
import contactPillsImg from '../../assets/images/partners/2.png'
import lightningImg from '../../assets/images/partners/flash-light.png'
import burstLinesImg from '../../assets/images/partners/Highlight_05.png'
import timelineLineImg from '../../assets/images/partners/Frame 2085665757.png'
import PartnerLogos from '../../components/PartnerLogos'

export default function PartnersPage() {
  const [partnerType, setPartnerType] = useState<string>('Media')
  const [orgName, setOrgName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [notice, setNotice] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orgName || !email) {
      setNotice('Please fill in your Organization Name and Email Address.')
      return
    }
    setNotice('Thank you! Your partnership request has been submitted successfully.')
    setOrgName('')
    setEmail('')
    setPhone('')
    setMessage('')
    setTimeout(() => setNotice(''), 4000)
  }

  return (
    <div className="partners-page-wrapper">
      {/* Notice Toast */}
      {notice && (
        <div className="partners-toast" role="status" aria-live="polite">
          <span>{notice}</span>
          <button onClick={() => setNotice('')} aria-label="Close notification">
            <X size={16} />
          </button>
        </div>
      )}

      <Header />

      {/* HERO SECTION */}
      <section className="partners-hero-section">
        <div className="container partners-hero-container">
          <div className="partners-hero-content">
            <h1 className="partners-hero-title">
              Empower Education.<br />
              <span className="blue-accent">Inspire Change.</span>
            </h1>
            <p className="partners-hero-subtitle">
              Whether you're a content creator, media brand, or corporate donor — Sqooli gives you a way to make education accessible and rewarding for everyone.
            </p>
            <a href="#partner-form" className="partners-btn-primary">
              Become a Partner
            </a>
          </div>

          <div className="partners-hero-visual">
            <img src={heroBlobsImg} alt="" className="hero-blob-bg" />
            <img src={burstLinesImg} alt="" className="hero-burst-lines" />
            <img src={heroCrownImg} alt="Crown" className="hero-crown" />
            <div className="hero-kids-wrapper">
              <img
                src={heroKidsImg}
                alt="Children holding sign board"
                className="hero-kids-img"
              />
              <div className="sign-board-text">
                The Future of Learning
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PARTNER WITH SQOOLI / STATS SECTION */}
      <section className="why-partner-section">
        <div className="container">
          <div className="why-partner-header">
            <h2>Why Partner with Sqooli</h2>
            <p>
              Sqooli empowers digital schools to reach more learners through innovation. Partners help us amplify access, visibility, and opportunity.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-illustration school-bg">
                <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                  <path d="M24 6L4 18V40H44V18L24 6Z" fill="#3b82f6" opacity="0.2" />
                  <path d="M24 4L2 16L24 28L46 16L24 4Z" stroke="#2563eb" strokeWidth="3" strokeLinejoin="round" />
                  <path d="M10 20.5V38H38V20.5" stroke="#2563eb" strokeWidth="3" />
                  <rect x="18" y="26" width="12" height="12" fill="#e0f2fe" stroke="#2563eb" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="stat-label">Schools Digitally Transformed</div>
              <div className="stat-number">100+</div>
            </div>

            <div className="stat-card">
              <div className="stat-illustration tutor-bg">
                <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                  <rect x="6" y="8" width="36" height="24" rx="3" fill="#10b981" opacity="0.2" stroke="#059669" strokeWidth="3" />
                  <circle cx="24" cy="38" r="6" fill="#059669" />
                  <path d="M14 42C14 37 18 34 24 34C30 34 34 37 34 42" stroke="#059669" strokeWidth="3" />
                </svg>
              </div>
              <div className="stat-label">Tutors Empowered</div>
              <div className="stat-number">500+</div>
            </div>

            <div className="stat-card">
              <div className="stat-illustration student-bg">
                <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                  <circle cx="24" cy="16" r="8" fill="#f59e0b" opacity="0.2" stroke="#d97706" strokeWidth="3" />
                  <path d="M10 40C10 32 16 28 24 28C32 28 38 32 38 40" stroke="#d97706" strokeWidth="3" />
                </svg>
              </div>
              <div className="stat-label">Students Reached</div>
              <div className="stat-number">18K+</div>
            </div>

            <div className="stat-card">
              <div className="stat-illustration scholarship-bg">
                <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                  <path d="M8 18L24 10L40 18L24 26L8 18Z" stroke="#8b5cf6" strokeWidth="3" strokeLinejoin="round" fill="#ddd6fe" />
                  <path d="M14 22V32C14 36 18 38 24 38C30 38 34 36 34 32V22" stroke="#8b5cf6" strokeWidth="3" />
                  <circle cx="36" cy="34" r="5" fill="#f59e0b" />
                </svg>
              </div>
              <div className="stat-label">Running Scholarships</div>
              <div className="stat-number">18K+</div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP TYPES SECTION */}
      <section className="partnership-types-section">
        <div className="container partnership-types-grid">
          {/* MARKETING PARTNERS CARD */}
          <div className="partner-type-card marketing-card">
            <div className="partner-card-icon marketing-icon-bg">
              <Megaphone size={28} className="icon-blue" />
            </div>
            <h3>Marketing Partners <span className="subtitle-span">(Media & Influencers)</span></h3>
            <p>
              Marketing is at the cornerstone of our outreach. Media and Influencer partners stand to get perks including
            </p>
            <ul className="perks-list">
              <li>
                <Check size={18} className="check-icon" /> Earn commission for every school or student you bring on board
              </li>
              <li>
                <Check size={18} className="check-icon" /> Access affiliate dashboard and campaign tools
              </li>
              <li>
                <Check size={18} className="check-icon" /> Co-branded media kits, webinars, and educational challenges
              </li>
            </ul>
            <a href="#partner-form" className="partner-card-btn blue-btn">
              Join the Sqooli Affiliate Program
            </a>
          </div>

          {/* IMPACT PARTNERS CARD */}
          <div className="partner-type-card impact-card">
            <div className="partner-card-icon impact-icon-bg">
              <HeartHandshake size={28} className="icon-sky" />
            </div>
            <h3>Impact Partners <span className="subtitle-span">(Corporate Sponsors & Donors)</span></h3>
            <p>
              Join us in impacting the future of education through your donations and scholarship for disadvantaged students.
            </p>
            <ul className="perks-list">
              <li>
                <Check size={18} className="check-icon" /> Support digital learning through scholarships for students
              </li>
              <li>
                <Check size={18} className="check-icon" /> Support CSR programs that fund community schools
              </li>
              <li>
                <Check size={18} className="check-icon" /> Receive transparent impact reports and recognition
              </li>
            </ul>
            <a href="#partner-form" className="partner-card-btn sky-btn">
              Support Digital Education
            </a>
          </div>
        </div>
      </section>

      {/* PARTNERS LOGO STRIP */}
      <section className="partners-logo-strip"><PartnerLogos /></section>

      {/* HOW IT WORKS SECTION */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="how-it-works-header">
            <h2>How it works</h2>
            <p>Its easy. Here is a 3 step visual timeline of what to expect by partnering with us</p>
          </div>

          <div className="timeline-container">
            {/* Visual Timeline connector image asset Frame 2085665757.png */}
            <div className="timeline-line-wrapper">
              <img src={timelineLineImg} alt="" className="timeline-line-graphic" />
            </div>

            <div className="timeline-step">
              <div className="step-badge">1</div>
              <div className="step-content">
                <h4>Apply to Partner</h4>
                <p>Reach out to our team to be a partner through our contacts</p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="step-badge">2</div>
              <div className="step-content">
                <h4>Approval & Onboarding</h4>
                <p>Get your account created and access to your personalized dashboard based on type of partnership</p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="step-badge">3</div>
              <div className="step-content">
                <h4>Promote, Fund & Collaborate</h4>
                <p>Track your earnings (marketing partners) and impact (impact partners) on your dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION / CONTACT FORM SECTION */}
      <section className="partners-contact-section" id="partner-form">
        <div className="container partners-contact-container">
          {/* LEFT FORM */}
          <div className="contact-form-side">
            <h2>Ready to Make an Impact? ◡̈</h2>
            <p className="form-subtitle">Join the Sqooli Partners Network today.</p>

            <form onSubmit={handleSubmit} className="partner-form">
              <div className="form-group">
                <label htmlFor="partner-organization">Organization Name</label>
                <input
                  id="partner-organization"
                  type="text"
                  placeholder="Enter organization or personal name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="partner-email">Email Address</label>
                <input
                  id="partner-email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="partner-phone">Phone Number</label>
                <div className="phone-input-wrapper">
                  <div className="country-code-flag">
                    <span className="flag">🇰🇪</span>
                    <span className="code">+254</span>
                    <span className="arrow">▾</span>
                  </div>
                  <input
                    id="partner-phone"
                    type="tel"
                    placeholder="700 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Type of Partnership</label>
                <div className="radio-group">
                  {['Media', 'Influencer', 'Sponsor', 'Donor'].map((type) => (
                    <label key={type} className="radio-label">
                      <input
                        type="radio"
                        name="partnershipType"
                        value={type}
                        checked={partnerType === type}
                        onChange={() => setPartnerType(type)}
                      />
                      <span className="radio-custom"></span>
                      <span className="radio-text">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="partner-message">Message</label>
                <textarea
                  id="partner-message"
                  rows={4}
                  placeholder="Tell us more about how you'd like to collaborate..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="submit-partner-btn">
                Become a Partner
              </button>
            </form>
          </div>

          {/* RIGHT VISUAL SIDE */}
          <div className="contact-visual-side">
            <img src={contactBlobsImg} alt="" className="contact-blob-bg" />
            <img src={contactPillsImg} alt="" className="contact-pills-bg" />
            <img src={lightningImg} alt="" className="contact-lightning" />
            <img
              src={pointingGirlImg}
              alt="School girl pointing up"
              className="pointing-girl-img"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
