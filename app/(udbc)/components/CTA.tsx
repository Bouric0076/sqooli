import './CTA.css';
import { photo3, photo2, photo4, small1 } from '../assets/images';

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta__strip">
        <img src={photo3.src} alt="" />
        <img src={photo2.src} alt="" />
        <img src={photo4.src} alt="" />
        <img src={small1.src} alt="" />
      </div>
      <div className="cta__panel">
        <div className="container cta__inner">
          <h2>Your Calling Is Waiting</h2>
          <p className="cta__sub">Enrol Today — July 2026 Intake Now Open</p>
          <p className="cta__verse">"Lisha Kondoo Zangu" — John 21:17</p>
          <a href="https://udbc.sqooli.africa/enrollment" className="btn btn-gradient">Enrol Now</a>
        </div>
      </div>
    </section>
  );
}
