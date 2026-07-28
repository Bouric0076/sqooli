import './BeyondCollege.css';
import { photo3, photo4, photo5, photo6, flagCrowd, photo1, photo2, small1 } from '../assets/images';

const MINISTRY_CARDS = [
  { title: 'Sunday Worship Service', img: photo3, desc: "Two weekly services at the Cathedral and all 400+ branch churches. English 08:40 AM · Kiswahili 11:00 AM. Streamed live on YouTube (RudishaTv) worldwide." },
  { title: 'Healing & Prayer Crusades', img: photo2, desc: 'Bishop Gwajima leads regular healing crusades and mass prayer events across Tanzania and internationally. Announced via WhatsApp and YouTube.' },
  { title: 'Digital & Media Ministry', img: photo5, desc: 'YouTube: RudishaTv · Podcast on Spotify & Apple Podcasts · WhatsApp Broadcast: 24,850+ contacts · Instagram @bishopgwajima' },
  { title: 'Theological Education (UDBC)', img: photo4, desc: 'The formal academic arm of the ministry — LISHA KONDOO ZANGU equips believers as shepherds, pastors, and church leaders.' },
  { title: 'Youth & Family Ministry', img: flagCrowd, desc: "Youth groups (vijana), women's fellowships, and men's ministries. Family counselling and marriage enrichment are core to the ministry's DNA." },
  { title: 'Cell Groups (Makundi) Network', img: photo1, desc: 'Every member is encouraged to join a local kundi for weekly Bible study. UDBC students who lead groups receive mentorship via WS4' },
  { title: 'Church Planting & Missions', img: photo6, desc: '400+ churches planted across Tanzania and beyond. UDBC Diploma graduates are commissioned to plant and lead new congregations.' },
  { title: 'Books & Publications', img: small1, desc: "Bishop Gwajima has authored 40+ books on theology and leadership. Selected titles are supplementary reading for higher grades." },
];

const CONTACT_LINKS = [
  ['📍', 'Nyumba ya Ufufuo na Uzima, Dar es Salaam, Tanzania'],
  ['🌐', 'ufufuonauzima.org'],
  ['▶️', 'youtube.com/@UFUFUONAUZIMA (RudishaTv)'],
  ['📷', '@bishopgwajima'],
];

export default function BeyondCollege() {
  return (
    <section className="beyond section-pad">
      <div className="container">
        <div className="beyond__top">
          <div>
            <p className="eyebrow">Ufufuo na Uzima Ministries</p>
            <h2 className="beyond__title">Beyond the College</h2>
            <p className="beyond__desc">
              Ufufuo na Uzima Ministries (Glory of Christ Tanzania Church) was established in
              1994 by Bishop Dr. Josephat Gwajima in Dar es Salaam. Headquartered at Nyumba ya
              Ufufuo na Uzima Cathedral, it serves 70,000+ members per service across 400+
              churches worldwide
            </p>
          </div>
          <div className="beyond__contact">
            {CONTACT_LINKS.map(([icon, text]) => (
              <div key={text} className="beyond__contact-row"><span>{icon}</span>{text}</div>
            ))}
            <p className="beyond__service">English Service 08:40 AM · Swahili 11:00 AM · Livestreamed</p>
          </div>
        </div>

        <div className="beyond__grid">
          {MINISTRY_CARDS.map((c) => (
            <div className="mcard" key={c.title}>
              <div className="mcard__img"><img src={c.img.src} alt={c.title} /></div>
              <div className="mcard__body">
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
