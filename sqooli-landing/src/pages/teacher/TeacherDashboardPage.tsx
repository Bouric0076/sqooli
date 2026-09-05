import { BellRing, CalendarDays, Check, ChevronDown, Clock3, Star, UsersRound } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import TeacherDashboardLayout from './TeacherDashboardLayout'
import { SubmissionsModal } from './TeacherAssignmentsPage'
import TeacherLessonWorkspace from './TeacherLessonWorkspace'
import speaker from '../../assets/images/student-flow/speaker.svg'
import { useTeacherBookings, useTeacherLessons, useTeacherProfile } from '../../features/teacher/teacher.queries'
import { getWalletBalance } from '../../api/wallet'
import '../../styles/pages/teacher-dashboard-home.css'

type RecordValue = Record<string, unknown>

export default function TeacherDashboardPage() {
	const [teachingTab, setTeachingTab] = useState<'assignments' | 'lessons'>('lessons')
	const [submissionsOpen, setSubmissionsOpen] = useState(false)
	const [lessonWorkspaceOpen, setLessonWorkspaceOpen] = useState(false)
	const profile = readDataRecord(useTeacherProfile().data)
	const lessons = readItems(useTeacherLessons({ page: 1, pageSize: 6 }).data)
	const bookings = readItems(useTeacherBookings({ page: 1, pageSize: 6 }).data)
	const wallet = useQuery({ queryKey: ['teacher', 'wallet', 'balance'], queryFn: async () => (await getWalletBalance()).data as unknown })
	const name = stringValue(profile, 'fullName') || 'Teacher'
	const initials = name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase()
	const balance = numberValue(wallet.data, 'balance') ?? 0

	return <TeacherDashboardLayout activePath="/teacher/dashboard"><section className="teacher-home" aria-labelledby="teacher-home-title">
		<div className="teacher-home__account-rail"><div className="teacher-home__school-mark">{initials || 'T'}</div><h2>{name}</h2><span className="teacher-home__school-tag">Teacher account</span><p className="teacher-home__label">Contact Information</p><p>{stringValue(profile, 'phone') || 'Phone not provided'}<br />{stringValue(profile, 'email') || 'Email not provided'}</p><button className="teacher-home__switch" type="button" onClick={() => { window.location.href = '/teacher/settings' }}>Manage profile</button><div className="teacher-home__refer"><img src={speaker} alt="" /><div><strong>Refer &amp; Earn with Sqooli</strong><small>Share your unique link to students &amp; parents to join Sqooli</small><button type="button">Copy Link</button></div></div></div>
		<div className="teacher-home__content"><header className="teacher-home__heading"><div><h1 id="teacher-home-title">Dashboard</h1><p className="teacher-home__muted">Your teaching activity and account summary</p></div><button type="button" aria-label="Date range is not available yet"><CalendarDays size={16} /> Live data <ChevronDown size={15} /></button></header>
		<section className="teacher-home__section"><h2>Continue Teaching</h2><div className="teacher-home__tabs"><button className={teachingTab === 'assignments' ? 'is-active' : ''} type="button" onClick={() => setTeachingTab('assignments')}>Upcoming Assignments</button><button className={teachingTab === 'lessons' ? 'is-active' : ''} type="button" onClick={() => setTeachingTab('lessons')}>Lessons</button></div>{teachingTab === 'assignments' ? <EmptyState title="No assignment submissions yet" detail="Assignment listing is not available from the current API contract." action={() => setSubmissionsOpen(true)} actionLabel="Open submissions" /> : lessons.length > 0 ? <div className="teacher-home__assignment-grid teacher-home__lesson-grid">{lessons.map((lesson, index) => <LessonCard key={recordKey(lesson, index)} lesson={lesson} onContinue={() => setLessonWorkspaceOpen(true)} />)}</div> : <EmptyState title="No lessons yet" detail="Lessons created or assigned to this teacher will appear here." />}</section>
		<section className="teacher-home__earnings"><div className="teacher-home__earnings-title"><span><BellRing size={16} /></span><div><small>Wallet balance</small><strong>{formatCurrency(balance)}</strong><em>{wallet.isLoading ? 'Loading' : wallet.isError ? 'Unavailable' : 'Live balance'}</em></div></div><div className="teacher-home__metrics"><Metric icon={UsersRound} label="Active Students" value="—" /><Metric icon={UsersRound} label="Active Tutors" value="—" /><Metric icon={Check} label="Published Lessons" value={String(lessons.length)} /><Metric icon={Star} label="Avg Teacher Rating" value="—" /></div></section>
		<section className="teacher-home__chart"><div><h2>Earnings</h2><strong>{formatCurrency(balance)}</strong></div><div><h2>Bookings</h2><strong>{bookings.length}</strong></div><EmptyState title="Earnings trend unavailable" detail="The available revenue trend endpoint is platform-level and is not teacher-scoped." /></section><ActivityFeed /></div>
		<aside className="teacher-home__right-rail"><section className="teacher-home__urgent"><h2>Urgent Action Required</h2><EmptyState title="No urgent actions" detail="You are all caught up." /></section><section className="teacher-home__upcoming"><header><h2>Upcoming Activity</h2><a href="/teacher/timetable">View Calendar</a></header>{bookings.length > 0 ? bookings.map((booking, index) => <BookingCard key={recordKey(booking, index)} booking={booking} />) : <EmptyState title="No upcoming bookings" detail="Scheduled lesson bookings will appear here." />}</section></aside>
	</section>{submissionsOpen && <SubmissionsModal onClose={() => setSubmissionsOpen(false)} />}{lessonWorkspaceOpen && <TeacherLessonWorkspace onClose={() => setLessonWorkspaceOpen(false)} />}</TeacherDashboardLayout>
}

function LessonCard({ lesson, onContinue }: { lesson: RecordValue; onContinue: () => void }) { const title = stringValue(lesson, 'name') || stringValue(lesson, 'subject') || 'Untitled lesson'; const subject = nestedString(lesson, 'subject', 'name') || 'Subject not specified'; return <article className="teacher-home__assignment teacher-home__lesson"><div className="teacher-home__lesson-cover" /><div><strong>{title}</strong><small>{subject}</small><small>{stringValue(lesson, 'date') || 'Schedule not set'}</small><button type="button" onClick={onContinue}>Continue</button></div></article> }
function BookingCard({ booking }: { booking: RecordValue }) { return <div className="teacher-home__event event-0"><Clock3 size={15} /><span>{stringValue(booking, 'start') || '—'}</span><small>{stringValue(booking, 'date') || 'Date not set'}<br /><strong>{nestedString(booking, 'lesson', 'name') || 'Booked lesson'}</strong></small></div> }
function EmptyState({ title, detail, action, actionLabel }: { title: string; detail: string; action?: () => void; actionLabel?: string }) { return <div className="teacher-home__empty"><strong>{title}</strong><small>{detail}</small>{action && <button type="button" onClick={action}>{actionLabel}</button>}</div> }
function ActivityFeed() { return <section className="teacher-home__feed"><h2>Activity Feed</h2><EmptyState title="No recent activity" detail="New lesson and booking activity will appear here." /></section> }
function Metric({ icon: Icon, label, value }: { icon: typeof UsersRound; label: string; value: string }) { return <div><Icon size={17} /><small>{label}</small><strong>{value}</strong></div> }
function readItems(payload: unknown): RecordValue[] { if (Array.isArray(payload)) return payload.filter(isRecord); const record = readRecord(payload); if (!record) return []; return readItems(record.data ?? record.items ?? record.results) }
function readRecord(value: unknown): RecordValue | null { return value && typeof value === 'object' && !Array.isArray(value) ? value as RecordValue : null }
function readDataRecord(value: unknown): RecordValue | null { const record = readRecord(value); if (!record) return null; return readRecord(record.data) || record }
function isRecord(value: unknown): value is RecordValue { return Boolean(readRecord(value)) }
function recordKey(value: RecordValue, index: number) { return String(value.id ?? value.lessonId ?? index) }
function stringValue(value: RecordValue | null | undefined, key: string) { const item = value?.[key]; return typeof item === 'string' || typeof item === 'number' ? String(item) : '' }
function nestedString(value: RecordValue, key: string, nestedKey: string) { return stringValue(readRecord(value[key]), nestedKey) || stringValue(value, key) }
function numberValue(value: unknown, key: string) { const record = readRecord(value); const item = record?.[key]; return typeof item === 'number' ? item : typeof item === 'string' && item.trim() ? Number(item) : null }
function formatCurrency(value: number) { return `KES ${value.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` }
