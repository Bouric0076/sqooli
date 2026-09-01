import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { CalendarDays, CheckCircle2, Edit3, GraduationCap, Mail, MapPin, Phone, School, UserRound } from 'lucide-react'
import StudentDashboardLayout from './StudentDashboardLayout'
import StudentProfileModal from './StudentProfileModal'
import EditStudentProfileModal from './EditStudentProfileModal'
import { getMyEnrollments } from '../../../api/student'
import { getCurrentUser } from '../../../auth/auth.service'
import { updateUser } from '../../../auth/auth.slice'
import { useAppDispatch, useAppSelector } from '../../../store'
import '../../../styles/pages/student-profile.css'

type RecordValue = Record<string, unknown>

export default function StudentProfilePage() {
	const user = useAppSelector((state) => state.auth.user)
	const dispatch = useAppDispatch()
	const [profile, setProfile] = useState(user)
	const [enrollment, setEnrollment] = useState<RecordValue | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [isStudentInfoEditing, setIsStudentInfoEditing] = useState(false)

	useEffect(() => {
		let active = true
		Promise.all([user ? getCurrentUser(user) : Promise.resolve(user), getMyEnrollments()]).then(([refreshed, enrollments]) => {
			if (!active) return
			if (refreshed) { setProfile(refreshed); dispatch(updateUser(refreshed)) }
			setEnrollment(findFirstRecord(enrollments))
		}).catch(() => {})
		return () => { active = false }
	}, [dispatch, user])

	const displayName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || profile?.email || 'Student'
	const enrollmentDetails = useMemo(() => getEnrollmentDetails(enrollment), [enrollment])

	return <StudentDashboardLayout activePath="/student/profile">
		<section className="student-profile-page student-profile-page--surface" aria-labelledby="student-profile-page-title">
			<header className="student-profile-page__intro"><div><p className="student-profile-page__eyebrow">My account</p><h1 id="student-profile-page-title">Student profile</h1><p>Manage your personal details and learning preferences in one place.</p></div><button className="student-profile-page__edit" type="button" onClick={() => setIsEditing(true)}><Edit3 size={16} /> Edit profile</button></header>
			<section className="student-profile-page__hero"><div className="student-profile-page__avatar">{displayName.slice(0, 1).toUpperCase()}</div><div className="student-profile-page__identity"><h2>{displayName}</h2><p>{profile?.email || 'Email unavailable'}</p><span><GraduationCap size={15} /> Student account</span></div><div className={`student-profile-page__status${profile?.isProfileComplete ? ' is-complete' : ''}`}><CheckCircle2 size={17} /><div><strong>{profile?.isProfileComplete ? 'Profile complete' : 'Profile in progress'}</strong><small>{profile?.isProfileComplete ? 'Your learning profile is ready.' : 'Add your academic details to personalize Sqooli.'}</small></div></div></section>
			<div className="student-profile-page__grid">
				<ProfileSection title="Personal details" icon={<UserRound size={18} />} action="Edit details" onAction={() => setIsEditing(true)}><div className="student-profile-page__details"><Detail label="First name" value={profile?.firstName} /><Detail label="Last name" value={profile?.lastName} /><Detail label="Phone number" value={profile?.phone} icon={<Phone size={14} />} /><Detail label="Date of birth" value={formatDate(profile?.dob)} icon={<CalendarDays size={14} />} /><Detail label="Gender" value={profile?.gender} /><Detail label="Address" value={profile?.address} icon={<MapPin size={14} />} /></div></ProfileSection>
				<ProfileSection title="Account information" icon={<Mail size={18} />}><div className="student-profile-page__details"><Detail label="Email address" value={profile?.email} /><Detail label="Referral code" value={readText(profile?.referralCode)} /><Detail label="Account role" value={readText(profile?.userRole) || 'Student'} /><Detail label="Verification" value={profile?.isEmailConfirmed ? 'Email verified' : 'Email verification pending'} /></div></ProfileSection>
				<ProfileSection title="Learning profile" icon={<GraduationCap size={18} />} action="Update learning details" onAction={() => setIsStudentInfoEditing(true)}><div className="student-profile-page__details"><Detail label="Current school" value={enrollmentDetails.school} icon={<School size={14} />} /><Detail label="Curriculum" value={enrollmentDetails.curriculum} /><Detail label="Education level" value={enrollmentDetails.educationLevel} /><Detail label="Grade level" value={enrollmentDetails.grade} /></div><div className="student-profile-page__chips"><span className="student-profile-page__detail-label">Subjects</span><div>{enrollmentDetails.subjects.length ? enrollmentDetails.subjects.map((subject) => <b key={subject}>{subject}</b>) : <small>No subjects selected yet.</small>}</div></div></ProfileSection>
				<ProfileSection title="Learning preferences" icon={<CheckCircle2 size={18} />} action="Edit preferences" onAction={() => setIsStudentInfoEditing(true)}><div className="student-profile-page__preference"><span>Student type</span><strong>Day Scholar</strong></div><div className="student-profile-page__chips"><span className="student-profile-page__detail-label">Interests</span><div><b>Social Studies</b><small>Manage interests in Student information.</small></div></div></ProfileSection>
			</div>
		</section>
		{isEditing && <EditStudentProfileModal onClose={() => setIsEditing(false)} onSaved={(updated) => { setProfile(updated); setIsEditing(false) }} />}
		{isStudentInfoEditing && <StudentProfileModal onClose={() => setIsStudentInfoEditing(false)} onSaved={(updated) => { if (updated) { setProfile(updated); dispatch(updateUser(updated)) }; setIsStudentInfoEditing(false) }} />}
	</StudentDashboardLayout>
}

function ProfileSection({ title, icon, action, onAction, children }: { title: string; icon: ReactNode; action?: string; onAction?: () => void; children: ReactNode }) { return <section className="student-profile-page__section"><header><span className="student-profile-page__section-title">{icon}<h2>{title}</h2></span>{action && <button type="button" onClick={onAction}>{action}</button>}</header>{children}</section> }
function Detail({ label, value, icon }: { label: string; value?: string | null; icon?: ReactNode }) { return <div className="student-profile-page__detail"><span>{label}</span><strong>{icon}{value || 'Not provided'}</strong></div> }
function readText(value: unknown) { return typeof value === 'string' || typeof value === 'number' ? String(value) : '' }
function formatDate(value: string | null | undefined) { if (!value) return null; const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' }) }
function findFirstRecord(payload: unknown): RecordValue | null { if (Array.isArray(payload)) return (payload[0] as RecordValue) || null; if (!payload || typeof payload !== 'object') return null; const record = payload as RecordValue; for (const key of ['data', 'items', 'results', 'records', 'enrollments']) { const found = findFirstRecord(record[key]); if (found) return found } return record.id || record.curriculum ? record : null }
function getEnrollmentDetails(record: RecordValue | null) { const name = (value: unknown) => value && typeof value === 'object' ? readText((value as RecordValue).name) : readText(value); const subjects = Array.isArray(record?.subjects) ? record.subjects.map(name).filter(Boolean) : []; return { school: name(record?.school) || readText(record?.schoolName) || 'Independent / Online', curriculum: name(record?.curriculum) || readText(record?.curriculumName) || 'Not selected', educationLevel: name(record?.educationLevel) || readText(record?.educationLevelName) || 'Not selected', grade: name(record?.gradeLevel) || readText(record?.gradeName) || 'Not selected', subjects } }
