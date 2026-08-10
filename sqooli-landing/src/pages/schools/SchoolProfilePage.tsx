import { useState } from 'react'
import { Plus, Minus, Download, Phone, Mail, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import SchoolHeader from './SchoolHeader'
import Footer from '../../components/layout/Footer'
import teacherAvatar from '../../assets/images/whats-popular/teacher.jpg'
import contactHandGraphic from '../../assets/images/schools/lettering contact us hand holding text.png'
import BookSlotModal from '../../components/BookSlotModal'
import '../../styles/pages/schools.css'
import '../../styles/pages/search.css'

const LEADERSHIP = [
  { name: 'Person Name', role: 'Role', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  { name: 'Person Name', role: 'Role', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Person Name', role: 'Role', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  { name: 'Person Name', role: 'Role', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' }
]

const SERVICES = [
  { title: 'Service Name', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid' },
  { title: 'Service Name', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid' },
  { title: 'Service Name', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid' },
  { title: 'Service Name', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid' }
]

const FAQS = [
  { q: 'Is there a free trial available?', a: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.' },
  { q: 'Can I change my plan later?', a: 'Yes, you can upgrade or downgrade your subscription plan at any time directly from your Sqooli dashboard.' },
  { q: 'What is your cancellation policy?', a: 'You can cancel your subscription at any time without any cancellation fees or long-term contracts.' },
  { q: 'Can other info be added to an invoice?', a: 'Yes, custom company or tax IDs can be added to your monthly invoices.' },
  { q: 'How does billing work?', a: 'Billing is billed on a monthly or annual basis depending on your selected tier.' },
  { q: 'How do I change my account email?', a: 'You can change your account email address in your profile settings.' }
]

const TESTIMONIALS = [
  { name: 'Phoenix Baker', text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid"' },
  { name: 'Phoenix Baker', text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid"' },
  { name: 'Phoenix Baker', text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid"' }
]

const CALENDAR_GRID_DAYS: Record<string, number[]> = {
  'January 2023': Array.from({ length: 28 }, (_, index) => index + 1),
  'February 2023': [30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
  'March 2023': Array.from({ length: 28 }, (_, index) => index + 1)
}

const CALENDAR_EVENTS: Record<string, Record<number, string>> = {
  'January 2023': { 4: '8.30 AM Staff Meeting' },
  'February 2023': { 30: '11.00 AM PTO Grad...', 14: '8.30 AM Grade 3 Paren' },
  'March 2023': { 7: '10.00 AM Career Day' }
}

export default function SchoolProfilePage() {
  const [activeSqooliTab, setActiveSqooliTab] = useState<'Classes' | 'Tutors' | 'Questions' | 'Programs' | 'Enrolments'>('Classes')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(10)
  const [calendarMonth, setCalendarMonth] = useState('February 2023')
  const [downloadNotice, setDownloadNotice] = useState('')

  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('The Ultimate Math Camp Kenya April 2026')
  const calendarGridDays = CALENDAR_GRID_DAYS[calendarMonth]
  const calendarEvents = CALENDAR_EVENTS[calendarMonth]
  const miniCalendarDays = calendarMonth === 'February 2023'
    ? [30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 1, 2, 3, 4, 5]
    : Array.from({ length: 35 }, (_, index) => (index % 28) + 1)

  return (
    <div className="schools-page-wrapper">
      <SchoolHeader variant="school-profile" schoolName="[School Name]" />
      <BookSlotModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        courseTitle={selectedCourse}
      />

      {/* Hero Banner (Desktop-109 layout) */}
      <section className="school-profile-banner" id="home">
        <div className="container banner-layout">
          <div className="profile-banner-placeholder">
            IMAGE <br /> 1135.62 X 496
          </div>
          <div>
            <h1 style={{ fontSize: 44, fontWeight: 800, color: '#1e1b4b', margin: 0 }}>
              Welcome to [School Name]
            </h1>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="profile-section" id="about">
        <div className="container">
          <div className="about-grid">
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>About [School Name]</h2>
              <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: 16 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
            <div className="about-image-placeholder">
              IMAGE <br /> 513 X 463
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="profile-section bg-alt">
        <div className="container">
          <div className="section-header-centered">
            <h2>Leadership</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid</p>
          </div>

          <div className="leadership-grid">
            {LEADERSHIP.map((leader, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <img src={leader.avatar} alt={leader.name} className="leader-circle-avatar" />
                <h4 style={{ margin: '8px 0 4px', fontSize: 16, fontWeight: 700 }}>{leader.name}</h4>
                <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="profile-section">
        <div className="container">
          <div className="section-header-centered">
            <h2>Services</h2>
          </div>

          <div className="services-grid">
            {SERVICES.map((service, i) => (
              <div key={i} className="service-card">
                <div className="service-card-image" style={{ background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: 700 }}>
                  IMAGE
                </div>
                <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>{service.title}</h4>
                <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery (Asymmetric Layout matching Desktop-109) */}
      <section className="profile-section bg-alt">
        <div className="container">
          <div className="section-header-centered">
            <h2>Photo Gallery</h2>
          </div>

          <div className="gallery-asymmetric-grid">
            <div className="gallery-col">
              <div className="gallery-block"></div>
              <div className="gallery-block"></div>
            </div>
            <div className="gallery-col">
              <div className="gallery-block"></div>
              <div className="gallery-block"></div>
            </div>
            <div className="gallery-col">
              <div className="gallery-block tall"></div>
            </div>
          </div>
        </div>
      </section>

      {/* [School Name] on Sqooli */}
      <section className="profile-section">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>[School Name] on Sqooli</h2>
            <p style={{ color: '#64748b' }}>Access classes, tutors and more seamlessly via our Sqooli profile</p>
          </div>

          <div className="filter-mode-tabs" style={{ marginBottom: 32 }}>
            {(['Classes', 'Tutors', 'Questions', 'Programs', 'Enrolments'] as const).map(t => (
              <button
                key={t}
                className={activeSqooliTab === t ? 'active' : ''}
                type="button"
                aria-selected={activeSqooliTab === t}
                onClick={() => setActiveSqooliTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {activeSqooliTab === 'Classes' && (
            <div className="services-grid profile-courses-grid">
              {[1, 2, 3, 4].map(id => (
                <div key={id} className="service-card" style={{ padding: 16 }}>
                  <div style={{ height: 130, borderRadius: 8, background: '#e0f2fe', marginBottom: 12, overflow: 'hidden' }}>
                    <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=300&q=80" alt="Course" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 6px' }}>The Ultimate Math Camp Kenya April 2026</h4>
                  <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 8px' }}>Jane Doe</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: 14 }}>KES 200.00</strong>
                    <button className="btn-action-outline" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => { setSelectedCourse('The Ultimate Math Camp Kenya April 2026'); setBookingModalOpen(true) }}>
                      Book a Slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeSqooliTab === 'Tutors' && (
            <div className="services-grid profile-courses-grid">
              {[1, 2, 3, 4].map(id => (
                <article key={id} className="service-card" style={{ padding: 16, textAlign: 'center' }}>
                  <img src={teacherAvatar} alt="Tutor profile" style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', margin: '8px auto 12px' }} />
                  <h4 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px' }}>Lucy Atieno</h4>
                  <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 12px' }}>Mathematics tutor</p>
                  <a href="/tutors/profile" className="btn-action-outline" style={{ fontSize: 11, padding: '6px 12px' }}>View Tutor</a>
                </article>
              ))}
            </div>
          )}
          {['Questions', 'Programs', 'Enrolments'].includes(activeSqooliTab) && (
            <div className="profile-tab-empty" role="status">
              <h3>{activeSqooliTab} from [School Name]</h3>
              <p>{activeSqooliTab === 'Questions' ? 'Browse common questions and answers about this school.' : `No ${activeSqooliTab.toLowerCase()} are available yet.`}</p>
              {activeSqooliTab === 'Questions' && <a href="#profile-faq" className="btn-action-outline">View FAQs</a>}
            </div>
          )}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="profile-section bg-alt" id="profile-faq">
        <div className="container">
          <div className="section-header-centered">
            <h2>Frequently Asked Questions</h2>
            <p>If you have questions we have not addressed please reach out</p>
          </div>

          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12,
                  marginBottom: 12, overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '18px 24px', background: 'none', border: 0,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontWeight: 700, fontSize: 15, cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? <Minus size={18} color="#2b3990" /> : <Plus size={18} color="#64748b" />}
                </button>

                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="profile-section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h2>Testimonials</h2>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="btn-action-outline"
                style={{ width: 40, height: 40, borderRadius: '50%', padding: 0, display: 'grid', placeItems: 'center' }}
                onClick={() => setTestimonialIndex(i => (i === 0 ? TESTIMONIALS.length - 1 : i - 1))}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="btn-action-outline"
                style={{ width: 40, height: 40, borderRadius: '50%', padding: 0, display: 'grid', placeItems: 'center' }}
                onClick={() => setTestimonialIndex(i => (i === TESTIMONIALS.length - 1 ? 0 : i + 1))}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((item, idx) => (
              <div key={idx} style={{
                background: idx === testimonialIndex ? '#ffffff' : '#f8fafc',
                border: idx === testimonialIndex ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                borderRadius: 16, padding: 24, transition: 'all 0.2s ease',
                boxShadow: idx === testimonialIndex ? '0 10px 25px rgba(59,130,246,0.15)' : 'none'
              }}>
                <img src={teacherAvatar} alt="Testimonial" style={{ width: 180, height: 140, borderRadius: 12, objectFit: 'cover', marginBottom: 16 }} />
                <h4 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700 }}>{item.name}</h4>
                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section matching contact-design1.png */}
      <section className="profile-section bg-alt" id="contact">
        <div className="container">
          <div className="contact-card-container">
            <img src={contactHandGraphic} alt="Contact Us Graphic" className="contact-hand-graphic" />
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1e1b4b', marginBottom: 12 }}>Contact Us</h2>
            <p style={{ color: '#475569', fontSize: 16, maxWidth: 540, marginBottom: 32, lineHeight: 1.6 }}>
              Want to learn more about [school name], contact them via the following details.
            </p>

            <div className="contact-items-row">
              <div className="contact-info-item">
                <Phone className="contact-icon-wrap" size={20} />
                <div>
                  <span>Telephone</span>
                  <strong>0700 000 000</strong>
                </div>
              </div>

              <div className="contact-info-item">
                <Mail className="contact-icon-wrap" size={20} />
                <div>
                  <span>Email Address</span>
                  <strong>schoolname@gmail.com</strong>
                </div>
              </div>

              <div className="contact-info-item">
                <MapPin className="contact-icon-wrap" size={20} />
                <div>
                  <span>Physical Address</span>
                  <strong>11 Office Rd</strong>
                </div>
              </div>
            </div>
          </div>

          <div id="admissions" style={{ marginTop: 40 }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Downloads</h3>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[1, 2, 3].map(id => (
                <a
                  key={id}
                  href="#download"
                  className="btn-action-outline"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 20px',
                    borderRadius: 99, background: '#fff'
                  }}
                  onClick={e => { e.preventDefault(); setDownloadNotice('Admission form download is ready when document storage is connected.') }}
                >
                  <Download size={16} color="#2b3990" />
                  <span>2026 admission forms</span>
                </a>
              ))}
            </div>
            {downloadNotice && <p role="status" className="filter-notice">{downloadNotice}</p>}
          </div>
        </div>
      </section>

      {/* Timetable Calendar Section matching timetable-design.png */}
      <section className="profile-section">
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#1e1b4b', marginBottom: 24 }}>Timetable Calendar</h2>

          <div className="timetable-calendar-container">
            {/* Left Column: Mini Month Calendar & Key Card */}
            <div className="timetable-left-col">
              <div className="mini-month-card">
                <div className="mini-month-header">
                  <button type="button" aria-label="Previous month" onClick={() => setCalendarMonth('January 2023')}><ChevronLeft size={16} /></button>
                  <span>{calendarMonth}</span>
                  <button type="button" aria-label="Next month" onClick={() => setCalendarMonth('March 2023')}><ChevronRight size={16} /></button>
                </div>
                <div className="mini-month-days-header">
                  <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                </div>
                <div className="mini-month-grid">
                  {miniCalendarDays.map((d, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`mini-day-cell ${selectedCalendarDate === d ? 'selected' : ''}`}
                      onClick={() => setSelectedCalendarDate(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mini-key-card">
                <h4>Key</h4>
                <div className="key-item">
                  <div className="key-pill"></div>
                  <span>School Event</span>
                </div>
              </div>
            </div>

            {/* Right Column: Month Grid View */}
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 20 }}>{calendarMonth}</h3>
              <div className="timetable-month-grid-card">
                <div className="month-grid-header">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>

                <div className="month-grid-cells">
                  {calendarGridDays.map((dayNum, idx) => (
                    <div key={`${calendarMonth}-${idx}`} className="grid-cell-day">
                      <span className={dayNum === selectedCalendarDate ? 'day-badge-num' : 'day-num'}>{dayNum}</span>
                      {calendarEvents[dayNum] && <div className="event-purple-tag">{calendarEvents[dayNum]}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
