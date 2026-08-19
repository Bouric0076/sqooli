import { Bell, BookOpen, CalendarDays, ChartLine, ChevronDown, Home, Layers3, Menu, Search, ShoppingCart, UserRound, UsersRound, WalletCards } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import headerLogo from '../../../assets/images/student-flow/sqooli-logo-v3.svg'
import lessonCodeArt from '../../../assets/images/student-flow/lesson-code.svg'
import '../../../styles/pages/student-dashboard.css'
import '../../../styles/pages/student-ui-overrides.css'

const studentNavigation = [
	{ label: 'Home', icon: Home, href: '/student' },
	{ label: 'Assignments', icon: BookOpen, href: '/student/assignments', badge: '1' },
	{ label: 'Lessons', icon: BookOpen, href: '/student/lessons' },
	{ label: 'Timetable', icon: CalendarDays, href: '/student/timetable' },
	{ label: 'Tutors', icon: UsersRound, href: '/student/tutors' },
	{ label: 'Forums', icon: UsersRound, href: '/student/forums' },
	{ label: 'Performance', icon: ChartLine, href: '/student/performance' },
	{ label: 'Activity Feed', icon: Layers3, href: '/student/activity' },
]

type StudentDashboardLayoutProps = { children: ReactNode; activePath?: string; showSidebar?: boolean; variant?: 'default' | 'complete' }

export default function StudentDashboardLayout({ children, activePath = '/student', showSidebar = true, variant = 'default' }: StudentDashboardLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<div className={`student-dashboard${showSidebar ? '' : ' is-sidebar-hidden'}${variant === 'complete' ? ' student-dashboard--complete' : ''}`}>
			{showSidebar && sidebarOpen && <button className="student-dashboard__backdrop" type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
			{showSidebar && <aside className={`student-dashboard__sidebar${sidebarOpen ? ' is-open' : ''}`}>
				<a href="/" className="student-dashboard__brand" aria-label="Return to Sqooli home">
					<img src={headerLogo} alt="Sqooli" />
				</a>
				<nav aria-label="Student dashboard navigation">
					{studentNavigation.map(({ label, icon: Icon, href, badge }) => (
						<a key={label} href={href} className={`student-dashboard__nav-item${activePath === href ? ' is-active' : ''}`} onClick={() => setSidebarOpen(false)}>
							<Icon size={22} strokeWidth={1.7} />
							<span>{label}</span>
							{badge && <b>{badge}</b>}
						</a>
					))}
				</nav>
				<div className="student-dashboard__lesson-card">
					<strong>Have a lesson code?</strong>
					<img className="student-dashboard__lesson-art" src={lessonCodeArt} alt="Lesson code illustration" />
					<a href="/student/claim-lesson">Claim Lesson Now</a>
				</div>
			</aside>}

			<header className="student-dashboard__header">
				{!showSidebar && <a href="/student" className="student-dashboard__header-brand" aria-label="Back to student dashboard"><img src={headerLogo} alt="Sqooli" /></a>}
				{showSidebar && <button className="student-dashboard__menu-button" type="button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>}
				<button className="student-dashboard__role" type="button">Student <ChevronDown size={15} /></button>
				<div className="student-dashboard__header-actions">
					<label className="student-dashboard__search"><Search size={18} /><input type="search" aria-label="Search Tutors, Lessons, Programs" placeholder="Search Tutors, Lessons, Programs..." /></label>
					<button type="button" className={activePath === '/student/wallet' ? 'is-active' : ''} aria-label="Wallet" onClick={() => { window.location.href = '/student/wallet' }}><WalletCards size={22} /></button>
					<button type="button" aria-label="Notifications"><Bell size={22} /></button>
					<button type="button" className={activePath === '/student/cart' ? 'is-active' : ''} aria-label="Cart" onClick={() => { window.location.href = '/student/cart' }}><ShoppingCart size={22} /></button>
					<button type="button" aria-label="Resources"><Layers3 size={22} /></button>
					<button type="button" className="student-dashboard__profile" aria-label="Open profile menu"><span className="student-dashboard__avatar"><UserRound size={20} /></span><strong>John Juma</strong><ChevronDown size={16} /></button>
				</div>
			</header>

			<main className="student-dashboard__main">{children}</main>
		</div>
	)
}
