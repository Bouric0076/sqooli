import { CheckCircle2, Search, Send, UserRound } from 'lucide-react'
import StudentDashboardLayout from './StudentDashboardLayout'
import '../../../styles/pages/student-activity.css'

const activities = [
    { type: 'submission', text: 'You submitted assignment #123456 successfully', date: '22 Jan 2024 at 9:34:12 PM' },
    { name: 'John Juma', text: 'Downloaded Report #123456', date: '22 Jan 2024 at 9:34:12 PM' },
    { name: 'Peter Okumu', text: 'send a message', date: '22 Jan 2024 at 9:34:12 PM' },
    { name: 'Peter Okumu', text: 'send a message', date: '22 Jan 2024 at 9:34:12 PM' },
    { name: 'Peter Okumu', text: 'send a message', date: '22 Jan 2024 at 9:34:12 PM' },
]

export default function ActivityFeedPage() {
    return <StudentDashboardLayout activePath="/student/activity" variant="complete">
        <section className="student-activity-page" aria-labelledby="activity-title">
            <header className="student-activity-page__header"><h1 id="activity-title">Activity Feed</h1><p>Track activity logs of your students</p></header>
            <div className="student-activity-page__workspace">
                <section className="student-activity-page__timeline" aria-label="Activity history">
                    <label className="student-activity-page__search"><Search size={19} /><input type="search" placeholder="Search" aria-label="Search activity" /></label>
                    <div className="student-activity-page__items">{activities.map((activity, index) => <article className={`student-activity-item${index === 0 ? ' is-selected' : ''}`} key={`${activity.text}-${index}`}><span className="student-activity-item__avatar">{activity.name ? <UserRound size={17} /> : 'S'}</span><div><p>{activity.name ? <><strong>{activity.name}</strong> {activity.text}</> : <>Sqooli <span>→</span> {activity.text}</>}</p><small>{activity.date}</small></div>{activity.name && <a href="#activity-details">View</a>}</article>)}</div>
                </section>
                <section className="student-activity-page__details" id="activity-details" aria-labelledby="activity-details-title">
                    <h2 id="activity-details-title">You submitted assignment #123456 successfully</h2>
                    <article className="student-activity-assignment"><div className="student-activity-assignment__art" aria-hidden="true" /><div className="student-activity-assignment__body"><div><strong>Chemistry Test</strong><b>Submitted</b></div><p>Due in <em>20 min</em></p><footer><span>1 Attempt Left <i /> 120 Min</span><button type="button">View</button></footer></div></article>
                    <dl className="student-activity-metadata"><div><dt>Public ID</dt><dd>#123456</dd></div><div><dt>Event</dt><dd>Log in</dd></div><div><dt>Entity</dt><dd>Patricia Akinyi</dd></div><div><dt>When</dt><dd>12th Jan 2024</dd></div><div><dt>What changed</dt><dd>----</dd></div></dl>
                    <div className="student-activity-status"><CheckCircle2 size={18} /> Activity recorded successfully</div><button className="student-activity-message" type="button"><Send size={15} /> Send a message</button>
                </section>
            </div>
        </section>
    </StudentDashboardLayout>
}
