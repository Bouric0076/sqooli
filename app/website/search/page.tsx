"use client";
import React, { useState } from 'react';
import './page.css';
import { useRouter } from 'next/navigation';
import DivePage from './dive/page';

function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiMode, setIsAiMode] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const router = useRouter();

  const actionButtons = [
    { id: 'tutors', label: 'Find Tutors', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )},
    { id: 'resources', label: 'Find Learning  Resources', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    )},
    { id: 'lessons', label: 'Find Lessons', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        <line x1="8" y1="7" x2="16" y2="7"/>
        <line x1="8" y1="11" x2="13" y2="11"/>
      </svg>
    )},
    { id: 'schools', label: 'Find Schools', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )},
  ];

  const sqooliLetters = [
    { char: 'S', color: '#3B82F6', borderColor: '#3B82F6' },
    { char: 'q', color: '#2563EB', borderColor: '#2563EB', bg: '#DBEAFE' },
    { char: 'O', color: '#F59E0B', borderColor: '#F59E0B' },
    { char: 'O', color: '#22C55E', borderColor: '#22C55E' },
    { char: 'li', color: '#F97316', borderColor: '#F97316' },
  ];

  return (
    <div className="sqooli-page">
      {/* Navigation */}
      <nav className="sqooli-nav">
        <div className="nav-left">
          <a href="/" className="nav-logo" aria-label="Sqooli Home">
            <span className="logo-delta">δ</span>
          </a>
        </div>
        <div className="nav-right">
          <button className="nav-btn trending-btn" id="trending-btn">
            <span>Trending</span>
          </button>
          <button className="nav-btn grid-btn" id="grid-btn" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="5" r="2"/>
              <circle cx="12" cy="5" r="2"/>
              <circle cx="19" cy="5" r="2"/>
              <circle cx="5" cy="12" r="2"/>
              <circle cx="12" cy="12" r="2"/>
              <circle cx="19" cy="12" r="2"/>
              <circle cx="5" cy="19" r="2"/>
              <circle cx="12" cy="19" r="2"/>
              <circle cx="19" cy="19" r="2"/>
            </svg>
          </button>
          <button className="nav-btn login-btn" id="login-btn" onClick={() => router.push('/login')}>
            <span>Login</span>
          </button>
        </div>
      </nav>

{!isAiMode && (

      <main className="sqooli-hero">
        {/* Logo Letters */}
        <div className="sqooli-logo-container">
          {sqooliLetters.map((letter, index) => (
            <div
              key={index}
              className="sqooli-letter-block"
              style={{
                '--letter-color': letter.color,
                '--border-color': letter.borderColor,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <span className="sqooli-letter">{letter.char}</span>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <h1 className="sqooli-tagline">
          Empowering Learning, Anytime, Anywhere
        </h1>

        {/* Search Bar */}
        <div className="sqooli-search-wrapper">
          <div className="sqooli-search-bar" id="search-bar">
            <div className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <input
              type="text"
              className="search-input"
              placeholder="Search lessons, tutors, common questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-input"
            />
            <button
              className={`ai-mode-btn ${isAiMode ? 'active' : ''}`}
              onClick={() => {
                setIsAiMode(!isAiMode)
              
                //router.push(`/website/search/dive?query=${encodeURIComponent(searchQuery)}&aiMode=${isAiMode ? 'false' : 'true'}`);
              }}
              id="ai-mode-btn"
            >
              <span>Search</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ai-sparkle">
                <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sqooli-actions">
          {actionButtons.map((btn) => (
            <button
              key={btn.id}
              className={`action-btn ${activeButton === btn.id ? 'active' : ''}`}
              onClick={() =>{ 
                setActiveButton(btn.id === activeButton ? null : btn.id)
                router.push(`/website/discover?type=${btn.id}`)
            
            }}
              id={`action-${btn.id}`}
            >
              <span className="action-icon">{btn.icon}</span>
              <span className="action-label">{btn.label}</span>
            </button>
          ))}
        </div>
      </main>
)}



{isAiMode && <DivePage searchQuery={searchQuery} />}


    </div>
  );
}

export default Page;
