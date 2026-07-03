"use client";
import React, { useState, useMemo, useCallback, useEffect } from 'react';

/* ═══════════════════════ MOCK DATA ═══════════════════════ */
const ALL_CLASSES = [
  { id: 1, author: 'Lucy Atieno', link: 'https://example-link.com', title: 'The Ultimate Math Camp Kenya April 2026', rating: 4.5, price: 200, curriculum: 'Competency-based Curriculum', grade: 'Grade 9', year: 2026 },
  { id: 2, author: 'Lucy Atieno', link: 'https://example-link.com', title: 'The Ultimate Math Camp Kenya April 2026', rating: 4.5, price: 200, curriculum: 'Cambridge', grade: 'Grade 8', year: 2026 },
  { id: 3, author: 'Lucy Atieno', link: 'https://example-link.com', title: 'The Ultimate Math Camp Kenya April 2026', rating: 4.5, price: 200, curriculum: '8-4-4', grade: 'Grade 7', year: 2025 },
  { id: 4, author: 'James Ochieng', link: 'https://example-link.com', title: 'Advanced Math Problem Solving Workshop', rating: 5, price: 350, curriculum: 'Cambridge', grade: 'Grade 9', year: 2026 },
  { id: 5, author: 'James Ochieng', link: 'https://example-link.com', title: 'Math Foundations for Beginners', rating: 3, price: 100, curriculum: 'Competency-based Curriculum', grade: 'Grade 4', year: 2025 },
  { id: 6, author: 'Sarah Wanjiku', link: 'https://example-link.com', title: 'KCSE Math Revision Bootcamp', rating: 4, price: 500, curriculum: '8-4-4', grade: 'Grade 9', year: 2026 },
  { id: 7, author: 'Sarah Wanjiku', link: 'https://example-link.com', title: 'Fun Math Games and Puzzles', rating: 5, price: 150, curriculum: 'Competency-based Curriculum', grade: 'Grade 5', year: 2024 },
  { id: 8, author: 'Peter Kamau', link: 'https://example-link.com', title: 'Math Olympiad Preparation Course', rating: 5, price: 800, curriculum: 'Cambridge', grade: 'Grade 8', year: 2026 },
  { id: 9, author: 'Peter Kamau', link: 'https://example-link.com', title: 'Everyday Math Skills Workshop', rating: 2, price: 80, curriculum: '8-4-4', grade: 'Grade 6', year: 2024 },
  { id: 10, author: 'Grace Akinyi', link: 'https://example-link.com', title: 'Math and Science Integration Camp', rating: 4, price: 300, curriculum: 'Competency-based Curriculum', grade: 'Grade 7', year: 2025 },
  { id: 11, author: 'Grace Akinyi', link: 'https://example-link.com', title: 'Primary Math Mastery Program', rating: 3.5, price: 180, curriculum: 'Cambridge', grade: 'Grade 4', year: 2025 },
  { id: 12, author: 'David Mwangi', link: 'https://example-link.com', title: 'Statistics and Math Analysis', rating: 4.5, price: 450, curriculum: '8-4-4', grade: 'Grade 9', year: 2026 },
  { id: 13, author: 'David Mwangi', link: 'https://example-link.com', title: 'Mental Math Speed Training', rating: 1, price: 50, curriculum: 'Competency-based Curriculum', grade: 'Grade 5', year: 2024 },
  { id: 14, author: 'Faith Njeri', link: 'https://example-link.com', title: 'Math Tutoring One-on-One Sessions', rating: 5, price: 600, curriculum: 'Cambridge', grade: 'Grade 6', year: 2026 },
  { id: 15, author: 'Faith Njeri', link: 'https://example-link.com', title: 'Holiday Math Revision Classes', rating: 2, price: 120, curriculum: '8-4-4', grade: 'Grade 8', year: 2025 },
  { id: 16, author: 'Tom Otieno', link: 'https://example-link.com', title: 'Geometry and Math Visualization', rating: 4, price: 250, curriculum: 'Competency-based Curriculum', grade: 'Grade 7', year: 2026 },
  { id: 17, author: 'Tom Otieno', link: 'https://example-link.com', title: 'Math Exam Strategies Masterclass', rating: 3, price: 220, curriculum: 'Cambridge', grade: 'Grade 9', year: 2025 },
  { id: 18, author: 'Ann Chebet', link: 'https://example-link.com', title: 'Early Years Math Exploration', rating: 5, price: 90, curriculum: '8-4-4', grade: 'Grade 4', year: 2024 },
  { id: 19, author: 'Ann Chebet', link: 'https://example-link.com', title: 'Algebra and Math Reasoning', rating: 4.5, price: 380, curriculum: 'Competency-based Curriculum', grade: 'Grade 8', year: 2026 },
  { id: 20, author: 'Brian Kiprop', link: 'https://example-link.com', title: 'Math Competition Training 2026', rating: 5, price: 700, curriculum: 'Cambridge', grade: 'Grade 9', year: 2026 },
];

const ITEMS_PER_PAGE = 3;

const DEFAULT_FILTERS = {
  ratings: [],
  priceFrom: 0,
  priceTo: 10000,
  curricula: [],
  grades: [],
  year: '',
};

/* ═══════════════════════ STYLES ═══════════════════════ */
const S = {
  root: { fontFamily: "'Inter','Segoe UI',sans-serif", fontSize: 14, color: '#1a1a1a', background: '#fff', minHeight: '100vh', position: 'relative' },

  /* top nav */
  topNav: { display: 'flex', gap: 0, borderBottom: '1px solid #e5e7eb', padding: '0 24px', background: '#fff' },
  navItem: (active) => ({ padding: '12px 16px', fontSize: 14, fontWeight: active ? 600 : 400, color: active ? '#1a8efd' : '#4b5563', borderBottom: `2px solid ${active ? '#1a8efd' : 'transparent'}`, cursor: 'pointer', background: 'none', border: 'none', borderBottomWidth: 2, borderBottomStyle: 'solid', borderBottomColor: active ? '#1a8efd' : 'transparent', whiteSpace: 'nowrap', transition: 'color .15s' }),

  /* search row */
  searchRow: { display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', borderBottom: '1px solid #e5e7eb' },
  searchInputWrapper: { flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 14px', gap: 10, background: '#fff' },
  searchInput: { flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#1a1a1a', background: 'transparent' },
  advSearchBtn: (active) => ({ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 8, border: `1px solid ${active ? '#1a8efd' : '#d1d5db'}`, background: active ? '#eef6ff' : '#fff', fontSize: 14, fontWeight: 500, color: active ? '#1a8efd' : '#1a1a1a', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s' }),

  /* body */
  body: { display: 'flex', minHeight: 'calc(100vh - 110px)' },

  /* sidebar */
  sidebar: (open) => ({ width: open ? 290 : 0, minWidth: open ? 290 : 0, borderRight: open ? '1px solid #e5e7eb' : 'none', padding: open ? '20px 20px 24px' : 0, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', background: '#fafafa', transition: 'width .25s ease, min-width .25s ease, padding .25s ease', opacity: open ? 1 : 0 }),
  sidebarHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sidebarTitle: { fontSize: 15, fontWeight: 600, color: '#1a1a1a', whiteSpace: 'nowrap' },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: 18, padding: 4, lineHeight: 1, borderRadius: 4, transition: 'background .15s' },

  /* filter */
  filterSection: { marginBottom: 18 },
  filterHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: 10, userSelect: 'none' },
  filterLabel: { fontSize: 14, fontWeight: 600, color: '#1a1a1a' },
  chevron: (open) => ({ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform .2s', color: '#6b7280' }),
  checkRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 13, color: '#374151', cursor: 'pointer' },
  checkbox: { width: 16, height: 16, accentColor: '#1a8efd', cursor: 'pointer', margin: 0 },

  /* price */
  rangeTrack: { position: 'relative', width: '100%', height: 6, background: '#e5e7eb', borderRadius: 3, margin: '14px 0 14px' },
  rangeThumb: (pct) => ({ position: 'absolute', top: -5, left: `calc(${pct}% - 8px)`, width: 16, height: 16, borderRadius: '50%', background: '#1a8efd', border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,.2)', cursor: 'grab', zIndex: 2 }),
  rangeFill: (from, to) => ({ position: 'absolute', top: 0, left: `${from}%`, width: `${to - from}%`, height: '100%', background: '#1a8efd', borderRadius: 3 }),
  priceInputRow: { display: 'flex', gap: 12, marginBottom: 4 },
  priceCol: { flex: 1 },
  priceLabel: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  priceInput: { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, color: '#1a1a1a', outline: 'none', background: '#fff', boxSizing: 'border-box' },

  /* grade grid */
  gradeGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' },

  /* select */
  select: { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, color: '#374151', outline: 'none', background: '#fff', cursor: 'pointer' },

  /* sidebar footer */
  sidebarFooter: { display: 'flex', justifyContent: 'center', gap: 16, marginTop: 'auto', paddingTop: 20 },
  clearBtn: { background: 'none', border: 'none', color: '#1a8efd', fontSize: 14, fontWeight: 500, cursor: 'pointer', padding: '10px 20px', transition: 'opacity .15s' },
  applyBtn: { background: '#1a8efd', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'background .15s' },

  /* main */
  main: { flex: 1, padding: '20px 28px 28px', overflowY: 'auto' },
  resultsHeading: { fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#1a1a1a' },

  /* card */
  card: { borderBottom: '1px solid #e5e7eb', paddingBottom: 20, marginBottom: 20 },
  cardMeta: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 },
  avatar: { width: 36, height: 36, borderRadius: '50%', background: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: '#fff', flexShrink: 0 },
  authorInfo: { display: 'flex', flexDirection: 'column', gap: 1 },
  authorName: { fontSize: 14, fontWeight: 600, color: '#1a1a1a' },
  authorLink: { fontSize: 12, color: '#1a8efd', textDecoration: 'none' },
  cardBody: { display: 'flex', gap: 16, marginBottom: 12 },
  thumbnail: { width: 140, height: 100, borderRadius: 8, background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', position: 'relative' },
  cardDetails: { display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 },
  cardTitle: { fontSize: 15, fontWeight: 600, color: '#1a1a1a', margin: 0 },
  cardAuthor: { fontSize: 13, color: '#6b7280', margin: 0 },
  ratingRow: { display: 'flex', alignItems: 'center', gap: 6 },
  ratingNum: { fontSize: 13, fontWeight: 600, color: '#1a1a1a' },
  price: { fontSize: 15, fontWeight: 700, color: '#1a1a1a', margin: 0 },
  actions: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  actionBtn: (hovered) => ({ padding: '7px 14px', border: `1px solid ${hovered ? '#1a8efd' : '#d1d5db'}`, borderRadius: 6, background: hovered ? '#eef6ff' : '#fff', fontSize: 13, color: hovered ? '#1a8efd' : '#374151', cursor: 'pointer', fontWeight: 500, transition: 'all .15s' }),

  /* pagination */
  pagination: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  pageInfo: { fontSize: 13, color: '#6b7280' },
  pageControls: { display: 'flex', gap: 8 },
  pageBtn: (disabled) => ({ padding: '7px 18px', border: '1px solid #d1d5db', borderRadius: 6, background: disabled ? '#f3f4f6' : '#fff', fontSize: 13, color: disabled ? '#9ca3af' : '#374151', cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: 500, opacity: disabled ? 0.7 : 1, transition: 'all .15s' }),

  /* toast */
  toast: (visible) => ({ position: 'fixed', bottom: visible ? 24 : -80, left: '50%', transform: 'translateX(-50%)', background: '#1e293b', color: '#fff', padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,.18)', zIndex: 9999, transition: 'bottom .35s ease', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }),

  /* cart badge */
  cartBadge: { position: 'absolute', top: -6, right: -6, background: '#ef4444', color: '#fff', fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  /* modal overlay */
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,.4)', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' },
  modal: { background: '#fff', borderRadius: 12, padding: '28px 32px', maxWidth: 440, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,.2)' },
  modalTitle: { fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#1a1a1a' },
  modalText: { fontSize: 14, color: '#4b5563', lineHeight: 1.6, marginBottom: 8 },
  modalClose: { marginTop: 16, padding: '9px 24px', background: '#1a8efd', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },

  /* no results */
  noResults: { textAlign: 'center', padding: '60px 20px', color: '#6b7280' },
  noResultsIcon: { fontSize: 48, marginBottom: 12, opacity: 0.4 },
  noResultsText: { fontSize: 16, fontWeight: 500 },
};

/* ═══════════════════════ SVG ICONS ═══════════════════════ */
const SearchIcon = () => (
  <svg width="18" height="18" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
);
const CloseIcon = ({ size = 18, color = '#6b7280' }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
);
const FilterIcon = ({ color = '#374151' }) => (
  <svg width="18" height="18" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" /></svg>
);
const ChevronUp = ({ open }) => (
  <svg width="16" height="16" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24" style={S.chevron(open)}><path d="M18 15l-6-6-6 6" /></svg>
);
const CheckmarkIcon = () => (
  <svg width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
);

/* ── star ── */
const Star = ({ filled, half }) => {
  const id = React.useId();
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <defs><linearGradient id={`hg-${id}`}><stop offset="50%" stopColor="#f59e0b" /><stop offset="50%" stopColor="#d1d5db" /></linearGradient></defs>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" fill={filled ? '#f59e0b' : half ? `url(#hg-${id})` : '#d1d5db'} />
    </svg>
  );
};

const Stars = ({ rating, count }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<Star key={i} filled />);
    else if (rating >= i - 0.5) stars.push(<Star key={i} half />);
    else stars.push(<Star key={i} />);
  }
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {stars}
      {count !== undefined && <span style={{ fontSize: 12, color: '#6b7280', marginLeft: 4 }}>({count})</span>}
    </span>
  );
};

const PlaceholderThumb = () => (
  <div style={S.thumbnail}>
    <svg style={{ position: 'absolute', width: '100%', height: '100%' }} viewBox="0 0 140 100" preserveAspectRatio="none">
      <line x1="0" y1="0" x2="140" y2="100" stroke="#c4c4c4" strokeWidth="1" />
      <line x1="140" y1="0" x2="0" y2="100" stroke="#c4c4c4" strokeWidth="1" />
    </svg>
  </div>
);

const AvatarPlaceholder = ({ name }) => {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  return <div style={S.avatar}>{initials}</div>;
};

/* ═══════════════════════ HOVERABLE BUTTON ═══════════════════════ */
function HoverButton({ style, hoverStyle, children, ...rest }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={typeof style === 'function' ? style(hovered) : { ...style, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */
const NAV_ITEMS = ['Classes', 'Topics', 'Tutors', 'School', 'Questions'];
const CURRICULA = ['Competency-based Curriculum', 'Cambridge', '8-4-4'];
const GRADES = ['Grade 9', 'Grade 6', 'Grade 8', 'Grade 5', 'Grade 7', 'Grade 4'];
const YEARS = ['2026', '2025', '2024'];
const MAX_PRICE = 1000;

function DivePage() {
  /* ── nav ── */
  const [activeNav, setActiveNav] = useState('Classes');

  /* ── search ── */
  const [searchText, setSearchText] = useState('Math');

  /* ── sidebar ── */
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSections, setOpenSections] = useState({ rating: true, price: true, curriculum: true, grade: true, year: true });
  const toggleSection = (k) => setOpenSections((p) => ({ ...p, [k]: !p[k] }));

  /* ── filters (draft = sidebar state, applied = what's actually filtering) ── */
  const [draftFilters, setDraftFilters] = useState({ ...DEFAULT_FILTERS });
  const [appliedFilters, setAppliedFilters] = useState({ ...DEFAULT_FILTERS });

  /* ── pagination ── */
  const [currentPage, setCurrentPage] = useState(1);

  /* ── cart ── */
  const [cart, setCart] = useState([]);

  /* ── toast ── */
  const [toast, setToast] = useState({ visible: false, message: '' });

  /* ── modal ── */
  const [modal, setModal] = useState(null);

  /* ── hovered action btn tracking ── */

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 2200);
  }, []);

  /* ── rating counts per star level from raw data ── */
  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ALL_CLASSES.forEach((c) => {
      const floor = Math.floor(c.rating);
      if (counts[floor] !== undefined) counts[floor]++;
    });
    return counts;
  }, []);

  /* ── filtered + searched results ── */
  const filteredResults = useMemo(() => {
    return ALL_CLASSES.filter((item) => {
      /* search text */
      if (searchText.trim() && !item.title.toLowerCase().includes(searchText.trim().toLowerCase())) return false;
      /* rating */
      if (appliedFilters.ratings.length > 0) {
        const floor = Math.floor(item.rating);
        if (!appliedFilters.ratings.includes(floor)) return false;
      }
      /* price */
      if (item.price < appliedFilters.priceFrom || item.price > appliedFilters.priceTo) return false;
      /* curriculum */
      if (appliedFilters.curricula.length > 0 && !appliedFilters.curricula.includes(item.curriculum)) return false;
      /* grade */
      if (appliedFilters.grades.length > 0 && !appliedFilters.grades.includes(item.grade)) return false;
      /* year */
      if (appliedFilters.year && String(item.year) !== appliedFilters.year) return false;
      return true;
    });
  }, [searchText, appliedFilters]);

  /* ── pagination derived ── */
  const totalPages = Math.max(1, Math.ceil(filteredResults.length / ITEMS_PER_PAGE));
  const pageResults = filteredResults.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  /* reset page on filter/search change */
  useEffect(() => { setCurrentPage(1); }, [searchText, appliedFilters]);

  /* ── filter helpers ── */
  const toggleDraftRating = (r) => {
    setDraftFilters((p) => ({
      ...p,
      ratings: p.ratings.includes(r) ? p.ratings.filter((x) => x !== r) : [...p.ratings, r],
    }));
  };
  const toggleDraftCurriculum = (c) => {
    setDraftFilters((p) => ({
      ...p,
      curricula: p.curricula.includes(c) ? p.curricula.filter((x) => x !== c) : [...p.curricula, c],
    }));
  };
  const toggleDraftGrade = (g) => {
    setDraftFilters((p) => ({
      ...p,
      grades: p.grades.includes(g) ? p.grades.filter((x) => x !== g) : [...p.grades, g],
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...draftFilters });
    showToast('✓ Filters applied');
  };

  const handleClearFilters = () => {
    setDraftFilters({ ...DEFAULT_FILTERS });
    setAppliedFilters({ ...DEFAULT_FILTERS });
    showToast('Filters cleared');
  };

  /* ── action handlers ── */
  const handleAddToCart = (item) => {
    if (cart.find((c) => c.id === item.id)) {
      showToast('Already in cart');
      return;
    }
    setCart((p) => [...p, item]);
    showToast(`"${item.title.slice(0, 30)}…" added to cart`);
  };

  const handleBookSlot = (item) => {
    setModal({
      title: 'Book a Slot',
      content: (
        <>
          <p style={S.modalText}><strong>{item.title}</strong></p>
          <p style={S.modalText}>Instructor: {item.author}</p>
          <p style={S.modalText}>Price: <strong>KES {item.price.toFixed(2)}</strong></p>
          <p style={{ ...S.modalText, color: '#22c55e', fontWeight: 600 }}>✓ Slot booking confirmed! You will receive a confirmation email shortly.</p>
        </>
      ),
    });
  };

  const handleViewClass = (item) => {
    setModal({
      title: 'Class Details',
      content: (
        <>
          <p style={S.modalText}><strong>{item.title}</strong></p>
          <p style={S.modalText}>Instructor: {item.author}</p>
          <p style={S.modalText}>Rating: {item.rating} / 5</p>
          <p style={S.modalText}>Price: <strong>KES {item.price.toFixed(2)}</strong></p>
          <p style={S.modalText}>Curriculum: {item.curriculum}</p>
          <p style={S.modalText}>Grade: {item.grade}</p>
          <p style={S.modalText}>Year: {item.year}</p>
        </>
      ),
    });
  };

  const handleViewTutor = (item) => {
    setModal({
      title: 'Tutor Profile',
      content: (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <AvatarPlaceholder name={item.author} />
            <div>
              <p style={{ ...S.modalText, fontWeight: 700, marginBottom: 0 }}>{item.author}</p>
              <a href={item.link} style={{ fontSize: 13, color: '#1a8efd' }}>{item.link}</a>
            </div>
          </div>
          <p style={S.modalText}>Subjects: Mathematics, Science</p>
          <p style={S.modalText}>Experience: 5+ years</p>
          <p style={S.modalText}>Total Classes: {Math.floor(Math.random() * 20) + 5}</p>
          <p style={S.modalText}>Average Rating: {item.rating} / 5</p>
        </>
      ),
    });
  };

  /* ── price slider drag ── */
  const handlePriceFromDrag = (e) => {
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    const move = (ev) => {
      const pct = Math.min(Math.max(((ev.clientX - rect.left) / rect.width) * MAX_PRICE, 0), draftFilters.priceTo);
      setDraftFilters((p) => ({ ...p, priceFrom: Math.round(pct) }));
    };
    const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  const handlePriceToDrag = (e) => {
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    const move = (ev) => {
      const pct = Math.min(Math.max(((ev.clientX - rect.left) / rect.width) * MAX_PRICE, draftFilters.priceFrom), MAX_PRICE);
      setDraftFilters((p) => ({ ...p, priceTo: Math.round(pct) }));
    };
    const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  /* highlight search term in title */
  const highlightTitle = (title) => {
    if (!searchText.trim()) return title;
    const regex = new RegExp(`(${searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = title.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <strong key={i}>{part}</strong> : part
    );
  };

  const fromPct = (draftFilters.priceFrom / MAX_PRICE) * 100;
  const toPct = (draftFilters.priceTo / MAX_PRICE) * 100;

  return (
    <div style={S.root}>
      {/* ─── TOP NAV ─── */}
      <nav style={S.topNav}>
        {NAV_ITEMS.map((item) => (
          <button key={item} style={S.navItem(activeNav === item)} onClick={() => { setActiveNav(item); showToast(`Switched to ${item}`); }}>
            {item}
          </button>
        ))}
        {/* cart indicator in nav */}
        {cart.length > 0 && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', padding: '0 16px', position: 'relative', cursor: 'pointer' }}
            onClick={() => {
              setModal({
                title: `Cart (${cart.length} items)`,
                content: (
                  <>
                    {cart.map((c) => (
                      <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ fontSize: 13, color: '#1a1a1a' }}>{c.title.slice(0, 35)}…</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 13, fontWeight: 700 }}>KES {c.price.toFixed(2)}</span>
                          <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 16, padding: 0 }}
                            onClick={(e) => { e.stopPropagation(); setCart((p) => p.filter((x) => x.id !== c.id)); showToast('Removed from cart'); }}>×</button>
                        </div>
                      </div>
                    ))}
                    <p style={{ fontSize: 14, fontWeight: 700, marginTop: 12, textAlign: 'right' }}>
                      Total: KES {cart.reduce((s, c) => s + c.price, 0).toFixed(2)}
                    </p>
                  </>
                ),
              });
            }}>
            <svg width="22" height="22" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>
            <div style={S.cartBadge}>{cart.length}</div>
          </div>
        )}
      </nav>

      {/* ─── SEARCH BAR ─── */}
      <div style={S.searchRow}>
        <div style={S.searchInputWrapper}>
          <SearchIcon />
          <input style={S.searchInput} value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search..." />
          {searchText && (
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => setSearchText('')}>
              <CloseIcon size={16} color="#9ca3af" />
            </button>
          )}
        </div>
        <button style={S.advSearchBtn(sidebarOpen)} onClick={() => setSidebarOpen((p) => !p)}>
          <FilterIcon color={sidebarOpen ? '#1a8efd' : '#374151'} />
          Advance Search
        </button>
      </div>

      {/* ─── BODY ─── */}
      <div style={S.body}>
        {/* ─── SIDEBAR ─── */}
        <aside style={S.sidebar(sidebarOpen)}>
          <div style={S.sidebarHeader}>
            <span style={S.sidebarTitle}>Advance Search</span>
            <button style={S.closeBtn} onClick={() => setSidebarOpen(false)}><CloseIcon size={16} /></button>
          </div>

          {/* Rating */}
          <div style={S.filterSection}>
            <div style={S.filterHeader} onClick={() => toggleSection('rating')}><span style={S.filterLabel}>Rating</span><ChevronUp open={openSections.rating} /></div>
            {openSections.rating && (
              <div>{[5, 4, 3, 2, 1].map((r) => (
                <label key={r} style={S.checkRow}>
                  <input type="checkbox" style={S.checkbox} checked={draftFilters.ratings.includes(r)} onChange={() => toggleDraftRating(r)} />
                  <Stars rating={r} />
                  <span style={{ fontSize: 12, color: '#6b7280' }}>({ratingCounts[r]})</span>
                </label>
              ))}</div>
            )}
          </div>

          {/* Price */}
          <div style={S.filterSection}>
            <div style={S.filterHeader} onClick={() => toggleSection('price')}><span style={S.filterLabel}>Price</span><ChevronUp open={openSections.price} /></div>
            {openSections.price && (
              <div>
                {/* custom dual range slider */}
                <div style={S.rangeTrack}>
                  <div style={S.rangeFill(fromPct, toPct)} />
                  <div style={S.rangeThumb(fromPct)} onMouseDown={handlePriceFromDrag} />
                  <div style={S.rangeThumb(toPct)} onMouseDown={handlePriceToDrag} />
                </div>
                <div style={S.priceInputRow}>
                  <div style={S.priceCol}>
                    <div style={S.priceLabel}>From</div>
                    <input style={S.priceInput} value={`KES ${draftFilters.priceFrom.toFixed(2)}`}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0;
                        setDraftFilters((p) => ({ ...p, priceFrom: Math.min(v, p.priceTo) }));
                      }} />
                  </div>
                  <div style={S.priceCol}>
                    <div style={S.priceLabel}>To</div>
                    <input style={S.priceInput} value={`KES ${draftFilters.priceTo.toFixed(2)}`}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0;
                        setDraftFilters((p) => ({ ...p, priceTo: Math.max(v, p.priceFrom) }));
                      }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Curriculum */}
          <div style={S.filterSection}>
            <div style={S.filterHeader} onClick={() => toggleSection('curriculum')}><span style={S.filterLabel}>Curriculum</span><ChevronUp open={openSections.curriculum} /></div>
            {openSections.curriculum && (
              <div>{CURRICULA.map((c) => (
                <label key={c} style={S.checkRow}>
                  <input type="checkbox" style={S.checkbox} checked={draftFilters.curricula.includes(c)} onChange={() => toggleDraftCurriculum(c)} />
                  {c}
                </label>
              ))}</div>
            )}
          </div>

          {/* Grade Level */}
          <div style={S.filterSection}>
            <div style={S.filterHeader} onClick={() => toggleSection('grade')}><span style={S.filterLabel}>Grade Level</span><ChevronUp open={openSections.grade} /></div>
            {openSections.grade && (
              <div style={S.gradeGrid}>{GRADES.map((g) => (
                <label key={g} style={S.checkRow}>
                  <input type="checkbox" style={S.checkbox} checked={draftFilters.grades.includes(g)} onChange={() => toggleDraftGrade(g)} />
                  {g}
                </label>
              ))}</div>
            )}
          </div>

          {/* Year Posted */}
          <div style={S.filterSection}>
            <div style={S.filterHeader} onClick={() => toggleSection('year')}><span style={S.filterLabel}>Year Posted</span><ChevronUp open={openSections.year} /></div>
            {openSections.year && (
              <select style={S.select} value={draftFilters.year} onChange={(e) => setDraftFilters((p) => ({ ...p, year: e.target.value }))}>
                <option value="">Select...</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            )}
          </div>

          {/* Footer */}
          <div style={S.sidebarFooter}>
            <button style={S.clearBtn} onClick={handleClearFilters}>Clear</button>
            <button style={S.applyBtn} onClick={handleApplyFilters}>Apply Filters</button>
          </div>
        </aside>

        {/* ─── MAIN RESULTS ─── */}
        <main style={S.main}>
          <h2 style={S.resultsHeading}>
            Showing results for &ldquo;{searchText || '...'}&rdquo;
            <span style={{ fontSize: 13, fontWeight: 400, color: '#6b7280', marginLeft: 8 }}>
              ({filteredResults.length} results)
            </span>
          </h2>

          {pageResults.length === 0 ? (
            <div style={S.noResults}>
              <div style={S.noResultsIcon}>🔍</div>
              <p style={S.noResultsText}>No results found. Try adjusting your filters or search term.</p>
            </div>
          ) : (
            pageResults.map((item) => (
              <div key={item.id} style={S.card}>
                <div style={S.cardMeta}>
                  <AvatarPlaceholder name={item.author} />
                  <div style={S.authorInfo}>
                    <span style={S.authorName}>{item.author}</span>
                    <a href={item.link} style={S.authorLink}>{item.link}</a>
                  </div>
                </div>
                <div style={S.cardBody}>
                  <PlaceholderThumb />
                  <div style={S.cardDetails}>
                    <h3 style={S.cardTitle}>{highlightTitle(item.title)}</h3>
                    <p style={S.cardAuthor}>{item.author}</p>
                    <div style={S.ratingRow}>
                      <span style={S.ratingNum}>{item.rating}</span>
                      <Stars rating={item.rating} />
                    </div>
                    <p style={S.price}>KES {item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div style={S.actions}>
                  <HoverButton style={S.actionBtn} onClick={() => handleAddToCart(item)}>
                    {cart.find((c) => c.id === item.id) ? '✓ In Cart' : 'Add to Cart'}
                  </HoverButton>
                  <HoverButton style={S.actionBtn} onClick={() => handleBookSlot(item)}>Book a Slot</HoverButton>
                  <HoverButton style={S.actionBtn} onClick={() => handleViewClass(item)}>View Class</HoverButton>
                  <HoverButton style={S.actionBtn} onClick={() => handleViewTutor(item)}>View Tutor</HoverButton>
                </div>
              </div>
            ))
          )}

          {/* Pagination */}
          {filteredResults.length > 0 && (
            <div style={S.pagination}>
              <span style={S.pageInfo}>Page <strong>{currentPage}</strong> of {totalPages}</span>
              <div style={S.pageControls}>
                <button style={S.pageBtn(currentPage <= 1)} disabled={currentPage <= 1}
                  onClick={() => { if (currentPage > 1) setCurrentPage((p) => p - 1); }}>Previous</button>
                <button style={S.pageBtn(currentPage >= totalPages)} disabled={currentPage >= totalPages}
                  onClick={() => { if (currentPage < totalPages) setCurrentPage((p) => p + 1); }}>Next</button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ─── TOAST ─── */}
      <div style={S.toast(toast.visible)}>
        <CheckmarkIcon />
        {toast.message}
      </div>

      {/* ─── MODAL ─── */}
      {modal && (
        <div style={S.modalOverlay} onClick={() => setModal(null)}>
          <div style={S.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={S.modalTitle}>{modal.title}</h3>
            {modal.content}
            <button style={S.modalClose} onClick={() => setModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DivePage;
