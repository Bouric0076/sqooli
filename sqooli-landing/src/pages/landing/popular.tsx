import { useState, useMemo } from 'react'
import {
  Search,
  Grid,
  List,
  SlidersHorizontal,
  X,
  RotateCcw,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  ChevronDown,
  MoreVertical
} from 'lucide-react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import '../../styles/pages/landing/popular.css'
import mathCampBanner from '../../assets/images/whats-popular/math_camp_banner.webp'
import teacherImg from '../../assets/images/whats-popular/teacher.webp'
import udbcCommunityTeam from '../../assets/images/udbc/udbc-community-team.webp'
import udbcDigitalLearningCommunity from '../../assets/images/udbc/udbc-digital-learning-community.webp'
import udbcEnrolmentSupport from '../../assets/images/udbc/udbc-enrolment-support.webp'

type TabCategory = 'Classes' | 'Tutors' | 'Questions' | 'Programs' | 'Enrolments'
type ViewMode = 'grid' | 'list'

interface PopularItem {
  id: number
  title: string
  tutorOrAuthor: string
  role?: string
  price: string
  rating: number
  category: TabCategory
  tag: string
  image: string
  href?: string
  intakeMonth?: string
  intakeYear?: string
  date?: string
  stats?: { downvotes: number; upvotes: number; comments: number; shares: number }
}

const CATEGORIES: TabCategory[] = ['Classes', 'Tutors', 'Questions', 'Programs', 'Enrolments']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const YEARS = ['2025', '2026']

const SAMPLE_ITEMS: PopularItem[] = [
  // Classes
  {
    id: 1,
    title: 'The Ultimate Math Camp Kenya April 2026',
    tutorOrAuthor: 'Jane Doe',
    price: 'KES 200.00',
    rating: 4.5,
    category: 'Classes',
    tag: 'Mathematics',
    image: mathCampBanner
  },
  {
    id: 2,
    title: 'Advanced Physics Masterclass & Lab Practical',
    tutorOrAuthor: 'Dr. Alex Smith',
    price: 'KES 350.00',
    rating: 4.8,
    category: 'Classes',
    tag: 'Physics',
    image: teacherImg
  },
  {
    id: 3,
    title: 'English Essay Writing & Grammar Workshop',
    tutorOrAuthor: 'Mary Vance',
    price: 'KES 180.00',
    rating: 4.7,
    category: 'Classes',
    tag: 'English',
    image: mathCampBanner
  },
  {
    id: 4,
    title: 'CBC Chemistry Lab Experiments Session',
    tutorOrAuthor: 'Peter Kamau',
    price: 'KES 250.00',
    rating: 4.9,
    category: 'Classes',
    tag: 'Chemistry',
    image: teacherImg
  },

  // Tutors
  {
    id: 5,
    title: 'Dr. Alex Smith — Senior Physics Specialist',
    tutorOrAuthor: 'Physics Specialist',
    price: 'KES 500 / hr',
    rating: 4.9,
    category: 'Tutors',
    tag: 'Physics',
    image: teacherImg
  },
  {
    id: 6,
    title: 'Jane Doe — Certified Mathematics Educator',
    tutorOrAuthor: 'Math Expert',
    price: 'KES 450 / hr',
    rating: 4.8,
    category: 'Tutors',
    tag: 'Mathematics',
    image: mathCampBanner
  },
  {
    id: 7,
    title: 'Mary Vance — English & Literature Coach',
    tutorOrAuthor: 'Language Arts',
    price: 'KES 400 / hr',
    rating: 4.7,
    category: 'Tutors',
    tag: 'English',
    image: teacherImg
  },

  // Questions
  {
    id: 8,
    title: 'What is an atom and how does it form chemical bonds?',
    tutorOrAuthor: 'Lucy',
    role: 'Parent',
    date: '20 Sep 2025 11.00 AM',
    price: 'Free Q&A',
    rating: 4.8,
    category: 'Questions',
    tag: 'Chemistry',
    image: teacherImg,
    stats: { downvotes: 20, upvotes: 20, comments: 20, shares: 20 }
  },
  {
    id: 9,
    title: 'What is the root of E76 in advanced algebra?',
    tutorOrAuthor: 'Lucy',
    role: 'Parent',
    date: '20 Sep 2025 11.00 AM',
    price: 'Free Q&A',
    rating: 4.5,
    category: 'Questions',
    tag: 'Math',
    image: mathCampBanner,
    stats: { downvotes: 20, upvotes: 20, comments: 20, shares: 20 }
  },
  {
    id: 10,
    title: 'Who is considered the father of modern physics?',
    tutorOrAuthor: 'Lucy',
    role: 'Parent',
    date: '20 Sep 2025 11.00 AM',
    price: 'Free Q&A',
    rating: 4.9,
    category: 'Questions',
    tag: 'Physics',
    image: teacherImg,
    stats: { downvotes: 20, upvotes: 20, comments: 20, shares: 20 }
  },

  // Confirmed UDBC programmes
  {
    id: 11,
    title: 'Certificate · Level 1 — Lisha Kondoo Zangu',
    tutorOrAuthor: 'Ufufuo Digital Bible College (UDBC)',
    price: 'G1 35K · G2 40K · G3 45K TZS',
    rating: 0,
    category: 'Programs',
    tag: 'Theological Studies',
    image: udbcCommunityTeam,
    href: 'https://udbc.sqooli.africa/#programmes'
  },
  {
    id: 12,
    title: 'Diploma · Level 2 — Lisha Kondoo Zangu',
    tutorOrAuthor: 'Ufufuo Digital Bible College (UDBC)',
    price: 'G1–G7 · TZS 35K–70K',
    rating: 0,
    category: 'Programs',
    tag: 'Theological Studies',
    image: udbcDigitalLearningCommunity,
    href: 'https://udbc.sqooli.africa/#programmes'
  },

  // Current confirmed enrolment opportunity
  {
    id: 13,
    title: 'July 2026 Intake — Lisha Kondoo Zangu',
    tutorOrAuthor: 'Ufufuo Digital Bible College (UDBC)',
    price: 'Admission fee: TZS 30,000',
    rating: 0,
    category: 'Enrolments',
    tag: 'Intake Open',
    image: udbcEnrolmentSupport,
    href: 'https://udbc.sqooli.africa/enroll',
    intakeMonth: 'Jul',
    intakeYear: '2026'
  }
]

export default function DiscoverPopularPage() {
  const [activeTab, setActiveTab] = useState<TabCategory>('Classes')
  const [selectedMonth, setSelectedMonth] = useState('Jul')
  const [selectedYear, setSelectedYear] = useState('2026')
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false)
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('All')
  const [openCardMenu, setOpenCardMenu] = useState<number | null>(null)
  const [toastMessage, setToastMessage] = useState('')

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const getItemRoute = (item: PopularItem) => {
    if (item.href) return item.href
    if (item.category === 'Questions') return '/questions'
    if (item.category === 'Tutors') return '/tutors/profile'
    return '/courses/detail'
  }

  // Filter items based on active tab, search query & subject filter
  const filteredItems = useMemo(() => {
    return SAMPLE_ITEMS.filter((item) => {
      if (item.category !== activeTab) return false
      if (
        searchQuery.trim() &&
        !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.tutorOrAuthor.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }
      if (selectedSubjectFilter !== 'All' && item.tag !== selectedSubjectFilter) {
        return false
      }
      if (item.category === 'Enrolments' && (item.intakeMonth !== selectedMonth || item.intakeYear !== selectedYear)) {
        return false
      }
      return true
    })
  }, [activeTab, searchQuery, selectedMonth, selectedSubjectFilter, selectedYear])

  // Count matches per category for badges
  const categoryCounts = useMemo(() => {
    const counts: Record<TabCategory, number> = {
      Classes: 0,
      Tutors: 0,
      Questions: 0,
      Programs: 0,
      Enrolments: 0
    }
    SAMPLE_ITEMS.forEach((item) => {
      if (item.category === 'Enrolments' && (item.intakeMonth !== selectedMonth || item.intakeYear !== selectedYear)) return
      if (!searchQuery.trim()) {
        counts[item.category]++
      } else {
        const q = searchQuery.toLowerCase()
        if (
          item.title.toLowerCase().includes(q) ||
          item.tutorOrAuthor.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q)
        ) {
          counts[item.category]++
        }
      }
    })
    return counts
  }, [searchQuery, selectedMonth, selectedYear])

  return (
    <div className="app">
      <Header />

      {/* Toast Notice */}
      {toastMessage && (
        <div className="toast-notice">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage('')} aria-label="Dismiss toast">
            <X size={16} />
          </button>
        </div>
      )}

      <main className="popular-main container">
        {/* PAGE HEADING ROW */}
        <div className="popular-heading-row">
          <h1 className="popular-title">
            Discover What’s Popular
            {searchQuery && <span className="query-highlight"> for "{searchQuery}"</span>}
          </h1>

          {/* Date Selector Pill */}
          <div className="date-selector">
            <div className="year-dropdown-wrapper">
              <button
                className="year-button"
                onClick={() => setShowYearDropdown(!showYearDropdown)}
                aria-expanded={showYearDropdown}
              >
                {selectedYear} <ChevronDown size={14} />
              </button>
              {showYearDropdown && (
                <div className="year-dropdown">
                  {YEARS.map((y) => (
                    <button
                      key={y}
                      className={selectedYear === y ? 'active' : ''}
                      onClick={() => {
                        setSelectedYear(y)
                        setShowYearDropdown(false)
                      }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="month-tabs-container">
              {MONTHS.map((m) => (
                <button
                  key={m}
                  className={`month-button ${selectedMonth === m ? 'selected' : ''}`}
                  onClick={() => setSelectedMonth(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CATEGORY TOOLBAR */}
        <div className="popular-toolbar">
          <div className="category-tabs" role="tablist" aria-label="Popular categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeTab === cat}
                className={`category-tab ${activeTab === cat ? 'active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
                <span
                  className={`tab-count-badge ${
                    categoryCounts[cat] > 0 ? 'has-count' : 'zero-count'
                  }`}
                >
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>

          {/* View Mode Controls */}
          <div className="view-controls">
            <button
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* SEARCH BAR WRAPPER */}
        <div className="search-bar-wrapper">
          <div className="search-container" role="search">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              aria-label={`Search in ${activeTab}`}
              placeholder={`Search in ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>

          <button
            className={`advance-search-btn ${showAdvanceSearch ? 'active' : ''}`}
            onClick={() => setShowAdvanceSearch(!showAdvanceSearch)}
          >
            <SlidersHorizontal size={16} /> Advance Search
          </button>
        </div>

        {/* ADVANCE SEARCH PANEL */}
        {showAdvanceSearch && (
          <div className="advance-search-panel">
            <div className="panel-header">
              <span className="panel-title">
                <SlidersHorizontal size={15} /> Filter Results
              </span>
              <button
                className="reset-btn"
                onClick={() => {
                  setSelectedSubjectFilter('All')
                  setSearchQuery('')
                }}
              >
                <RotateCcw size={13} /> Reset Filters
              </button>
            </div>
            <div className="panel-filters-grid">
              <div className="filter-group">
                <label>Filter by Subject</label>
                <div className="filter-pills">
                  {['All', 'Mathematics', 'Physics', 'Chemistry', 'English', 'Theological Studies'].map((subj) => (
                    <button
                      type="button"
                      key={subj}
                      className={`filter-pill ${selectedSubjectFilter === subj ? 'active' : ''}`}
                      onClick={() => setSelectedSubjectFilter(subj)}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EMPTY STATE IF NO MATCHES */}
        {filteredItems.length === 0 && (
          <div className="empty-search-state">
            <div className="empty-icon-wrapper">
              <Search size={32} />
            </div>
            <h3>No results found for "{searchQuery}" in {activeTab}</h3>
            <p>Try searching for popular topics like Math, Physics, Chemistry or clear your filter.</p>
            <div className="suggested-searches-box">
              <span className="suggested-title">Popular searches:</span>
              <div className="suggested-pills">
                {['Math', 'Physics', 'CBC', 'Chemistry'].map((s) => (
                  <button
                    key={s}
                    className="suggested-pill"
                    onClick={() => setSearchQuery(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button className="clear-search-action-btn" onClick={() => setSearchQuery('')}>
              Clear Search Query
            </button>
          </div>
        )}

        {/* CARDS CONTAINER */}
        {filteredItems.length > 0 && (
          <section className={`cards-container ${viewMode === 'list' ? 'list-view' : ''}`}>
            {filteredItems.map((item) => (
              <article key={item.id} className="class-card">
                <div className="card-heading">
                  <h3 className="card-title">{item.title}</h3>
                  <div className="more-menu-wrapper">
                    <button
                      className="more-button"
                      onClick={() => setOpenCardMenu(openCardMenu === item.id ? null : item.id)}
                      aria-label="More options"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openCardMenu === item.id && (
                      <div className="more-menu">
                        <button
                          type="button"
                          onClick={() => {
                            setOpenCardMenu(null)
                            triggerToast(`Saved "${item.title}" to bookmarks`)
                          }}
                        >
                          Save Item
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOpenCardMenu(null)
                            triggerToast(`Shared link for "${item.title}"`)
                          }}
                        >
                          Share Link
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-tags-row">
                  <span className="tag-pill">{item.tag}</span>
                </div>

                <div className="card-image-wrapper">
                  <img src={item.image} alt={item.title} className="card-image" />
                </div>

                <div className="card-body">
                  <div className="card-author">
                    {item.role ? `${item.tutorOrAuthor} · ${item.role}` : item.tutorOrAuthor}
                  </div>

                  {item.category === 'Programs' || item.category === 'Enrolments' ? (
                    <div className="popular-card-detail">{item.category === 'Programs' ? (item.id === 11 ? 'Grades 1–3 · Approx. 6 months' : 'Grades 1–7 · Approx. 14 months') : 'July 2026 intake · Enrolment open'}</div>
                  ) : (
                    <div className="card-rating-row">
                      <span className="rating-num">{item.rating.toFixed(1)}</span>
                      <div className="star-icons">
                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={13} fill={s <= Math.floor(item.rating) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
                      </div>
                    </div>
                  )}

                  {item.category === 'Questions' && item.stats && (
                    <div className="qa-card-stats-row" style={{ marginTop: '8px' }}>
                      <span className="qa-stat-pill"><ThumbsDown size={12} /> {item.stats.downvotes}</span>
                      <span className="qa-stat-pill"><ThumbsUp size={12} /> {item.stats.upvotes}</span>
                      <span className="qa-stat-pill"><MessageCircle size={12} /> {item.stats.comments}</span>
                      <span className="qa-stat-pill"><Share2 size={12} /> {item.stats.shares}</span>
                    </div>
                  )}

                  <div className="card-footer">
                    <strong className="card-price-info">{item.price}</strong>
                    <button
                      type="button"
                      className="card-action-btn"
                      onClick={() => {
                        window.location.href = getItemRoute(item)
                      }}
                    >
                      {item.category === 'Questions' ? 'View Question' : item.category === 'Tutors' ? 'View Tutor' : item.category === 'Programs' ? 'View Programme' : 'Enrol Now'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* LOAD MORE BUTTON */}
        <div className="load-more-container">
          <button
            className="load-more-btn"
            onClick={() => triggerToast('Loaded additional popular items')}
          >
            Load More
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
