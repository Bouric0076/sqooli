import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Header(props) {
      const [activeTab, setActiveTab] = useState('Home');
      const router = useRouter();
    return (
      <header className="header-container">
        <div className="logo-container" onClick={() => {
            setActiveTab('Home')
            
            router.push('/website')
            
            }}>
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
    );
}

export default Header;