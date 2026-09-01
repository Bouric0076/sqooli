import { useQueries } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { Check, ImagePlus, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { completeRegistration, updateProfile } from '../../../api/account'
import { getCurricula, getEducationLevels, getGradeLevels, getSchools, getSubjects, type CatalogItem } from '../../../api/catalogs'
import { getMyEnrollments } from '../../../api/student'
import { getCurrentUser } from '../../../auth/auth.service'
import { updateUser } from '../../../auth/auth.slice'
import type { AuthUser } from '../../../auth/auth.types'
import { useAppDispatch, useAppSelector } from '../../../store'

const INTERESTS = ['Programming', 'Development', 'Business', 'Science', 'History', 'Social Studies', 'Christian Religious Education', 'Physics', 'Geography']

type StudentProfileModalProps = { onClose: () => void; onSaved?: (user?: AuthUser) => void; presentation?: 'modal' | 'page' }

export default function StudentProfileModal({ onClose, onSaved, presentation = 'modal' }: StudentProfileModalProps) {
	const user = useAppSelector((state) => state.auth.user)
	const dispatch = useAppDispatch()
	const [notice, setNotice] = useState('')
	const [isSaving, setIsSaving] = useState(false)
	const [preview, setPreview] = useState('')
	const [curriculumId, setCurriculumId] = useState('')
	const [educationLevelId, setEducationLevelId] = useState('')
	const [gradeLevelId, setGradeLevelId] = useState('')
	const [schoolName, setSchoolName] = useState('')
	const [schoolId, setSchoolId] = useState('')
	const [studentType, setStudentType] = useState('Day Scholar')
	const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
	const [subjectSearch, setSubjectSearch] = useState('')
	const [selectedInterests, setSelectedInterests] = useState<string[]>(['Social Studies'])

	const catalogs = useQueries({ queries: [
		{ queryKey: ['student', 'profile', 'curricula'], queryFn: async () => (await getCurricula({ page: 1, pageSize: 100 })).data },
		{ queryKey: ['student', 'profile', 'education-levels', curriculumId], enabled: Boolean(curriculumId), queryFn: async () => (await getEducationLevels({ page: 1, pageSize: 100, curriculumId })).data },
		{ queryKey: ['student', 'profile', 'grade-levels', curriculumId, educationLevelId], enabled: Boolean(curriculumId && educationLevelId), queryFn: async () => (await getGradeLevels({ page: 1, pageSize: 100, educationLevelId })).data },
		{ queryKey: ['student', 'profile', 'subjects', curriculumId, educationLevelId, gradeLevelId], enabled: Boolean(curriculumId && educationLevelId && gradeLevelId), queryFn: async () => (await getSubjects({ page: 1, pageSize: 100, educationLevelId, gradeLevelId })).data },
	] })
	const curricula = extractCatalogItems(catalogs[0].data)
	const educationLevels = useMemo(() => extractCatalogItems(catalogs[1].data).filter((level) => matchesId(level.curriculumId, curriculumId)), [catalogs, curriculumId])
	const gradeLevels = useMemo(() => extractCatalogItems(catalogs[2].data).filter((grade) => matchesId(grade.curriculumId, curriculumId) && matchesId(grade.educationLevelId, educationLevelId)), [catalogs, curriculumId, educationLevelId])
	const subjects = useMemo(() => extractCatalogItems(catalogs[3].data).filter((subject) => matchesId(subject.curriculumId, curriculumId) && matchesId(subject.educationLevelId, educationLevelId) && matchesId(subject.gradeLevelId, gradeLevelId)), [catalogs, curriculumId, educationLevelId, gradeLevelId])
	const visibleSubjects = useMemo(() => subjects.filter((subject) => subject.name.toLowerCase().includes(subjectSearch.trim().toLowerCase())), [subjects, subjectSearch])
	const schoolQuery = useQuery({ queryKey: ['student', 'profile', 'schools', schoolName.trim()], enabled: schoolName.trim().length >= 2 && !schoolId, queryFn: async () => (await getSchools({ page: 1, pageSize: 20, search: schoolName.trim() })).data })
	const schools = extractCatalogItems(schoolQuery.data)
	const catalogError = catalogs.some((query) => query.isError)
	const loadingCatalogs = catalogs.some((query) => query.isLoading)
	const chosenSubjectIds = useMemo(() => selectedSubjects.map((id) => Number(id)).filter(Number.isInteger), [selectedSubjects])
	const hasSubjectContext = Boolean(curriculumId && educationLevelId && gradeLevelId)

	useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

	const save = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!user?.email || !curriculumId || !gradeLevelId) {
			setNotice('Choose a curriculum and grade level before saving your student information.')
			return
		}
		setIsSaving(true)
		setNotice('')
		try {
			// Personal details belong to the authenticated profile endpoint.
			await updateProfile({ firstName: user.firstName, lastName: user.lastName, phone: user.phone ?? '', gender: user.gender ?? '', dob: user.dob ?? '', address: user.address ?? '', role: 'Student' })
			// The current contract exposes no Student enrollment mutation. Until
			// that endpoint exists, register/complete is the documented write path
			// for the Student enrollment relation.
			await completeRegistration({ email: user.email, role: 'Student', firstName: user.firstName, lastName: user.lastName, phone: user.phone ?? '', gender: user.gender ?? undefined, dob: user.dob ?? undefined, address: user.address ?? undefined, studentEnrollments: [{ curriculumId: Number(curriculumId), gradeLevelId: Number(gradeLevelId), schoolId: schoolId ? Number(schoolId) : null, subjectIds: chosenSubjectIds }] })
			const refreshed = await getCurrentUser(user)
			const enrollmentResponse = await getMyEnrollments()
			if (!hasMatchingEnrollment(enrollmentResponse, Number(curriculumId), Number(gradeLevelId), chosenSubjectIds)) {
				throw new Error('Your student information was accepted, but the enrollment could not be confirmed yet. Please try again.')
			}
			window.sessionStorage.setItem('sqooli-student-profile', 'true')
			dispatch(updateUser(refreshed))
			setNotice('Student information saved successfully.')
			onSaved?.(refreshed)
		} catch (error) {
			setNotice(error instanceof Error ? error.message : 'We could not save student information. Please try again.')
		} finally { setIsSaving(false) }
	}

	return <div className={presentation === 'page' ? 'student-profile-page' : 'student-dashboard__modal-backdrop'} onMouseDown={(event) => { if (presentation === 'modal' && event.target === event.currentTarget) onClose() }}><section className={`student-profile-modal${presentation === 'page' ? ' student-profile-page__card' : ''}`} role={presentation === 'page' ? undefined : 'dialog'} aria-modal={presentation === 'page' ? undefined : true} aria-labelledby="student-profile-title"><header className="student-profile-modal__header"><div><p className="student-profile-page__eyebrow">Student account</p><h1 id="student-profile-title">{presentation === 'page' ? 'Student profile' : 'Add Student Information'}</h1><p>{presentation === 'page' ? 'Keep your learning details up to date so Sqooli can personalize your experience.' : 'Set up your student profile so Sqooli can personalize your learning.'}</p></div><button type="button" className="student-profile-modal__close" aria-label="Close student information" onClick={onClose}><X size={22} /></button></header><form className="student-profile-modal__form" onSubmit={save} noValidate><label className="student-profile-modal__field-label" htmlFor="student-profile-image">Profile Image<span className="student-profile-modal__upload"><ImagePlus size={22} /><b>Click to upload</b> or drag and drop<small>SVG, PNG, JPG or GIF (max. 800×400px)</small><input id="student-profile-image" type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) setPreview(URL.createObjectURL(file)) }} /></span>{preview && <img className="student-profile-modal__preview" src={preview} alt="Selected profile preview" />}</label><label className="student-profile-modal__field-label" htmlFor="student-username">Username<input className="student-profile-modal__input" id="student-username" value={user?.email ?? ''} readOnly /></label><div className="student-profile-modal__grid"><SchoolSearchField value={schoolName} options={schools} isLoading={schoolQuery.isLoading} onChange={(value) => { setSchoolName(value); setSchoolId('') }} onSelect={(school) => { setSchoolName(school.name); setSchoolId(String(school.id ?? '')) }} /><SelectField id="student-curriculum" label="Curriculum" value={curriculumId} onChange={(value) => { setCurriculumId(value); setEducationLevelId(''); setGradeLevelId(''); setSelectedSubjects([]); setSubjectSearch('') }} options={curricula} placeholder={loadingCatalogs ? 'Loading…' : 'Select…'} /><SelectField id="student-education" label="Education Level" value={educationLevelId} onChange={(value) => { setEducationLevelId(value); setGradeLevelId(''); setSelectedSubjects([]); setSubjectSearch('') }} options={educationLevels} placeholder={curriculumId ? 'Select…' : 'Choose curriculum first'} /><SelectField id="student-grade" label="Grade Level" value={gradeLevelId} onChange={(value) => { setGradeLevelId(value); setSelectedSubjects([]); setSubjectSearch('') }} options={gradeLevels} placeholder={educationLevelId ? 'Select…' : 'Choose education level first'} /></div><fieldset className="student-profile-modal__type"><legend>Type of student</legend><label><input type="radio" checked={studentType === 'Day Scholar'} onChange={() => setStudentType('Day Scholar')} /> Day Scholar</label><label><input type="radio" checked={studentType === 'Boarder'} onChange={() => setStudentType('Boarder')} /> Boarder</label></fieldset><fieldset className="student-profile-modal__subjects"><legend>Subjects <small>{selectedSubjects.length} selected</small></legend>{!hasSubjectContext ? <p className="student-profile-modal__subject-empty">Choose a curriculum, education level, and grade level to see available subjects.</p> : <><label className="student-profile-modal__subject-search" htmlFor="student-subject-search"><span>Search subjects</span><input id="student-subject-search" value={subjectSearch} onChange={(event) => setSubjectSearch(event.target.value)} placeholder="Find a subject…" /></label><div className="student-profile-modal__subject-list">{catalogs[3].isLoading ? <p className="student-profile-modal__subject-empty">Loading subjects…</p> : visibleSubjects.length ? visibleSubjects.map((subject) => <button type="button" className={selectedSubjects.includes(String(subject.id)) ? 'is-selected' : ''} key={String(subject.id)} onClick={() => setSelectedSubjects((current) => current.includes(String(subject.id)) ? current.filter((id) => id !== String(subject.id)) : [...current, String(subject.id)])}><span>📚 {subject.name}</span><i>{selectedSubjects.includes(String(subject.id)) && <Check size={12} />}</i></button>) : <p className="student-profile-modal__subject-empty">No subjects are available for this selection.</p>}</div></>}</fieldset><fieldset className="student-profile-modal__interests"><legend>Interests</legend><small>Choose 5 interests</small><div>{INTERESTS.map((interest) => <button type="button" className={selectedInterests.includes(interest) ? 'is-selected' : ''} key={interest} onClick={() => setSelectedInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : current.length < 5 ? [...current, interest] : current)}>{selectedInterests.includes(interest) ? `${interest} ×` : `+ ${interest}`}</button>)}</div></fieldset>{catalogError && <p className="student-profile-modal__catalog-note" role="status">Some enrollment options could not be loaded. School selection may be unavailable if your account cannot access the school catalogue.</p>}<div className="student-profile-modal__actions"><span role="status" aria-live="polite">{notice}</span><button className="student-dashboard__go" type="submit" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save Changes'}</button></div></form></section></div>
}

function matchesId(value: CatalogItem['curriculumId'], selectedId: string) {
	return Boolean(selectedId) && String(value) === String(selectedId)
}

function hasMatchingEnrollment(payload: unknown, curriculumId: number, gradeLevelId: number, subjectIds: number[]) {
	return extractEnrollmentRecords(payload).some((enrollment) => {
		const enrollmentCurriculumId = getRecordId(enrollment.curriculumId, enrollment.curriculum)
		const enrollmentGradeLevelId = getRecordId(enrollment.gradeLevelId, enrollment.gradeLevel)
		if (enrollmentCurriculumId !== curriculumId || enrollmentGradeLevelId !== gradeLevelId) return false
		if (!subjectIds.length) return true
		const returnedSubjectIds = [
			...(Array.isArray(enrollment.subjectIds) ? enrollment.subjectIds : []),
			...(Array.isArray(enrollment.subjects) ? enrollment.subjects.map((item) => getRecordId((item as Record<string, unknown>).id, item)) : []),
			...(Array.isArray(enrollment.studentSubjects) ? enrollment.studentSubjects.map((item) => getRecordId((item as Record<string, unknown>).subjectId, (item as Record<string, unknown>).subject)) : []),
		].map(Number).filter(Number.isInteger)
		return subjectIds.every((id) => returnedSubjectIds.includes(id))
	})
}

function extractEnrollmentRecords(payload: unknown): Record<string, unknown>[] {
	if (Array.isArray(payload)) return payload.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
	if (!payload || typeof payload !== 'object') return []
	const record = payload as Record<string, unknown>
	for (const key of ['data', 'items', 'results', 'records', 'enrollments']) {
		const records = extractEnrollmentRecords(record[key])
		if (records.length) return records
	}
	return 'curriculumId' in record || 'gradeLevelId' in record ? [record] : []
}

function getRecordId(value: unknown, nested: unknown) {
	if (value !== undefined && value !== null) return Number(value)
	if (nested && typeof nested === 'object') return Number((nested as Record<string, unknown>).id)
	return NaN
}

function extractCatalogItems(payload: unknown): CatalogItem[] {
	if (Array.isArray(payload)) return payload.filter(isCatalogItem) as CatalogItem[]
	if (!payload || typeof payload !== 'object') return []
	const record = payload as Record<string, unknown>
	// The API has returned both { data: [...] } and nested envelopes such as
	// { status: true, data: { items: [...] } }. Walk the collection keys so a
	// successful response does not appear empty just because its envelope grew
	// one level deeper.
	for (const key of ['data', 'items', 'results', 'records', 'content']) {
		const items = extractCatalogItems(record[key])
		if (items.length) return items
	}
	// Some API responses use a resource-specific wrapper (for example
	// { data: { curricula: [...] } }). Inspect nested objects as a final
	// compatibility path instead of coupling the UI to one envelope name.
	for (const value of Object.values(record)) {
		if (value && typeof value === 'object' && !Array.isArray(value)) {
			const items = extractCatalogItems(value)
			if (items.length) return items
		}
	}
	return isCatalogItem(record) ? [record as CatalogItem] : []
}

function isCatalogItem(value: unknown): value is CatalogItem {
	return Boolean(value && typeof value === 'object' && ('id' in value || 'name' in value))
}

function SelectField({ id, label, value, onChange, options, placeholder }: { id: string; label: string; value: string; onChange: (value: string) => void; options: CatalogItem[]; placeholder: string }) {
	return <label className="student-profile-modal__select-label" htmlFor={id}><span>{label}</span><select className="student-profile-modal__select" id={id} value={value} onChange={(event) => onChange(event.target.value)}><option value="">{placeholder}</option>{options.map((option) => <option value={String(option.id)} key={String(option.id)}>{option.name}</option>)}</select></label>
}

function SchoolSearchField({ value, options, isLoading, onChange, onSelect }: { value: string; options: CatalogItem[]; isLoading: boolean; onChange: (value: string) => void; onSelect: (school: CatalogItem) => void }) {
	const showOptions = value.trim().length >= 2 && (isLoading || options.length > 0)
	return <label className="student-profile-modal__select-label student-profile-modal__school-search" htmlFor="student-school"><span>Current School</span><input className="student-profile-modal__input" id="student-school" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Type to search…" autoComplete="off" />{showOptions && <div className="student-profile-modal__school-results" role="listbox" aria-label="School results">{isLoading ? <small>Searching schools…</small> : options.map((school) => <button type="button" role="option" key={String(school.id)} onClick={() => onSelect(school)}>{school.name}</button>)}</div>}</label>
}
