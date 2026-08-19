import { useMemo, useState } from 'react'
import { Search, Sparkles, User, Package, BookOpen, Building2, SlidersHorizontal, Mic, Plus, Star, X, Menu, ChevronLeft, ChevronRight, Bell, ChevronDown, ShoppingCart, Layers3, UserRound, WalletCards } from 'lucide-react'
import Footer from '../../components/layout/Footer'
import teacherAvatar from '../../assets/images/whats-popular/teacher.webp'
import mathCampBanner from '../../assets/images/whats-popular/math_camp_banner.webp'
import sqooliLogo from '../../assets/images/hero/logo.svg'
import studentHeaderLogo from '../../assets/images/student-flow/sqooli-logo-v3.svg'
import BookSlotModal from '../../components/BookSlotModal'
import '../../styles/pages/schools.css'
import '../../styles/pages/search.css'
import '../../styles/pages/student-dashboard.css'

interface ResourceItem {
  id: string
  title: string
  tutor: string
  rating: number
  price: string
  priceValue: number
  type: 'Class' | 'Tutor' | 'Topic' | 'Question'
  curriculum: string
  schoolId: string
}

const SAMPLE_RESULTS: ResourceItem[] = [
  { id: '1', title: 'The Ultimate Math Camp Kenya April 2026', tutor: 'Lucy Atieno', rating: 4.5, price: 'KES 200.00', priceValue: 200, type: 'Class', curriculum: 'Competency-based Curriculum', schoolId: 'udbc' },
  { id: '2', title: 'The Ultimate Math Camp Kenya April 2026', tutor: 'Lucy Atieno', rating: 4.5, price: 'KES 200.00', priceValue: 200, type: 'Class', curriculum: 'Cambridge', schoolId: 'udbc' },
  { id: '3', title: 'Lucy Atieno · Mathematics Tutor', tutor: 'Lucy Atieno', rating: 4.5, price: 'KES 200.00', priceValue: 200, type: 'Tutor', curriculum: '8-4-4', schoolId: 'udbc' },
  { id: '4', title: 'The Ultimate Math Camp Kenya April 2026', tutor: 'Lucy Atieno', rating: 4.5, price: 'KES 200.00', priceValue: 200, type: 'Question', curriculum: 'Competency-based Curriculum', schoolId: 'udbc' }
]

export default function SearchPage() {
  const params = new URLSearchParams(window.location.search)
  const initialTab = (params.get('tab') as 'AI Mode' | 'Classes' | 'Topics' | 'Tutors' | 'School' | 'Questions' | null) || 'AI Mode'
  const initialQuery = params.get('q') || ''
  const initialStudentDiscovery = params.get('student') === '1'
  const claimMode = initialStudentDiscovery && params.get('claim') === '1'
  const schoolFilter = params.get('school') || ''
  const [activeTab, setActiveTab] = useState<'AI Mode' | 'Classes' | 'Topics' | 'Tutors' | 'School' | 'Questions'>(initialTab)
  const isStudentDiscovery = initialStudentDiscovery || activeTab === 'AI Mode'
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [isSubmitted, setIsSubmitted] = useState(Boolean(initialQuery || initialTab !== 'AI Mode'))
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [minPrice, setMinPrice] = useState('0')
  const [maxPrice, setMaxPrice] = useState('500')
  const [selectedCurriculum, setSelectedCurriculum] = useState<string[]>([])
  const [askInput, setAskInput] = useState('')
  const [resultNotice, setResultNotice] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLessonIds, setSelectedLessonIds] = useState<string[]>(claimMode ? ['1'] : [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = searchQuery.trim()
    setIsSubmitted(Boolean(query || activeTab !== 'AI Mode'))
    const next = new URLSearchParams(window.location.search)
    if (query) next.set('q', query)
    else next.delete('q')
    next.set('tab', activeTab)
    window.history.replaceState({}, '', `/search?${next.toString()}`)
  }

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = askInput.trim()
    if (!query) return
    setSearchQuery(query)
    setAskInput('')
    setIsSubmitted(true)
    const next = new URLSearchParams(window.location.search)
    next.set('q', query)
    next.set('tab', activeTab)
    window.history.replaceState({}, '', `/search?${next.toString()}`)
  }

  const setSearchTab = (tab: typeof activeTab) => {
    setActiveTab(tab)
    setMenuOpen(false)
    if (tab === 'School') {
      window.location.assign('/schools')
      return
    }
    if (tab === 'Questions') {
      window.location.assign('/questions')
      return
    }
    setIsSubmitted(tab !== 'AI Mode' || Boolean(searchQuery.trim()))
    const next = new URLSearchParams(window.location.search)
    next.set('tab', tab)
    window.history.replaceState({}, '', `/search?${next.toString()}`)
  }

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const min = Number.parseFloat(minPrice) || 0
    const max = Number.parseFloat(maxPrice) || Number.POSITIVE_INFINITY
    return SAMPLE_RESULTS.filter(item => {
      const matchesQuery = !query || `${item.title} ${item.tutor} ${item.type}`.toLowerCase().includes(query)
      const matchesTab = activeTab === 'AI Mode' || item.type === (activeTab === 'Tutors' ? 'Tutor' : activeTab === 'Questions' ? 'Question' : 'Class')
      const matchesRating = selectedRatings.length === 0 || selectedRatings.some(rating => item.rating >= rating)
      const matchesPrice = item.priceValue >= min && item.priceValue <= max
      const matchesCurriculum = selectedCurriculum.length === 0 || selectedCurriculum.includes(item.curriculum)
      const matchesSchool = !schoolFilter || item.schoolId === schoolFilter
      return matchesQuery && matchesTab && matchesRating && matchesPrice && matchesCurriculum && matchesSchool
    })
  }, [activeTab, maxPrice, minPrice, schoolFilter, searchQuery, selectedCurriculum, selectedRatings])

  const resultsPerPage = 3
  const totalPages = Math.max(1, Math.ceil(filteredResults.length / resultsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const visibleResults = filteredResults.slice((safePage - 1) * resultsPerPage, safePage * resultsPerPage)

  const clearSearch = () => {
    setSearchQuery('')
    setIsSubmitted(activeTab !== 'AI Mode')
    const next = new URLSearchParams(window.location.search)
    next.delete('q')
    window.history.replaceState({}, '', `/search?${next.toString()}`)
  }

  const clearFilters = () => {
    setSelectedRatings([])
    setSelectedCurriculum([])
    setMinPrice('0')
    setMaxPrice('500')
    setShowAdvanceSearch(false)
  }

  const getResultHref = (item: ResourceItem) => {
    const query = encodeURIComponent(searchQuery)
    if (item.type === 'Question') return `/questions?q=${query}`
    if (item.type === 'Tutor') return `/tutors/profile?q=${query}`
    return `/courses/detail?q=${query}`
  }

  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('The Ultimate Math Camp Kenya April 2026')
  const activeStudentTab = activeTab === 'Classes' ? 'Lessons' : activeTab
  const toggleLesson = (id: string) => setSelectedLessonIds(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])

  return (
    <div className={`search-page-container${isStudentDiscovery ? ' search-page-container--student' : ''}`}>
      <BookSlotModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        courseTitle={selectedCourse}
      />
      {/* Top Navigation Navbar matching Desktop-82 / Desktop-83 */}
      <header className={isStudentDiscovery ? 'student-dashboard__header search-student-header' : 'search-header-navbar'}>
        {isStudentDiscovery ? <>
          <a href="/student" className="student-dashboard__header-brand" aria-label="Back to student dashboard"><img src={studentHeaderLogo} alt="Sqooli" /></a>
          <button className="student-dashboard__role" type="button">Student <ChevronDown size={15} /></button>
          <div className="student-dashboard__header-actions">
            <label className="student-dashboard__search"><Search size={18} /><input type="search" aria-label="Search Tutors, Lessons, Programs" placeholder="Search Tutors, Lessons, Programs..." /></label>
            <button type="button" aria-label="Wallet" onClick={() => { window.location.href = '/student/wallet' }}><WalletCards size={22} /></button>
            <button type="button" aria-label="Notifications"><Bell size={22} /></button>
            <button type="button" aria-label="Cart" onClick={() => { window.location.href = '/student/cart' }}><ShoppingCart size={22} /></button>
            <button type="button" aria-label="Resources"><Layers3 size={22} /></button>
            <button type="button" className="student-dashboard__profile" aria-label="Open profile menu"><span className="student-dashboard__avatar"><UserRound size={20} /></span><strong>John Juma</strong><ChevronDown size={16} /></button>
          </div>
        </> : <div className="search-header-inner">
          <a href="/" className="search-brand-logo" aria-label="Sqooli home">
            <img src={sqooliLogo} alt="Sqooli" />
          </a>

          <button type="button" className="search-menu-toggle" aria-label="Toggle search navigation" aria-controls="search-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Menu size={22} /></button>
          <nav id="search-navigation" className={`search-nav-tabs ${menuOpen ? 'open' : ''}`} aria-label="Search navigation">
            {(['AI Mode', 'Classes', 'Topics', 'Tutors', 'School', 'Questions'] as const).map(tab => (
              <button
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                type="button"
                onClick={() => setSearchTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="/popular" className="btn-trending-pill">Trending</a>
            <a href="/#login" className="btn-login-pill">Login</a>
          </div>
        </div>}
      </header>

      {/* Main Container */}
      <main className="container">
        {isStudentDiscovery && <>
          <div className="student-search-context">
            <a href="/student">← <span>Back to Dashboard</span></a>
            <a className="student-search-context__trending" href="/popular">Trending</a>
          </div>
          <nav className="student-search-tabs" aria-label="Student discovery navigation">
            {(['AI Mode', 'Lessons', 'Programs', 'Topics', 'Tutors', 'School', 'Questions'] as const).map(tab => (
              <button key={tab} className={tab === activeStudentTab ? 'is-active' : ''} type="button" onClick={() => tab === 'Lessons' ? setSearchTab('Classes') : tab === 'Programs' ? window.location.assign('/popular') : tab === 'School' ? setSearchTab('School') : tab === 'Questions' ? setSearchTab('Questions') : setSearchTab(tab === 'Topics' ? 'Topics' : tab === 'Tutors' ? 'Tutors' : 'AI Mode')}>
                {tab}
              </button>
            ))}
          </nav>
        </>}
        {!isSubmitted ? (
          /* Landing Home State (Desktop - 82 / Desktop - 89) */
          <div className="search-hero-wrapper">
            {/* Sqooli Periodic Table Logo */}
            <div className="periodic-logo-group">
              <div className="periodic-tile tile-s"><span className="atomic-num">16</span>s</div>
              <div className="periodic-tile tile-q"><span className="atomic-num">8</span>q</div>
              <div className="periodic-tile tile-o1"><span className="atomic-num">8</span>o</div>
              <div className="periodic-tile tile-o2"><span className="atomic-num">8</span>o</div>
              <div className="periodic-tile tile-li"><span className="atomic-num">3</span>li</div>
            </div>

            <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px', color: '#1e293b' }}>
              {activeTab === 'AI Mode' ? 'What can I help you with?' : 'Empowering Learning, Anytime, Anywhere'}
            </h1>

            <form onSubmit={handleSearchSubmit} className="search-pill-input-bar">
              <Search size={20} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search lessons, tutors, common questions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn-ai-mode-sparkle">
                AI mode <Sparkles size={14} fill="#f59e0b" color="#f59e0b" />
              </button>
            </form>

            <div className="quick-category-pills">
              <button type="button" className="quick-cat-btn" onClick={() => { setSearchQuery(''); setSearchTab('Tutors') }}>
                <User size={16} /> Find Tutors
              </button>
              <button type="button" className="quick-cat-btn" onClick={() => { setSearchQuery(''); setSearchTab('Topics') }}>
                <Package size={16} /> Find Learning Resources
              </button>
              <button type="button" className="quick-cat-btn" onClick={() => { setSearchQuery(''); setSearchTab('Classes') }}>
                <BookOpen size={16} /> Find Lessons
              </button>
              <button type="button" className="quick-cat-btn" onClick={() => window.location.href = '/schools'}>
                <Building2 size={16} /> Find Schools
              </button>
            </div>
          </div>
        ) : (
          /* Search Results & AI Split View (Desktop - 83 / Desktop - 88 / Desktop - 97) */
          <div style={{ paddingTop: 24 }}>
            {/* Search Bar Toolbar */}
            {activeTab !== 'AI Mode' && <div className={`student-search-toolbar${claimMode ? ' is-claim-mode' : ''}`} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div className="search-input-wrapper" style={{ flex: 1 }}>
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Search lessons, tutors, common questions..."
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <X className="clear-icon" size={18} aria-label="Clear search" onClick={clearSearch} />
              </div>

              <button
                className={`btn-advance-search ${showAdvanceSearch ? 'active' : ''}`}
                onClick={() => setShowAdvanceSearch(!showAdvanceSearch)}
              >
                <SlidersHorizontal size={16} /> Advance Search
              </button>
              {claimMode && <button type="button" className="student-search-claim-button" disabled={selectedLessonIds.length === 0} onClick={() => setResultNotice(`${selectedLessonIds.length} lesson${selectedLessonIds.length === 1 ? '' : 's'} selected for claiming.`)}>Claim Selected Lessons</button>}
            </div>}

            <div className={`tutors-main-layout ${showAdvanceSearch ? 'with-sidebar' : ''}`}>
              {/* Advance Search Sidebar Drawer (Desktop - 97) */}
              {showAdvanceSearch && (
                <aside className="advance-search-sidebar">
                  <div className="sidebar-header">
                    <h3>Advance Search</h3>
                    <X size={18} style={{ cursor: 'pointer' }} onClick={() => setShowAdvanceSearch(false)} />
                  </div>

                  <div className="filter-group">
                    <div className="filter-group-title">Rating</div>
                    <div className="checkbox-list">
                      {[5, 4, 3, 2, 1].map(stars => (
                        <label key={stars} className="checkbox-label">
                          <input type="checkbox" checked={selectedRatings.includes(stars)} onChange={() => setSelectedRatings(current => current.includes(stars) ? current.filter(rating => rating !== stars) : [...current, stars])} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <span>{stars}</span>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} fill={i < stars ? '#f59e0b' : '#e2e8f0'} color={i < stars ? '#f59e0b' : '#cbd5e1'} />
                            ))}
                            <span style={{ color: '#94a3b8', fontSize: 11 }}>(52)</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group">
                    <div className="filter-group-title">Price</div>
                    <div className="price-inputs">
                      <div className="price-input">
                        <label>From</label>
                        <input type="number" min="0" value={minPrice} onChange={e => setMinPrice(e.target.value)} aria-label="Minimum price" />
                      </div>
                      <div className="price-input">
                        <label>To</label>
                        <input type="number" min="0" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} aria-label="Maximum price" />
                      </div>
                    </div>
                  </div>

                  <div className="filter-group">
                    <div className="filter-group-title">Curriculum</div>
                    <div className="checkbox-list">
                      {['Competency-based Curriculum', 'Cambridge', '8-4-4'].map((curr, i) => (
                        <label key={i} className="checkbox-label">
                          <input type="checkbox" checked={selectedCurriculum.includes(curr)} onChange={() => setSelectedCurriculum(current => current.includes(curr) ? current.filter(value => value !== curr) : [...current, curr])} />
                          <span>{curr}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="sidebar-actions">
                    <button type="button" className="btn-sidebar-clear" onClick={clearFilters}>Clear</button>
                    <button className="btn-sidebar-apply" onClick={() => setShowAdvanceSearch(false)}>Apply Filters</button>
                  </div>
                </aside>
              )}

              {/* Main AI Results Split View (Desktop - 83) */}
              <div className={`ai-results-split-layout ${activeTab === 'Classes' ? 'class-results-layout' : ''}`}>
                {activeTab === 'Classes' ? (
                  <section className="class-results-list" aria-label="Class search results">
                    <h2>Showing results for “{searchQuery.trim() || 'Classes'}”</h2>
                    {filteredResults.length === 0 ? (
                      <p className="search-empty-state" role="status">No matching classes yet. Try a broader search or clear the filters.</p>
                    ) : (
                      <div className="class-result-items">
                        {visibleResults.map(item => (
                          <article className={`class-result-row${claimMode ? ' is-selectable' : ''}${selectedLessonIds.includes(item.id) ? ' is-selected' : ''}`} key={item.id}>
                            {claimMode && <label className="student-lesson-select"><input type="checkbox" checked={selectedLessonIds.includes(item.id)} onChange={() => toggleLesson(item.id)} aria-label={`Select ${item.title}`} /><span /></label>}
                            <div className="class-result-author">
                              <img src={teacherAvatar} alt="" />
                              <div>
                                <strong>{item.tutor}</strong>
                                <a href={`/tutors/profile?q=${encodeURIComponent(searchQuery)}`}>View tutor profile</a>
                              </div>
                            </div>
                            <div className="class-result-content">
                              <img className="class-result-image" src={mathCampBanner} alt="" />
                              <div className="class-result-details">
                                <a href={getResultHref(item)} className="class-result-title">{item.title}</a>
                                <span>{item.tutor}</span>
                                <div className="class-result-rating"><strong>{item.rating.toFixed(1)}</strong> ★★★★★ <b>{item.price}</b></div>
                                <div className="class-result-actions">
                                  <button type="button" className="btn-action-outline" onClick={() => setResultNotice(`${item.title} added to your list.`)}>Add to Cart</button>
                                  <button type="button" className="btn-action-outline" onClick={() => { setSelectedCourse(item.title); setBookingModalOpen(true) }}>Book a Slot</button>
                                  <a href={getResultHref(item)} className="btn-action-outline">View Class</a>
                                  <a href={`/tutors/profile?q=${encodeURIComponent(searchQuery)}`} className="btn-action-outline">View Tutor</a>
                                </div>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                    {filteredResults.length > 0 && (
                      <div className="pagination-bar search-results-pagination">
                        <span className="search-pagination-status">Page {safePage} of {totalPages}</span>
                        <div className="search-pagination-actions">
                          <button type="button" className="btn-page" disabled={safePage === 1} onClick={() => setCurrentPage(page => Math.max(1, page - 1))}><ChevronLeft size={15} aria-hidden="true" /> Previous</button>
                          <button type="button" className="btn-page" disabled={safePage === totalPages} onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}>Next <ChevronRight size={15} aria-hidden="true" /></button>
                        </div>
                      </div>
                    )}
                    {resultNotice && <p className="search-result-notice" role="status">{resultNotice}</p>}
                  </section>
                ) : <div className="ai-chat-pane">
                  <div>
                    <div style={{
                      background: '#f8fafc', borderRadius: 12, padding: '12px 18px',
                      maxWidth: 240, marginLeft: 'auto', marginBottom: 24, fontSize: 14,
                      fontWeight: 600, color: '#334155'
                    }}>
                      Top 10 Learning resources for {searchQuery.trim() || activeTab}
                    </div>

                    <p style={{ color: '#475569', fontSize: 15, marginBottom: 20 }}>
                      Sure, Here are the top 10 learning resources on Sqooli
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {filteredResults.length === 0 ? <p className="search-empty-state" role="status">No matching resources yet. Try a broader search or clear the filters.</p> : visibleResults.map((item, idx) => (
                        <div key={item.id} style={{ display: 'flex', gap: 12 }}>
                          <span style={{ fontWeight: 700, fontSize: 15 }}>{idx + 1}.</span>
                          <div>
                            <a href={getResultHref(item)} style={{ color: '#0284c7', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                              {item.title}
                            </a>
                            <div style={{ fontSize: 13, color: '#64748b', margin: '4px 0' }}>{item.tutor}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>{item.rating} ★★★★★</span>
                              <strong style={{ fontSize: 13, color: '#0f172a' }}>{item.price}</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredResults.length > 0 && (
                      <div className="pagination-bar search-results-pagination">
                        <span className="search-pagination-status">Page {safePage} of {totalPages}</span>
                        <div className="search-pagination-actions">
                          <button type="button" className="btn-page" disabled={safePage === 1} onClick={() => setCurrentPage(page => Math.max(1, page - 1))}>
                            <ChevronLeft size={15} aria-hidden="true" /> Previous
                          </button>
                          <button type="button" className="btn-page" disabled={safePage === totalPages} onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}>
                            Next <ChevronRight size={15} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ask Anything Input Bar */}
                  <form className="ai-prompt-bottom-bar" onSubmit={handleAskSubmit}>
                    <Plus size={18} color="#94a3b8" />
                    <input
                      type="text"
                      placeholder="Ask Anything"
                      value={askInput}
                      onChange={e => setAskInput(e.target.value)}
                    />
                    <button type="button" className="ai-mic-button" aria-label="Voice search"><Mic size={18} color="#94a3b8" /></button>
                  </form>
                </div>}

                {/* Right Side Resource Cards */}
                <div className="ai-right-pane-cards">
                  {visibleResults.slice(0, 2).map((res, i) => (
                    <div key={i} className="recommended-card-item">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <img src={teacherAvatar} alt="Tutor" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                        <div>
                          <h5 style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{res.tutor}</h5>
                        <a href={`/tutors/profile?q=${encodeURIComponent(searchQuery)}`} style={{ fontSize: 11, color: '#0284c7' }}>View tutor profile</a>
                        </div>
                      </div>

                      <div style={{
                        height: 90, background: '#e2e8f0', borderRadius: 8,
                        marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=300&q=80" alt="Course" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                      </div>

                      <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 4px' }}>{res.title}</h4>
                      <div style={{ fontSize: 12, color: '#64748b' }}>{res.tutor}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', margin: '4px 0' }}>{res.rating} ★★★★★</div>
                      <strong style={{ fontSize: 13, display: 'block', marginBottom: 10 }}>{res.price}</strong>

                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="btn-action-outline"
                          style={{ fontSize: 10, padding: '4px 8px' }}
                          onClick={() => {
                            setSelectedCourse(res.title)
                            setBookingModalOpen(true)
                          }}
                        >
                          Book a Slot
                        </button>
                        <a href={getResultHref(res)} className="btn-action-outline" style={{ fontSize: 10, padding: '4px 8px' }}>{res.type === 'Question' ? 'View Question' : res.type === 'Tutor' ? 'View Tutor' : 'View Class'}</a>
                        {res.type !== 'Question' && <a href={`/tutors/profile?q=${encodeURIComponent(searchQuery)}`} className="btn-action-outline" style={{ fontSize: 10, padding: '4px 8px' }}>View Tutor</a>}
                      </div>
                    </div>
                  ))}

                  <button type="button"
                    className="btn-sidebar-clear"
                    style={{ width: '100%', marginTop: 16, height: 40 }}
                    onClick={() => setResultNotice('You are viewing all available demo results.')}
                  >
                    Show more results
                  </button>
                  {resultNotice && <p role="status" style={{ margin: '10px 0 0', color: '#64748b', fontSize: 12 }}>{resultNotice}</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
