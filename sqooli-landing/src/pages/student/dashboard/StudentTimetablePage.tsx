import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Clock3, FileText, Filter, X } from 'lucide-react'
import { useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import '../../../styles/pages/student-timetable.css'

type TimetableEvent = { day: number; kind: 'lesson' | 'exam' | 'event'; label: string; time: string }

const events: TimetableEvent[] = [
    { day: 30, kind: 'event', label: '11.00 AM PTO Grade 3', time: 'Mon, 30 Jan 2023 11.00 AM' },
    { day: 1, kind: 'exam', label: 'Grade 3 Parent-Teacher', time: 'Wed, 1 Feb 2023 8.00 AM' },
    { day: 1, kind: 'lesson', label: '2.30 PM Chemistry Assignment', time: 'Wed, 1 Feb 2023 2.30 PM' },
    { day: 14, kind: 'event', label: '8.30 AM Grade 3 Parent', time: 'Tue, 14 Feb 2023 8.30 AM' },
    { day: 17, kind: 'exam', label: 'Grade 3 Parent-Teacher', time: 'Fri, 17 Feb 2023 8.00 AM' },
    { day: 17, kind: 'lesson', label: '8.30 AM Chemistry Assignment', time: 'Fri, 17 Feb 2023 8.30 AM' },
]

export default function StudentTimetablePage() {
    const [selectedEvent, setSelectedEvent] = useState<TimetableEvent | null>(null)
    const [eventDetailsOpen, setEventDetailsOpen] = useState(false)
    const days = [30, 31, ...Array.from({ length: 28 }, (_, index) => index + 1)]
    return <StudentDashboardLayout activePath="/student/timetable" variant="complete">
        <section className="student-timetable-page" aria-labelledby="student-timetable-title">
            <header className="student-timetable-page__header"><div><h1 id="student-timetable-title">Timetable</h1><p>Manage student timetable and upcoming Timetable</p></div><span>Timezone: <a href="#timezone">GMT+03</a></span></header>
            <div className="student-timetable-page__workspace">
                <aside className="student-timetable-page__sidebar"><div className="student-timetable-page__mini-header"><button type="button" aria-label="Previous month"><ChevronLeft size={15} /></button><strong>February 2023</strong><button type="button" aria-label="Next month"><ChevronRight size={15} /></button></div><div className="student-timetable-page__mini-weekdays">{['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => <b key={day}>{day}</b>)}</div><div className="student-timetable-page__mini-grid">{Array.from({ length: 35 }, (_, index) => <span className={index === 19 ? 'is-today' : ''} key={index}>{(index + 30) % 31 + 1}</span>)}</div><h2>Key</h2><p><i className="is-lesson" /> Lesson</p><p><i className="is-exam" /> Exam</p><p><i className="is-event" /> School Event</p></aside>
                <div className="student-timetable-page__calendar"><header><h2>February 2023</h2><div><button type="button"><Filter size={14} /> Add filters</button><button type="button">Month <ChevronDown size={14} /></button></div></header><div className="student-timetable-page__weekdays">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <b key={day}>{day}</b>)}</div><div className="student-timetable-page__month-grid">{days.map(day => <div className="student-timetable-page__day" key={day}><small>{day}</small>{events.filter(event => event.day === day).map(event => <button type="button" className={`student-timetable-page__event is-${event.kind}`} onClick={() => setSelectedEvent(event)} key={`${event.kind}-${event.label}`}><span>{event.label}</span></button>)}</div>)}</div></div>
            </div>
            {selectedEvent && <div className="student-timetable-page__popover" role="dialog" aria-label="Timetable event"><button type="button" aria-label="Close event details" onClick={() => setSelectedEvent(null)}><X size={15} /></button><h2>Open {selectedEvent.label.replace(/^\d+\.\d+\sAM\s/, '')}</h2><p><Clock3 size={13} /> {selectedEvent.time}</p><p><FileText size={13} /> Please Note of Upcoming {selectedEvent.label}</p><button type="button" onClick={() => setEventDetailsOpen(true)}>View Details <ChevronRight size={13} /></button></div>}
            {selectedEvent && eventDetailsOpen && <div className="student-timetable-page__details-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setEventDetailsOpen(false) }}><section className="student-timetable-page__details-modal" role="dialog" aria-modal="true" aria-labelledby="calendar-event-title"><header><span><CalendarDays size={16} /> Calendar</span><button type="button" aria-label="Close calendar details" onClick={() => setEventDetailsOpen(false)}><X size={22} /></button></header><h2 id="calendar-event-title">Open {selectedEvent.label.replace(/^\d+\.\d+\sAM\s/, '')}</h2><p><Clock3 size={18} /> {selectedEvent.time}</p><p><FileText size={18} /> Please Note Of Upcoming {selectedEvent.label} For Grade 3 Students</p><button className="student-timetable-page__details-okay" type="button" onClick={() => setEventDetailsOpen(false)}>Okay</button></section></div>}
        </section>
    </StudentDashboardLayout>
}
