import { useMemo, useState } from 'react'
import { Search, Sparkles, User, Package, BookOpen, Building2, SlidersHorizontal, Mic, Plus, Star, X, Menu } from 'lucide-react'
import Footer from '../../components/layout/Footer'
import teacherAvatar from '../../assets/images/whats-popular/teacher.jpg'
import BookSlotModal from '../../components/BookSlotModal'
import '../../styles/pages/search.css'

interface ResourceItem {
  id: string
  title: string
  tutor: string
  rating: number
  price: string
  priceValue: number
  type: 'Class' | 'Tutor' | 'Topic' | 'Question'
  curriculum: string
}

const SAMPLE_RESULTS: ResourceItem[] = [
  { id: '1', title: 'The Ultimate Math Camp Kenya April 2026', tutor: 'Lucy Atieno', rating: 4.5, price: 'KES 200.00', priceValue: 200, type: 'Class', curriculum: 'Competency-based Curriculum' },
  { id: '2', title: 'The Ultimate Math Camp Kenya April 2026', tutor: 'Lucy Atieno', rating: 4.5, price: 'KES 200.00', priceValue: 200, type: 'Class', curriculum: 'Cambridge' },
  { id: '3', title: 'The Ultimate Math Camp Kenya April 2026', tutor: 'Lucy Atieno', rating: 4.5, price: 'KES 200.00', priceValue: 200, type: 'Tutor', curriculum: '8-4-4' },
  { id: '4', title: 'The Ultimate Math Camp Kenya April 2026', tutor: 'Lucy Atieno', rating: 4.5, price: 'KES 200.00', priceValue: 200, type: 'Question', curriculum: 'Competency-based Curriculum' }
]

export default function SearchPage() {
  const params = new URLSearchParams(window.location.search)
  const initialTab = (params.get('tab') as 'AI Mode' | 'Classes' | 'Topics' | 'Tutors' | 'School' | 'Questions' | null) || 'AI Mode'
  const initialQuery = params.get('q') || ''
  const [activeTab, setActiveTab] = useState<'AI Mode' | 'Classes' | 'Topics' | 'Tutors' | 'School' | 'Questions'>(initialTab)
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = searchQuery.trim()
    setIsSubmitted(Boolean(query))
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
      const matchesTab = activeTab === 'AI Mode' || activeTab === 'Topics' || item.type === (activeTab === 'Tutors' ? 'Tutor' : activeTab === 'Questions' ? 'Question' : 'Class')
      const matchesRating = selectedRatings.length === 0 || selectedRatings.some(rating => item.rating >= rating)
      const matchesPrice = item.priceValue >= min && item.priceValue <= max
      const matchesCurriculum = selectedCurriculum.length === 0 || selectedCurriculum.includes(item.curriculum)
      return matchesQuery && matchesTab && matchesRating && matchesPrice && matchesCurriculum
    })
  }, [activeTab, maxPrice, minPrice, searchQuery, selectedCurriculum, selectedRatings])

  const clearSearch = () => {
    setSearchQuery('')
    setIsSubmitted(false)
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

  return (
    <div className="search-page-container">
      <BookSlotModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        courseTitle={selectedCourse}
      />
      {/* Top Navigation Navbar matching Desktop-82 / Desktop-83 */}
      <header className="search-header-navbar">
        <div className="search-header-inner">
          <a href="/" className="search-brand-logo">δ</a>

          <button type="button" className="search-menu-toggle" aria-label="Toggle search navigation" onClick={() => setMenuOpen(!menuOpen)}><Menu size={22} /></button>
          <nav className={`search-nav-tabs ${menuOpen ? 'open' : ''}`}>
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
        </div>
      </header>

      {/* Main Container */}
      <main className="container">
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
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
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
            </div>

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
              <div className="ai-results-split-layout">
                <div className="ai-chat-pane">
                  <div>
                    <div style={{
                      background: '#f8fafc', borderRadius: 12, padding: '12px 18px',
                      maxWidth: 240, marginLeft: 'auto', marginBottom: 24, fontSize: 14,
                      fontWeight: 600, color: '#334155'
                    }}>
                      Top 10 Learning resources for math
                    </div>

                    <p style={{ color: '#475569', fontSize: 15, marginBottom: 20 }}>
                      Sure, Here are the top 10 learning resources on Sqooli:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {filteredResults.length === 0 ? <p className="search-empty-state" role="status">No matching resources yet. Try a broader search or clear the filters.</p> : filteredResults.map((item, idx) => (
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
                </div>

                {/* Right Side Resource Cards */}
                <div className="ai-right-pane-cards">
                  {filteredResults.slice(0, 2).map((res, i) => (
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
