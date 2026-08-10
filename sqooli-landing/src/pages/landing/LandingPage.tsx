import { useEffect, useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Bookmark, ChevronDown, ChevronUp, ExternalLink, MapPin, MessageCircle, MoreVertical, Search, Share2, ThumbsDown, ThumbsUp, Users } from 'lucide-react'
import { frequentlyAsked, type PopularTab } from './landingData'
import worshipBackground from '../../assets/images/hero/IMG_6358 2.png'
import speakerPortrait from '../../assets/images/hero/thumbnail 2.png'
import sqooliMark from '../../assets/images/hero/Group.png'
import studentBackground from '../../assets/images/hero/9d1ae7c033e3ef8560c711c9a22681c82f3ddc6a.png'
import childrenCollage from '../../assets/images/how-it-works/Group 1597880527.png'
import contactKids from '../../assets/images/contact/Rectangle 5709.png'
import lucyAvatar from '../../assets/images/whats-popular/teacher.jpg'
import classProgramArtwork from '../../assets/images/whats-popular/Property 1=classes.png'
import upcomingProgramArtwork from '../../assets/images/programs/teachers-change-world.png'
import '../../styles/pages/landing/landing.css'
import '../../styles/responsive/final-mobile.css'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import BookSlotModal from '../../components/BookSlotModal'

const QA_CARDS = [
  {
    author: 'Lucy',
    role: 'Parent',
    date: '20 Sep 2025 11.00 AM',
    title: 'What is an atom?',
    subject: 'Chemistry',
    subjectBg: '#70C600',
    downvotes: 20,
    upvotes: 20,
    comments: 20,
    shares: 20,
    rotate: '-3deg'
  },
  {
    author: 'Lucy',
    role: 'Parent',
    date: '20 Sep 2025 11.00 AM',
    title: 'What is the root of E76?',
    subject: 'Math',
    subjectBg: '#f59e0b',
    downvotes: 20,
    upvotes: 20,
    comments: 20,
    shares: 20,
    rotate: '2.5deg'
  },
  {
    author: 'Lucy',
    role: 'Parent',
    date: '20 Sep 2025 11.00 AM',
    title: 'Who is the father of physics?',
    subject: 'Physics',
    subjectBg: '#7c3aed',
    downvotes: 20,
    upvotes: 20,
    comments: 20,
    shares: 20,
    rotate: '-2deg'
  },
  {
    author: 'Lucy',
    role: 'Parent',
    date: '20 Sep 2025 11.00 AM',
    title: "Let's talk about the Mitochondrion...",
    subject: 'Biology',
    subjectBg: '#0284c7',
    downvotes: 20,
    upvotes: 20,
    comments: 20,
    shares: 20,
    rotate: '2deg'
  },
  {
    author: 'Lucy',
    role: 'Parent',
    date: '20 Sep 2025 11.00 AM',
    title: 'What careers can a Geography major pursue?/',
    subject: 'Geography',
    subjectBg: '#f97316',
    downvotes: 20,
    upvotes: 20,
    comments: 20,
    shares: 20,
    rotate: '-3deg'
  }
]

export default function LandingPage() {
  const [tab, setTab] = useState<PopularTab | 'Programs' | 'Enrolments'>('Tutors')
  const [openFaq, setOpenFaq] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [previousSlide, setPreviousSlide] = useState<number | null>(null)
  const [isHeroTransitioning, setIsHeroTransitioning] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
  const [openCardMenu, setOpenCardMenu] = useState<number | null>(null)
  const [notice, setNotice] = useState('')
  const [activeProgram, setActiveProgram] = useState(0)
  const [activeOngoing, setActiveOngoing] = useState(0)
  const [programView, setProgramView] = useState<'curriculum' | 'upcoming'>('curriculum')
  const [bookingProgram, setBookingProgram] = useState<string | null>(null)
  const [listingQuery, setListingQuery] = useState('')
  const [listingNotice, setListingNotice] = useState('')
  const [faqAudience, setFaqAudience] = useState('Tutors')
  const [notificationEmail, setNotificationEmail] = useState('')
  const [notificationNotice, setNotificationNotice] = useState('')
  const [questionQuery, setQuestionQuery] = useState('')
  const [contact, setContact] = useState({ name: '', email: '', message: '' })
  const slides = [
    { image: studentBackground, title: <>Empowering Learning, Anytime, Anywhere</>, description: 'Experience a new way of learning from anywhere with Sqooli. Find classes, quizzes, online schools and more...', action: 'Find Lessons', portrait: false, student: true },
    { image: worshipBackground, title: <>LISHA KONDOO<br />ZANGU</>, scripture: 'John 21:17', description: 'Enrol at Ufufuo Digital Bible College and begin your calling — from your phone, from your home, from your congregation.', action: 'Enrol Now – July 2026 Intake', portrait: true, student: false },
  ]
  const slide = slides[activeSlide]
  const popularTabs = ['Classes', 'Tutors', 'Questions', 'Programs', 'Enrolments'] as const
  const items = ['Mathematics Camp', 'Jane Doe', 'What is an atom?', 'Creative Coding']
  const programs = [{ date: 'December Holiday Tuition 2025', copy: 'Discover holiday classes built around confidence, curiosity and real progress.' }, { date: 'January Back-to-School 2026', copy: 'Start the term with personalised support and a community ready to help.' }]
  const ongoingPrograms = [
    { level: 'Part Time', title: 'Lisha Kondoo Zangu', duration: 'Grades 1–3 · Approx. 6 months', copy: 'Build strong theological foundations through a guided, grade-by-grade learning path.', benefits: ['Admission fee (one-time): TZS 30,000', 'Grade fees: G1 35K · G2 40K · G3 45K', 'Exam and graduation fee: TZS 20,000 / grade', 'Award: UDBC Certificate of Theological Studies — Title: Shepherd (Mchungaji)'] },
    { level: 'Full Time', title: 'Lisha Kondoo Zangu', duration: 'Grades 1–7 · Approx. 14 months', copy: 'Deepen your studies through the complete diploma pathway, from first grade to graduation.', benefits: ['Admission fee (one-time): TZS 30,000', 'Grade fees: G1–G3 as Part Time + G4 50K · G5 55K · G6 60K · G7 70K', 'Exam and graduation fee: TZS 20,000 / grade', 'Award: UDBC Diploma in Theological Studies — Title: Senior Resident Pastor'] },
  ]
  const listings = [{ name: 'Valley Antony Institute', students: '3,964 students', location: 'Kakamega' }, { name: 'Bright Minds School', students: '1,286 students', location: 'Nairobi' }, { name: 'Coastal Learning Academy', students: '846 students', location: 'Mombasa' }]
  const visibleListings = listings.filter(listing => listing.name.toLowerCase().includes(listingQuery.toLowerCase()))
  const faqAudiences = ['Tutors', 'Parents', 'Students']
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update(); media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (reducedMotion) return undefined
    const timer = window.setInterval(() => setActiveSlide(current => { setPreviousSlide(current); setIsHeroTransitioning(false); return (current + 1) % slides.length }), 6500)
    return () => window.clearInterval(timer)
  }, [reducedMotion, slides.length])
  useEffect(() => {
    if (previousSlide === null || reducedMotion) return undefined
    const frame = window.requestAnimationFrame(() => setIsHeroTransitioning(true))
    return () => window.cancelAnimationFrame(frame)
  }, [previousSlide, reducedMotion])
  useEffect(() => { if (previousSlide === null) return undefined; const timer = window.setTimeout(() => { setPreviousSlide(null); setIsHeroTransitioning(false) }, 600); return () => window.clearTimeout(timer) }, [previousSlide])
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (openCardMenu !== null && !target.closest('.card-top button') && !target.closest('.card-menu')) {
        setOpenCardMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [openCardMenu]);
  const switchProgramView = () => setProgramView(current => current === 'curriculum' ? 'upcoming' : 'curriculum')
  return <main id="top">
    <Header />

    <section className={`hero hero-figma slide-${activeSlide} ${slide.student ? 'student-slide' : ''} ${previousSlide !== null ? 'hero-has-previous' : ''} ${isHeroTransitioning ? 'hero-transitioning' : ''} ${reducedMotion ? 'reduce-motion' : ''}`}>
      {previousSlide !== null && <><img className="hero-background hero-outgoing" src={slides[previousSlide].image} alt="" /><div className="hero-outgoing-copy" aria-hidden="true"><h1>{slides[previousSlide].title}</h1><p>{slides[previousSlide].description}</p></div></>}{<img className="hero-background hero-incoming" src={slide.image} alt="" />}
      <div className="hero-shade" />
      <div className="container hero-copy">
        {!slide.student && <span className="scripture">{slide.scripture}</span>}<h1>{slide.title}</h1><p>{slide.description}</p>
        {slide.student && <div className="hero-metrics"><span><b>12K+</b>Lessons</span><span><b>2K+</b>Available Live Classes</span><span><b>5K+</b>Answered Questions</span></div>}
        <div className="hero-actions"><a className="button enrol" href={slide.student ? '/search' : '#join'}>{slide.student && <Search size={18} />} {slide.action}</a>{!slide.student && <a className="button learn" href="#programs">Learn More</a>}</div>
      </div>
      {slide.portrait && <><img className="speaker-portrait" src={speakerPortrait} alt="Ufufuo Digital Bible College speaker" /><span className="powered">Powered by <img src={sqooliMark} alt="Sqooli" /><small>A class of your own</small></span></>}<svg className="hero-wave" viewBox="0 0 1440 92" preserveAspectRatio="none" aria-hidden="true"><path d="M0 42 C125 90 235 15 382 48 C510 78 604 88 725 60 C850 31 930 4 1050 29 C1195 60 1300 89 1440 55 L1440 92 L0 92 Z" /></svg>
    </section>

    <section id="partners" className="partners section container"><p className="section-kicker">Join the list of our amazing partners</p><div className="partner-row"><b>⚡ Boltshift</b><b className="partner-serif">◈ Lightbox</b><b>⌁ FeatherDev</b><b className="partner-dots">◉ Spherule</b><b className="partner-serif">◉ Spherule</b><b>◉ GlobalBank</b></div></section>

    <section id="popular" className="popular native-popular"><div className="container"><div className="section-heading"><h2>Discover What’s Popular</h2><a className="text-link" href="/popular">Explore More</a></div><div className="popular-toolbar"><div className="tabs" role="tablist" aria-label="Popular categories">{popularTabs.map(item => <button key={item} role="tab" aria-selected={tab === item} className={tab === item ? 'active' : ''} onClick={() => { setTab(item); setActiveCard(0) }}>{item}</button>)}</div><div className="popular-arrows"><button type="button" aria-label="Previous cards" onClick={() => setActiveCard((activeCard + 3) % 4)}><ArrowLeft /></button><button type="button" aria-label="Next cards" onClick={() => setActiveCard((activeCard + 1) % 4)}><ArrowRight /></button></div></div><div className="native-card-rail">{items.map((item, index) => <article className={`native-card ${index === activeCard ? 'featured' : ''}`} key={item}><div className="card-top"><h3>{tab === 'Tutors' ? 'Jane Doe' : tab === 'Questions' ? 'What is an atom?' : 'The Ultimate Math Camp Kenya April 2026'}</h3><button type="button" aria-label="Card options" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setOpenCardMenu(openCardMenu === index ? null : index)}><MoreVertical size={20} /></button>{openCardMenu === index && <div className="card-menu" role="menu"><button type="button" role="menuitem" onClick={() => { setNotice('Saved to your list'); setOpenCardMenu(null) }}><Bookmark />Save</button><button type="button" role="menuitem" onClick={() => { setNotice('Share link copied'); setOpenCardMenu(null) }}><Share2 />Share</button></div>}</div><div className="tag-row"><span>{tab === 'Questions' ? 'Chemistry' : 'Math'}</span>{tab === 'Tutors' && <><span>Eng</span><span>Physics</span></>}</div><div className={`card-art art-${index}`}>{tab === 'Classes' ? <img src={classProgramArtwork} alt="Teachers Change the world classroom programme" /> : <span>{tab === 'Questions' ? 'Lucy asks a question' : 'Learning together'}</span>}</div><p className="card-rating">4.5 ★★★★★</p><div className="card-bottom"><span>{tab === 'Questions' ? '20 votes · 20 helpful' : tab === 'Tutors' ? '200 lessons taught' : 'KES 200.00'}</span><button type="button" onClick={() => { if (tab === 'Tutors') window.location.href = '/tutors/profile'; else if (tab === 'Questions') window.location.href = '/questions'; else setBookingProgram(item) }}>{tab === 'Tutors' ? 'View Tutor' : tab === 'Questions' ? 'View Question' : 'Book a Slot'}</button></div></article>)}</div>{notice && <p className="action-notice" role="status">{notice}</p>}</div></section>

    <section id="programs" className={`upcoming ${programView}`}>
      <div className="container">
        <div className="program-view-controls" aria-label="Program view controls">
          <button aria-label="Previous program view" onClick={switchProgramView}><ArrowLeft /></button>
          <p className="sr-only" role="status" aria-live="polite">
            Showing {programView === 'curriculum' ? 'Ongoing Programs' : 'Upcoming Programs'}
          </p>
          <button aria-label="Next program view" onClick={switchProgramView}><ArrowRight /></button>
        </div>

        {programView === 'curriculum' ? (
          <div role="region" aria-label="Ongoing programs" className="upcoming-view ongoing-view">
            <div className="program-heading">
              <h2>Ongoing Programs</h2>
            </div>
            <div className="program-layout">
              <div>
                <p className="program-level">{ongoingPrograms[activeOngoing].level}</p>
                <h3>{ongoingPrograms[activeOngoing].title}</h3>
                <p className="program-duration">{ongoingPrograms[activeOngoing].duration}</p>
                <p>{ongoingPrograms[activeOngoing].copy}</p>
                <ul>{ongoingPrograms[activeOngoing].benefits.slice(0, 3).map(benefit => <li key={benefit}>{benefit}</li>)}</ul>
                <p className="program-award">{ongoingPrograms[activeOngoing].benefits[3]}</p>
                <button className="button" onClick={() => setBookingProgram(ongoingPrograms[activeOngoing].title)}>Book a Slot</button>
                <button className="next-program" onClick={() => setActiveOngoing((activeOngoing + 1) % ongoingPrograms.length)}>Next <ArrowRight /></button>
              </div>
              <div className="program-preview"><span>Lisha Kondoo<br /><b>Zangu</b></span><i /><em>{ongoingPrograms[activeOngoing].level}</em></div>
            </div>
          </div>
        ) : (
          <div role="region" aria-label="Upcoming programs" className="upcoming-view">
            <div className="program-heading">
              <h2>Upcoming Programs</h2>
            </div>
            <div className="program-layout">
              <div>
                <h3>{programs[activeProgram].date}</h3>
                <p>{programs[activeProgram].copy}</p>
                <ul><li>Access to lessons in all subjects</li><li>Personalised support for every learner</li><li>Build confidence before the next term</li></ul>
                <button className="button" onClick={() => setBookingProgram(programs[activeProgram].date)}>Book a Slot</button>
                <button className="next-program" onClick={() => setActiveProgram((activeProgram + 1) % programs.length)}>Next <ArrowRight /></button>
              </div>
              <div className="program-preview program-image-preview"><img src={upcomingProgramArtwork} alt="Teachers Change the world classroom programme" /></div>
            </div>
          </div>
        )}

      </div>
    </section>

    <section id="schools" className="listings"><div className="container"><header><h2>Explore Our School Listings</h2><p>Explore our extensive list of schools available in Sqooli. Access forms and lessons seamlessly.</p></header><form className="listing-search" onSubmit={event => { event.preventDefault(); setListingNotice(`${visibleListings.length} local demo listings found`) }}><Search aria-hidden="true" /><label htmlFor="school-search">Search school listings</label><input id="school-search" type="search" aria-controls="listing-results" value={listingQuery} onChange={event => setListingQuery(event.target.value)} placeholder="Type school name..." /><button type="submit">Search</button></form><p className="sr-only" aria-live="polite">{visibleListings.length} listings found</p><div id="listing-results" className="listing-rows">{visibleListings.map((listing, index) => <article className="listing-row" key={listing.name}><div className={`listing-thumb thumb-${index}`} aria-hidden="true">SQ</div><div className="listing-main"><h3>{listing.name}</h3><span>www.{listing.name.toLowerCase().replaceAll(' ', '')}.ac.ke</span><p><span><Users aria-hidden="true" />{listing.students}</span><span><MapPin aria-hidden="true" />{listing.location}</span></p><strong>4.5 ★★★★★</strong></div><div className="listing-actions"><a href="/schools/detail" className="button button-small" style={{ background: 'transparent', border: '1px solid #168dcc', color: '#168dcc' }}>Go to Website</a><a href="/schools/tutors" className="button button-small" style={{ background: 'transparent', border: '1px solid #168dcc', color: '#168dcc' }}>View Lessons</a><a href="/schools/tutors" className="button button-small" style={{ background: 'transparent', border: '1px solid #168dcc', color: '#168dcc' }}>View Tutors</a></div></article>)}</div>{visibleListings.length === 0 && <p className="no-listings" role="status">No school listings found. Try another name.</p>}{listingNotice && <p className="listing-notice" role="status">{listingNotice}</p>}<a className="listing-cta" href="/schools"><ExternalLink aria-hidden="true" />Go to School Listing</a></div></section>

    <section id="how-it-works" className="how-flow"><div className="container"><h2>How it works</h2><p>It’s easy. Here is a 3 step visual timeline of what to expect by partnering with us</p><div>{[['1','Create an account','Get started by creating a parent, student, or school account. Afterwards, your information and credentials will be onboarded to Sqooli.'],['2','Book a class','Log into your profile and book a class from any available programs.'],['3','Get to learning','Track your earnings, impact through marketing partners and our dashboard.']].map(([n,t,c])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{c}</p></article>)}</div></div></section>

    <section className="notifications"><h2>Subscribe to our Notifications</h2><p>Get weekly Sqooli updates on new lessons and programs by subscribing to our notifications.</p><form onSubmit={event=>{event.preventDefault();setNotificationNotice('Thanks — you are subscribed to Sqooli updates.');setNotificationEmail('')}}><label htmlFor="notification-email">Email address</label><input id="notification-email" type="email" autoComplete="email" maxLength={120} required value={notificationEmail} onChange={event=>setNotificationEmail(event.target.value)} placeholder="Enter Email Address"/><button type="submit">Subscribe</button></form>{notificationNotice&&<p className="notification-notice" role="status" aria-live="polite">{notificationNotice}</p>}</section>

    <section className="faq-flow"><div className="container"><h2>Frequently Asked Questions</h2><p>If you have questions we have not addressed please reach out</p><div className="faq-tabs" role="tablist" aria-label="Frequently asked question audience">{faqAudiences.map(item=><button key={item} role="tab" id={`faq-tab-${item}`} aria-selected={faqAudience===item} aria-controls="faq-panel" tabIndex={faqAudience===item?0:-1} className={faqAudience===item?'active':''} onKeyDown={event=>{const current=faqAudiences.indexOf(faqAudience);const next=event.key==='ArrowRight'?(current+1)%faqAudiences.length:event.key==='ArrowLeft'?(current+faqAudiences.length-1)%faqAudiences.length:event.key==='Home'?0:event.key==='End'?faqAudiences.length-1:current;if(next!==current){event.preventDefault();setFaqAudience(faqAudiences[next])}}} onClick={()=>setFaqAudience(item)}>{item}</button>)}</div><div id="faq-panel" role="tabpanel" aria-labelledby={`faq-tab-${faqAudience}`} className="faq-list">{frequentlyAsked.map(([question,answer],index)=><article key={question}><button aria-expanded={openFaq===index} aria-controls={`faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?-1:index)}><span>{question}</span>{openFaq===index?<ChevronUp/>:<ChevronDown/>}</button>{openFaq===index&&<p id={`faq-${index}`}>{answer} {faqAudience} can explore this locally.</p>}</article>)}</div></div></section>

    <section id="community" className="question-flow">
      <div className="container">
        <h2>Sqooli Question Board</h2>
        <p className="qb-subtitle-text">
          Ask questions about any topic and have hundreds of responses from our community
        </p>

        {/* Search Pill Bar (matching qa-section.png) */}
        <form className="qa-search-form" onSubmit={(event: FormEvent)=>{event.preventDefault(); window.location.href = `/questions?q=${encodeURIComponent(questionQuery)}`}}>
          <div className="qa-search-pill">
            <Search className="qa-search-icon" size={20} />
            <input
              type="text"
              value={questionQuery}
              onChange={(event) => setQuestionQuery(event.target.value)}
              placeholder="Ask anything about anything..."
            />
            <button type="submit" className="btn-search-qb">
              Search in Question Board
            </button>
          </div>
        </form>

        {/* Popular Topics Section */}
        <div className="popular-topics-wrapper">
          <span className="popular-topics-label">Popular Topics</span>
          <div className="topic-pills-row">
            {['Physics', 'Physics', 'Physics', 'Physics'].map((topic, index) => (
              <a key={`${topic}-${index}`} href="/questions" className="popular-topic-pill">
                {topic}
              </a>
            ))}
          </div>
        </div>

        {/* Question Cards Rail (matching qa-section.png) */}
        <div className="qa-cards-rail">
          {QA_CARDS.map((card, index) => (
            <article
              key={index}
              className="qa-card-item"
              style={{ transform: `rotate(${card.rotate})` }}
            >
              {/* Author Row */}
              <div className="qa-card-author-row">
                <img src={lucyAvatar} alt={card.author} className="qa-author-img" />
                <div className="qa-author-info">
                  <div className="qa-author-name-line">
                    <span className="qa-author-name">{card.author}</span>
                    <span className="qa-author-badge">{card.role}</span>
                  </div>
                  <span className="qa-card-date">{card.date}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="qa-card-title">{card.title}</h3>

              {/* Subject Tag */}
              <div className="qa-card-tag-row">
                <span className="qa-subject-pill" style={{ background: card.subjectBg }}>
                  {card.subject}
                </span>
              </div>

              {/* Stats Bar */}
              <div className="qa-card-stats-row">
                <span className="qa-stat-pill"><ThumbsDown size={13} /> {card.downvotes}</span>
                <span className="qa-stat-pill"><ThumbsUp size={13} /> {card.upvotes}</span>
                <span className="qa-stat-pill"><MessageCircle size={13} /> {card.comments}</span>
                <span className="qa-stat-pill"><Share2 size={13} /> {card.shares}</span>
              </div>

              {/* View Button */}
              <a href="/questions" className="qa-card-view-btn">
                View
              </a>
            </article>
          ))}
        </div>
        {notice && <p role="status" className="flow-notice">{notice}</p>}
      </div>
    </section>

    <section id="join" className="join-flow"><div className="container"><img src={childrenCollage} alt="Children learning together"/><div><h2>Join World's largest learning platform today</h2><p>Join thousands of learners who are upgrading their skills across tutors, classes, schools and more.</p><button className="button" onClick={()=>setNotice('Local demo: Get Started selected')}>Get Started</button></div></div></section>
    <section id="contact" className="contact-flow">
      <div className="container contact-container">
        <div className="contact-info-side">
          <h2>
            Have Questions?
            <svg className="smiley-icon" width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', marginLeft: '8px', verticalAlign: 'middle' }}>
              <circle cx="8" cy="6" r="2" fill="currentColor" />
              <circle cx="20" cy="6" r="2" fill="currentColor" />
              <path d="M5 12C9 16 19 16 23 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </h2>
          <p className="contact-subtitle">Join the Sqooli Fam today.</p>
          <form onSubmit={(event: FormEvent)=>{event.preventDefault();setNotice('Local demo: your message was not sent or saved.')}}>
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" autoComplete="name" maxLength={80} required value={contact.name} onChange={event=>setContact({...contact,name:event.target.value})}/>
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email Address</label>
              <input id="contact-email" type="email" autoComplete="email" maxLength={120} required value={contact.email} onChange={event=>setContact({...contact,email:event.target.value})}/>
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" maxLength={1000} required value={contact.message} onChange={event=>setContact({...contact,message:event.target.value})}/>
            </div>
            <button className="btn-send-message">Send Message</button>
          </form>
          {notice&&<p role="status" className="flow-notice">{notice}</p>}
        </div>
        <div className="contact-art-side" aria-hidden="true">
          <div className="contact-blob blob-peach"></div>
          <div className="contact-blob blob-yellow"></div>
          <div className="contact-blob blob-pink"></div>
          <div className="contact-blob blob-green"></div>
          <img className="contact-kids-img" src={contactKids} alt="Children learning together" />
        </div>
      </div>
    </section>

    <Footer />
    <BookSlotModal isOpen={bookingProgram !== null} onClose={() => setBookingProgram(null)} courseTitle={bookingProgram ?? undefined} />
  </main>
}
