import './Testimonials.css';
import { photo3, photo4, photo5, photo6, flagCrowd, photo1, photo2, small1 } from '../assets/images';

const QUOTES = [
  {
    text: "I have been a cell group leader at Ufufuo na Uzima for three years but always felt I lacked biblical foundation to truly guide my members. After just Grade 1 of UDBC, I have answers from the Word of God. My group has grown from 8 to 24 members. Glory to God.",
    name: 'Mama Grace Mwangi',
    role: 'Cell Group Leader — Dar es Salaam Branch',
  },
  {
    text: "I am a businessman, not a full-time pastor. But Bishop Gwajima's vision is that every believer is called. UDBC let me study at night, at my own pace, without leaving my family or business. By Grade 3, I received my Certificate and officiated my first wedding in the church.",
    name: 'Deacon Patrick Makori',
    role: 'Deacon & Businessman — Mombasa Branch',
  },
  {
    text: 'Nilikuwa naogopa kusema sina elimu ya kutosha. Lakini UDBC ilifundisha kupitia simu yangu, katika lugha yangu ya Kiswahili. Leo nimefanya mtihani wa Gredi 1 na nimepita. Asante Bwana!',
    name: 'Bro. Emmanuel Kimaro',
    role: 'Mwalimu wa Shule ya Jumapili — Mwanza',
  },
  {
    text: 'What surprised me most was the quality. Every lesson has a quiz, there are group discussions on WhatsApp, and tutors respond to questions personally. UDBC feels like a real college — on my phone.',
    name: 'Sis. Fatuma Ndegwa',
    role: "Women's Fellowship Leader — Nairobi",
  },
];

const GALLERY = [
  { img: photo3, label: 'Bishop Gwajima preaching' },
  { img: photo1, label: 'Sunday Congregation' },
  { img: photo2, label: 'Cell group Bible study' },
  { img: photo6, label: 'Students studying on phones' },
  { img: photo4, label: 'Graduation Ceremony' },
  { img: photo5, label: 'Bishop Gwajima with pastoral team' },
  { img: small1, label: 'Healing crusade — laying on of hands' },
  { img: flagCrowd, label: 'Phone screen, UDBC lesson' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section-pad">
      <div className="container">
        <p className="eyebrow on-dark">Testimonials</p>
        <h2 className="testimonials__title">What God Is Doing Through UDBC</h2>
        <p className="testimonials__lead">
          Representative testimonials — real student stories will replace these after the July
          2026 intake launches.
        </p>

        <div className="testimonials__grid">
          {QUOTES.map((q) => (
            <div className="qcard" key={q.name}>
              <p>&ldquo;{q.text}&rdquo;</p>
              <strong>{q.name.toUpperCase()}</strong>
              <span>{q.role}</span>
            </div>
          ))}
        </div>

        <div className="gallery">
          {GALLERY.map((g) => (
            <div className="gitem" key={g.label}>
              <img src={g.img.src} alt={g.label} />
              <span>{g.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
