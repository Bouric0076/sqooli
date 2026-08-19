import { Check, ChevronDown, CloudUpload, X } from 'lucide-react'
import { useState } from 'react'

const subjects = ['Mathematics', 'English', 'Kiswahili', 'Science', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology', 'Christian Religious Education']
const interests = ['Programming', 'Development', 'Business', 'Science', 'History', 'Social Studies', 'Christian Religious Education', 'Physics', 'Geography']

type StudentProfileModalProps = { onClose: () => void; onSaved?: () => void }

export default function StudentProfileModal({ onClose, onSaved }: StudentProfileModalProps) {
	const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics'])
	const [selectedInterests, setSelectedInterests] = useState<string[]>(['Social Studies'])
	const [notice, setNotice] = useState('')
	const toggleSubject = (subject: string) => setSelectedSubjects((current) => current.includes(subject) ? current.filter((item) => item !== subject) : [...current, subject])
	const toggleInterest = (interest: string) => setSelectedInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : current.length >= 5 ? current : [...current, interest])
	const save = () => {
		window.sessionStorage.setItem('sqooli-student-profile', JSON.stringify({ subjects: selectedSubjects, interests: selectedInterests }))
		setNotice('Student information saved.')
		onSaved?.()
	}

	return (
		<div className="student-dashboard__modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
			<section className="student-profile-modal" role="dialog" aria-modal="true" aria-labelledby="student-profile-title">
				<header className="student-profile-modal__header">
					<div><h1 id="student-profile-title">Add Student Information</h1><p>Setup withdrawal settings to access your earnings</p></div>
					<button type="button" className="student-profile-modal__close" aria-label="Close student information" onClick={onClose}><X size={22} /></button>
				</header>
				<form className="student-profile-modal__form" onSubmit={(event) => { event.preventDefault(); save() }}>
					<label className="student-profile-modal__field-label">Profile Image</label>
					<label className="student-profile-modal__upload"><CloudUpload size={21} /><span><b>Click to upload</b> or drag and drop</span><small>SVG, PNG, JPG or GIF (max.<br />800x400px)</small><input type="file" accept="image/svg+xml,image/png,image/jpeg,image/gif" /></label>
					<label className="student-profile-modal__field-label" htmlFor="student-username">Username</label>
					<input className="student-profile-modal__input" id="student-username" type="text" />
					<div className="student-profile-modal__grid"><FieldSelect label="Current School" placeholder="Type to search..." /><FieldSelect label="Curriculum" placeholder="Select..." /><FieldSelect label="Education Level" placeholder="Select..." /><FieldSelect label="Grade Level" placeholder="Select..." /></div>
					<fieldset className="student-profile-modal__type"><legend>Type of student</legend><label><input type="radio" name="student-type" defaultChecked /> <span>Day Scholar</span></label><label><input type="radio" name="student-type" /> <span>Boarder</span></label></fieldset>
					<fieldset className="student-profile-modal__subjects"><legend>Subjects</legend><div>{subjects.map((subject) => { const selected = selectedSubjects.includes(subject); return <button type="button" key={subject} className={selected ? 'is-selected' : ''} onClick={() => toggleSubject(subject)}><span aria-hidden="true">📚</span>{subject}<i>{selected ? <Check size={14} /> : ''}</i></button> })}</div></fieldset>
					<fieldset className="student-profile-modal__interests"><legend>Interests</legend><small>Choose 5 interests</small><div>{interests.map((interest) => { const selected = selectedInterests.includes(interest); return <button type="button" key={interest} className={selected ? 'is-selected' : ''} onClick={() => toggleInterest(interest)}>{selected ? `${interest} ×` : `+ ${interest}`}</button> })}</div></fieldset>
					<div className="student-profile-modal__actions"><span role="status">{notice}</span><button className="student-dashboard__go" type="submit">Save Changes</button></div>
				</form>
			</section>
		</div>
	)
}

function FieldSelect({ label, placeholder }: { label: string; placeholder: string }) {
	return <label className="student-profile-modal__select-label"><span>{label}</span><button type="button" className="student-profile-modal__select">{placeholder}<ChevronDown size={16} /></button></label>
}
