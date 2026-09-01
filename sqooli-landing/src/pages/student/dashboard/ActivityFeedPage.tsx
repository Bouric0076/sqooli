import { CheckCircle2, Search, Send, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import { useStudentAssessments } from '../../../features/student/student.queries'
import '../../../styles/pages/student-activity.css'

type Activity = { id: string; text: string; date: string; title: string; status: string }

function extractRecords(payload: unknown): Record<string, unknown>[] {
    if (Array.isArray(payload)) return payload.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
    if (!payload || typeof payload !== 'object') return []
    const record = payload as Record<string, unknown>
    for (const key of ['data', 'items', 'results', 'assessments']) {
        if (Array.isArray(record[key])) return extractRecords(record[key])
    }
    return []
}

function submitted(record: Record<string, unknown>) {
    const status = String(record.submissionStatus || record.status || '').toLowerCase()
    return Boolean(record.submittedAt) || ['submitted', 'completed', 'graded', 'passed', 'failed'].some(value => status.includes(value))
}

export default function ActivityFeedPage() {
    const [search, setSearch] = useState('')
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const { data, isLoading, isError, refetch } = useStudentAssessments()
    const activities = useMemo<Activity[]>(() => extractRecords(data).filter(submitted).map((record, index) => {
        const title = String(record.title || record.name || 'Assessment')
        const id = String(record.id ?? index)
        const dateValue = record.submittedAt || record.updatedAt || record.createdAt
        const date = dateValue ? new Date(String(dateValue)) : undefined
        return { id, title, status: String(record.submissionStatus || record.status || 'Submitted'), text: `You submitted ${title} successfully`, date: date && !Number.isNaN(date.getTime()) ? date.toLocaleString() : 'Submission date unavailable' }
    }).filter(activity => `${activity.text} ${activity.title}`.toLowerCase().includes(search.toLowerCase())), [data, search])
    const selected = activities.find(activity => activity.id === selectedId) || activities[0]
    return <StudentDashboardLayout activePath="/student/activity" variant="complete">
        <section className="student-activity-page" aria-labelledby="activity-title">
            <header className="student-activity-page__header"><h1 id="activity-title">Activity Feed</h1><p>Track activity logs of your students</p></header>
            <div className="student-activity-page__workspace">
                <section className="student-activity-page__timeline" aria-label="Activity history">
                    <label className="student-activity-page__search"><Search size={19} /><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search" aria-label="Search activity" /></label>
                    {isLoading && <p role="status">Loading your activity…</p>}{isError && <p role="alert">We couldn’t load activity. <button type="button" onClick={() => refetch()}>Try again</button></p>}{!isLoading && !isError && activities.length === 0 && <p role="status">No submitted activity yet.</p>}
                    <div className="student-activity-page__items">{activities.map((activity, index) => <article className={`student-activity-item${(selected?.id === activity.id || (!selectedId && index === 0)) ? ' is-selected' : ''}`} key={activity.id} onClick={() => setSelectedId(activity.id)}><span className="student-activity-item__avatar"><UserRound size={17} /></span><div><p>Sqooli <span>→</span> {activity.text}</p><small>{activity.date}</small></div><a href="#activity-details" onClick={event => { event.preventDefault(); setSelectedId(activity.id) }}>View</a></article>)}</div>
                </section>
                <section className="student-activity-page__details" id="activity-details" aria-labelledby="activity-details-title">
                    <h2 id="activity-details-title">{selected?.text || 'Activity details'}</h2>
                    {selected && <article className="student-activity-assignment"><div className="student-activity-assignment__art" aria-hidden="true" /><div className="student-activity-assignment__body"><div><strong>{selected.title}</strong><b>{selected.status}</b></div><p>{selected.date}</p><footer><span>Submission recorded</span><button type="button" disabled>View</button></footer></div></article>}
                    <dl className="student-activity-metadata"><div><dt>Assessment</dt><dd>{selected?.title || 'Unavailable'}</dd></div><div><dt>Event</dt><dd>{selected?.status || 'Unavailable'}</dd></div><div><dt>When</dt><dd>{selected?.date || 'Unavailable'}</dd></div></dl>
                    <div className="student-activity-status"><CheckCircle2 size={18} /> Activity recorded successfully</div><button className="student-activity-message" type="button" disabled><Send size={15} /> Messaging unavailable</button>
                </section>
            </div>
        </section>
    </StudentDashboardLayout>
}
