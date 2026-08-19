import { ArrowRight, Download, EyeOff, Flame, Play, WalletCards } from 'lucide-react'
import StudentDashboardLayout from './StudentDashboardLayout'
import studentsArt from '../../../assets/images/student-flow/students.webp'
import '../../../styles/pages/student-complete.css'

const assignments = [
	{ due: 'Due in 20 mins', meta: '1 Attempt Left  •  120 Min' },
	{ due: 'Due in 2 days', meta: '1 Attempt  •  120 Min' },
	{ due: 'Due in 5 days', meta: '1 Attempt  •  120 Min' },
]

export default function CompletedStudentDashboard() {
	return <StudentDashboardLayout variant="complete">
		<section className="student-complete-page" aria-labelledby="student-complete-title">
			<div className="student-complete-page__content">
				<h1 id="student-complete-title">Welcome back, Lucy</h1>
				<section className="student-complete-page__balance" aria-label="Wallet balance">
					<div className="student-complete-page__balance-card"><span>Available Balance</span><b>KES 23,450.00</b><span>Actual Balance</span><strong>KES 23,450.00</strong><EyeOff className="student-complete-page__balance-icon" size={20} /></div>
					<div className="student-complete-page__withdrawal"><span>Saved Withdrawal Method:</span><p><i>MP</i> 2547******2</p><button type="button" onClick={() => { window.location.href = '/student/wallet?topup=1' }}> <WalletCards size={16} /> Top-up</button></div>
				</section>
				<section className="student-complete-page__learning" aria-labelledby="learning-title">
					<h2 id="learning-title">Continue Learning</h2>
					<div className="student-complete-page__learning-tabs"><button type="button" className="is-active">Upcoming Assignments</button><button type="button">Lessons</button></div>
					<div className="student-complete-page__assignment-list">{assignments.map((assignment, index) => <article className="student-complete-page__assignment" key={assignment.due}><div className="student-complete-page__assignment-art"><img src={studentsArt} alt="" loading="lazy" decoding="async" /><span><Play size={20} fill="currentColor" /></span></div><div className="student-complete-page__assignment-body"><strong>Chemistry Test</strong><small className={index === 0 ? 'is-urgent' : ''}>{assignment.due}</small><p>{assignment.meta}</p><button type="button">Start <ArrowRight size={15} /></button></div></article>)}</div>
				</section>
				<section className="student-complete-page__activity" aria-labelledby="activity-title"><h2 id="activity-title">Activity Feed</h2><article><span className="student-complete-page__activity-avatar">S</span><div><strong>Sqooli <small>5 min ago</small></strong><p>You submitted assignment #123456 successfully</p></div></article></section>
			</div>
			<aside className="student-complete-page__rail"><h2>Student’s Corner</h2><div className="student-complete-page__corner"><div className="student-complete-page__corner-art" /><div><span className="student-complete-page__corner-avatar">L</span><strong>Lucy Atieno</strong><small>Kenyatta Primary School</small><b>Curriculum: 8-4-4</b></div><button type="button">View Profile</button></div><div className="student-complete-page__rail-section"><header><span><Flame size={14} /> Weekly Streak</span><a href="/student">View</a></header><div className="student-complete-page__streak">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => <span className={index < 3 ? 'is-done' : ''} key={day}><small>{day}</small>{index < 3 ? '✓' : 15 + index}</span>)}</div></div><div className="student-complete-page__rail-section"><header><span>TimeTable <small>• Today</small></span><a href="/classes/timetable">View Calendar</a></header>{['Physics Tuition', 'Physics Tuition', 'Physics Tuition'].map((lesson, index) => <div className={`student-complete-page__timetable is-${index}`} key={`${lesson}-${index}`}><b>3.30 PM</b><span><small>Grade 3</small>{lesson}</span></div>)}</div><div className="student-complete-page__rail-section"><header><span>Grade Reports</span></header><div className="student-complete-page__report"><b>First Term 2025</b><small>12 Jan 2024 4.30 PM</small><Download size={16} /></div></div></aside>
		</section>
	</StudentDashboardLayout>
}
