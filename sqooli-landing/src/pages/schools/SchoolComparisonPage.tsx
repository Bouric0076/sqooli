import { useEffect, useState } from 'react'
import { ArrowLeft, Plus, X, Search, Users, MapPin } from 'lucide-react'
import SchoolHeader from './SchoolHeader'
import Footer from '../../components/layout/Footer'
import contactGraphic from '../../assets/images/search/woman with long list.svg'
import '../../styles/pages/schools.css'
import '../../styles/pages/search.css'

interface ComparedSchool {
  id: string
  name: string
  location: string
  rating: number
  students: number
  tutors: number
  classes: number
  resources: number
  curricula: string
  logo: string
  type: string
}

const AVAILABLE_SCHOOLS: ComparedSchool[] = [
  {
    id: 'valley-anthony',
    name: 'Valley Anthony Institute',
    location: 'Kakamega',
    rating: 4.5,
    students: 1364,
    tutors: 34,
    classes: 2455,
    resources: 53,
    curricula: 'CBC, 8-4-4',
    logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=200&q=80',
    type: 'Online'
  },
  {
    id: 'udbc',
    name: 'Ufufuo Digital Bible College (UDBC)',
    location: 'Kakamega',
    rating: 4.5,
    students: 1364,
    tutors: 34,
    classes: 2455,
    resources: 53,
    curricula: 'CBC, 8-4-4',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80',
    type: 'Online'
  },
  {
    id: '1',
    name: 'Alliance High School',
    location: 'Kiambu, Kenya',
    rating: 4.5,
    students: 232,
    tutors: 34,
    classes: 2455,
    resources: 53,
    curricula: 'CBC, 8-4-4',
    logo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=200&q=80',
    type: 'Public'
  },
  {
    id: '2',
    name: 'Alliance Girls High School',
    location: 'Kiambu, Kenya',
    rating: 4.5,
    students: 276,
    tutors: 23,
    classes: 432,
    resources: 66,
    curricula: 'CBC',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80',
    type: 'Public'
  },
  {
    id: '3',
    name: 'Kenya High School',
    location: 'Nairobi',
    rating: 4.7,
    students: 743,
    tutors: 26,
    classes: 392,
    resources: 23,
    curricula: 'CBC, Cambridge',
    logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=200&q=80',
    type: 'Public'
  },
  {
    id: '4',
    name: 'Starehe Boys School',
    location: 'Nairobi',
    rating: 4.6,
    students: 654,
    tutors: 22,
    classes: 276,
    resources: 43,
    curricula: '8-4-4',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80',
    type: 'Public'
  }
]

export default function SchoolComparisonPage() {
  const defaultSchools = [AVAILABLE_SCHOOLS[2], AVAILABLE_SCHOOLS[3]]
  const [selectedSchools, setSelectedSchools] = useState<ComparedSchool[]>(() => {
    const names = new URLSearchParams(window.location.search).get('schools')?.split('|').filter(Boolean) ?? []
    const fromListing = AVAILABLE_SCHOOLS.filter(school => names.includes(school.name))
    return fromListing.length > 0 ? fromListing : defaultSchools
  })
  const [activeTab, setActiveTab] = useState<'Overview' | 'Classes' | 'Tutors' | 'Resources'>('Overview')
  const [showPickerModal, setShowPickerModal] = useState(false)
  const [modalSearchQuery, setModalSearchQuery] = useState('')
  const [tempCheckedIds, setTempCheckedIds] = useState<string[]>([])

  useEffect(() => {
    if (!showPickerModal) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowPickerModal(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [showPickerModal])

  const syncSelectionToUrl = (schools: ComparedSchool[]) => {
    const url = new URL(window.location.href)
    if (schools.length > 0) {
      url.searchParams.set('schools', schools.map(school => school.name).join('|'))
    } else {
      url.searchParams.delete('schools')
    }
    window.history.replaceState({}, '', url)
  }

  const handleOpenPicker = () => {
    setTempCheckedIds(selectedSchools.map(s => s.id))
    setModalSearchQuery('')
    setShowPickerModal(true)
  }

  const handleToggleModalCheck = (id: string) => {
    if (tempCheckedIds.includes(id)) {
      setTempCheckedIds(tempCheckedIds.filter(i => i !== id))
    } else if (tempCheckedIds.length < 4) {
      setTempCheckedIds([...tempCheckedIds, id])
    }
  }

  const handleConfirmSelection = () => {
    const updated = AVAILABLE_SCHOOLS.filter(s => tempCheckedIds.includes(s.id))
    setSelectedSchools(updated)
    syncSelectionToUrl(updated)
    setShowPickerModal(false)
  }

  const handleRemoveSlot = (id: string) => {
    const updated = selectedSchools.filter(s => s.id !== id)
    setSelectedSchools(updated)
    syncSelectionToUrl(updated)
  }

  return (
    <div className="schools-page-wrapper">
      <SchoolHeader variant="school-profile" schoolName="School Comparison Tool" />

      <main className="container comparison-matrix-wrapper">
        <div style={{ marginBottom: 24 }}>
          <a href="/schools" className="back-link-clean">
            <ArrowLeft size={16} /> Back
          </a>
        </div>

        <div className="comparison-header-centered">
          <h1>Add Schools to Compare Features</h1>
          <p style={{ color: '#64748b', fontSize: 16 }}>Compare features of up to 4 schools at a time</p>
        </div>

        {/* 4 Slot Grid */}
        <div className="slots-grid-4">
          {[0, 1, 2, 3].map(index => {
            const school = selectedSchools[index]
            if (school) {
              return (
                <div key={school.id} className="slot-card-filled">
                  <button
                  className="remove-slot-btn"
                  onClick={() => handleRemoveSlot(school.id)}
                    type="button"
                    aria-label={`Remove ${school.name} from comparison`}
                    title="Remove school"
                  >
                    <X size={14} />
                  </button>
                  <img src={school.logo} alt={school.name} style={{ borderRadius: 8 }} />
                  <h4>{school.name}</h4>
                  <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 6px' }}>{school.location}</p>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b' }}>{school.rating} ★</div>
                </div>
              )
            }
            return (
              <button type="button" key={index} className="slot-card-empty" onClick={handleOpenPicker} aria-label="Add school to comparison">
                <Plus size={32} />
                <span>Add School</span>
              </button>
            )
          })}
        </div>

        {/* Comparison Details Section */}
        {selectedSchools.length < 2 ? (
          /* Zero/Single School Placeholder State (Desktop - 110) */
          <div style={{
            background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20,
            padding: 48, textAlign: 'center', margin: '40px 0'
          }}>
            <img src={contactGraphic} alt="Compare Placeholder" style={{ width: 140, marginBottom: 16 }} />
            <p style={{ color: '#64748b', fontSize: 15, margin: 0 }}>
              Comparison details will show here for two or more schools
            </p>
          </div>
        ) : (
          /* Active Comparison Table (Desktop - 111 to 115) */
          <div>
            <div className="comparison-tabs-row">
              {(['Overview', 'Classes', 'Tutors', 'Resources'] as const).map(tab => (
                <button
                  key={tab}
                  className={`btn-tab-pill ${activeTab === tab ? 'active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Comparison Details</h3>

            <div className="comparison-table-scroll">
              <table className="comparison-details-table">
              <thead>
                <tr>
                  <th>Criteria</th>
                  {selectedSchools.map(school => (
                    <th key={school.id}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <img src={school.logo} alt="" style={{ width: 24, height: 24, borderRadius: 4 }} />
                          <span>{school.name}</span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeTab === 'Overview' && (
                  <>
                    <tr>
                      <td>Type</td>
                      {selectedSchools.map(s => <td key={s.id}>{s.type}</td>)}
                    </tr>
                    <tr>
                      <td>Location</td>
                      {selectedSchools.map(s => <td key={s.id}>{s.location}</td>)}
                    </tr>
                    <tr>
                      <td>No of Students</td>
                      {selectedSchools.map(s => <td key={s.id}>{s.students}</td>)}
                    </tr>
                    <tr>
                      <td>No of Tutors</td>
                      {selectedSchools.map(s => <td key={s.id}>{s.tutors}</td>)}
                    </tr>
                    <tr>
                      <td>Classes Published</td>
                      {selectedSchools.map(s => <td key={s.id}>{s.classes}</td>)}
                    </tr>
                    <tr>
                      <td>Resources Published</td>
                      {selectedSchools.map(s => <td key={s.id}>{s.resources}</td>)}
                    </tr>
                    <tr>
                      <td>Curricula Offered</td>
                      {selectedSchools.map(s => <td key={s.id}>{s.curricula}</td>)}
                    </tr>
                  </>
                )}

                {activeTab === 'Classes' && (
                  <>
                    <tr>
                      <td>Classes Published</td>
                      {selectedSchools.map(s => <td key={s.id}>43</td>)}
                    </tr>
                    <tr>
                      <td>Resources Published</td>
                      {selectedSchools.map(s => <td key={s.id}>43</td>)}
                    </tr>
                    <tr>
                      <td>No of Students</td>
                      {selectedSchools.map(s => <td key={s.id}>{s.students}</td>)}
                    </tr>
                    <tr>
                      <td>No of Tutors</td>
                      {selectedSchools.map(s => <td key={s.id}>{s.tutors}</td>)}
                    </tr>
                    <tr>
                      <td>Question Posted</td>
                      {selectedSchools.map(s => <td key={s.id}>{s.classes}</td>)}
                    </tr>
                  </>
                )}

                {activeTab === 'Tutors' && (
                  <>
                    <tr>
                      <td>Total Tutors</td>
                      {selectedSchools.map(s => <td key={s.id}>{s.tutors}</td>)}
                    </tr>
                    <tr>
                      <td>Top Rated Tutors</td>
                      {selectedSchools.map(s => <td key={s.id}>12</td>)}
                    </tr>
                    <tr>
                      <td>Average Rating</td>
                      {selectedSchools.map(s => <td key={s.id}>{s.rating} ★</td>)}
                    </tr>
                  </>
                )}

                {activeTab === 'Resources' && (
                  <>
                    <tr>
                      <td>Resources Published</td>
                      {selectedSchools.map(s => <td key={s.id}>{s.resources}</td>)}
                    </tr>
                    <tr>
                      <td>Exam Papers</td>
                      {selectedSchools.map(s => <td key={s.id}>28</td>)}
                    </tr>
                    <tr>
                      <td>Video Lessons</td>
                      {selectedSchools.map(s => <td key={s.id}>15</td>)}
                    </tr>
                  </>
                )}
              </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Selector Modal Frame 2085664234 */}
      {showPickerModal && (
        <div className="modal-overlay">
          <div className="modal-picker-card" role="dialog" aria-modal="true" aria-labelledby="compare-picker-title">
            <div className="modal-header">
              <h3 id="compare-picker-title" style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Select up to 4 schools to compare</h3>
              <button
                type="button"
                aria-label="Close school picker"
                onClick={() => setShowPickerModal(false)}
                style={{ border: 0, background: 'transparent', cursor: 'pointer' }}
              >
                <X size={20} color="#64748b" />
              </button>
            </div>

            <div className="modal-search-box" style={{ marginTop: 16 }}>
              <div className="search-input-wrapper">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Search Schools"
                  value={modalSearchQuery}
                  onChange={e => setModalSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-list-body">
              {AVAILABLE_SCHOOLS.filter(s => s.name.toLowerCase().includes(modalSearchQuery.toLowerCase())).map(school => {
                const isChecked = tempCheckedIds.includes(school.id)
                return (
                  <button
                    key={school.id}
                    className={`modal-school-item-row ${isChecked ? 'selected' : ''}`}
                    onClick={() => handleToggleModalCheck(school.id)}
                    type="button"
                  >
                    <span className={`modal-check-indicator ${isChecked ? 'checked' : ''}`} aria-hidden="true">{isChecked ? '✓' : ''}</span>
                    <img src={school.logo} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700 }}>{school.name}</h4>
                      <div style={{ fontSize: 12, color: '#0284c7' }}>https://sqooli_{school.name.toLowerCase().replaceAll(' ', '_')}.com</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                        <Users size={12} aria-hidden="true" /> {school.students} students <MapPin size={12} aria-hidden="true" /> {school.location} | {school.rating} ★
                      </div>
                    </div>
                  </button>
                )
              })}
              {AVAILABLE_SCHOOLS.every(school => !school.name.toLowerCase().includes(modalSearchQuery.toLowerCase())) && (
                <p className="modal-empty-state">No schools match “{modalSearchQuery}”.</p>
              )}
            </div>

            <div className="modal-footer-bar">
              <button
                className="btn-sidebar-apply"
                style={{ width: 'auto', padding: '0 28px' }}
                onClick={handleConfirmSelection}
              >
                Add Selected ({tempCheckedIds.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
