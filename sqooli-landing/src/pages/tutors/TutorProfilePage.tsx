import { useState } from 'react'
import { ArrowLeft, PlayCircle, Check } from 'lucide-react'
import SchoolHeader from '../schools/SchoolHeader'
import Footer from '../../components/layout/Footer'
import teacherAvatar from '../../assets/images/whats-popular/teacher.jpg'
import '../../styles/pages/schools.css'
import '../../styles/pages/search.css'

export default function TutorProfilePage() {
  const [isConnected, setIsConnected] = useState(false)
  const [activeTab, setActiveTab] = useState<'Programs' | 'Classes' | 'Reviews'>('Programs')

  return (
    <div className="schools-page-wrapper">
      <SchoolHeader variant="school-profile" schoolName="Tutor Profile" />

      {/* Hero Profile Banner matching Desktop-95 & Desktop-98 */}
      <section style={{ background: '#fffbeb', borderBottom: '1px solid #fef3c7', padding: '48px 0' }}>
        <div className="container">
          <div style={{ marginBottom: 16 }}>
            <a href="/schools/tutors" className="back-link-clean">
              <ArrowLeft size={16} /> Back to Tutors
            </a>
          </div>

          <div className="tutor-profile-hero-row" style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
            <img
              src={teacherAvatar}
              alt="Jane Doe"
              style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
            />

            <div style={{ flex: 1 }}>
              <div className="tutor-profile-heading-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>Jane Doe</h1>
                  <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
                    ID: <strong>123456789</strong> | Followers: <strong>123</strong> | Classes: <strong>12</strong>
                  </div>
                </div>

                <button
                  onClick={() => setIsConnected(!isConnected)}
                  className="btn-sidebar-apply"
                  style={{
                    width: 'auto', padding: '10px 28px',
                    background: isConnected ? '#16a34a' : '#0284c7'
                  }}
                >
                  {isConnected ? <>Connected <Check size={16} /></> : 'Connect'}
                </button>
              </div>

              <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 800 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container" style={{ padding: '40px 0 80px' }}>
        <div className="tutor-profile-main-content" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40 }}>
          {/* Left Column: Intro Video */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Intro Video</h3>
            <div style={{
              background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16,
              overflow: 'hidden', padding: 12
            }}>
              <div style={{
                position: 'relative', height: 160, borderRadius: 10, overflow: 'hidden',
                background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" alt="Intro" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                <PlayCircle size={48} color="#ffffff" style={{ position: 'absolute', cursor: 'pointer' }} />
              </div>
              <div style={{ marginTop: 12 }}>
                <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700 }}>Get to know me</h4>
                <div style={{ fontSize: 12, color: '#64748b' }}>5 May 2025 11.00 AM</div>
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Content */}
          <div>
            <div className="filter-mode-tabs" style={{ marginBottom: 32 }}>
              {(['Programs', 'Classes', 'Reviews'] as const).map(tab => (
                <button
                  key={tab}
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'Programs' && (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Programs</h3>
                <div className="tutor-programs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  {[
                    { title: 'December Holiday Tuition 2025', lessons: '20 Lessons', status: 'Closed', slots: '0 Slots Left' },
                    { title: 'December Holiday Tuition 2025', lessons: '20 Lessons', status: 'Enrolling', slots: '50 Slots Left' },
                    { title: 'December Holiday Tuition 2025', lessons: '20 Lessons', status: 'Enrolling', slots: '50 Slots Left' }
                  ].map((p, i) => (
                    <div key={i} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{p.title}</h4>
                      </div>
                      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{p.lessons}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, color: p.status === 'Closed' ? '#ef4444' : '#16a34a', fontWeight: 600 }}>{p.slots}</span>
                        <a href="/courses/detail" className="btn-action-outline" style={{ fontSize: 11, padding: '4px 12px' }}>View</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Classes' && (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Classes</h3>
                <div className="tutor-classes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  {[1, 2, 3, 4, 5].map(id => (
                    <div key={id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
                      <h4 style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700 }}>Algebra I</h4>
                      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Jane Doe</div>
                      <div style={{ height: 6, background: '#e2e8f0', borderRadius: 99, marginBottom: 6, overflow: 'hidden' }}>
                        <div style={{ width: '85%', height: '100%', background: '#3b82f6' }}></div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b' }}>
                        <span>18/20 Lessons</span>
                        <span>2h left</span>
                      </div>
                      <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                        <span style={{ background: '#f59e0b', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4 }}>Mathematics</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Reviews' && (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Reviews</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>OR</div>
                        <div>
                          <strong style={{ fontSize: 13, display: 'block' }}>Olivia Rhye</strong>
                          <div style={{ fontSize: 11, color: '#f59e0b' }}>5.0 ★★★★★</div>
                        </div>
                      </div>
                      <p style={{ fontSize: 13, color: '#475569', margin: 0, lineHeight: 1.5 }}>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id."
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
