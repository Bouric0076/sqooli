import { useState } from 'react';
import './Navbar.css';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About UDBC', href: '#about' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'How to Enrol', href: '#enrol' },
  { label: 'Fees', href: '#fees' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact Us', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <a href="#home" className="navbar__brand">
          <span className="navbar__crest">📖</span>
          <span className="navbar__brandtext">
            <strong>UDBC</strong>
            <small>Ufufuo Digital Bible College</small>
          </span>
        </a>

        <nav id="primary-navigation" className={`navbar__links ${open ? 'is-open' : ''}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="navbar__right">
          <div className="navbar__lang">🇬🇧 Eng (UK) <span>▾</span></div>
          <button className="navbar__burger" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open} aria-controls="primary-navigation">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
