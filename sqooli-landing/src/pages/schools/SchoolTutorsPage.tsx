import { useState } from 'react'
import { Search, X, SlidersHorizontal, Star, ChevronLeft, ChevronRight, ShoppingCart, Calendar, Eye, User } from 'lucide-react'
import SchoolHeader from './SchoolHeader'
import Footer from '../../components/layout/Footer'
import BookSlotModal from '../../components/BookSlotModal'
import teacherAvatar from '../../assets/images/whats-popular/teacher.jpg'
import '../../styles/pages/schools.css'
import '../../styles/pages/search.css'

interface TutorCourse {
  id: string
  tutorName: string
  tutorLink: string
  tutorAvatar: string
  courseTitle: string
  rating: number
  price: string
  curriculum: string
  grades: string[]
  yearPosted: string
}

const TUTOR_COURSES: TutorCourse[] = [
  {
    id: '1',
    tutorName: 'Lucy Atieno',
    tutorLink: '/tutors/profile',
    tutorAvatar: teacherAvatar,
    courseTitle: 'The Ultimate Math Camp Kenya April 2026',
    rating: 4.5,
    price: 'KES 200.00', curriculum: 'Competency-based Curriculum', grades: ['Grade 9', 'Grade 8'], yearPosted: '2026'
  },
  {
    id: '2',
    tutorName: 'Lucy Atieno',
    tutorLink: '/tutors/profile',
    tutorAvatar: teacherAvatar,
    courseTitle: 'The Ultimate Math Camp Kenya April 2026',
    rating: 4.5,
    price: 'KES 200.00', curriculum: 'Cambridge', grades: ['Grade 7', 'Grade 6'], yearPosted: '2026'
  },
  {
    id: '3',
    tutorName: 'Lucy Atieno',
    tutorLink: '/tutors/profile',
    tutorAvatar: teacherAvatar,
    courseTitle: 'The Ultimate Math Camp Kenya April 2026',
    rating: 4.5,
    price: 'KES 200.00', curriculum: '8-4-4', grades: ['Grade 5', 'Grade 4'], yearPosted: '2025'
  }
]

export default function SchoolTutorsPage() {
  const [searchQuery, setSearchQuery] = useState('Math')
  const [activeFilterChip, setActiveFilterChip] = useState('Valley Anthony Institute')
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(true)

  // Filter States
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [priceFrom, setPriceFrom] = useState('0.00')
  const [priceTo, setPriceTo] = useState('0.00')
  const [selectedCurriculum, setSelectedCurriculum] = useState<string[]>([])
  const [selectedGrades, setSelectedGrades] = useState<string[]>([])
  const [yearPosted, setYearPosted] = useState('')
  const [cartItems, setCartItems] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [filterNotice, setFilterNotice] = useState('')

  const toggleRating = (stars: number) => {
    if (selectedRatings.includes(stars)) {
      setSelectedRatings(selectedRatings.filter(r => r !== stars))
    } else {
      setSelectedRatings([...selectedRatings, stars])
    }
  }

  const toggleCurriculum = (curr: string) => {
    if (selectedCurriculum.includes(curr)) {
      setSelectedCurriculum(selectedCurriculum.filter(c => c !== curr))
    } else {
      setSelectedCurriculum([...selectedCurriculum, curr])
    }
  }

  const toggleGrade = (grade: string) => {
    if (selectedGrades.includes(grade)) {
      setSelectedGrades(selectedGrades.filter(g => g !== grade))
    } else {
      setSelectedGrades([...selectedGrades, grade])
    }
  }

  const clearFilters = () => {
    setSelectedRatings([])
    setPriceFrom('0.00')
    setPriceTo('0.00')
    setSelectedCurriculum([])
    setSelectedGrades([])
    setYearPosted('')
    setFilterNotice('Filters cleared')
  }

  const minPrice = Number.parseFloat(priceFrom) || 0
  const maxPrice = Number.parseFloat(priceTo) || Number.POSITIVE_INFINITY
  const filteredCourses = TUTOR_COURSES.filter(item => {
    const price = Number.parseFloat(item.price.replace(/[^0-9.]/g, ''))
    const matchesSearch = `${item.courseTitle} ${item.tutorName}`.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRating = selectedRatings.length === 0 || selectedRatings.some(rating => item.rating >= rating)
    const matchesPrice = price >= minPrice && price <= maxPrice
    const matchesCurriculum = selectedCurriculum.length === 0 || selectedCurriculum.includes(item.curriculum)
    const matchesGrade = selectedGrades.length === 0 || selectedGrades.some(grade => item.grades.includes(grade))
    const matchesYear = !yearPosted || item.yearPosted === yearPosted
    return matchesSearch && matchesRating && matchesPrice && matchesCurriculum && matchesGrade && matchesYear
  })

  const toggleCart = (id: string) => {
    setCartItems(items => items.includes(id) ? items.filter(itemId => itemId !== id) : [...items, id])
  }

  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedCourseTitle, setSelectedCourseTitle] = useState('The Ultimate Math Camp Kenya April 2026')

  return (
    <div className="schools-page-wrapper">
      <SchoolHeader variant="learning" activeTab="Tutors" />
      <BookSlotModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        courseTitle={selectedCourseTitle}
      />

      <main className="container tutors-view-container">
        {/* Top Search Toolbar */}
        <div className="tutors-top-search">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search subjects, tutors..."
            />
            {searchQuery && (
              <X className="clear-icon" size={18} onClick={() => setSearchQuery('')} />
            )}
          </div>

          <button
            className={`btn-advance-search ${showAdvanceSearch ? 'active' : ''}`}
            onClick={() => setShowAdvanceSearch(!showAdvanceSearch)}
          >
            <SlidersHorizontal size={16} /> Advance Search
          </button>
        </div>

        {/* Selected Filter Chips */}
        {activeFilterChip && (
          <div className="active-filters-row">
            <div className="filter-chip">
              <img src={teacherAvatar} alt="Avatar" />
              <span>{activeFilterChip}</span>
              <X className="filter-chip-close" size={14} onClick={() => setActiveFilterChip('')} />
            </div>
          </div>
        )}

        {/* Main Content Layout with optional Sidebar */}
        <div className={`tutors-main-layout ${showAdvanceSearch ? 'with-sidebar' : ''}`}>
          {/* Advance Search Sidebar Drawer */}
          {showAdvanceSearch && (
            <aside className="advance-search-sidebar">
              <div className="sidebar-header">
                <h3>Advance Search</h3>
                <X size={18} style={{ cursor: 'pointer' }} onClick={() => setShowAdvanceSearch(false)} />
              </div>

              {/* Rating Filter */}
              <div className="filter-group">
                <div className="filter-group-title">Rating</div>
                <div className="checkbox-list">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <label key={stars} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(stars)}
                        onChange={() => toggleRating(stars)}
                      />
                      <span>
                        {stars}{' '}
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < stars ? '#f59e0b' : '#e2e8f0'}
                            color={i < stars ? '#f59e0b' : '#cbd5e1'}
                          />
                        ))}{' '}
                        <small style={{ color: '#94a3b8' }}>(52)</small>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="filter-group">
                <div className="filter-group-title">Price</div>
                <div style={{ height: 4, background: '#3b82f6', borderRadius: 2, margin: '12px 0' }}></div>
                <div className="price-inputs">
                  <div className="price-input">
                    <label>From</label>
                    <input
                      type="text"
                      value={`KES ${priceFrom}`}
                      onChange={e => setPriceFrom(e.target.value.replace('KES ', ''))}
                    />
                  </div>
                  <div className="price-input">
                    <label>To</label>
                    <input
                      type="text"
                      value={`KES ${priceTo}`}
                      onChange={e => setPriceTo(e.target.value.replace('KES ', ''))}
                    />
                  </div>
                </div>
              </div>

              {/* Curriculum Filter */}
              <div className="filter-group">
                <div className="filter-group-title">Curriculum</div>
                <div className="checkbox-list">
                  {['Competency-based Curriculum', 'Cambridge', '8-4-4'].map(curr => (
                    <label key={curr} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedCurriculum.includes(curr)}
                        onChange={() => toggleCurriculum(curr)}
                      />
                      <span>{curr}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Grade Level Filter */}
              <div className="filter-group">
                <div className="filter-group-title">Grade Level</div>
                <div className="checkbox-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {['Grade 9', 'Grade 8', 'Grade 7', 'Grade 6', 'Grade 5', 'Grade 4'].map(grade => (
                    <label key={grade} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedGrades.includes(grade)}
                        onChange={() => toggleGrade(grade)}
                      />
                      <span>{grade}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Year Posted */}
              <div className="filter-group">
                <div className="filter-group-title">Year Posted</div>
                <select
                  value={yearPosted}
                  onChange={e => setYearPosted(e.target.value)}
                  style={{ width: '100%', height: 36, borderRadius: 6, border: '1px solid #e2e8f0', padding: '0 8px' }}
                >
                  <option value="">Select...</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="sidebar-actions">
                <button className="btn-sidebar-clear" onClick={clearFilters}>Clear</button>
                <button className="btn-sidebar-apply" onClick={() => { setShowAdvanceSearch(false); setFilterNotice('Filters applied') }}>Apply Filters</button>
              </div>
            </aside>
          )}

          {/* Tutor Results Area */}
          <div className="tutors-results-list">
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 20px' }}>Results</h2>

            {filteredCourses.map(item => (
              <div key={item.id} className="tutor-result-card">
                <div className="tutor-header-row">
                  <img src={item.tutorAvatar} alt={item.tutorName} className="tutor-avatar" />
                  <div className="tutor-info">
                    <h4>{item.tutorName}</h4>
                    <a href={item.tutorLink}>View tutor profile</a>
                  </div>
                </div>

                <div className="course-card-content">
                  <div className="course-thumbnail-placeholder"></div>
                  <div className="course-details">
                    <h3>{item.courseTitle}</h3>
                    <p className="course-tutor-name">{item.tutorName}</p>
                    <div className="rating-stars" style={{ marginBottom: 8 }}>
                      <span>{item.rating}</span>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <div className="course-price">{item.price}</div>

                    <div className="course-actions-row">
                      <button
                        className="btn-action-outline"
                        onClick={() => toggleCart(item.id)}
                      >
                        <ShoppingCart size={14} /> {cartItems.includes(item.id) ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                      <button
                        className="btn-action-outline"
                        onClick={() => {
                          setSelectedCourseTitle(item.courseTitle)
                          setBookingModalOpen(true)
                        }}
                      >
                        <Calendar size={14} /> Book a Slot
                      </button>
                      <a href="/courses/detail" className="btn-action-outline">
                        <Eye size={14} /> View Class
                      </a>
                      <a href="/tutors/profile" className="btn-action-outline">
                        <User size={14} /> View Tutor
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredCourses.length === 0 && <div className="school-empty-state" role="status"><h2>No classes found</h2><p>Try a different subject, tutor, or clear your filters.</p></div>}
            {filterNotice && <p className="filter-notice" role="status">{filterNotice}</p>}

            {/* Pagination Bar */}
            <div className="pagination-bar">
              <span style={{ fontSize: 14, color: '#64748b' }}>
                Page <strong>1</strong> of 1
              </span>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" className="btn-page" disabled>
                  <ChevronLeft size={16} /> Previous
                </button>
                <button type="button" className="btn-page" disabled={page >= 1} onClick={() => setPage(1)}>
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
