import { useState } from 'react'
import { X } from 'lucide-react'
import { updateProfile } from '../../../api/account'
import { getCurrentUser } from '../../../auth/auth.service'
import { updateUser } from '../../../auth/auth.slice'
import { useAppDispatch, useAppSelector } from '../../../store'
import type { AuthUser } from '../../../auth/auth.types'

type Props = { onClose: () => void; onSaved: (user: AuthUser) => void }

export default function EditStudentProfileModal({ onClose, onSaved }: Props) {
	const user = useAppSelector((state) => state.auth.user)
	const dispatch = useAppDispatch()
	const [form, setForm] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', phone: user?.phone || '', gender: user?.gender || '', dob: user?.dob || '', address: user?.address || '' })
	const [error, setError] = useState('')
	const [saving, setSaving] = useState(false)
	const setField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }))
	const save = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!form.firstName.trim() || !form.lastName.trim()) { setError('First name and last name are required.'); return }
		setSaving(true); setError('')
		try {
			await updateProfile({ ...form, firstName: form.firstName.trim(), lastName: form.lastName.trim() })
			const refreshed = user ? await getCurrentUser(user) : null
			if (refreshed) { dispatch(updateUser(refreshed)); onSaved(refreshed) }
			else onClose()
		} catch (cause) { setError(cause instanceof Error ? cause.message : 'We could not save your profile. Please try again.') } finally { setSaving(false) }
	}
	return <div className="student-dashboard__modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="student-profile-edit-modal" role="dialog" aria-modal="true" aria-labelledby="edit-student-profile-title"><header><div><p>Personal information</p><h2 id="edit-student-profile-title">Edit your profile</h2><span>Update the details used across your Sqooli account.</span></div><button type="button" aria-label="Close edit profile" onClick={onClose}><X size={21} /></button></header><form onSubmit={save}><div className="student-profile-edit-modal__grid"><Field label="First name" value={form.firstName} onChange={(value) => setField('firstName', value)} /><Field label="Last name" value={form.lastName} onChange={(value) => setField('lastName', value)} /><Field label="Phone number" value={form.phone} onChange={(value) => setField('phone', value)} type="tel" /><label><span>Gender</span><select value={form.gender} onChange={(event) => setField('gender', event.target.value)}><option value="">Select gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></label><Field label="Date of birth" value={form.dob} onChange={(value) => setField('dob', value)} type="date" /><Field label="Address" value={form.address} onChange={(value) => setField('address', value)} /></div>{error && <p className="student-profile-edit-modal__error" role="alert">{error}</p>}<footer><button type="button" className="student-profile-edit-modal__cancel" onClick={onClose}>Cancel</button><button type="submit" className="student-dashboard__go" disabled={saving}>{saving ? 'Saving…' : 'Save profile'}</button></footer></form></section></div>
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) { return <label><span>{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} /></label> }
