import { useState } from 'react'
import { Check, PlayCircle } from 'lucide-react'
import SchoolHeader from '../schools/SchoolHeader'
import Footer from '../../components/layout/Footer'
import teacherAvatar from '../../assets/images/whats-popular/teacher.webp'
import '../../styles/pages/schools.css'
import '../../styles/pages/search.css'
import '../../styles/pages/tutor-profile.css'

const tabs = ['Programs', 'Classes', 'Reviews'] as const

export default function TutorProfilePage() {
  const [isConnected, setIsConnected] = useState(false)
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Programs')
  const navigateToSection = (tab: (typeof tabs)[number]) => {
    setActiveTab(tab)
    document.getElementById(`tutor-${tab.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="schools-page-wrapper tutor-profile-page">
      <SchoolHeader variant="tutor-profile" />

      <section className="tutor-profile-hero">
        <div className="tutor-profile-cover" aria-hidden="true" />
        <div className="container">
          <div className="tutor-profile-hero-row">
            <img className="tutor-profile-avatar" src={teacherAvatar} alt="Jane Doe" />
            <div className="tutor-profile-hero-content">
              <div className="tutor-profile-heading-row">
                <div className="tutor-profile-heading-copy">
                  <h1>Jane Doe</h1>
                  <div className="tutor-profile-meta">
                    ID: <strong>123456789</strong> <span aria-hidden="true">|</span> Followers: <strong>123</strong> <span aria-hidden="true">|</span> Classes: <strong>12</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className={`tutor-connect-button${isConnected ? ' is-connected' : ''}`}
                  onClick={() => setIsConnected(!isConnected)}
                  aria-pressed={isConnected}
                >
                  {isConnected ? <><Check size={16} aria-hidden="true" /> Connected</> : 'Connect'}
                </button>
              </div>
              <p className="tutor-profile-bio">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="container tutor-profile-main">
        <div className="tutor-profile-main-content">
          <aside className="tutor-profile-sidebar">
            <h2>Intro Video</h2>
            <div className="tutor-intro-card">
              <div className="tutor-intro-media">
                <img src={teacherAvatar} alt="Jane Doe introduction" />
                <button type="button" className="tutor-play-button" aria-label="Play introduction video">
                  <PlayCircle size={48} aria-hidden="true" />
                </button>
              </div>
              <div className="tutor-intro-copy">
                <h3>Get to know me</h3>
                <span>5 May 2025 · 11:00 AM</span>
              </div>
            </div>
          </aside>

          <section className="tutor-profile-tab-panel" aria-label="Tutor information">
            <div className="filter-mode-tabs tutor-profile-tabs" role="tablist" aria-label="Tutor profile sections">
              {tabs.map(tab => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => navigateToSection(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div id="tutor-programs" className="tutor-profile-content-section">
                <h2 className="tutor-section-title">Programs</h2>
                <div className="tutor-programs-grid">
                  {[
                    { title: 'December Holiday Tuition 2025', lessons: '20 Lessons', status: 'Closed', slots: '0 Slots Left' },
                    { title: 'December Holiday Tuition 2025', lessons: '20 Lessons', status: 'Enrolling', slots: '50 Slots Left' },
                    { title: 'December Holiday Tuition 2025', lessons: '20 Lessons', status: 'Enrolling', slots: '50 Slots Left' }
                  ].map((program, index) => (
                    <article className="tutor-program-card" key={`${program.title}-${index}`}>
                      <h3>{program.title}</h3>
                      <div className="tutor-program-meta"><span>{program.lessons}</span><span className={`tutor-program-status${program.status === 'Closed' ? ' is-closed' : ''}`}>{program.status}</span></div>
                      <div className="tutor-card-footer">
                        <span className={`tutor-card-status${program.status === 'Closed' ? ' is-closed' : ''}`}>{program.slots}</span>
                        <a href="/courses/detail" className="btn-action-outline tutor-card-action">View</a>
                      </div>
                    </article>
                  ))}
                </div>
            </div>

            <div id="tutor-classes" className="tutor-profile-content-section">
                <h2 className="tutor-section-title">Classes</h2>
                <div className="tutor-classes-grid">
                  {[1, 2, 3, 4, 5].map(id => (
                    <article className="tutor-class-card" key={id}>
                      <h3>Algebra I</h3>
                      <div className="tutor-class-tutor"><img src={teacherAvatar} alt="" /> <span>Jane Doe</span></div>
                      <div className="tutor-progress" aria-label="85 percent complete"><span /></div>
                      <div className="tutor-progress-meta"><span>18/20 Lessons</span><span>2h left</span></div>
                      <div className="tutor-class-meta"><span>Lecture</span><span>•</span><span>120 Min</span><span>•</span><span className="tutor-subject-tag">Mathematics</span></div>
                    </article>
                  ))}
                </div>
            </div>

            <div id="tutor-reviews" className="tutor-profile-content-section">
                <h2 className="tutor-section-title">Reviews</h2>
                <div className="tutor-reviews-list">
                  {[1, 2, 3].map(id => (
                    <article className="tutor-review-card" key={id}>
                      <div className="tutor-review-header">
                        <div className="tutor-review-avatar">OR</div>
                        <div><strong>Olivia Rhye</strong><span>5.0 ★★★★★</span></div>
                      </div>
                      <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id.”</p>
                    </article>
                  ))}
                </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
