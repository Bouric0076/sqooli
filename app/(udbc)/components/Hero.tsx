import { heroPortrait } from '../assets/images';
import './Hero.css';


const STATS = [
  { value: '1994', label: 'Ministry Est.' },
  { value: '70,000+', label: 'Members' },
  { value: '400+', label: 'Churches Worldwide' },
  { value: 'Jul 2026', label: 'Intake Open' },
];

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__bg" style={{ backgroundImage: `url(${heroPortrait.src})` }} />
      <div className="hero__overlay" />

      <div className="container hero__content">
        <p className="hero__kicker">"Lisha Kondoo Zangu" · John 21:17</p>
        <h1 className="hero__title">
          Train to <span>Feed His</span>
          <br />
          <span>Flock</span>
        </h1>
        <p className="hero__desc">
          Enrol at Ufufuo Digital Bible College and begin your calling — from your phone, from
          your home, from your congregation.
        </p>
        <div className="hero__actions">
          <a href="#enrol" className="btn btn-gradient">Enrol Now – July 2026 Intake</a>
          <a href="#about" className="btn btn-yellow">Learn More</a>
        </div>

        <div className="hero__stats">
          {STATS.map((s) => (
            <div className="hero__stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        className="hero__scrollTop"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        ▲
      </button>
    </section>
  );
}
