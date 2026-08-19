import { useState } from 'react'
import { ArrowLeft, Star, Clock, Award, PlayCircle, FileText, ChevronDown, ChevronUp, ThumbsUp } from 'lucide-react'
import SchoolHeader from '../schools/SchoolHeader'
import Footer from '../../components/layout/Footer'
import BookSlotModal from '../../components/BookSlotModal'
import LeaveCommentModal from '../../components/LeaveCommentModal'
import teacherAvatar from '../../assets/images/whats-popular/teacher.webp'
import TimetableGrid from './TimetableGrid'
import '../../styles/pages/schools.css'
import '../../styles/pages/search.css'

type CourseTab = 'About' | 'Curriculum' | 'Timetable' | 'Testimonials' | 'Forum'

export default function CourseDetailPage({ initialTab = 'About' }: { initialTab?: CourseTab }) {
  const [activeTab, setActiveTab] = useState<CourseTab>(initialTab)
  const [expandedTopic, setExpandedTopic] = useState<number | null>(1)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [comments, setComments] = useState([
    { id: 1, name: 'Olivia Rhye', time: '2 mins ago', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id.', likes: 20 },
    { id: 2, name: 'Olivia Rhye', time: '2 mins ago', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id.', likes: 20 }
  ])
  const [commentModalOpen, setCommentModalOpen] = useState(false)

  return (
    <div className="schools-page-wrapper">
      <SchoolHeader variant="school-profile" schoolName="Physics - Form 4" />

      <BookSlotModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        courseTitle="Physics - Form 4"
        tutorName="Jane Doe"
        price="KES 200/ Lesson"
      />
      <LeaveCommentModal
        isOpen={commentModalOpen}
        onClose={() => setCommentModalOpen(false)}
        onSubmit={comment => {
          setComments(current => [...current, { id: Date.now(), name: 'Current User', time: 'Just now', text: comment, likes: 0 }])
          setCommentModalOpen(false)
        }}
      />

      {/* Top Banner matching Desktop-86 */}
      <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '40px 0' }}>
        <div className="container">
          <div style={{ marginBottom: 16 }}>
            <a href="/schools/tutors" className="back-link-clean">
              <ArrowLeft size={16} /> Back to Courses
            </a>
          </div>

          <div className="course-hero-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px', color: '#0f172a' }}>Physics - Form 4</h1>

              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <span style={{ background: '#fef3c7', color: '#d97706', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99 }}>Physics</span>
                <span style={{ background: '#dc2626', color: '#ffffff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99 }}>Curriculum: 8-4-4</span>
                <span style={{ background: '#f1f5f9', color: '#475569', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 99 }}>Catch up</span>
                <span style={{ color: '#64748b', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }}>
                  <Clock size={12} /> Last Updated: 10 Jun 2025 11.00 AM
                </span>
              </div>

              <p style={{ color: '#64748b', fontSize: 14, maxWidth: 800, lineHeight: 1.6, margin: 0 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <button
              className="btn-sidebar-apply course-book-slot"
              style={{ padding: '12px 28px', fontSize: 14, background: '#0284c7' }}
              onClick={() => setBookingModalOpen(true)}
            >
              Book a Slot
            </button>
          </div>

          {/* Stats Bar */}
          <div className="course-stats-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 16,
            marginTop: 32, paddingTop: 24, borderTop: '1px solid #e2e8f0'
          }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>KES 200/</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Lesson</div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <img src={teacherAvatar} alt="Jane Doe" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                <strong style={{ fontSize: 14 }}>Jane Doe</strong>
              </div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Tutor</div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 4 }}>
                4.5 <Star size={12} fill="#f59e0b" color="#f59e0b" />
              </div>
              <div style={{ fontSize: 12, color: '#64748b' }}>3,984 ratings</div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>3,984</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Enrolled Students</div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Form 4</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Level</div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>20</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Lessons</div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Award size={14} /> Certified
              </div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Certification Awarded</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Body */}
      <main className="container" style={{ padding: '40px 0 80px' }}>
        {/* Navigation Tabs */}
        <div className="filter-mode-tabs" style={{ marginBottom: 32 }}>
          {(['About', 'Curriculum', 'Timetable', 'Testimonials', 'Forum'] as const).map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Timetable' ? <TimetableGrid /> : <div className="course-main-content" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40 }}>
          {/* Left Column Content */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>What you will learn</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32, fontSize: 13, color: '#475569' }}>
              <div>✓ Gain an immersive understanding of physics practices and skills.</div>
              <div>✓ Gain an immersive understanding of entry-level project concepts.</div>
              <div>✓ Apply core principles to solve real-world exam challenges.</div>
              <div>✓ Comprehensive lab notes and formula references included.</div>
            </div>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Physics Form 4 Term 3</h3>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            {/* Curriculum Expandable Topics */}
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Curriculum</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
              {[1, 2, 3, 4].map(topicId => (
                <div
                  key={topicId}
                  style={{
                    background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setExpandedTopic(expandedTopic === topicId ? null : topicId)}
                    style={{
                      width: '100%', padding: '16px 20px', background: 'none', border: 0,
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      fontWeight: 700, fontSize: 15, cursor: 'pointer', textAlign: 'left'
                    }}
                  >
                    <div>
                      <span>Topic {topicId}</span>
                      <span style={{ fontSize: 12, color: '#64748b', marginLeft: 12, fontWeight: 400 }}>4 Lectures | 50 min</span>
                    </div>
                    {expandedTopic === topicId ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {expandedTopic === topicId && (
                    <div style={{ padding: '0 20px 20px', borderTop: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                        {[
                          { title: 'Video Introduction', type: 'video', time: '3.08 min' },
                          { title: 'Video Lecture Part 2', type: 'video', time: '5.12 min' },
                          { title: 'Notes Example', type: 'doc', time: 'Download PDF' },
                          { title: 'Assignment Example', type: 'doc', time: 'Quiz' }
                        ].map((lec, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#334155' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              {lec.type === 'video' ? <PlayCircle size={16} color="#0284c7" /> : <FileText size={16} color="#64748b" />}
                              <span>{lec.title}</span>
                            </div>
                            <span style={{ color: '#64748b', fontSize: 12 }}>{lec.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Forum / Comments Section */}
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Forum & Discussion</h3>
            <div style={{ marginBottom: 28 }}>
              <button className="btn-sidebar-apply" type="button" style={{ width: 'auto', padding: '0 24px' }} onClick={() => setCommentModalOpen(true)}>
                Post Comment
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {comments.map(c => (
                <div key={c.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <strong style={{ fontSize: 14 }}>{c.name}</strong>
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>{c.time}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#475569', margin: '0 0 10px', lineHeight: 1.5 }}>{c.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', cursor: 'pointer' }}>
                    <ThumbsUp size={14} /> <span>{c.likes} Likes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: About Tutor Card */}
          <div>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, position: 'sticky', top: 90 }}>
              <h4 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700 }}>About Tutor</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <img src={teacherAvatar} alt="Lucy Mainac" style={{ width: 48, height: 48, borderRadius: '50%' }} />
                <div>
                  <h5 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Lucy Mainac</h5>
                  <span style={{ fontSize: 12, color: '#64748b' }}>ID: 123456</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, marginBottom: 20 }}>
                Experienced STEM tutor specializing in secondary school Physics and Applied Mathematics.
              </p>
              <a href="/tutors/profile" className="btn-action-outline" style={{ width: '100%', justifyContent: 'center' }}>
                View Profile
              </a>
            </div>
          </div>
        </div>}
      </main>

      <Footer />
    </div>
  )
}
