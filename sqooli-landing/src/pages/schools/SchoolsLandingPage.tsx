import { useEffect, useState } from 'react'
import { Search, Scale, Building2, Handshake, Star, ArrowUpRight, Plus, X, Check, Users, MapPin } from 'lucide-react'
import SchoolHeader from './SchoolHeader'
import Footer from '../../components/layout/Footer'
import '../../styles/pages/schools.css'
import '../../styles/pages/search.css'

interface SchoolItem {
  id: string
  name: string
  url: string
  students: string
  location: string
  rating: number
  image: string
  mode: 'Online' | 'Physical'
  category: 'Religion' | 'International' | 'National' | 'Private'
}

const INITIAL_SCHOOLS: SchoolItem[] = [
  {
    id: 'valley-anthony',
    name: 'Valley Anthony Institute',
    url: 'https://sqooli_valley_anthony_institute.com',
    students: '1,364 students',
    location: 'Kakamega',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80',
    mode: 'Online',
    category: 'Religion'
  },
  {
    id: 'udbc',
    name: 'Ufufuo Digital Bible College (UDBC)',
    url: 'udbc.sqooli.africa',
    students: '1,364 students',
    location: 'Kakamega',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80',
    mode: 'Online',
    category: 'Religion'
  },
  {
    id: 'alliance',
    name: 'Alliance High School',
    url: 'https://sqooli_alliance_high.com',
    students: '2,100 students',
    location: 'Kiambu, Kenya',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80',
    mode: 'Physical',
    category: 'National'
  },
  {
    id: 'kenya-high',
    name: 'Kenya High School',
    url: 'https://sqooli_kenya_high.com',
    students: '1,850 students',
    location: 'Nairobi, Kenya',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80',
    mode: 'Physical',
    category: 'National'
  }
]

export default function SchoolsLandingPage() {
  const [filterMode, setFilterMode] = useState<'All' | 'Online' | 'Physical'>('All')
  const [schoolType, setSchoolType] = useState('All')
  const [category, setCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [listQuery, setListQuery] = useState('')

  // Comparison Tool State
  const [comparedSchools, setComparedSchools] = useState<SchoolItem[]>([])
  const [showSchoolPicker, setShowSchoolPicker] = useState(false)

  useEffect(() => {
    if (!showSchoolPicker) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowSchoolPicker(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [showSchoolPicker])

  const handleAddComparison = (school: SchoolItem) => {
    if (comparedSchools.length < 4 && !comparedSchools.some(s => s.id === school.id)) {
      setComparedSchools([...comparedSchools, school])
    }
    setShowSchoolPicker(false)
  }

  const handleRemoveComparison = (id: string) => {
    setComparedSchools(comparedSchools.filter(s => s.id !== id))
  }

  const filteredSchools = INITIAL_SCHOOLS.filter(s =>
    (filterMode === 'All' || s.mode === filterMode) &&
    (schoolType === 'All' || schoolType === 'Hybrid' || s.mode === schoolType) &&
    (category === 'All' || s.category === category) &&
    (s.name.toLowerCase().includes(listQuery.toLowerCase()) || s.location.toLowerCase().includes(listQuery.toLowerCase()))
  )

  return (
    <div className="schools-page-wrapper">
      <SchoolHeader variant="main" activeTab="Schools" />

      {/* Main Hero Section right-aligned with right-side gradient overlay */}
      <section className="schools-hero-right-aligned">
        <div className="container">
          <div className="hero-content-right">
            <h1>100+ Schools To Choose From</h1>
            <p>
              Explore our extensive list of schools available via Sqooli. Access tutors and lessons seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Royal Blue Background Section (Seamless Connection - No White Gap Behind Filter Card) */}
      <section className="royal-blue-section">
        <div className="container">
          {/* Floating Search & Filter Box */}
          <div className="hero-filter-card">
            <div className="filter-mode-tabs">
              {(['All', 'Online', 'Physical'] as const).map(mode => (
                <button
                  key={mode}
                  className={filterMode === mode ? 'active' : ''}
                  onClick={() => setFilterMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="hero-search-row">
              <div className="select-field">
                <label>Type:</label>
                <select value={schoolType} onChange={e => setSchoolType(e.target.value)}>
                  <option value="All">All types</option>
                  <option value="Online">Online</option>
                  <option value="Physical">Physical</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="select-field">
                <label>Category:</label>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="All">All categories</option>
                  <option value="Religion">Religion</option>
                  <option value="International">International</option>
                  <option value="National">National</option>
                  <option value="Private">Private</option>
                </select>
              </div>

              <div className="input-field">
                <input
                  type="text"
                  placeholder="Search School Name..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                className="btn-search-hero"
                onClick={() => window.location.href = `/schools/listings?q=${encodeURIComponent(searchQuery)}`}
              >
                <Search size={18} /> Search
              </button>
            </div>
          </div>

          {/* Clean Feature Items (NO Card boxes/containers) */}
          <div className="schools-feature-items-clean">
            <div className="school-feature-item">
              <div className="feature-icon-wrapper-clean">
                <Scale size={24} />
              </div>
              <div className="feature-info">
                <h3>School Comparison Tool</h3>
                <p>Compare school performance, classes published, curricula offered, resources etc.</p>
              </div>
            </div>

            <div className="school-feature-item">
              <div className="feature-icon-wrapper-clean">
                <Building2 size={24} />
              </div>
              <div className="feature-info">
                <h3>100+ Online & Physical Schools</h3>
                <p>Sqooli has a variety of online and physical schools for you to choose from and book classes.</p>
              </div>
            </div>

            <div className="school-feature-item">
              <div className="feature-icon-wrapper-clean">
                <Handshake size={24} />
              </div>
              <div className="feature-info">
                <h3>Access Programs Seamlessly</h3>
                <p>Track your earnings (marketing partners) and impact (impact partners) on your dashboard.</p>
              </div>
            </div>
          </div>

          {/* Explore Our School Listings Heading */}
          <div className="section-header-centered">
            <h2>Explore Our School Listings</h2>
            <p>Explore our extensive list of schools available via Sqooli. Access tutors and lessons seamlessly.</p>
          </div>

          <div className="royal-blue-search-bar">
            <input
              type="text"
              placeholder="Type school name...."
              value={listQuery}
              onChange={e => setListQuery(e.target.value)}
            />
            <button onClick={() => window.location.href = `/schools/listings?q=${encodeURIComponent(listQuery)}`}>
              Search
            </button>
          </div>

          {/* Clean Horizontal School Item Rows (NO card box container, formal icons) */}
          <div className="school-rows-clean-list">
            {filteredSchools.map(school => (
              <div key={school.id} className="school-row-item">
                <img src={school.image} alt={school.name} className="school-thumb" />
                <div>
                  <h3>{school.name}</h3>
                  <a href="/schools/detail" className="school-link">{school.url}</a>
                  <div className="school-meta-row">
                    <span className="school-meta-item"><Users size={14} /> {school.students}</span>
                    <span className="school-meta-item"><MapPin size={14} /> {school.location}</span>
                    <div className="rating-stars">
                      <span>{school.rating}</span>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="school-card-actions">
                  <a href="/schools/detail" className="btn-royal-outline">Go to Website</a>
                  <a href="/schools/tutors" className="btn-royal-outline">View Lessons</a>
                  <a href="/schools/tutors" className="btn-royal-outline">View Tutors</a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href="/schools/listings" className="btn-white-pill">
              Go to School Listing <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Select Schools to Compare Section */}
      <section className="comparison-section" id="compare">
        <div className="container">
          <div className="comparison-grid-layout">
            <div className="comparison-copy">
              <h2>Select Schools to Compare</h2>
              <p>Test out our School Comparison Tool. Select up to 4 schools to compare</p>
            </div>

            <div className="comparison-slots-grid">
              {comparedSchools.map(school => (
                <div key={school.id} className="comparison-slot-card occupied">
                  <button type="button" className="remove-slot-btn" onClick={() => handleRemoveComparison(school.id)} aria-label={`Remove ${school.name} from comparison`}>
                    <X size={14} />
                  </button>
                  <img src={school.image} alt="" className="comparison-school-image" />
                  <h4>{school.name}</h4>
                  <p className="comparison-school-location">{school.location}</p>
                  <div className="comparison-school-rating">
                    <span>{school.rating} ★</span>
                  </div>
                </div>
              ))}

              {[...Array(4 - comparedSchools.length)].map((_, i) => (
                <button type="button" key={i} className="comparison-slot-card" onClick={() => setShowSchoolPicker(true)} aria-label="Add a school to compare">
                  <Plus size={28} />
                  <span>Add School</span>
                </button>
              ))}
            </div>
          </div>

          {comparedSchools.length > 0 && (
            <div className="comparison-submit">
              <button
                type="button"
                className="btn-primary"
                disabled={comparedSchools.length < 2}
                aria-disabled={comparedSchools.length < 2}
                onClick={() => {
                  if (comparedSchools.length >= 2) {
                    window.location.href = `/schools/compare?${new URLSearchParams({ schools: comparedSchools.map(school => school.name).join('|') }).toString()}`
                  }
                }}
              >
                Compare
              </button>
              {comparedSchools.length < 2 && <span className="comparison-submit-hint">Select at least 2 schools to compare</span>}
            </div>
          )}
        </div>
      </section>

      {/* Modal for selecting schools to compare */}
      {showSchoolPicker && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div role="dialog" aria-modal="true" aria-labelledby="school-picker-title" style={{
            background: '#fff', borderRadius: 16, padding: 32, maxWidth: 500, width: '90%',
            maxHeight: '80vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 id="school-picker-title" style={{ margin: 0, fontSize: 20 }}>Select a School to Compare</h3>
              <button type="button" aria-label="Close school picker" onClick={() => setShowSchoolPicker(false)} style={{ border: 0, background: 'transparent', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {INITIAL_SCHOOLS.map(s => {
                const isSelected = comparedSchools.some(cs => cs.id === s.id)
                const isFull = comparedSchools.length >= 4
                return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleAddComparison(s)}
                  disabled={isSelected || isFull}
                  aria-pressed={isSelected}
                  style={{
                    padding: 12, border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12
                  }}
                >
                  <img src={s.image} alt={s.name} style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{s.location}</div>
                  </div>
                  {isSelected && <><Check size={18} color="#2b3990" /><span className="sr-only">Selected</span></>}
                </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
