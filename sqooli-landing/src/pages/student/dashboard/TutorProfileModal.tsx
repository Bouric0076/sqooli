import { Check, ChevronRight, Clock3, MessageCircle, Play, X } from 'lucide-react'
import { useState } from 'react'
import teacherAvatar from '../../../assets/images/whats-popular/teacher.webp'

type TutorProfileModalProps = { onClose: () => void }

const tabs = ['Programs', 'Lessons', 'Reviews'] as const

export default function TutorProfileModal({ onClose }: TutorProfileModalProps) {
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Programs')
    const [connected, setConnected] = useState(false)
    const showSection = (tab: (typeof tabs)[number]) => {
        setActiveTab(tab)
        document.getElementById(`student-tutor-${tab.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return <div className="student-tutor-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
        <section className="student-tutor-modal" role="dialog" aria-modal="true" aria-labelledby="student-tutor-modal-title">
            <header className="student-tutor-modal__topbar">
                <button type="button" onClick={onClose}><ChevronRight size={17} className="is-back" /> Back to Tutors</button>
                <button type="button" aria-label="Close tutor profile" onClick={onClose}><X size={21} /></button>
            </header>
            <div className="student-tutor-modal__cover" aria-hidden="true" />
            <section className="student-tutor-modal__hero">
                <img src={teacherAvatar} alt="Jane Doe" />
                <div className="student-tutor-modal__hero-copy">
                    <h1 id="student-tutor-modal-title">Jane Doe</h1>
                    <small>ID: 123456789</small>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Exceptteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...<a href="#tutor-about">show more</a></p>
                </div>
                <div className="student-tutor-modal__hero-actions">
                    <button type="button" aria-label="Message Jane Doe"><MessageCircle size={21} /></button>
                    <button type="button" className="student-dashboard__go" onClick={() => setConnected(!connected)}>{connected ? <><Check size={16} /> Connected</> : 'Connect'}</button>
                </div>
            </section>
            <div className="student-tutor-modal__body">
                <aside className="student-tutor-modal__intro">
                    <h2>Intro Video</h2>
                    <div className="student-tutor-modal__video"><img src={teacherAvatar} alt="Jane Doe introduction" /><button type="button" aria-label="Play introduction"><Play size={22} fill="currentColor" /></button></div>
                    <strong>Get to know me</strong><small>5 May 2025 11:00 AM</small>
                </aside>
                <section className="student-tutor-modal__content">
                    <nav className="student-tutor-modal__tabs" aria-label="Tutor profile sections">{tabs.map(tab => <button type="button" key={tab} className={activeTab === tab ? 'is-active' : ''} onClick={() => showSection(tab)}>{tab}</button>)}</nav>
                    <div id="student-tutor-programs" className="student-tutor-modal__section"><h2>Programs</h2><div className="student-tutor-modal__programs">{['Closed', 'Enrolling', 'Enrolling'].map((status, index) => <article key={index}><h3>December Holiday Tuition 2025</h3><p>20 Lessons</p><span className={status === 'Closed' ? 'is-closed' : ''}>{status}</span><footer><b>{status === 'Closed' ? '0 Slots Left' : '50 Slots Left'}</b><button type="button">View</button></footer></article>)}</div></div>
                    <div id="student-tutor-lessons" className="student-tutor-modal__section"><h2>Lessons</h2><div className="student-tutor-modal__programs">{[1, 2, 3, 4, 5].map(index => <article key={index}><h3>Algebra I</h3><p>18/20 Lessons · 2h left</p><div className="student-tutor-modal__lesson-progress"><span /></div><footer><b>Lecture · 120 Min</b><button type="button">View</button></footer></article>)}</div></div>
                    <div id="student-tutor-reviews" className="student-tutor-modal__section"><h2>Reviews</h2><div className="student-tutor-modal__reviews">{[1, 2, 3].map(index => <article key={index}><strong>Olivia Rhye</strong><span>5.0 ★★★★★</span><p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id.”</p></article>)}</div></div>
                </section>
                <aside className="student-tutor-modal__schedule"><h2>Upcoming Timetable <a href="/student/timetable">View Calendar</a></h2>{['Debate Forum', 'Physics Tuition', 'Physics Tuition'].map((event, index) => <div key={index}><time>3.30 PM</time><span>Grade 3<br /><b>{event}</b></span></div>)}<h2>Timetable Calendar <a href="/student/timetable">This Month</a></h2><div className="student-tutor-modal__mini-calendar"><Clock3 size={14} /> January 2023</div></aside>
            </div>
        </section>
    </div>
}
