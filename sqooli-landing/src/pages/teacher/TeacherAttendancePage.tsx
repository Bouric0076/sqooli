import { CalendarDays, Check, ChevronDown, ChevronRight, CircleX, Filter, Search, Users, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import TeacherDashboardLayout from './TeacherDashboardLayout'
import speaker from '../../assets/images/student-flow/speaker.svg'
import teacherAvatar from '../../assets/images/whats-popular/teacher.webp'
import '../../styles/pages/teacher-attendance.css'

type AttendanceStatus = 'present' | 'absent' | 'empty'
type AttendanceCell = { student: string; day: number; status: AttendanceStatus }
const students = ['Lucy Juma', 'Jason Juma', 'Jason Juma', 'Jason Juma', 'Jason Juma', 'Jason Juma', 'Jason Juma']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const cells: AttendanceCell[] = students.flatMap(student => Array.from({ length: 21 }, (_, index) => ({ student, day: index + 1, status: (index > 9 ? 'empty' : index === 3 ? 'absent' : 'present') as AttendanceStatus })))

export default function TeacherAttendancePage() {
    const [query, setQuery] = useState('')
    const [year, setYear] = useState('2025')
    const [month, setMonth] = useState('Mar')
    const [tutor, setTutor] = useState('Jane Doe')
    const [curriculum, setCurriculum] = useState('CBC')
    const [subject, setSubject] = useState('Mathematics')
    const [selected, setSelected] = useState<AttendanceCell | null>(null)
    const visibleStudents = useMemo(() => students.filter(student => student.toLowerCase().includes(query.toLowerCase())), [query])
    return <TeacherDashboardLayout activePath="/teacher/attendance">
        <section className="teacher-attendance-page" aria-labelledby="teacher-attendance-title"><div className="teacher-attendance-page__layout"><AccountRail /><div className="teacher-attendance-page__content">
            <header className="teacher-attendance-page__header"><div><h1 id="teacher-attendance-title">Attendance</h1><p>Manage Tutors attendance calendar</p></div></header>
            <div className="teacher-attendance-page__filters"><label className="teacher-attendance-page__search"><Search size={19} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search" aria-label="Search students" /><Filter size={18} /></label><Select label="Tutor" value={tutor} options={['Jane Doe', 'John Kamau']} onChange={setTutor} /><Select label="Curriculum" value={curriculum} options={['CBC', '8-4-4']} onChange={setCurriculum} /><Select label="Subject" value={subject} options={['Mathematics', 'Physics', 'English']} onChange={setSubject} /></div>
            <div className="teacher-attendance-page__date-controls"><b>01 {month} {year} - 7 {month} {year}</b><div className="teacher-attendance-page__months"><label><select value={year} onChange={event => setYear(event.target.value)} aria-label="Attendance year"><option>2025</option><option>2026</option><option>2027</option></select><ChevronDown size={14} /></label>{months.map(item => <button className={month === item ? 'is-active' : ''} type="button" onClick={() => setMonth(item)} key={item}>{item}</button>)}</div></div>
            <AttendanceGrid students={visibleStudents} month={month} onSelect={setSelected} />
        </div></div></section>{selected && <AttendanceModal cell={selected} month={month} year={year} onClose={() => setSelected(null)} />}
    </TeacherDashboardLayout>
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) { return <label className="teacher-attendance-page__select"><span>{label}</span><select value={value} onChange={event => onChange(event.target.value)} aria-label={label}>{options.map(option => <option key={option}>{option}</option>)}</select><ChevronDown size={14} /></label> }
function AccountRail() { return <aside className="teacher-attendance-page__account"><div className="teacher-attendance-page__school-mark"><CalendarDays size={27} /></div><h2>Mathematic Excellence<br />Academy</h2><span className="teacher-attendance-page__school-tag">Online School</span><p>Contact Information</p><strong>+254712 345 678</strong><strong>mathematicexcel@gmail.com</strong><button type="button">Switch Account</button><div className="teacher-attendance-page__referral"><img src={speaker} alt="" /><div><b>Refer &amp; Earn with Sqooli</b><small>Share your unique link to students &amp; parents to join Sqooli</small><button type="button">Copy Link</button></div></div></aside> }
function AttendanceGrid({ students: visibleStudents, month, onSelect }: { students: string[]; month: string; onSelect: (cell: AttendanceCell) => void }) { return <div className="teacher-attendance-page__grid-scroll"><div className="teacher-attendance-page__grid"><div className="teacher-attendance-page__grid-corner" />{Array.from({ length: 21 }, (_, index) => <b className={index === 10 ? 'is-today' : ''} key={index}><span>{index + 1}</span><small>{month}</small></b>)}{visibleStudents.map((student, rowIndex) => <div className="teacher-attendance-page__row" key={`${student}-${rowIndex}`}><span className="teacher-attendance-page__student"><img src={teacherAvatar} alt="" /><b>{student}</b></span>{Array.from({ length: 21 }, (_, dayIndex) => { const cell = cells.find(item => item.student === student && item.day === dayIndex + 1 && (students.indexOf(item.student) === rowIndex || student !== 'Jason Juma')); return <button className={`teacher-attendance-page__status is-${cell?.status ?? 'empty'}`} type="button" aria-label={`${student}, ${dayIndex + 1} ${month}: ${cell?.status ?? 'empty'}`} onClick={() => cell && onSelect(cell)} key={dayIndex}>{cell?.status === 'present' ? <Check size={14} /> : cell?.status === 'absent' ? <CircleX size={14} /> : null}</button> })}</div>)}</div></div> }
function AttendanceModal({ cell, month, year, onClose }: { cell: AttendanceCell; month: string; year: string; onClose: () => void }) { const present = cell.status === 'present'; return <div className="teacher-attendance-modal__backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}><section className="teacher-attendance-modal" role="dialog" aria-modal="true" aria-labelledby="attendance-modal-title"><header><div><Users size={16} /> Attendance <ChevronRight size={15} /><b>{cell.student}</b></div><button type="button" aria-label="Close attendance details" onClick={onClose}><X size={20} /></button></header><div className="teacher-attendance-modal__body"><h2 id="attendance-modal-title">Attendance Details</h2><p className="teacher-attendance-modal__date"><CalendarDays size={17} /> {cell.day} {month} {year}</p><div className={`teacher-attendance-modal__status is-${cell.status}`}>{present ? <Check size={18} /> : <CircleX size={18} />} {present ? 'Present' : cell.status === 'absent' ? 'Absent' : 'Not recorded'}</div><p>Attendance status for {cell.student} in {month} {year}.</p><button className="is-primary" type="button" onClick={onClose}>Close</button></div></section></div> }
