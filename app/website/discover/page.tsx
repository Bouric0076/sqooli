"use client";
import React, { useState } from 'react';
import '../page.css';
import LessonsList from '../components/LessonList';
import Header from '../components/Header';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function page(props) {

      const [activeTab, setActiveTab] = useState('Home');
      
      // State for popular section tab filter
      const [activePopularTab, setActivePopularTab] = useState('Tutors');

      // State for year/month filter
      const currentYear = new Date().getFullYear();
      const [selectedYear, setSelectedYear] = useState(currentYear);
      const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
      const [yearMenuOpen, setYearMenuOpen] = useState(false);

      const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

    return (
        <div>
            <Header />
                <section style={{backgroundColor:"#fff"}} className="popular-section" id="popular">
                  <div className="popular-header-row">
                    <h2 className="popular-title">Discover What's Popular</h2>

                    <div className="date-filter-pill">
                      <div className="year-select-wrapper">
                        <button
                          className="year-select-btn"
                          onClick={() => setYearMenuOpen((open) => !open)}
                        >
                          {selectedYear}
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        {yearMenuOpen && (
                          <div className="year-select-menu">
                            {yearOptions.map((year) => (
                              <div
                                key={year}
                                className={`year-select-option ${selectedYear === year ? 'active' : ''}`}
                                onClick={() => {
                                  setSelectedYear(year);
                                  setYearMenuOpen(false);
                                }}
                              >
                                {year}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="month-divider" />

                      <div className="month-tabs">
                        {MONTHS.map((month, index) => (
                          <button
                            key={month}
                            className={`month-tab ${selectedMonth === index ? 'active' : ''}`}
                            onClick={() => setSelectedMonth(index)}
                          >
                            {month}
                          </button>
                        ))}
                      </div>
                    </div>
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

                    </div>
                  </div>
                  <LessonsList />
          
                </section>
          
        </div>
    );
}

export default page;