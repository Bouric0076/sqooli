import { useState } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import SchoolHeader from '../schools/SchoolHeader'
import Footer from '../../components/layout/Footer'
import '../../styles/pages/schools.css'
import '../../styles/pages/search.css'

export default function TimetablePage() {
  const [activeSubTab, setActiveSubTab] = useState<'Allocate Slots' | 'Timetable' | 'Tutors' | 'Students' | 'Resources'>('Allocate Slots')
  const [selectedMonth, setSelectedMonth] = useState('Feb')

  return (
    <div className="schools-page-wrapper">
      <SchoolHeader variant="school-profile" schoolName="Timetable Allocation" />

      {/* Metadata Bar matching Desktop-144 */}
      <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '32px 0' }}>
        <div className="container">
          <div style={{ marginBottom: 16 }}>
            <a href="/schools/tutors" className="back-link-clean">
              <ArrowLeft size={16} /> Back to Courses
            </a>
          </div>

          <div className="timetable-metadata-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, fontSize: 13 }}>
            <div>
              <span style={{ color: '#64748b', fontSize: 11 }}>Course Name</span>
              <div style={{ fontWeight: 700, fontSize: 14 }}>CBC First Term 2026</div>
              <span style={{ fontSize: 10, color: '#94a3b8' }}>Created 11 Jan 2025</span>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: 11 }}>Program Start Date</span>
              <div style={{ fontWeight: 700 }}>12 Jan 2020</div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: 11 }}>Program End Date</span>
              <div style={{ fontWeight: 700 }}>12 Jan 2020</div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: 11 }}>Curriculum</span>
              <div style={{ fontWeight: 700 }}>CBC</div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: 11 }}>Grade</span>
              <div style={{ fontWeight: 700 }}>Grade 6</div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: 11 }}>Status</span>
              <div><span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99 }}>Active</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid View */}
      <main className="container" style={{ padding: '40px 0 80px' }}>
        {/* Navigation Bar */}
        <div className="filter-mode-tabs" style={{ marginBottom: 24 }}>
          {(['Allocate Slots', 'Timetable', 'Tutors', 'Students', 'Resources'] as const).map(t => (
            <button
              key={t}
              className={activeSubTab === t ? 'active' : ''}
              onClick={() => setActiveSubTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Toolbar Header */}
        <div className="timetable-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>
            28 Feb 2025 - 1 Mar 2025 <a href="#next" style={{ color: '#0284c7', fontSize: 13, marginLeft: 8 }}>Next Week</a>
          </div>

          <div className="timetable-months" style={{ display: 'flex', gap: 6 }}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                style={{
                  padding: '4px 10px', borderRadius: 6, border: '1px solid #cbd5e1',
                  background: selectedMonth === m ? '#0284c7' : '#fff',
                  color: selectedMonth === m ? '#fff' : '#475569',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer'
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Grid Schedule Table */}
        <div className="timetable-scroll" style={{ border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', background: '#fff' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '100px repeat(5, 1fr)',
            background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '12px 16px',
            fontWeight: 700, fontSize: 13, textAlign: 'center'
          }}>
            <div>Time</div>
            <div>Mon 28</div>
            <div>Tue 29</div>
            <div>Wed 30</div>
            <div>Thu 31</div>
            <div>Fri 1</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* 9:00 - 10:00 */}
            <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(5, 1fr)', borderBottom: '1px solid #f1f5f9', padding: 8, gap: 8, alignItems: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', textAlign: 'center' }}>9:00 - 10:00</div>
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: 8, fontSize: 12 }}>
                <strong style={{ color: '#0284c7', display: 'block' }}>Arithmetics 1</strong>
                <span style={{ color: '#64748b' }}>Olivia Rhye • 60 min</span>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: 8, fontSize: 12 }}>
                <strong style={{ color: '#0284c7', display: 'block' }}>Arithmetics 1</strong>
                <span style={{ color: '#64748b' }}>Olivia Rhye • 60 min</span>
              </div>
              <div style={{ border: '1px dashed #cbd5e1', borderRadius: 8, padding: 8, fontSize: 11, color: '#64748b', textAlign: 'center', cursor: 'pointer' }}>
                <Plus size={12} style={{ display: 'inline' }} /> Allocate Slot
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: 8, padding: 8, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
                unavailable
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: 8, fontSize: 12 }}>
                <strong style={{ color: '#0284c7', display: 'block' }}>Arithmetics 1</strong>
                <span style={{ color: '#64748b' }}>Olivia Rhye • 60 min</span>
              </div>
            </div>

            {/* 10:00 - 11:00 (Break Row) */}
            <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(5, 1fr)', borderBottom: '1px solid #f1f5f9', padding: 8, gap: 8, alignItems: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', textAlign: 'center' }}>10:00 - 11:00</div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} style={{ border: '1px dashed #f97316', background: '#fff7ed', color: '#c2410c', borderRadius: 8, padding: 8, fontSize: 12, fontWeight: 700, textAlign: 'center' }}>
                  Break
                </div>
              ))}
            </div>

            {/* 11:00 - 12:00 */}
            <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(5, 1fr)', borderBottom: '1px solid #f1f5f9', padding: 8, gap: 8, alignItems: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', textAlign: 'center' }}>11:00 - 12:00</div>
              <div style={{ background: '#f1f5f9', borderRadius: 8, padding: 8, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
                unavailable
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: 8, padding: 8, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
                unavailable
              </div>
              <div style={{ border: '1px dashed #cbd5e1', borderRadius: 8, padding: 8, fontSize: 11, color: '#64748b', textAlign: 'center', cursor: 'pointer' }}>
                <Plus size={12} style={{ display: 'inline' }} /> Allocate Slot
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: 8, fontSize: 12 }}>
                <strong style={{ color: '#0284c7', display: 'block' }}>Arithmetics 1</strong>
                <span style={{ color: '#64748b' }}>60 min</span>
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: 8, padding: 8, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
                unavailable
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
