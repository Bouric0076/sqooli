import { MoreVertical, Search, Star } from 'lucide-react'
import { useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import TutorProfileModal from './TutorProfileModal'
import teacherAvatar from '../../../assets/images/whats-popular/teacher.webp'
import '../../../styles/pages/student-tutors.css'

const tutors = [1, 2, 3, 4, 5, 6]

export default function StudentTutorsPage() {
    const [selectedTutor, setSelectedTutor] = useState<number | null>(null)
    const [tab, setTab] = useState<'Current' | 'Past'>('Current')
    return <StudentDashboardLayout activePath="/student/tutors">
        <section className="student-tutors-page" aria-labelledby="student-tutors-title">
            <header className="student-tutors-page__header"><h1 id="student-tutors-title">Tutors</h1><p>View and manage your student’s tutors</p></header>
            <nav className="student-tutors-page__tabs" aria-label="Tutor status"><button className={tab === 'Current' ? 'is-active' : ''} type="button" onClick={() => setTab('Current')}>Current</button><button className={tab === 'Past' ? 'is-active' : ''} type="button" onClick={() => setTab('Past')}>Past</button></nav>
            <label className="student-tutors-page__search"><Search size={19} /><input type="search" placeholder="Search Tutors" aria-label="Search tutors" /></label>
            <div className="student-tutors-page__grid">{tutors.map(id => <article className="student-tutor-card" key={id} onClick={() => setSelectedTutor(id)} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedTutor(id) }}>
                <header><h2>Jane Doe</h2><button type="button" aria-label="Tutor options" onClick={(event) => event.stopPropagation()}><MoreVertical size={20} /></button></header>
                <div className="student-tutor-card__subjects"><span>Math</span><span>Eng</span><span>Physics</span></div>
                <img src={teacherAvatar} alt="Jane Doe" />
                <div className="student-tutor-card__rating"><span>4.5</span>{[1, 2, 3, 4, 5].map(star => <Star key={star} size={17} fill="currentColor" />)}</div>
                <footer><strong>200 lessons taught</strong><button type="button" onClick={(event) => { event.stopPropagation(); setSelectedTutor(id) }}>View</button></footer>
            </article>)}</div>
            {selectedTutor && <TutorProfileModal onClose={() => setSelectedTutor(null)} />}
        </section>
    </StudentDashboardLayout>
}
