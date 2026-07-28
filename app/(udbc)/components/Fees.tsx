import './Fees.css';

const FEES = [
  ['Admission Fee (one-time)', '30,000', 'At enrolment — admission letter, student ID, course kit'],
  ['Grade 1 Fee', '35,000', 'Before accessing G1 lessons — all lessons + CAT quizzes'],
  ['Grade 2 Fee', '40,000', 'Before Grade 2 access'],
  ['Grade 3 Fee', '45,000', 'Before Grade 3 access'],
  ['Certificate Graduation Fee', '30,000', 'End of G3 — Certificate ceremony'],
  ['Grade 4 Fee', '50,000', 'Diploma pathway — before G4'],
  ['Grade 5 Fee', '55,000', 'Before Grade 5 access'],
  ['Grade 6 Fee', '60,000', 'Before Grade 6 access'],
  ['Grade 7 Fee', '70,000', 'Before Grade 7 access'],
  ['Diploma Graduation Fee', '30,000', 'End of G7 — Diploma ceremony'],
  ['Examination Fee', '20,000', 'Per exam sitting — in addition to grade fee'],
  ['Supplementary Exam (Resit)', '15,000', 'If failed main exam — once per grade'],
];

export default function Fees() {
  return (
    <section id="fees" className="fees section-pad">
      <div className="container">
        <p className="eyebrow">Fees & Payment</p>
        <h2 className="fees__title">Ada na Malipo</h2>
        <p className="fees__lead">
          All fees paid digitally via M-PESA, Tigopesa, or Airtel Money — directly on
          udbc.sqooli.africa. No bank account required.
        </p>

        <div className="ftable">
          <div className="ftable__row ftable__head">
            <span>Fee Item</span><span>Fee (TZS)</span><span>When Paid & Notes</span>
          </div>
          {FEES.map(([item, fee, note]) => (
            <div className="ftable__row" key={item}>
              <span className="ftable__item">{item}</span>
              <span>{fee}</span>
              <span className="ftable__note">{note}</span>
            </div>
          ))}
        </div>

        <div className="fees__summary">
          <div className="fsum">
            <span className="fsum__label">Certificate Pathway (G1–G3)</span>
            <div className="fsum__values">
              <div><span>Minimum</span><strong>TZS 210,000</strong></div>
              <div><span>Maximum (w/ resits)</span><strong>TZS 350,000</strong></div>
            </div>
          </div>
          <div className="fsum">
            <span className="fsum__label">Full Diploma Pathway (G1–G7)</span>
            <div className="fsum__values">
              <div><span>Minimum</span><strong>TZS 585,000</strong></div>
              <div><span>Maximum (w/ resits)</span><strong>TZS 1,400,000</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
