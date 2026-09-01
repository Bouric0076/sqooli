import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import sqooliLogo from '../../assets/images/hero/logo.svg'
import '../../styles/pages/schools.css'
import '../../styles/pages/udbc-profile.css'

interface SchoolHeaderProps {
  variant?: 'main' | 'listings' | 'learning' | 'school-profile' | 'tutor-profile'
  activeTab?: string
  schoolName?: string
}

export default function SchoolHeader({ variant = 'main', activeTab = 'Schools' }: SchoolHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Minimal Header for School Listings (/schools/listings) as per school-listing-detail-nav.png
  if (variant === 'listings') {
    return (
      <header className="school-minimal-header">
        <div className="container header-inner">
          <a href="/" className="logo" aria-label="Sqooli home">
            <img src={sqooliLogo} alt="Sqooli" />
          </a>
          <div className="header-actions">
            <a href="/#login" className="btn-login-pill">Login</a>
          </div>
        </div>
      </header>
    )
  }

  // Contextual Header for Tutors & Learning (/schools/tutors) as per tutors-nav.png & Desktop - 107.png
  if (variant === 'learning') {
    return (
      <div className="learning-header-wrapper">
        <header className="school-topbar">
          <div className="container header-inner">
            <a href="/" className="logo" aria-label="Sqooli home">
              <img src={sqooliLogo} alt="Sqooli" />
            </a>

            <div className="header-actions">
              <a href="/popular" className="btn-trending-pill">Trending</a>
              <a href="/#login" className="btn-login-pill">Login</a>
            </div>
          </div>
        </header>

        {/* Sub-nav strip placed BELOW main nav bar */}
        <div className="learning-subnav-strip">
          <div className="container">
            <nav className="subnav-links">
              <a href="/search" className={activeTab === 'AI Mode' ? 'active' : ''}>AI Mode</a>
              <a href="/schools/tutors?tab=classes" className={activeTab === 'Classes' ? 'active' : ''}>Classes</a>
              <a href="/search?tab=Topics" className={activeTab === 'Topics' ? 'active' : ''}>Topics</a>
              <a href="/search?tab=Tutors" className={activeTab === 'Tutors' ? 'active' : ''}>Tutors</a>
              <a href="/questions" className={activeTab === 'Questions' ? 'active' : ''}>Questions</a>
            </nav>
          </div>
        </div>
      </div>
    )
  }

  // School Profile Header for Dedicated School Page (/schools/detail) as per Desktop - 109.png
  if (variant === 'school-profile') {
    return (
      <header className="udbc-site-header">
        <div className="udbc-header-back-row">
          <div className="container udbc-header-back-inner">
            <a href="/schools" aria-label="Back to Sqooli">←&nbsp; Back to Sqooli</a>
          </div>
        </div>
        <div className="container udbc-header-inner">
          <a href="/schools/detail" className="udbc-brand" aria-label="Sqooli home">
            <img src={sqooliLogo} alt="Sqooli" />
          </a>
          <button className="udbc-menu-toggle" type="button" aria-label="Toggle UDBC navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={`udbc-site-nav ${menuOpen ? 'open' : ''}`} aria-label="UDBC navigation">
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
            <a href="#programmes" onClick={() => setMenuOpen(false)}>Admissions</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
          </nav>
          <div className="udbc-header-actions">
            <a className="udbc-header-cta" href="https://udbc.sqooli.africa/intake-landing">Get Started</a>
          </div>
        </div>
      </header>
    )
  }

  // Minimal tutor profile header: home mark and account access only.
  if (variant === 'tutor-profile') {
    return (
      <header className="tutor-profile-header">
        <div className="container header-inner">
          <a href="/" className="logo" aria-label="Sqooli home">
            <img src={sqooliLogo} alt="Sqooli" />
          </a>
          <a href="/#join" className="btn-primary tutor-profile-start-button">Get Started</a>
        </div>
      </header>
    )
  }

  // Default Main Header for /schools
  return (
    <header className="schools-main-header">
      <div className="container header-inner">
        <a href="/" className="logo" aria-label="Sqooli home">
          <img src={sqooliLogo} alt="Sqooli" />
        </a>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <a href="/" className={activeTab === 'Home' ? 'active' : ''}>Home</a>
          <a href="/schools" className={activeTab === 'Schools' ? 'active' : ''}>Schools</a>
          <a href="/partners" className={activeTab === 'Partners' ? 'active' : ''}>Partners</a>
          <a href="/popular" className={activeTab === 'Popular' ? 'active' : ''}>Popular</a>
          <a href="/contact" className={activeTab === 'Contact Us' ? 'active' : ''}>Contact Us</a>
          <a href="/#join" className="mobile-nav-cta">Get Started</a>
        </nav>

        <div className="header-actions">
          <a href="/#login" className="btn-login">Login</a>
          <a href="/#join" className="btn-primary">Get Started</a>
        </div>
      </div>
    </header>
  )
}
