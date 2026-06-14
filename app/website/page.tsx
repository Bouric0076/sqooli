"use client";
import React, { useState } from 'react';
import './page.css';
import LessonsList from './components/LessonList';
import { useRouter } from 'next/navigation';

// Importing the generated background image
const heroBg = './sqooli_hero.png';
const tutorPortrait = './teacher.jpg';

export default function SqooliLandingPage() {

  const router = useRouter();
  // State for active navigation tab
  const [activeTab, setActiveTab] = useState('Home');
  
  // State for popular section tab filter
  const [activePopularTab, setActivePopularTab] = useState('Tutors');
  
  // State for partner slider pagination (mock interactive state)
  const [sliderPage, setSliderPage] = useState(34);
  const totalPages = 89;

  const handlePrevPage = () => {
    if (sliderPage > 1) {
      setSliderPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (sliderPage < totalPages) {
      setSliderPage(prev => prev + 1);
    }
  };

  // Mock Data for "Discover What's Popular" section
  const popularTutors = [
    { id: 1, name: 'Jane Doe', tags: ['Math', 'Eng', 'Physics'], image: tutorPortrait, rating: 4.5, lessons: '200 lessons taught' },
    { id: 2, name: 'Jane Doe', tags: ['Math', 'Eng', 'Physics'], image: tutorPortrait, rating: 4.5, lessons: '200 lessons taught' },
    { id: 3, name: 'Jane Doe', tags: ['Math', 'Eng', 'Physics'], image: tutorPortrait, rating: 4.5, lessons: '200 lessons taught' },
    { id: 4, name: 'Jane Doe', tags: ['Math', 'Eng', 'Physics'], image: tutorPortrait, rating: 4.5, lessons: '200 lessons taught' },
  ];

  const popularClasses = [
    { id: 1, name: 'Jane Doe', tags: ['Math', 'Eng', 'Physics'], image: tutorPortrait, rating: 4.8, lessons: '150 lessons taught' },
    { id: 2, name: 'Jane Doe', tags: ['Math', 'Eng', 'Physics'], image: tutorPortrait, rating: 4.6, lessons: '110 lessons taught' },
    { id: 3, name: 'Jane Doe', tags: ['Math', 'Eng', 'Physics'], image: tutorPortrait, rating: 4.9, lessons: '280 lessons taught' },
    { id: 4, name: 'Jane Doe', tags: ['Math', 'Eng', 'Physics'], image: tutorPortrait, rating: 4.7, lessons: '135 lessons taught' },
  ];

  const popularQuestions = [
    { id: 1, name: 'Jane Doe', tags: ['Math', 'Eng', 'Physics'], image: tutorPortrait, rating: 4.9, lessons: '320 lessons taught' },
    { id: 2, name: 'Jane Doe', tags: ['Math', 'Eng', 'Physics'], image: tutorPortrait, rating: 4.7, lessons: '190 lessons taught' },
    { id: 3, name: 'Jane Doe', tags: ['Math', 'Eng', 'Physics'], image: tutorPortrait, rating: 4.5, lessons: '210 lessons taught' },
    { id: 4, name: 'Jane Doe', tags: ['Math', 'Eng', 'Physics'], image: tutorPortrait, rating: 4.8, lessons: '145 lessons taught' },
  ];

  const getActivePopularData = () => {
    switch (activePopularTab) {
      case 'Classes':
        return popularClasses;
      case 'Questions':
        return popularQuestions;
      case 'Tutors':
      default:
        return popularTutors;
    }
  };



  return (
    <div className="sqooli-wrapper">
      {/* Header / Navigation bar */}
      <header className="header-container">
        <div className="logo-container" onClick={() => setActiveTab('Home')}>
   <img src="/logo.svg" alt="Sqooli Logo" className="h-12 mb-6" />
        </div>

        <nav>
          <ul className="nav-menu">
            {['Home', 'Schools', 'Partners', 'Contact Us'].map((tab) => (
              <li key={tab}>
                <a
                  href={`#${tab.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab);
                  }}
                >
                  {tab}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="auth-buttons">
          <button className="btn-login" onClick={() => router.push('/login')}>
            Login
          </button>
          <button className="btn-get-started" onClick={() => router.push('/register')}>
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="hero-section" 
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero-overlay" />
        
        <div className="hero-content">
          <h1 className="hero-title">Empowering Learning, Anytime, Anywhere</h1>
          <p className="hero-subtitle">
            Experience a new way of learning from anywhere with Sqooli. Find classes, 
            quizzes, online schools and more...
          </p>

          {/* Glassmorphic Stats Grid */}
          <div className="stats-container">
            <div className="stat-card">
              <span className="stat-number">12K+</span>
              <span className="stat-label">Lessons</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">2K+</span>
              <span className="stat-label">Available Live Classes</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">5K+</span>
              <span className="stat-label">Answered Questions</span>
            </div>
          </div>

          {/* Action Trigger */}
          <button className="btn-find-lessons" onClick={() => alert('Search and find lessons...')}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            Find Lessons
          </button>
        </div>

        {/* Wavy bottom divider transition */}
        <div className="wave-divider">
          <svg 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,53.05,18.34,81,26.78c85.58,26.69,173.9,39.38,262.33,31c28.79-2.73,56.76-7.83,86.07-13.78Z" 
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      {/* Partners / Carousel Section */}
      <section className="partners-section" id="partners">
        <h2 className="partners-title">Join the list of our amazing partners</h2>

        <div className="partners-logos-container">
          {/* Boltshift */}
          <a href="#boltshift" className="partner-logo" onClick={(e) => e.preventDefault()}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0L37.32 10V30L20 40L2.68 30V10L20 0Z" fill="#2563EB" />
              <path d="M21 10L12 22H19V30L28 18H21V10Z" fill="white" />
            </svg>
            <span>Boltshift</span>
          </a>

          {/* Lightbox */}
          <a href="#lightbox" className="partner-logo" onClick={(e) => e.preventDefault()}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="32" height="32" rx="6" stroke="#0F172A" strokeWidth="6" />
              <path d="M4 16H36" stroke="#0F172A" strokeWidth="4" />
              <path d="M16 4V36" stroke="#0F172A" strokeWidth="4" />
            </svg>
            <span>Lightbox</span>
          </a>

          {/* FeatherDev */}
          <a href="#featherdev" className="partner-logo" onClick={(e) => e.preventDefault()}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 32C12 28 20 22 28 12C32 8 34 6 34 6S32 8 28 12C20 20 14 26 8 32Z" stroke="#16A34A" strokeWidth="5" strokeLinecap="round"/>
              <path d="M14 26C17 23 23 18 29 11" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"/>
              <path d="M20 20C22.5 17.5 27 13.5 31.5 8" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span>FeatherDev</span>
          </a>

          {/* Spherule 1 */}
          <a href="#spherule" className="partner-logo" onClick={(e) => e.preventDefault()}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="16" stroke="#7C3AED" strokeWidth="5" />
              <circle cx="20" cy="20" r="8" fill="#7C3AED" />
              <path d="M20 4V36M4 20H36" stroke="#7C3AED" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
            <span>Spherule</span>
          </a>

          {/* Spherule 2 */}
          <a href="#spherule" className="partner-logo" onClick={(e) => e.preventDefault()}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="16" stroke="#7C3AED" strokeWidth="5" />
              <circle cx="20" cy="20" r="8" fill="#7C3AED" />
              <path d="M20 4V36M4 20H36" stroke="#7C3AED" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
            <span>Spherule</span>
          </a>

          {/* Spherule 3 */}
          <a href="#spherule" className="partner-logo" onClick={(e) => e.preventDefault()}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="16" stroke="#7C3AED" strokeWidth="5" />
              <circle cx="20" cy="20" r="8" fill="#7C3AED" />
              <path d="M20 4V36M4 20H36" stroke="#7C3AED" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
            <span>Spherule</span>
          </a>

          {/* GlobalBank */}
          <a href="#globalbank" className="partner-logo" onClick={(e) => e.preventDefault()}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 32V18L20 8L34 18V32H6Z" stroke="#2563EB" strokeWidth="5" strokeLinejoin="round" />
              <path d="M12 32V22H28V32" stroke="#2563EB" strokeWidth="4" />
              <line x1="4" y1="34" x2="36" y2="34" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <span>GlobalBank</span>
          </a>
        </div>


      </section>
      {/* Discover What's Popular Section */}
      <section className="popular-section" id="popular">
        <div className="popular-header-row">
          <h2 className="popular-title">Discover What's Popular</h2>
          <span className="explore-link" onClick={() => alert('Exploring all items...')}>
            Explore More
          </span>
        </div>

        <div className="popular-controls-row">
          <div className="filter-tabs">
            {['Classes', 'Tutors', 'Questions'].map((tab) => (
              <button
                key={tab}
                className={`filter-tab ${activePopularTab === tab ? 'active' : ''}`}
                onClick={() => setActivePopularTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="carousel-navigation">
            <button 
              className="carousel-arrow" 
              onClick={() => alert('Previous slide')}
              aria-label="Previous items"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              className="carousel-arrow" 
              onClick={() => alert('Next slide')}
              aria-label="Next items"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
<LessonsList />

      </section>


    </div>
  );
}
