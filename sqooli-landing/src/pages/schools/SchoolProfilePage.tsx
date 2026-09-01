import { useState } from 'react'
import { ChevronLeft, ChevronRight, Download, Mail, MapPin, MoreVertical, Phone, Plus, Minus } from 'lucide-react'
import SchoolHeader from './SchoolHeader'
import Footer from '../../components/layout/Footer'
import contactGraphic from '../../assets/images/schools/lettering contact us hand holding text.png'
import bishopPreaching from '../../assets/images/udbc/bishop-preaching.jpg'
import graduation from '../../assets/images/udbc/graduation.jpg'
import students from '../../assets/images/udbc/students.jpg'
import sunday from '../../assets/images/udbc/sunday.jpg'
import udbcPortrait from '../../assets/images/udbc/ud.jpg'
import udbcCommunity from '../../assets/images/udbc/udbc-community-team.webp'
import udbcSupport from '../../assets/images/udbc/udbc-enrolment-support.webp'
import '../../styles/pages/udbc-profile.css'

const FAQS = [['Who can enrol?', 'Any believer 18+ who wants to grow in ministry — cell group leaders, church workers, Sunday school teachers, pastors-in-training, or committed members.'], ['Do I need a laptop or computer?', 'No. UDBC is mobile-first and accessible from your smartphone.'], ['What language are lessons in?', 'Lessons are primarily delivered in Kiswahili, with English support where available.'], ['What happens if I fail an exam?', 'Students below 50% may apply for one supplementary exam per grade at TZS 15,000.'], ['How long does each grade take?', 'Each grade runs approximately 8–10 weeks.'], ['Can I study outside Tanzania?', 'Yes. UDBC welcomes learners across East and Central Africa.']]
type ProfileImage = { src: string; alt: string; position: string }

const image = (src: string, alt: string, position: string): ProfileImage => ({ src, alt, position })
const heroImage = image(students, 'UDBC students and ministry team', '50% 44%')
const portraitImage = image(udbcPortrait, 'UDBC student and ministry leader', '50% 18%')
const bishopImage = image(bishopPreaching, 'Bishop Gwajima preaching', '50% 31%')
const sundayImage = image(sunday, 'Sunday congregation', '50% 43%')
const graduationImage = image(graduation, 'UDBC community', '50% 35%')
const studentsImage = image(students, 'UDBC students', '50% 44%')

const ProfilePhoto = ({ photo, className = '', loading = 'lazy' }: { photo: ProfileImage; className?: string; loading?: 'lazy' | 'eager' }) => <img className={className} src={photo.src} alt={photo.alt} style={{ objectPosition: photo.position }} loading={loading} />

const LEADERS = [['Bishop Dr. Josephat Gwajima', 'Founder & Chancellor', bishopImage, 'JG'], ['Academic Tutors', '6 trained theological tutors', null, 'AT'], ['Student Support', 'WhatsApp and platform guidance', null, 'SS'], ['Admin & QA', 'Exams, records and graduation', null, 'QA']] as const
const SERVICES = [['Digital theological education', 'Mobile-first Certificate and Diploma training.', studentsImage], ['Grade-by-grade learning', 'Structured lessons from Grade 1 to Grade 7.', portraitImage], ['WhatsApp learner support', 'Study groups and learner support throughout intake.', sundayImage], ['Ministry preparation', 'Grounded training for shepherds and church workers.', bishopImage]] as const
const COURSE_CARDS = [['Certificate Pathway', 'Grades 1–3 · Approx. 6 months', 'TZS 35,000 / grade', studentsImage], ['Diploma Pathway', 'Grades 1–7 · Approx. 14 months', 'TZS 50,000 / grade', graduationImage], ['Grade 1 — Potential Shepherd', '9 lessons · CAT quizzes', 'Lisha Kondoo Zangu', portraitImage], ['UDBC Intake July 2026', 'New students · G1 recommended', 'Enrolment open', sundayImage]] as const
const GALLERY = [studentsImage, bishopImage, portraitImage, sundayImage, graduationImage, image(udbcCommunity, 'UDBC community team', '50% 45%'), image(udbcSupport, 'UDBC learner support', '50% 40%')]
const TESTIMONIALS = [['Mama Grace Mwangi', 'Cell Group Leader — Dar es Salaam Branch', 'UDBC gave me a biblical foundation to guide my cell group with confidence.'], ['Deacon Patrick Makori', 'Deacon & Businessman — Mombasa Branch', 'I can study at night from my phone without leaving my family or business.'], ['Bro. Emmanuel Kimaro', 'Sunday School Teacher — Mwanza', 'The lessons are in Kiswahili and I can learn from anywhere.'], ['Sis. Fatuma Ndegwa', "Women's Fellowship Leader — Nairobi", 'Every lesson has a quiz, tutors answer questions personally, and UDBC feels like a real college on my phone.']] as const

export default function SchoolProfilePage() {
  const [tab, setTab] = useState('Classes')
  const [openFaq, setOpenFaq] = useState(0)
  const [testimonial, setTestimonial] = useState(0)
  return <div className="udbc-page udbc-figma-profile">
    <SchoolHeader variant="school-profile" schoolName="UDBC" />
    <main>
      <section className="udbc-figma-hero" id="home"><div><ProfilePhoto photo={heroImage} loading="eager" /></div><div><p className="udbc-faint-label">Ufufuo Digital Bible College</p><h1>Welcome to Ufufuo<br />Digital Bible College</h1><p>“Lisha Kondoo Zangu” · John 21:17</p></div></section>

      <section className="udbc-figma-about udbc-figma-container" id="about"><div><h2>About UDBC</h2><p>Ufufuo Digital Bible College is the official theological training institution of Ufufuo na Uzima Ministries, founded by Bishop Dr. Josephat Gwajima in Dar es Salaam in 1994.</p><p>Through the <strong>Lisha Kondoo Zangu</strong> programme, UDBC equips believers, church workers, Sunday school teachers and pastors-in-training with fully digital theological education delivered on Sqooli.</p><p>Classes are in Kiswahili. Fees are affordable and paid digitally. No laptop or travel is required.</p></div><ProfilePhoto photo={portraitImage} /></section>

      <section className="udbc-figma-section udbc-figma-leadership" id="leadership"><div className="udbc-figma-container"><h2>Leadership</h2><p>Chancellor, academic tutors and student support teams serving learners across East and Central Africa.</p><div className="udbc-leader-rail">{LEADERS.map(([name, role, photo, initials]) => <article key={name}>{photo ? <ProfilePhoto photo={photo} /> : <span className="udbc-leader-placeholder" aria-label={`${name} image placeholder`}>{initials}</span>}<strong>{name}</strong><span>{role}</span></article>)}</div></div></section>

      <section className="udbc-figma-services udbc-figma-container"><h2>Services</h2><div className="udbc-service-grid">{SERVICES.map(([title, copy, photo]) => <article key={title}><ProfilePhoto photo={{ ...photo, alt: title }} /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="udbc-figma-gallery"><div className="udbc-figma-container"><h2>Photo Gallery</h2><div className="udbc-gallery-grid">{GALLERY.map((photo, index) => <ProfilePhoto key={photo.alt} photo={photo} className={`udbc-gallery-${index + 1}`} />)}</div></div></section>

      <section className="udbc-sqooli-section" id="programmes"><div className="udbc-figma-container"><h2>UDBC on Sqooli</h2><p>Access classes, tutors and more seamlessly via our Sqooli profile</p><div className="udbc-tab-row" role="tablist">{['Classes', 'Tutors', 'Questions', 'Programs', 'Enrolments'].map(item => <button type="button" key={item} role="tab" aria-selected={tab === item} className={tab === item ? 'is-active' : ''} onClick={() => setTab(item)}>{item}</button>)}</div>{tab === 'Classes' || tab === 'Programs' || tab === 'Enrolments' ? <div className="udbc-course-rail">{COURSE_CARDS.map(([title, detail, meta, photo]) => <article key={title}><div className="udbc-course-card-top"><h3>{title}</h3><button type="button" aria-label={`More options for ${title}`}><MoreVertical size={20} /></button></div><span>{tab === 'Classes' ? 'Lisha Kondoo Zangu' : tab}</span><ProfilePhoto photo={{ ...photo, alt: title }} /><p>{detail}</p><div><strong>{meta}</strong><a href="https://udbc.sqooli.africa/intake-landing">View details</a></div></article>)}</div> : <div className="udbc-empty-tab"><h3>{tab} from UDBC</h3><p>Questions and tutors will appear here as the UDBC community grows.</p></div>}</div></section>

      <section className="udbc-figma-faq" id="faq"><div className="udbc-figma-container"><h2>Frequently Asked Questions</h2><p>If you have questions we have not addressed please reach out</p><div className="udbc-faq-list">{FAQS.map(([question, answer], index) => <article key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span>{openFaq === index ? <Minus size={15} /> : <Plus size={15} />}</button>{openFaq === index && <p>{answer}</p>}</article>)}</div></div></section>

      <section className="udbc-figma-testimonials udbc-figma-container"><div className="udbc-section-title-row"><h2>Testimonials</h2></div><div className="udbc-testimonial-rail">{TESTIMONIALS.map(([name, role, quote], index) => <article className={index === testimonial ? 'is-active' : ''} key={name}><strong>{name}</strong><span>{role}</span><p>“{quote}”</p></article>)}</div><div className="udbc-testimonial-controls"><button type="button" aria-label="Previous testimonial" onClick={() => setTestimonial(testimonial === 0 ? TESTIMONIALS.length - 1 : testimonial - 1)}><ChevronLeft size={18} /></button><button type="button" aria-label="Next testimonial" onClick={() => setTestimonial((testimonial + 1) % TESTIMONIALS.length)}><ChevronRight size={18} /></button></div></section>

      <section className="udbc-figma-contact" id="contact"><div className="udbc-figma-container"><img src={contactGraphic} alt="Contact UDBC" /><h2>Contact Us</h2><p>Want to learn more about UDBC? Contact us through the following details.</p><div className="udbc-contact-details"><span><Phone size={15} />Telephone<strong>+255 *** *** ***</strong></span><span><Mail size={15} />Email Address<strong>admin@udbc.sqooli.africa</strong></span><span><MapPin size={15} />Physical Address<strong>Dar es Salaam, Tanzania</strong></span></div><h3>Downloads</h3><div className="udbc-downloads"><a href="#contact"><Download size={13} />2026 admission forms</a><a href="#contact"><Download size={13} />UDBC handbook</a><a href="#contact"><Download size={13} />Academic calendar</a></div></div></section>

      <section className="udbc-figma-timetable udbc-figma-container"><h2>Timetable Calendar</h2><div className="udbc-calendar"><aside><strong>July 2026</strong><div className="udbc-mini-calendar">{Array.from({ length: 35 }, (_, index) => <span className={index === 8 ? 'is-selected' : ''} key={index}>{index < 3 ? '' : ((index - 2) % 28) + 1}</span>)}</div><small><i /> School Event</small></aside><div><h3>July 2026</h3><div className="udbc-month-grid">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <b key={day}>{day}</b>)}{Array.from({ length: 35 }, (_, index) => <span key={index}>{index < 2 ? '' : ((index - 1) % 31) + 1}{index === 10 && <em>Grade 1 orientation</em>}</span>)}</div></div></div></section>
    </main>
    <Footer />
  </div>
}
