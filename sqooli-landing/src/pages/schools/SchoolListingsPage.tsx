import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, Scale, Star, ChevronLeft, ChevronRight, Users, MapPin } from 'lucide-react'
import SchoolHeader from './SchoolHeader'
import Footer from '../../components/layout/Footer'
import '../../styles/pages/schools.css'
import '../../styles/pages/search.css'
import udbcCommunityTeam from '../../assets/images/udbc/udbc-community-team.webp'

const LISTINGS_DATA = [
  {
    id: 'udbc',
    name: 'Ufufuo Digital Bible College (UDBC)',
    url: 'udbc.sqooli.africa',
    students: 'Digital learning',
    location: 'East Africa',
    rating: 0,
    image: udbcCommunityTeam
  }
]

export default function SchoolListingsPage() {
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('q') ?? '')
  const [page, setPage] = useState(1)
  const pageSize = 4

  const filtered = useMemo(() => LISTINGS_DATA.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.location.toLowerCase().includes(query.toLowerCase())
  ), [query])
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visibleListings = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="schools-page-wrapper">
      <SchoolHeader variant="listings" />

      <main className="container" style={{ padding: '48px 0 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 12px' }}>School Listings</h1>
          <p style={{ color: '#64748b', fontSize: 16 }}>
            Search schools and access tutors, lessons and resources on our network
          </p>
        </div>

        {/* Search and Action Toolbar */}
        <form className="school-listing-toolbar" onSubmit={event => { event.preventDefault(); setPage(1) }}>
          <div className="search-input-wrapper" style={{ flex: 1 }}>
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search School"
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(1) }}
            />
          </div>

          <button type="button"
            className="btn-advance-search"
            onClick={() => window.location.href = '/schools/tutors?advance=true'}
          >
            <SlidersHorizontal size={16} /> Advance Search
          </button>

          <button type="button"
            className="btn-action-outline"
            style={{ display: 'flex', alignItems: 'center', gap: 8, height: 48, padding: '0 24px' }}
            onClick={() => window.location.href = '/schools#compare'}
          >
            <Scale size={16} /> Compare
          </button>
        </form>

        {/* Listings Clean Horizontal Rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {visibleListings.map(school => (
            <div key={school.id} className="school-row-item-light">
              <img src={school.image} alt={school.name} className="school-thumb" />
              <div>
                <h3>{school.name}</h3>
                <a href={`/schools/detail?school=${encodeURIComponent(school.id)}`} className="school-link">{school.url}</a>
                <div className="school-meta-row">
                  <span className="school-meta-item"><Users size={14} /> {school.students}</span>
                  <span className="school-meta-item"><MapPin size={14} /> {school.location}</span>
                  {school.rating > 0 && <div className="rating-stars" aria-label={`${school.rating} out of 5 rating`}>
                    <span>{school.rating}</span>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>}
                </div>
              </div>

              <div className="school-card-actions">
                <a href={school.url.startsWith('http') ? school.url : `https://${school.url}`} target="_blank" rel="noreferrer" className="btn-action-outline">Go to Website</a>
                <a href={`/schools/tutors?school=${encodeURIComponent(school.id)}&tab=classes`} className="btn-action-outline">View Lessons</a>
                <a href={`/search?tab=Tutors&school=${encodeURIComponent(school.id)}`} className="btn-action-outline">View Tutors</a>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="school-empty-state" role="status">
              <h2>No schools found</h2>
              <p>Try a different school name or location.</p>
            <button type="button" className="btn-action-outline" onClick={() => { setQuery(''); setPage(1) }}>Clear search</button>
            </div>
          )}
        </div>

        {/* Pagination Bar */}
        <div className="pagination-bar">
          <span style={{ fontSize: 14, color: '#64748b' }}>
            Page <input aria-label="Current page" type="number" min={1} max={totalPages} value={page} onChange={e => setPage(Math.min(totalPages, Math.max(1, Number(e.target.value) || 1)))} style={{ width: 44, textAlign: 'center', height: 32, borderRadius: 6, border: '1px solid #cbd5e1' }} /> of {totalPages}
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" className="btn-page" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>
              <ChevronLeft size={16} /> Previous
            </button>
            <button type="button" className="btn-page" disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
