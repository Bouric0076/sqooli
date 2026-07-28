import './Leadership.css';
import { chancellorPortrait } from '../assets/images';

const TEAM = [
  ['WS1 — Content Team', 'Curriculum development, lesson writing, G1–G7 content completion'],
  ['WS2 — Short Fupi Team', 'Short video production for WhatsApp and social media'],
  ['WS3 — Exam Team', 'Question bank, CAT design, main exam papers, marking guides'],
  ['WS4 — Outreach Team', 'Student recruitment, church activations, QR campaigns'],
  ['WS5 — Student Support', 'WhatsApp bot, student queries, platform guidance (24/7)'],
  ['WS6 — Admin & QA', 'Exam admin, records, transcripts, graduation logistics'],
  ['Academic Tutors', '6 trained theological tutors delivering G1–G7 content'],
];

export default function Leadership() {
  return (
    <section id="leadership" className="leadership section-pad">
      <div className="container">
        <p className="eyebrow on-maroon">Leadership & Faculty</p>
        <h2 className="leadership__title">Chancellor & Academic Teams</h2>

        <div className="leadership__profile">
          <div className="leadership__photo">
            <img src={chancellorPortrait.src} alt="Bishop Dr. Josephat Gwajima" />
          </div>
          <div>
            <h3>Bishop Dr. Josephat Gwajima, PhD</h3>
            <p className="leadership__role">
              Founder & Chancellor, UDBC · Archbishop, Ufufuo na Uzima Ministries · MP, Kawe
              Constituency, Tanzania
            </p>
            <p>
              Bishop Dr. Josephat Gwajima is the founder and Archbishop of Ufufuo na Uzima
              Ministries, established in Dar es Salaam, Tanzania in 1994. His ministry — known
              across East Africa as the Glory of Christ Tanzania Church (GCTC) — has grown to
              encompass over 400 churches and a main Cathedral congregation of 70,000+ members
              per sitting.
            </p>
            <p>
              A world-renowned healer, preacher, and prophetic voice, Bishop Gwajima has
              ministered in Japan, USA, UK, Switzerland, Germany, Korea, China, and across the
              African continent. He has authored over 40 books on theology, Christian leadership,
              healing, and faith.
            </p>
            <p>
              Bishop Gwajima founded UDBC with the vision of equipping every believer in Africa
              to serve God with knowledge, conviction, and calling. His teaching forms the
              theological backbone of the LISHA KONDOO ZANGU curriculum.
            </p>
          </div>
        </div>

        <div className="teamtable">
          <div className="teamtable__row teamtable__head"><span>Team</span><span>Role</span></div>
          {TEAM.map(([team, role]) => (
            <div className="teamtable__row" key={team}>
              <span>{team}</span>
              <span>{role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
