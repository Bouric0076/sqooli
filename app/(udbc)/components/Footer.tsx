import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wedge" />
      <div className="container footer__top">
        <div className="footer__brand">
          <div className="footer__logo">
            <span>📖</span>
            <div>
              <strong>UDBC</strong>
              <small>Ufufuo Digital Bible College</small>
            </div>
          </div>
          <p className="footer__verse">
            John 21:17 — "He Said To Him The Third Time, Simon, Son Of John, Do You Love Me? … He
            Said To Him, Feed My Sheep."
          </p>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#programmes">Programmes</a>
          <a href="#enrol">How to Enrol</a>
          <a href="#fees">Fees</a>
          <a href="#leadership">Leadership</a>
          <a href="#testimonials">Testimonials</a>
        </div>

        <div className="footer__col">
          <h4>Ministry</h4>
          <a href="https://ufufuonauzima.org">ufufuonauzima.org</a>
          <a href="https://www.youtube.com/@UFUFUONAUZIMA">RudishaTv (YouTube)</a>
          <span className="footer__muted">Sunday Service: 8.40 AM &amp; 11.00 AM</span>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <a href="mailto:admin@udbc.sqooli.africa">admin@udbc.sqooli.africa</a>
          <span className="footer__muted">WhatsApp: +255 *** *** ***</span>
          <span className="footer__badge">July 2026 Intake Now Open!</span>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© 2026 Ufufuo na Uzima Ministries Digital Bible College. Platform powered by Sqooli Technologies.</p>
        <div className="footer__social">
          <span>▶️</span><span>📷</span><span>📘</span><span>💬</span><span>🎵</span>
        </div>
      </div>
    </footer>
  );
}
