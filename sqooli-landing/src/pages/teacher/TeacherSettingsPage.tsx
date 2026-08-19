import { Copy, EyeOff, Globe2, Image, MoreVertical, School, WalletCards } from 'lucide-react'
import { useState } from 'react'
import TeacherDashboardLayout from './TeacherDashboardLayout'
import '../../styles/pages/teacher-settings.css'

export default function TeacherSettingsPage() {
	const [editContact, setEditContact] = useState(false)
	const [profileName, setProfileName] = useState('Olivia Akinyi')
	return <TeacherDashboardLayout>
		<section className="teacher-settings-page" aria-labelledby="teacher-settings-title">
			<a className="teacher-settings-page__back" href="/teacher/dashboard">← Back to Dashboard</a>
			<div className="teacher-settings-page__layout"><TeacherSettingsRail />
				<main className="teacher-settings-page__content"><header><h1 id="teacher-settings-title">Settings</h1><p>View and manage communication with other users</p></header>
					<h2>Profile</h2><section className="teacher-settings-page__card teacher-settings-page__profile-card"><div><span>Profile Pic</span><div className="teacher-settings-page__profile-pic"><span>OA</span></div></div><div className="teacher-settings-page__profile-actions"><button type="button"><Image size={17} /> Change Profile Pic</button><small>At least 800px by 800px recommended</small><small>Format JPG or PNG</small></div></section>
					<section className="teacher-settings-page__card"><header><h2>Contact Details</h2><button type="button" onClick={() => setEditContact(true)}>Edit</button></header>{editContact ? <form className="teacher-settings-page__contact-form" onSubmit={event => { event.preventDefault(); setEditContact(false) }}><label>Phone Number<input defaultValue="+254712 345 678" /></label><label>Email Address<input value={profileName.toLowerCase().replace(' ', '') + '@gmail.com'} onChange={event => setProfileName(event.target.value)} /></label><div><button type="button" onClick={() => setEditContact(false)}>Cancel</button><button type="submit">Save</button></div></form> : <><p>+254712 345 678</p><p>oliviaakinyi@gmail.com</p></>}</section>
					<section className="teacher-settings-page__card"><header><h2>Social Media</h2><button type="button" onClick={() => setEditContact(true)}>Edit</button></header><p><b className="social-x">X</b> radioafricagroup</p><p><Globe2 size={15} /> radioafricagroup</p><p><Globe2 size={15} /> radioafricagroup</p><p><span className="social-f">f</span> radioafricagroup</p></section>
				</main></div>
		</section>
	</TeacherDashboardLayout>
}

function TeacherSettingsRail() { return <aside className="teacher-settings-page__rail"><div className="teacher-settings-page__school-mark"><School size={25} /></div><h2>Mathematic Excellence<br />Academy</h2><span className="teacher-settings-page__tag">Online School</span><p>Contact Information</p><strong>+254712 345 678</strong><strong>mathematicexcel@gmail.com</strong><button type="button">Switch Account</button><div className="teacher-settings-page__wallet"><small>Wallet Balance</small><button type="button" aria-label="Wallet options"><MoreVertical size={18} /></button><b>KES 23,450.00</b><EyeOff size={18} /><div><button type="button"><WalletCards size={15} /> Top-up</button><button type="button">Withdraw</button></div></div><div className="teacher-settings-page__referral"><strong>Refer &amp; Earn with Sqooli</strong><small>Share your unique link to students &amp; parents to join Sqooli</small><button type="button"><Copy size={14} /> Copy Link</button></div></aside> }
