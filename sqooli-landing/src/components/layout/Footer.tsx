import { Logo } from './Header'

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-wave-divider">
        <svg viewBox="0 0 1440 20" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="footer-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0879c8" />
              <stop offset="50%" stopColor="#117f80" />
              <stop offset="100%" stopColor="#2c9fe4" />
            </linearGradient>
          </defs>
          <path d="M0 10 Q 180 20, 360 10 T 720 10 T 1080 10 T 1440 10" stroke="url(#footer-wave-grad)" strokeWidth="6" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="container footer-grid">
        <div className="footer-logo-col">
          <Logo />
        </div>
        <div>
          <b>PLATFORM</b>
          <a href="/#join">Students</a>
          <a href="/#join">Parents</a>
          <a href="/#join">Teachers</a>
          <a href="/schools">Schools</a>
        </div>
        <div>
          <b>DISCOVERY</b>
          <a href="/tutors/profile">Find Tutors</a>
          <a href="/schools">Browse Schools</a>
          <a href="/popular">Marketplace</a>
          <a href="/popular">Trending</a>
        </div>
        <div>
          <b>QUICK ACCESS</b>
          <a href="/popular">Live Lessons</a>
          <a href="/popular">Recorded Lessons</a>
          <a href="/questions">Q&A Board</a>
          <a href="/search">Exam Bank</a>
        </div>
        <div>
          <b>RESOURCES</b>
          <a href="/#join">My Sqooli</a>
          <a href="/#join">My Wallet</a>
          <a href="/partners">Partners</a>
          <a href="/partners">Jobs (Cheo)</a>
        </div>
        <div>
          <b>HELP & SUPPORT</b>
          <a href="/contact">Contact Us</a>
          <a href="/questions">FAQs</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/contact">Support Center</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span className="copyright">Copyright © 2025 Sqooli . All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="/contact" className="footer-link-blue">Terms & Condition</a>
          <a href="/contact" className="footer-link-blue">Privacy</a>
        </div>
        <div className="footer-social-icons">
          <a href="https://x.com/sqooliltd?s=11" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="social-icon twitter">
            <span aria-hidden="true" className="social-x">𝕏</span>
          </a>
          <a href="https://www.facebook.com/share/1BKKmPqPKy/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon facebook">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/sqooli?utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon instagram">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
