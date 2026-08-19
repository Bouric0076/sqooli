import { ChevronDown, Filter, Search, UserRound } from 'lucide-react'
import StudentDashboardLayout from './StudentDashboardLayout'
import { useState } from 'react'
import '../../../styles/pages/student-lessons.css'

const lessons = [1, 2, 3, 4, 5]

export default function LessonsPage() {
	const [tab, setTab] = useState<'current' | 'past'>(() => new URLSearchParams(window.location.search).get('status') === 'past' ? 'past' : 'current')
	return <StudentDashboardLayout activePath="/student/lessons" variant="complete">
		<section className="student-lessons-page" aria-labelledby="lessons-title">
			<header className="student-lessons-page__header"><div><h1 id="lessons-title">Lessons</h1><p>View and manage your lessons</p></div><div className="student-lessons-page__header-actions"><button type="button" aria-label="Filter lessons"><Filter size={15} /></button><button type="button" aria-label="Sort lessons">Current <ChevronDown size={14} /></button></div></header>
			<nav className="student-lessons-page__tabs" aria-label="Lesson status"><button type="button" className={tab === 'current' ? 'is-active' : ''} onClick={() => setTab('current')}>Current</button><button type="button" className={tab === 'past' ? 'is-active' : ''} onClick={() => setTab('past')}>Past</button></nav>
			<label className="student-lessons-page__search"><Search size={16} /><input type="search" placeholder="Find Lessons" aria-label="Find lessons" /><Filter size={15} /></label>
			<div className="student-lessons-page__grid">{lessons.map(id => { const completed = tab === 'past' && id === 1; return <a className="student-lesson-card" href={`/student/lessons/${id}${completed ? '?status=completed' : ''}`} key={id}><div className="student-lesson-card__title">Algebra I</div><div className="student-lesson-card__tutor"><span><UserRound size={13} /></span><strong>Jane Doe</strong></div><div className="student-lesson-card__progress"><i style={{ width: completed ? '100%' : id === 1 ? '76%' : '68%' }} /></div><div className="student-lesson-card__meta"><small>18/20 Lessons</small><small>{completed ? 'Completed' : '2h left'}</small></div><div className="student-lesson-card__footer"><small>Lecture <b>•</b> 120 Min</small><em>Mathematics</em></div></a> })}</div>
		</section>
	</StudentDashboardLayout>
}
