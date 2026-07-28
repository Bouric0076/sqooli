import './About.css';
import { kidBW } from '../assets/images';

const KEY_FACTS = [
  { label: 'Founded', value: '2026 — First intake July 1, 2026' },
  { label: 'Parent Ministry', value: 'Ufufuo na Uzima Ministries (Est. 1994)' },
  { label: 'Chancellor', value: 'Bishop Dr. Josephat Gwajima, PhD' },
  { label: 'Platform', value: 'Sqooli — mobile learning platform' },
  { label: 'Language', value: 'Kiswahili (primary) · English (secondary)' },
  { label: 'Mode', value: '100% Digital — mobile-first, no campus visits' },
  { label: 'Countries', value: 'Tanzania, Kenya, Uganda, Rwanda, Burundi' },
  { label: 'Payment', value: 'M-PESA, Tigopesa, Airtel Money' },
];

export default function About() {
  return (
    <section id="about" className="about section-pad">
      <div className="container">
        <div className="about__top">
          <div className="about__text">
            <p className="eyebrow">About UDBC</p>
            <h2 className="about__title">
              Ufufuo Digital Bible College — Where God's Call Becomes a Credential
            </h2>
            <p className="about__lead">
              Founded by Bishop Dr. Josephat Gwajima, UDBC equips believers across East Africa to
              answer God's call as trained, grounded, and commissioned shepherds of His flock.
            </p>
            <p className="about__body">
              Ufufuo Digital Bible College (UDBC) is the official theological training institution
              of Ufufuo na Uzima Ministries — the flagship ministry founded by Bishop Dr. Josephat
              Gwajima in 1994 in Dar es Salaam, Tanzania.
            </p>
            <p className="about__body">
              Whether you are a cell group leader, a church worker, a pastor in training, or a
              believer who wants to deepen your knowledge of the Word — UDBC is for you. Through
              our flagship programme LISHA KONDOO ZANGU (Feed My Lambs), named after Jesus'
              command in John 21:17, UDBC offers a fully digital Certificate and Diploma
              curriculum delivered on the Sqooli platform — accessible from any smartphone,
              anywhere in East Africa, at any time.
            </p>
            <p className="about__body">
              Classes are in Kiswahili. Fees are affordable and paid via M-PESA. No laptop
              required. No travel required. Just your faith, your phone, and your calling.
            </p>
          </div>

          <div className="about__media">
            <div className="about__frame">
              <img src={kidBW.src} alt="Sunday school ministry" />
            </div>
          </div>
        </div>

        <div className="about__vm">
          <div className="about__vm-col">
            <p className="eyebrow on-maroon">Vision</p>
            <p>
              To produce the next generation of Spirit-filled, Word-grounded shepherds across
              East and Central Africa — one digital lesson at a time.
            </p>
          </div>
          <div className="about__vm-col">
            <p className="eyebrow on-maroon">Mission</p>
            <p>
              To make world-class biblical education accessible to every believer in Africa —
              affordable, mobile-first, Kiswahili-language, rooted in Ufufuo na Uzima theology.
            </p>
          </div>
        </div>

        <div className="about__facts">
          <p className="eyebrow">Key Facts</p>
          <div className="about__facts-grid">
            {KEY_FACTS.map((f) => (
              <div className="about__fact" key={f.label}>
                <span className="about__fact-label">{f.label.toUpperCase()}</span>
                <strong className="about__fact-value">{f.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
