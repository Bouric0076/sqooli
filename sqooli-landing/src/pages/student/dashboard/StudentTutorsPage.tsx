import { MoreVertical, Search, Star } from 'lucide-react'
import { useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import TutorProfileModal from './TutorProfileModal'
import { useTeachers } from '../../../features/student/student.queries'
import teacherAvatar from '../../../assets/images/whats-popular/teacher.webp'
import '../../../styles/pages/student-tutors.css'

type TeacherRecord = { id?: number | string; fullName?: string; firstName?: string; lastName?: string; email?: string; bio?: string; subjectIds?: Array<number | string>; rating?: number | string; lessonsTaught?: number | string }

function extractTeachers(payload: unknown): TeacherRecord[] {
	if (Array.isArray(payload)) return payload as TeacherRecord[]
	if (!payload || typeof payload !== 'object') return []
	const record = payload as Record<string, unknown>
	for (const key of ['data', 'items', 'results', 'teachers']) {
		if (Array.isArray(record[key])) return record[key] as TeacherRecord[]
		if (record[key] && typeof record[key] === 'object') {
			const nested = extractTeachers(record[key])
			if (nested.length) return nested
		}
	}
	return []
}

export default function StudentTutorsPage() {
    const [selectedTutor, setSelectedTutor] = useState<number | null>(null)
    const [tab, setTab] = useState<'Current' | 'Past'>('Current')
	const [search, setSearch] = useState('')
	const { data, isLoading, isError, refetch } = useTeachers({ page: 1, pageSize: 50, search: search.trim() || undefined })
	const tutors = extractTeachers(data)
    return <StudentDashboardLayout activePath="/student/tutors">
        <section className="student-tutors-page" aria-labelledby="student-tutors-title">
            <header className="student-tutors-page__header"><h1 id="student-tutors-title">Tutors</h1><p>View and manage your student’s tutors</p></header>
            <nav className="student-tutors-page__tabs" aria-label="Tutor status"><button className={tab === 'Current' ? 'is-active' : ''} type="button" onClick={() => setTab('Current')}>Current</button><button className={tab === 'Past' ? 'is-active' : ''} type="button" onClick={() => setTab('Past')}>Past</button></nav>
            <label className="student-tutors-page__search"><Search size={19} /><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search Tutors" aria-label="Search tutors" /></label>
			{isLoading && <p role="status">Loading tutors…</p>}
			{isError && <p className="student-dashboard__inline-error" role="alert">We couldn’t load tutors. <button type="button" onClick={() => refetch()}>Try again</button></p>}
			{!isLoading && !isError && tutors.length === 0 && <p role="status">No tutors found.</p>}
            <div className="student-tutors-page__grid">{tutors.map((tutor, index) => { const id = Number(tutor.id ?? index); const name = tutor.fullName || [tutor.firstName, tutor.lastName].filter(Boolean).join(' ') || 'Tutor'; return <article className="student-tutor-card" key={id} onClick={() => setSelectedTutor(id)} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedTutor(id) }}>
                <header><h2>{name}</h2><button type="button" aria-label="Tutor options" onClick={(event) => event.stopPropagation()}><MoreVertical size={20} /></button></header>
                <div className="student-tutor-card__subjects"><span>Math</span><span>Eng</span><span>Physics</span></div>
                <img src={teacherAvatar} alt={name} />
                <div className="student-tutor-card__rating"><span>{tutor.rating || '—'}</span>{[1, 2, 3, 4, 5].map(star => <Star key={star} size={17} fill="currentColor" />)}</div>
                <footer><strong>{tutor.lessonsTaught || '—'} lessons taught</strong><button type="button" onClick={(event) => { event.stopPropagation(); setSelectedTutor(id) }}>View</button></footer>
            </article> })}</div>
            {selectedTutor && <TutorProfileModal tutor={tutors.find(tutor => Number(tutor.id) === selectedTutor)} onClose={() => setSelectedTutor(null)} />}
        </section>
    </StudentDashboardLayout>
}
