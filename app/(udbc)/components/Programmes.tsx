import './Programmes.css';

const CURRICULUM = [
  {
    grade: 'G1',
    title: 'Potential Shepherd',
    core: 'Meaning & Benefits of Serving God',
    sub: 'Introduction, Benefits of Service 1&2, Philosophy of Ministry, Biblical Examples, Leadership Levels, What is a Shepherd, Called to be a Shepherd + Church Order, Exam',
    fee: '35,000',
  },
  {
    grade: 'G2',
    title: 'Growing Shepherd',
    core: 'Deepening Your Ministry Foundation',
    sub: 'Ministry principles, church systems, intercessory prayer, worship leadership, cell group management, pastoral care basics',
    fee: '40,000',
  },
  {
    grade: 'G3',
    title: 'Established Shepherd',
    core: 'Ministry in Practice',
    sub: 'Pastoral counselling, evangelism, community outreach, church planting basics, Certificate final exam',
    fee: '45,000',
  },
  {
    grade: 'G4',
    title: 'Junior Resident Pastor',
    core: 'Building the Local Church',
    sub: 'Church governance, tithes & offerings, discipleship systems, family ministry, leadership formation',
    fee: '50,000',
  },
  {
    grade: 'G5',
    title: 'Resident Pastor',
    core: 'Pastoral Maturity',
    sub: 'Sermon construction, media ministry, conflict resolution, missionary work, cross-cultural ministry',
    fee: '55,000',
  },
  {
    grade: 'G6',
    title: 'Senior Shepherd',
    core: 'Advanced Ministry Leadership',
    sub: 'Hermeneutics, eldership structures, mentorship & succession, strategic church planning',
    fee: '60,000',
  },
  {
    grade: 'G7',
    title: 'Senior Resident Pastor',
    core: 'Diploma Capstone',
    sub: 'Advanced theological research, ministry project, final exam, graduation ceremony, Diploma award',
    fee: '70,000',
  },
];

const GRADE1_LESSONS = [
  ['01', 'Introduction to Ministry', 'Utangulizi — Maana ya Kumtumikia Mungu'],
  ['02', 'Benefits of Serving God (Part 1)', 'Faida za Kumtumikia Mungu 1'],
  ['03', 'Benefits of Serving God (Part 2)', 'Faida za Kumtumikia Mungu 2'],
  ['04', 'Serving God with Our Philosophy', 'Kumtumikia Mungu na Falsafa Yetu'],
  ['05', 'Biblical People Who Served God', 'Watu Waliomtumikia Mungu Katika Biblia'],
  ['06', 'Levels of Leadership & Duties', 'Ngazi za Uongozi na Majukumu Yake'],
  ['07', 'What is a Shepherd & Their Work', 'Maana ya Shepherd na Kazi Zake'],
  ['08', 'Called to be a Shepherd + Church Order', 'Umeitwa Kuwa Shepherd + Utaratibu Katika Kanisa'],
  ['09', 'Grade 1 Examination (Final)', 'Mtihani wa Gredi 1'],
];

const ASSESSMENT = [
  ['Continuous Assessment (CAT)', '20%', 'Short quiz after each lesson, on Sqooli platform'],
  ['Main Examination', '60%', 'End-of-grade written exam, on platform'],
  ['Practicals (Mafunzo kwa Vitendo)', '20%', 'Ministry activities over 3–6 months'],
  ['Supplementary Exam (Resit)', '----', 'TZS 15,000 per resit, once per grade'],
  ['Pass Mark', '50%', 'Students below 50% may apply for supplementary exam'],
];

const WELCOME_KIT = [
  'Official UDBC Admission Letter (PDF) with Student ID',
  'UDBC Student Handbook — rules & academic calendar',
  'WhatsApp Study Group link',
  'Personal welcome message from Bishop Gwajima',
  'Grade 1 Timetable for the intake period',
  'Booklist — recommended reading for the grade',
  'Platform login — udbc.sqooli.africa dashboard',
];

export default function Programmes() {
  return (
    <section id="programmes" className="programmes section-pad">
      <div className="container">
        <p className="eyebrow on-dark">Programmes & Curriculum</p>
        <h2 className="programmes__title">Lisha Kondoo Zangu — Feed My Lambs</h2>
        <p className="programmes__lead">
          Two pathways, seven grades — from Potential Shepherd to Senior Resident Pastor. Every
          grade runs 8–10 weeks, delivered entirely on the Sqooli platform
        </p>
        <a href="#enrol" className="btn btn-gradient programmes__cta">Enrol Now – July 2026 Intake</a>

        <div className="programmes__cards">
          <div className="pcard">
            <span className="pcard__tag">Certificate · Level 1</span>
            <h3>Lisha Kondoo Zangu</h3>
            <span className="pcard__meta">Grades 1–3 · Approx. 6 months</span>
            <ul className="pcard__rows">
              <li><span>Admission fee (one-time)</span><strong>TZS 30,000</strong></li>
              <li><span>Grade fees</span><strong>G1 35K · G2 40K · G3 45K</strong></li>
              <li><span>Exam fee</span><strong>TZS 20,000 / grade</strong></li>
              <li><span>Graduation fee</span><strong>TZS 20,000 / grade</strong></li>
            </ul>
            <p className="pcard__award">Award: UDBC Certificate of Theological Studies — Title: Shepherd (Mchungaji)</p>
          </div>

          <div className="pcard">
            <span className="pcard__tag">Diploma · Level 2</span>
            <h3>Lisha Kondoo Zangu</h3>
            <span className="pcard__meta">Grades 1–7 · Approx. 14 months</span>
            <ul className="pcard__rows">
              <li><span>Admission fee (one-time)</span><strong>TZS 30,000</strong></li>
              <li><span>Grade fees</span><strong>G1–G3 as Certificate + G4 50K · G5 55K · G6 60K · G7 70K</strong></li>
              <li><span>Exam fee</span><strong>TZS 20,000 / grade</strong></li>
              <li><span>Graduation fee</span><strong>TZS 20,000 / grade</strong></li>
            </ul>
            <p className="pcard__award">Award: UDBC Diploma in Theological Studies — Title: Senior Resident Pastor</p>
          </div>
        </div>

        <p className="eyebrow on-dark programmes__subhead">Grade-by-Grade Curriculum</p>
        <div className="ctable">
          <div className="ctable__row ctable__head">
            <span>Grade</span><span>Title</span><span>Core Topics</span><span>Key Sub-Topics</span><span>Fee (TZS)</span>
          </div>
          {CURRICULUM.map((row) => (
            <div className="ctable__row" key={row.grade}>
              <span className="ctable__grade">{row.grade}</span>
              <span>{row.title}</span>
              <span>{row.core}</span>
              <span className="ctable__sub">{row.sub}</span>
              <span>{row.fee}</span>
            </div>
          ))}
        </div>

        <div className="programmes__split">
          <div>
            <p className="eyebrow on-dark">Grade 1 Lesson List — Lisha Kondoo Zangu</p>
            <div className="ltable">
              {GRADE1_LESSONS.map(([num, title, sw]) => (
                <div className="ltable__row" key={num}>
                  <span className="ltable__num">{num}</span>
                  <span>
                    <strong>{title}</strong>
                    <em>{sw}</em>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow on-dark">Assessment Framework</p>
            <div className="atable">
              <div className="atable__row atable__head">
                <span>Component</span><span>Weight</span><span>Details</span>
              </div>
              {ASSESSMENT.map(([comp, weight, details]) => (
                <div className="atable__row" key={comp}>
                  <span>{comp}</span>
                  <span>{weight}</span>
                  <span>{details}</span>
                </div>
              ))}
            </div>

            <div className="kitbox">
              <span className="kitbox__icon">🎁</span>
              <h4>Welcome Kit — Received Instantly</h4>
              <ul>
                {WELCOME_KIT.map((item) => (
                  <li key={item}><span>✔</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
