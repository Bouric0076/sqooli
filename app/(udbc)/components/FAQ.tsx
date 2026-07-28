import { useState } from 'react';
import './FAQ.css';
import { photo1, photo2 } from '../assets/images';

const FAQS = [
  {
    q: 'Who can enrol?',
    a: 'Any believer 18+ who wants to grow in ministry — cell group leaders, church workers, Sunday school teachers, pastors-in-training, or committed members. No prior theological qualifications required.',
  },
  { q: 'Do I need a laptop or computer?', a: 'No. UDBC is fully mobile-first — every lesson, quiz, and exam can be completed on any smartphone. No laptop or app download is required.' },
  { q: 'What language are lessons in?', a: 'Lessons are delivered primarily in Kiswahili, with English available as a secondary language for select materials.' },
  { q: 'What happens if I fail an exam?', a: 'Students scoring below 50% may apply for a supplementary (resit) exam for a fee of TZS 15,000, once per grade.' },
  { q: 'How long does each grade take?', a: 'Each grade runs approximately 8–10 weeks, delivered entirely on the Sqooli platform at your own pace.' },
  { q: 'Can I study outside Tanzania?', a: 'Yes. UDBC is available across Tanzania, Kenya, Uganda, Rwanda, and Burundi, with local payment options in each country.' },
  { q: 'What do I receive at graduation?', a: 'Certificate pathway graduates receive the UDBC Certificate of Theological Studies; Diploma graduates receive the UDBC Diploma in Theological Studies, along with the title of Senior Resident Pastor.' },
  { q: 'Who teaches at UDBC?', a: 'Six trained theological tutors deliver the G1–G7 curriculum, with theological content forming the backbone from Bishop Dr. Josephat Gwajima\u2019s teaching.' },
  { q: 'Is there WhatsApp support?', a: 'Yes — a dedicated WhatsApp bot and student support team (WS5) are available 24/7 for platform guidance and questions.' },
  { q: 'How do I refer someone?', a: 'Share your referral link or lesson code with a friend. Once they successfully enrol, you receive one week free grade extension.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq section-pad">
      <div className="container faq__grid">
        <div>
          <p className="eyebrow">Have a Question?</p>
          <h2 className="faq__title">Frequently Asked Questions</h2>
          <p className="faq__lead">If you have questions we have not addressed please reach out</p>

          <div className="faq__list">
            {FAQS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={item.q}>
                  <button className="faq__q" onClick={() => setOpenIndex(isOpen ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="faq__toggle">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && <p className="faq__a">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="faq__media">
          <div className="faq__img faq__img--yellow">
            <img src={photo1.src} alt="Believers of UDBC" />
          </div>
          <div className="faq__img faq__img--maroon">
            <img src={photo2.src} alt="Outreach ministry" />
          </div>
        </div>
      </div>
    </section>
  );
}
