import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import logo from '../../assets/images/student-flow/sqooli-logo-v2.svg'
import { completeRegistration, type RegistrationRole } from '../../api/account'
import { getCertificateLevels, getCurricula, getEducationLevels, getGradeLevels, getSubjects, type CatalogItem } from '../../api/catalogs'
import { getCurrentUser } from '../../auth/auth.service'
import { getPostAuthPath, hasAssignedDashboard } from '../../auth/dashboard-routing'
import { updateUser } from '../../auth/auth.slice'
import { showError } from '../../lib/notifications'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from '../../store'
import '../../styles/pages/auth.css'

type PendingRegistration = { firstName: string; lastName: string; email: string; phone?: string; role?: RegistrationRole }

export default function RegistrationCompletionPage() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const currentUser = useAppSelector((state) => state.auth.user)
	const dispatch = useAppDispatch()
	const pending = readPendingRegistration()
	const [firstName] = useState(searchParams.get('firstName') ?? pending?.firstName ?? currentUser?.firstName ?? '')
	const [lastName] = useState(searchParams.get('lastName') ?? pending?.lastName ?? currentUser?.lastName ?? '')
	const [email] = useState(searchParams.get('email') ?? pending?.email ?? currentUser?.email ?? '')
	const [phone, setPhone] = useState(pending?.phone ?? currentUser?.phone ?? '')
	const [gender, setGender] = useState(normalizeGender(currentUser?.gender))
	const [dob, setDob] = useState(currentUser?.dob ?? '')
	const [address, setAddress] = useState(currentUser?.address ?? '')
	const [role, setRole] = useState<RegistrationRole | ''>(normalizeRole(searchParams.get('role')) ?? pending?.role ?? roleFromUser(currentUser) ?? '')
	const [teacherStep, setTeacherStep] = useState<1 | 2>(1)
	const [certificateLevelId, setCertificateLevelId] = useState('')
	const [curriculumId, setCurriculumId] = useState('')
	const [educationLevelId, setEducationLevelId] = useState('')
	const [gradeLevelId, setGradeLevelId] = useState('')
	const [subjectIds, setSubjectIds] = useState<string[]>([])
	const [subjectSearch, setSubjectSearch] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const isTeacher = role === 'Teacher'
	const certificates = useQuery({ queryKey: ['registration', 'certificates'], queryFn: async () => extractItems((await getCertificateLevels({ page: 1, pageSize: 100 })).data), enabled: isTeacher })
	const curricula = useQuery({ queryKey: ['registration', 'curricula'], queryFn: async () => extractItems((await getCurricula({ page: 1, pageSize: 100 })).data), enabled: isTeacher })
	const educationLevels = useQuery({ queryKey: ['registration', 'education-levels', curriculumId], queryFn: async () => extractItems((await getEducationLevels({ page: 1, pageSize: 100, curriculumId })).data), enabled: isTeacher && Boolean(curriculumId) })
	const gradeLevels = useQuery({ queryKey: ['registration', 'grade-levels', educationLevelId], queryFn: async () => extractItems((await getGradeLevels({ page: 1, pageSize: 100, educationLevelId })).data), enabled: isTeacher && Boolean(educationLevelId) })
	const subjects = useQuery({ queryKey: ['registration', 'subjects', curriculumId, educationLevelId, gradeLevelId, subjectSearch], queryFn: async () => extractItems((await getSubjects({ page: 1, pageSize: 100, curriculumId, educationLevelId, gradeLevelId, search: subjectSearch.trim() || undefined })).data), enabled: isTeacher && Boolean(curriculumId && educationLevelId && gradeLevelId) })

	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!email.trim() || !role || !gender || !dob || !address.trim()) {
			toast.error(!role ? 'Choose your Sqooli profile before continuing.' : !gender ? 'Select your gender before continuing.' : 'Complete your date of birth and address before continuing.')
			return
		}
		if (isTeacher && teacherStep === 1) {
			setTeacherStep(2)
			window.scrollTo({ top: 0, behavior: 'smooth' })
			return
		}
		if (isTeacher && (!certificateLevelId || !curriculumId || !educationLevelId || !gradeLevelId || subjectIds.length === 0)) {
			toast.error('Choose your certificate level, curriculum, education level, grade, and subject before continuing.')
			return
		}
		setIsSubmitting(true)
		try {
			await completeRegistration({ email, role: role as RegistrationRole, firstName: firstName || undefined, lastName: lastName || undefined, phone: phone.trim(), gender, dob, address: address.trim(), ...(isTeacher ? { certificateLevelId, teacherEnrollments: [{ curriculumId, gradeLevelId, schoolId: null, subjectIds }] } : {}) })
			const refreshedUser = await getCurrentUser(currentUser ?? undefined)
			dispatch(updateUser(refreshedUser))
			window.localStorage.removeItem('sqooli-pending-registration')
			if (!hasAssignedDashboard(refreshedUser)) { toast.error('Your profile was saved, but Sqooli has not assigned a dashboard yet.'); return }
			toast.success(refreshedUser.isProfileComplete === true ? 'Your Sqooli profile is ready.' : 'Your profile is saved. You can finish setup from your dashboard.')
			navigate(getPostAuthPath(refreshedUser), { replace: true })
		} catch (error) { showError(error, 'We could not complete your registration. Please review your details and try again.') } finally { setIsSubmitting(false) }
	}

	const resetRole = (nextRole: string) => { setRole(nextRole as RegistrationRole | ''); setTeacherStep(1); setCertificateLevelId(''); setCurriculumId(''); setEducationLevelId(''); setGradeLevelId(''); setSubjectIds([]); setSubjectSearch('') }
	const showBasics = !isTeacher || teacherStep === 1
	return <main className="student-account student-account--completion" aria-labelledby="completion-title"><section className="student-account__form-panel"><a className="student-onboarding__logo-link" href="/" aria-label="Return to Sqooli home"><img className="student-onboarding__logo" src={logo} alt="Sqooli" /></a><div className="student-account__progress" aria-label={isTeacher ? `Teacher registration step ${teacherStep} of 2` : undefined}>{isTeacher && <><span className={teacherStep === 1 ? 'is-active' : 'is-complete'}>1 <b>Profile</b></span><i /><span className={teacherStep === 2 ? 'is-active' : ''}>2 <b>Teacher details</b></span></>}</div><header className="student-account__intro"><p className="student-account__eyebrow">{isTeacher ? `Step ${teacherStep} of 2` : 'Profile setup'}</p><h1 id="completion-title">{isTeacher && teacherStep === 2 ? 'Tell us about your teaching' : 'Complete your registration'}</h1><p>{isTeacher && teacherStep === 2 ? 'Add your qualifications and the subjects you teach.' : 'Your email is verified. Confirm your Sqooli profile and remaining details to continue.'}</p></header><div className="student-account__completion-summary"><strong>{firstName && lastName ? `${firstName} ${lastName}` : 'Your registration details'}</strong><span>{email || 'Email captured during registration'}</span></div><form className="student-account__form" onSubmit={submit} noValidate>{showBasics && <><label htmlFor="completion-role">Choose your Sqooli profile</label><select id="completion-role" value={role} onChange={(event) => resetRole(event.target.value)} required><option value="">Select your profile</option><option value="Student">Student</option><option value="Teacher">Teacher</option><option value="Parent">Parent</option><option value="School">School</option></select><div className="student-account__completion-grid"><div><label htmlFor="completion-gender">Gender</label><select id="completion-gender" value={gender} onChange={(event) => setGender(event.target.value)} required><option value="">Select gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div><div><label htmlFor="completion-dob">Date of birth</label><input id="completion-dob" type="date" value={dob} onChange={(event) => setDob(event.target.value)} max={new Date().toISOString().slice(0, 10)} required /></div></div><label htmlFor="completion-address">Address</label><input id="completion-address" type="text" value={address} onChange={(event) => setAddress(event.target.value)} autoComplete="street-address" required /><label htmlFor="completion-phone">Phone Number <span>(optional)</span></label><input id="completion-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" /></>}{isTeacher && teacherStep === 2 && <><TeacherRegistrationFields certificates={certificates.data ?? []} curricula={curricula.data ?? []} educationLevels={educationLevels.data ?? []} gradeLevels={gradeLevels.data ?? []} subjects={subjects.data ?? []} values={{ certificateLevelId, curriculumId, educationLevelId, gradeLevelId, subjectIds, subjectSearch }} onChange={{ setCertificateLevelId, setCurriculumId: (value) => { setCurriculumId(value); setEducationLevelId(''); setGradeLevelId(''); setSubjectIds([]); setSubjectSearch('') }, setEducationLevelId: (value) => { setEducationLevelId(value); setGradeLevelId(''); setSubjectIds([]); setSubjectSearch('') }, setGradeLevelId: (value) => { setGradeLevelId(value); setSubjectIds([]); setSubjectSearch('') }, setSubjectIds, setSubjectSearch }} /></>}{isTeacher && [certificates, curricula, educationLevels, gradeLevels, subjects].some((query) => query.isError) && <p role="alert">We could not load all teacher options. Please refresh and try again.</p>}<div className="student-account__completion-actions">{isTeacher && teacherStep === 2 && <button type="button" className="student-account__back" onClick={() => setTeacherStep(1)}>Back</button>}<button type="submit" className="student-account__submit" disabled={isSubmitting}>{isSubmitting ? 'Completing registration…' : isTeacher && teacherStep === 1 ? 'Next step' : 'Complete registration'}</button></div></form></section></main>
}

type TeacherRegistrationFieldsProps = { certificates: CatalogItem[]; curricula: CatalogItem[]; educationLevels: CatalogItem[]; gradeLevels: CatalogItem[]; subjects: CatalogItem[]; values: { certificateLevelId: string; curriculumId: string; educationLevelId: string; gradeLevelId: string; subjectIds: string[]; subjectSearch: string }; onChange: { setCertificateLevelId: (value: string) => void; setCurriculumId: (value: string) => void; setEducationLevelId: (value: string) => void; setGradeLevelId: (value: string) => void; setSubjectIds: (value: string[]) => void; setSubjectSearch: (value: string) => void } }
function TeacherRegistrationFields({ certificates, curricula, educationLevels, gradeLevels, subjects, values, onChange }: TeacherRegistrationFieldsProps) {
 const toggleSubject = (id: string) => onChange.setSubjectIds(values.subjectIds.includes(id) ? values.subjectIds.filter((subjectId) => subjectId !== id) : [...values.subjectIds, id])
 const selectedNames = values.subjectIds.map((id) => subjects.find((item) => String(item.id) === id)?.name).filter((name): name is string => Boolean(name))
 return <fieldset className="student-account__teacher-fields"><legend>Teaching profile</legend><p className="student-account__section-help">Choose your qualification and the subjects you teach. You can select more than one subject.</p><label htmlFor="completion-certificate">Highest certificate level</label><select id="completion-certificate" value={values.certificateLevelId} onChange={(event) => onChange.setCertificateLevelId(event.target.value)} required><option value="">Select certificate level</option>{certificates.map((item) => <option value={String(item.id)} key={String(item.id)}>{item.name}</option>)}</select><label htmlFor="completion-curriculum">Curriculum</label><select id="completion-curriculum" value={values.curriculumId} onChange={(event) => onChange.setCurriculumId(event.target.value)} required><option value="">Select curriculum</option>{curricula.map((item) => <option value={String(item.id)} key={String(item.id)}>{item.name}</option>)}</select><label htmlFor="completion-education-level">Education level</label><select id="completion-education-level" value={values.educationLevelId} onChange={(event) => onChange.setEducationLevelId(event.target.value)} disabled={!values.curriculumId} required><option value="">Select education level</option>{educationLevels.map((item) => <option value={String(item.id)} key={String(item.id)}>{item.name.trim()}</option>)}</select><label htmlFor="completion-grade-level">Grade level</label><select id="completion-grade-level" value={values.gradeLevelId} onChange={(event) => onChange.setGradeLevelId(event.target.value)} disabled={!values.educationLevelId} required><option value="">Select grade level</option>{gradeLevels.map((item) => <option value={String(item.id)} key={String(item.id)}>{item.name}</option>)}</select><label htmlFor="completion-subject-search">Subjects <span>(select all that apply)</span></label><div className="student-account__subject-picker"><div className="student-account__subject-chips">{selectedNames.map((name, index) => <button type="button" className="student-account__subject-chip" key={values.subjectIds[index]} onClick={() => onChange.setSubjectIds(values.subjectIds.filter((id) => id !== values.subjectIds[index]))}>{name}<span aria-hidden="true">×</span><span className="student-account__sr-only">Remove {name}</span></button>)}</div><input id="completion-subject-search" type="search" value={values.subjectSearch} onChange={(event) => onChange.setSubjectSearch(event.target.value)} placeholder="Search subjects" autoComplete="off" aria-describedby="completion-subject-hint" />{values.subjectSearch.trim() && subjects.length === 0 && <p className="student-account__subject-state">No subjects found. Try another search.</p>}{!values.subjectSearch.trim() && subjects.length === 0 && <p className="student-account__subject-state">Type to search available subjects.</p>}{subjects.length > 0 && <div className="student-account__subject-results" role="listbox" aria-label="Available subjects">{subjects.map((item) => { const id = String(item.id); const selected = values.subjectIds.includes(id); return <button type="button" role="option" aria-selected={selected} className={`student-account__subject-option${selected ? ' is-selected' : ''}`} key={id} onClick={() => toggleSubject(id)}><span>{item.name}</span><b aria-hidden="true">{selected ? '✓' : '+'}</b></button> })}</div>}<small id="completion-subject-hint">{values.subjectIds.length === 0 ? 'Search and select at least one subject.' : `${values.subjectIds.length} subject${values.subjectIds.length === 1 ? '' : 's'} selected`}</small></div></fieldset>
}
function extractItems(payload: unknown): CatalogItem[] { if (Array.isArray(payload)) return payload as CatalogItem[]; if (!payload || typeof payload !== 'object') return []; const record = payload as Record<string, unknown>; for (const key of ['items', 'data', 'results']) { const value = record[key]; if (Array.isArray(value)) return value as CatalogItem[]; if (value && typeof value === 'object') { const nested = extractItems(value); if (nested.length > 0) return nested } } return [] }
function normalizeRole(value: string | null): RegistrationRole | null { return ({ student: 'Student', teacher: 'Teacher', parent: 'Parent', school: 'School' } as const)[value?.toLowerCase() as 'student' | 'teacher' | 'parent' | 'school'] ?? null }
function roleFromUser(user: { dashboard?: string; userRole?: string } | null): RegistrationRole | null { return normalizeRole(user?.userRole ?? user?.dashboard ?? null) }
function normalizeGender(value: string | null | undefined) { return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '' }
function readPendingRegistration(): PendingRegistration | null { try { const raw = window.localStorage.getItem('sqooli-pending-registration'); if (!raw) return null; const value = JSON.parse(raw) as Partial<PendingRegistration>; if (!value.firstName || !value.lastName || !value.email) return null; const role = ({ student: 'Student', teacher: 'Teacher', parent: 'Parent', school: 'School' } as const)[value.role as string]; return { firstName: value.firstName, lastName: value.lastName, email: value.email, phone: value.phone, role } } catch { return null } }
