export type TeacherType = 'independent' | 'online_school' | 'school_affiliated'
export type ApplicationStatus = 'draft' | 'under_review' | 'approved' | 'rejected'

export type Certification = {
	name: string
	issuer: string
	issued: string
	expires: string
	url: string
	fileName?: string
}

export type TeacherApplicationDraft = {
	teacherType?: TeacherType
	currentStep: number
	status: ApplicationStatus
	personal: {
		profileImage?: string
		username: string
		fullName: string
		nationality: 'kenyan' | 'other'
		otherNationality: string
		identificationNumber: string
		email: string
		phone: string
		country: string
		county: string
		city: string
		currentPlaceOfWork: string
	}
	school?: { id: string; name: string; type: string; locked?: boolean }
	qualifications: { bio: string; education: string; license: string; certifications: Certification[] }
	subjects: { curriculum: string; educationLevel: string; grades: string[]; subjects: string[] }
	documents: Record<string, string>
	contract: { clauses: boolean; terms: boolean; privacy: boolean; version?: string; acceptedAt?: string }
}

export const applicationSteps = ['Personal Information', 'Qualifications', 'Subjects', 'Documents', 'Contract']

export const emptyApplication: TeacherApplicationDraft = {
	currentStep: 0,
	status: 'draft',
	personal: { username: '', fullName: '', nationality: 'kenyan', otherNationality: '', identificationNumber: '', email: '', phone: '', country: 'Kenya', county: '', city: '', currentPlaceOfWork: '' },
	qualifications: { bio: '', education: '', license: '', certifications: [] },
	subjects: { curriculum: '', educationLevel: '', grades: [], subjects: [] },
	documents: {},
	contract: { clauses: false, terms: false, privacy: false },
}

const key = 'sqooli-teacher-application-draft-v1'

export function loadApplication(): TeacherApplicationDraft {
	try {
		const saved = JSON.parse(window.localStorage.getItem(key) || 'null') as Partial<TeacherApplicationDraft> | null
		return saved ? { ...emptyApplication, ...saved, personal: { ...emptyApplication.personal, ...saved.personal }, qualifications: { ...emptyApplication.qualifications, ...saved.qualifications }, subjects: { ...emptyApplication.subjects, ...saved.subjects }, contract: { ...emptyApplication.contract, ...saved.contract } } : emptyApplication
	} catch { return emptyApplication }
}

export function saveApplication(draft: TeacherApplicationDraft) {
	window.localStorage.setItem(key, JSON.stringify(draft))
}

export const roleOptions: Array<{ id: TeacherType; title: string; description: string; tone: string }> = [
	{ id: 'independent', title: 'Independent Teacher', description: 'Teach and grow your own learning community', tone: 'green' },
	{ id: 'online_school', title: 'Online School Teacher', description: 'Teach through an established online school', tone: 'blue' },
	{ id: 'school_affiliated', title: 'School-Affiliated Teacher', description: 'Join a school community on Sqooli', tone: 'yellow' },
]

export const mockSchools = [
	{ id: 'makini', name: 'Makini School', type: 'Online School' },
	{ id: 'udbc', name: 'UDBC College', type: 'School' },
	{ id: 'greenfield', name: 'Greenfield Academy', type: 'Online School' },
]

export function requiredDocuments(type?: TeacherType) {
	const base = [{ id: 'id-front', label: 'National ID — Front' }, { id: 'id-back', label: 'National ID — Back' }, { id: 'license', label: 'Teaching License / TSC Certificate' }]
	return type === 'independent' ? base : [...base, { id: 'affiliation', label: type === 'online_school' ? 'School affiliation confirmation' : 'School appointment or invitation' }]
}
