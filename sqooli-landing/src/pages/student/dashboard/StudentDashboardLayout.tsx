import { Bell, BookOpen, CalendarDays, ChevronDown, Home, Layers3, LogOut, Menu, Search, Settings, UserRound, UsersRound, WalletCards } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clearSession } from '../../../auth/auth.slice'
import { logout } from '../../../auth/auth.service'
import { selectAuthUser } from '../../../auth/auth.selectors'
import { useAppDispatch, useAppSelector } from '../../../store'
import headerLogo from '../../../assets/images/student-flow/sqooli-logo-v3.svg'
import lessonCodeArt from '../../../assets/images/student-flow/lesson-code.svg'
import '../../../styles/pages/student-dashboard.css'
import '../../../styles/pages/student-ui-overrides.css'

const studentNavigation = [
	{ label: 'Home', icon: Home, href: '/student' },
	{ label: 'Assignments', icon: BookOpen, href: '/student/assignments' },
	{ label: 'Lessons', icon: BookOpen, href: '/student/lessons' },
	{ label: 'Timetable', icon: CalendarDays, href: '/student/timetable' },
	{ label: 'Tutors', icon: UsersRound, href: '/student/tutors' },
	{ label: 'Activity Feed', icon: Layers3, href: '/student/activity' },
]

type StudentDashboardLayoutProps = { children: ReactNode; activePath?: string; showSidebar?: boolean; variant?: 'default' | 'complete'; mainClassName?: string }

export default function StudentDashboardLayout({ children, activePath = '/student', showSidebar = true, variant = 'default', mainClassName = '' }: StudentDashboardLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [profileOpen, setProfileOpen] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectAuthUser)
	const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.email || 'Student'
	const handleLogout = () => { logout(); dispatch(clearSession()); navigate('/login', { replace: true }) }

	return (
		<div className={`student-dashboard${showSidebar ? '' : ' is-sidebar-hidden'}${variant === 'complete' ? ' student-dashboard--complete' : ''}`}>
			{showSidebar && sidebarOpen && <button className="student-dashboard__backdrop" type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
			{showSidebar && <aside className={`student-dashboard__sidebar${sidebarOpen ? ' is-open' : ''}`}>
				<a href="/" className="student-dashboard__brand" aria-label="Return to Sqooli home">
					<img src={headerLogo} alt="Sqooli" />
				</a>
				<nav aria-label="Student dashboard navigation">
					{studentNavigation.map(({ label, icon: Icon, href }) => (
						<Link key={label} to={href} className={`student-dashboard__nav-item${activePath === href ? ' is-active' : ''}`} onClick={() => setSidebarOpen(false)}>
							<Icon size={22} strokeWidth={1.7} />
							<span>{label}</span>
						</Link>
					))}
				</nav>
				<div className="student-dashboard__lesson-card">
					<strong>Have a lesson code?</strong>
					<img className="student-dashboard__lesson-art" src={lessonCodeArt} alt="Lesson code illustration" />
					<span className="student-dashboard__lesson-card-note">Lesson claiming is coming soon</span>
				</div>
			</aside>}

			<header className="student-dashboard__header">
				{!showSidebar && <Link to="/student" className="student-dashboard__header-brand" aria-label="Back to student dashboard"><img src={headerLogo} alt="Sqooli" /></Link>}
				{showSidebar && <button className="student-dashboard__menu-button" type="button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>}
				<button className="student-dashboard__role" type="button">Student <ChevronDown size={15} /></button>
				<div className="student-dashboard__header-actions">
					<form className="student-dashboard__search" onSubmit={event => { event.preventDefault(); const query = new FormData(event.currentTarget).get('query')?.toString().trim(); if (query) window.location.href = `/search?student=1&q=${encodeURIComponent(query)}` }}>
						<Search size={18} /><input name="query" type="search" aria-label="Search Tutors, Lessons, Programs" placeholder="Search Tutors, Lessons, Programs..." />
					</form>
					<button type="button" className={activePath === '/student/wallet' ? 'is-active' : ''} aria-label="Wallet" onClick={() => navigate('/student/wallet')}><WalletCards size={22} /></button>
					<button type="button" aria-label="Notifications"><Bell size={22} /></button>
					<button type="button" aria-label="Resources"><Layers3 size={22} /></button>
					<div className="student-dashboard__profile-wrap"><button type="button" className="student-dashboard__profile" aria-label="Open profile menu" aria-expanded={profileOpen} onClick={() => setProfileOpen(current => !current)}><span className="student-dashboard__avatar"><UserRound size={20} /></span><strong>{displayName}</strong><ChevronDown size={16} /></button>{profileOpen && <div className="student-dashboard__profile-menu"><Link to="/student/profile"><UserRound size={16} /> Profile</Link><Link to="/student/settings"><Settings size={16} /> Settings</Link><button type="button" onClick={handleLogout}><LogOut size={16} /> Log out</button></div>}</div>
				</div>
			</header>

			<main className={`student-dashboard__main${mainClassName ? ` ${mainClassName}` : ''}`}>
				{activePath === '/student' && user?.isProfileComplete === false && !window.sessionStorage.getItem('sqooli-student-profile') && <section className="student-dashboard__setup-banner" aria-label="Student profile setup reminder">
					<div><strong>Complete your student profile</strong><p>Your dashboard is ready. Add your school, curriculum, grade, and subjects to personalize your Sqooli experience.</p></div>
					<Link to="/student/profile">Add student information</Link>
				</section>}
				{children}
			</main>
		</div>
	)
}
