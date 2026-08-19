import { Check, Plus, X } from 'lucide-react'
import { useState } from 'react'
import '../../styles/pages/teacher-optional-setup.css'

type Props = { kind: 'tutors' | 'social'; onClose: () => void; onSaved: () => void; onSkipped: () => void }

export default function TeacherOptionalSetupModal({ kind, onClose, onSaved, onSkipped }: Props) {
	const [tutors, setTutors] = useState([{ email: '', role: 'Tutor' }])
	const [links, setLinks] = useState({ facebook: '', instagram: '', linkedin: '', website: '' })
	const isTutors = kind === 'tutors'
	const save = (event: React.FormEvent) => { event.preventDefault(); onSaved() }

	return <div className="teacher-optional-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
		<section className="teacher-optional-modal" role="dialog" aria-modal="true" aria-labelledby="teacher-optional-title">
			<header><div><h1 id="teacher-optional-title">{isTutors ? 'Add Tutors' : 'Social Media Links'}</h1><p>{isTutors ? 'Invite other users with different roles to your account' : 'Setup your social media links to grow your audience'}</p></div><button type="button" aria-label="Close" onClick={onClose}><X size={22} /></button></header>
			<form onSubmit={save}>
				{isTutors ? <div className="teacher-optional__form-group"><label>Invite a tutor<span className="teacher-optional__input"><input type="email" placeholder="Enter email address" value={tutors[0].email} onChange={(event) => setTutors([{ ...tutors[0], email: event.target.value }])} /><select value={tutors[0].role} onChange={(event) => setTutors([{ ...tutors[0], role: event.target.value }])}><option>Tutor</option><option>Administrator</option><option>Teacher</option></select></span></label><button type="button" className="teacher-optional__add" onClick={() => setTutors((current) => [...current, { email: '', role: 'Tutor' }])}><Plus size={16} /> Add another tutor</button>{tutors.slice(1).map((tutor, index) => <label key={index}>Additional invite<span className="teacher-optional__input"><input type="email" placeholder="Enter email address" value={tutor.email} onChange={(event) => setTutors((current) => current.map((item, itemIndex) => itemIndex === index + 1 ? { ...item, email: event.target.value } : item))} /><select value={tutor.role} onChange={(event) => setTutors((current) => current.map((item, itemIndex) => itemIndex === index + 1 ? { ...item, role: event.target.value } : item))}><option>Tutor</option><option>Administrator</option><option>Teacher</option></select></span></label>)}</div> : <div className="teacher-optional__links"><label>Facebook<span><input type="url" placeholder="https://facebook.com/" value={links.facebook} onChange={(event) => setLinks({ ...links, facebook: event.target.value })} /></span></label><label>Instagram<span><input type="url" placeholder="https://instagram.com/" value={links.instagram} onChange={(event) => setLinks({ ...links, instagram: event.target.value })} /></span></label><label>LinkedIn<span><input type="url" placeholder="https://linkedin.com/" value={links.linkedin} onChange={(event) => setLinks({ ...links, linkedin: event.target.value })} /></span></label><label>Website<span><input type="url" placeholder="https://" value={links.website} onChange={(event) => setLinks({ ...links, website: event.target.value })} /></span></label></div>}
				<footer><button type="button" className="teacher-optional__skip" onClick={onSkipped}>Skip for now</button><button type="submit" className="teacher-optional__save"><Check size={16} /> Save &amp; Continue</button></footer>
			</form>
		</section>
	</div>
}
