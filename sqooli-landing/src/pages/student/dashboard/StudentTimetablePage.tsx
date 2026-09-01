import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Clock3, FileText, Filter, X } from 'lucide-react'
import { useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import { useLessons, useStudentEnrollments } from '../../../features/student/student.queries'
import '../../../styles/pages/student-timetable.css'
import '../../../styles/pages/student-timetable-overrides.css'

type TimetableEvent = { day: number; kind: 'lesson' | 'exam' | 'event'; label: string; time: string }

type LessonRecord = { id?: number | string; name?: string; start?: string; startTime?: string; scheduledAt?: string; end?: string; subject?: string | { name?: string } }

function records(payload: unknown): Record<string, unknown>[] {
    if (Array.isArray(payload)) return payload.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
    if (!payload || typeof payload !== 'object') return []
    const value = payload as Record<string, unknown>
    for (const key of ['data', 'items', 'results', 'enrollments']) {
        if (Array.isArray(value[key])) return records(value[key])
        if (value[key] && typeof value[key] === 'object') {
            const nested = records(value[key])
            if (nested.length) return nested
        }
    }
    return []
}

function dateValue(lesson: LessonRecord) {
    return lesson.start || lesson.startTime || lesson.scheduledAt
}

function extractEvents(payload: unknown, enrollmentPayload: unknown, month: Date): TimetableEvent[] {
    const enrollments = records(enrollmentPayload)
    const enrolledIds = new Set(enrollments.map(item => {
        const nestedLesson = item.lesson && typeof item.lesson === 'object' ? item.lesson as Record<string, unknown> : undefined
        return String(item.lessonId ?? nestedLesson?.id ?? '')
    }).filter(Boolean))
    return records(payload).filter(item => {
        const lesson = item as LessonRecord
        return enrolledIds.size === 0 || enrolledIds.has(String(lesson.id ?? ''))
    }).flatMap(item => {
        const lesson = item as LessonRecord
        const value = dateValue(lesson)
        if (!value) return []
        const date = new Date(value)
        if (Number.isNaN(date.getTime())) return []
        if (date.getFullYear() !== month.getFullYear() || date.getMonth() !== month.getMonth()) return []
        const subject = typeof lesson.subject === 'string' ? lesson.subject : lesson.subject?.name
        return [{ day: date.getDate(), kind: 'lesson' as const, label: `${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} ${lesson.name || subject || 'Lesson'}`, time: date.toLocaleString() }]
    })
}

export default function StudentTimetablePage() {
    const [selectedEvent, setSelectedEvent] = useState<TimetableEvent | null>(null)
    const [eventDetailsOpen, setEventDetailsOpen] = useState(false)
    const [viewDate, setViewDate] = useState(() => new Date())
    const [filterOpen, setFilterOpen] = useState(false)
    const [monthMenuOpen, setMonthMenuOpen] = useState(false)
    const [eventFilter, setEventFilter] = useState<'all' | TimetableEvent['kind']>('all')
    const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
    const { data: lessons, isLoading: lessonsLoading, isError: lessonsError, refetch: refetchLessons } = useLessons({ page: 1, pageSize: 100 })
    const { data: enrollments, isLoading: enrollmentsLoading, isError: enrollmentsError, refetch: refetchEnrollments } = useStudentEnrollments()
    const today = new Date()
    const monthName = viewDate.toLocaleString(undefined, { month: 'long' })
    const days = Array.from({ length: new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate() }, (_, index) => index + 1)
    const weekStart = new Date(viewDate)
    weekStart.setDate(viewDate.getDate() - ((viewDate.getDay() + 6) % 7))
    const viewDays = viewMode === 'month' ? days : viewMode === 'day' ? [viewDate.getDate()] : Array.from({ length: 7 }, (_, index) => { const date = new Date(weekStart); date.setDate(weekStart.getDate() + index); return date.getDate() })
    const events = extractEvents(lessons, enrollments, viewDate).filter(event => eventFilter === 'all' || event.kind === eventFilter)
    const isLoading = lessonsLoading || enrollmentsLoading
    const isError = lessonsError || enrollmentsError
    const hasNoSchedule = !isLoading && !isError && events.length === 0
    return <StudentDashboardLayout activePath="/student/timetable" variant="complete">
        <section className="student-timetable-page" aria-labelledby="student-timetable-title">
            <header className="student-timetable-page__header"><div><h1 id="student-timetable-title">Timetable</h1><p>Manage student timetable and upcoming Timetable</p></div><span>Timezone: <a href="#timezone">GMT+03</a></span></header>
            <div className="student-timetable-page__workspace">
                <aside className="student-timetable-page__sidebar"><div className="student-timetable-page__mini-header"><button type="button" aria-label="Previous month" onClick={() => setViewDate(current => new Date(current.getFullYear(), current.getMonth() - 1, 1))}><ChevronLeft size={15} /></button><strong>{monthName} {viewDate.getFullYear()}</strong><button type="button" aria-label="Next month" onClick={() => setViewDate(current => new Date(current.getFullYear(), current.getMonth() + 1, 1))}><ChevronRight size={15} /></button></div><div className="student-timetable-page__mini-weekdays">{['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => <b key={day}>{day}</b>)}</div><div className="student-timetable-page__mini-grid">{days.slice(0, 35).map(day => <span className={viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() === today.getMonth() && day === today.getDate() ? 'is-today' : ''} key={day}>{day}</span>)}</div><h2>Key</h2><p><i className="is-lesson" /> Lesson</p><p><i className="is-exam" /> Exam</p><p><i className="is-event" /> School Event</p></aside>
                <div className="student-timetable-page__calendar"><header><h2>{monthName} {viewDate.getFullYear()}</h2><div className="student-timetable-page__calendar-actions"><button type="button" onClick={() => setFilterOpen(value => !value)} aria-expanded={filterOpen}><Filter size={14} /> {eventFilter === "all" ? "Add filters" : "Showing " + eventFilter + "s"}</button>{filterOpen && <div className="student-timetable-page__filter-menu" role="menu">{(["all", "lesson", "exam", "event"] as const).map(filter => <button type="button" className={eventFilter === filter ? "is-active" : ""} onClick={() => { setEventFilter(filter); setFilterOpen(false) }} key={filter}>{filter === "all" ? "All events" : filter[0].toUpperCase() + filter.slice(1) + "s"}</button>)}</div>}<button type="button" onClick={() => setMonthMenuOpen(value => !value)} aria-expanded={monthMenuOpen}>Month <ChevronDown size={14} /></button>{monthMenuOpen && <div className="student-timetable-page__filter-menu" role="menu"><button type="button" className={viewMode === "month" ? "is-active" : ""} onClick={() => { setViewMode("month"); setMonthMenuOpen(false) }}>Month view</button><button type="button" className={viewMode === "week" ? "is-active" : ""} onClick={() => { setViewMode("week"); setMonthMenuOpen(false) }}>Week view</button><button type="button" className={viewMode === "day" ? "is-active" : ""} onClick={() => { setViewMode("day"); setMonthMenuOpen(false) }}>Day view</button><button type="button" onClick={() => { setViewDate(new Date()); setViewMode("month"); setMonthMenuOpen(false) }}>Go to today</button></div>}</div></header>{isLoading && <p className="student-dashboard__page-state" role="status">Loading your timetable…</p>}{isError && <p className="student-dashboard__inline-error" role="alert">We couldn’t load your timetable. <button type="button" onClick={() => { void refetchLessons(); void refetchEnrollments() }}>Try again</button></p>}{hasNoSchedule && <p className="student-dashboard__page-state" role="status">No scheduled lessons found for this month.</p>}{!isLoading && !isError && !hasNoSchedule && <><div className="student-timetable-page__weekdays">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <b key={day}>{day}</b>)}</div><div className={`student-timetable-page__month-grid is-${viewMode}`}>{viewDays.map(day => <div className="student-timetable-page__day" key={day}><small>{day}</small>{events.filter(event => event.day === day).map(event => <button type="button" className={`student-timetable-page__event is-${event.kind}`} onClick={() => setSelectedEvent(event)} key={`${event.kind}-${event.label}`}><span>{event.label}</span></button>)}</div>)}</div></>}</div>
            </div>
            {selectedEvent && <div className="student-timetable-page__popover" role="dialog" aria-label="Timetable event"><button type="button" aria-label="Close event details" onClick={() => setSelectedEvent(null)}><X size={15} /></button><h2>Open {selectedEvent.label.replace(/^\d+\.\d+\sAM\s/, '')}</h2><p><Clock3 size={13} /> {selectedEvent.time}</p><p><FileText size={13} /> Please Note of Upcoming {selectedEvent.label}</p><button type="button" onClick={() => setEventDetailsOpen(true)}>View Details <ChevronRight size={13} /></button></div>}
            {selectedEvent && eventDetailsOpen && <div className="student-timetable-page__details-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setEventDetailsOpen(false) }}><section className="student-timetable-page__details-modal" role="dialog" aria-modal="true" aria-labelledby="calendar-event-title"><header><span><CalendarDays size={16} /> Calendar</span><button type="button" aria-label="Close calendar details" onClick={() => setEventDetailsOpen(false)}><X size={22} /></button></header><h2 id="calendar-event-title">Open {selectedEvent.label.replace(/^\d+\.\d+\sAM\s/, '')}</h2><p><Clock3 size={18} /> {selectedEvent.time}</p><p><FileText size={18} /> Please Note Of Upcoming {selectedEvent.label} For Grade 3 Students</p><button className="student-timetable-page__details-okay" type="button" onClick={() => setEventDetailsOpen(false)}>Okay</button></section></div>}
        </section>
    </StudentDashboardLayout>
}
