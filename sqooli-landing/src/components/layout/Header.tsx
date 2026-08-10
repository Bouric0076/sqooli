import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import sqooliLogo from '../../assets/images/hero/logo.svg'

export function Logo() {
  return (
    <a className="logo" href="/" aria-label="Sqooli home">
      <img src={sqooliLogo} alt="Sqooli" />
    </a>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="topbar container">
      <Logo />
      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
      <nav id="main-navigation" className={menuOpen ? 'open' : ''} aria-label="Main navigation">
        <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="/schools" onClick={() => setMenuOpen(false)}>Schools</a>
        <a href="/partners" onClick={() => setMenuOpen(false)}>Partners</a>
        <a href="/popular" onClick={() => setMenuOpen(false)}>Popular</a>
        <a href="/contact" onClick={() => setMenuOpen(false)}>Contact us</a>
        <a className="login" href="/#login" onClick={() => setMenuOpen(false)}>Log in</a>
        <a className="button button-small" href="/#join" onClick={() => setMenuOpen(false)}>Get started</a>
      </nav>
    </header>
  )
}
