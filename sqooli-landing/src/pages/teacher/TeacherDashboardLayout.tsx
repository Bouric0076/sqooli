import { Bell, BookOpen, CalendarDays, CheckSquare, ClipboardCheck, FileCheck2, LayoutDashboard, LogOut, Menu, MessageCircle, Package, Settings, ShoppingCart, UserRound, UsersRound, X, ChevronDown, type LucideIcon } from 'lucide-react'
import { type ReactNode, useEffect, useRef } from 'react'
import { useState } from 'react'
import logo from '../../assets/images/student-flow/sqooli-logo-teacher.svg'
import '../../styles/pages/teacher-dashboard.css'
import '../../styles/pages/teacher-modal-responsive.css'
import { logout } from '../../auth/auth.service'
import { useTeacherProfile } from '../../features/teacher/teacher.queries'

type TeacherDashboardLayoutProps = { children: ReactNode; activePath?: string }
type TeacherNotification = { id: number; message: string; time: string; unread: boolean }

const navigation: Array<{ label: string; href: string; icon: LucideIcon }> = [
	{ label: 'Dashboard', href: '/teacher/dashboard', icon: LayoutDashboard },
	{ label: 'Lessons', href: '/teacher/lessons', icon: BookOpen },
	{ label: 'Assignments', href: '/teacher/assignments', icon: FileCheck2 },
	{ label: 'Tutors', href: '/teacher/tutors', icon: UserRound },
	{ label: 'Students', href: '/teacher/students', icon: UsersRound },
	{ label: 'My Timetable', href: '/teacher/timetable', icon: CalendarDays },
	{ label: 'Approvals', href: '/teacher/approvals', icon: ClipboardCheck },
	{ label: 'Attendance', href: '/teacher/attendance', icon: CheckSquare },
	{ label: 'Resources', href: '/teacher/resources', icon: CheckSquare },
]

const initialNotifications: TeacherNotification[] = [
	{ id: 1, message: 'Withdrawal of KES 2,000.00 completed successfully', time: '8 min ago', unread: true },
	{ id: 2, message: 'Withdrawal of KES 2,000.00 completed successfully', time: '8 min ago', unread: false },
	{ id: 3, message: 'Withdrawal of KES 2,000.00 completed successfully', time: '8 min ago', unread: false },
	{ id: 4, message: 'Withdrawal of KES 2,000.00 completed successfully', time: '8 min ago', unread: false },
]

export default function TeacherDashboardLayout({ children, activePath = '/teacher/dashboard' }: TeacherDashboardLayoutProps) {
	const profileQuery = useTeacherProfile()
	const profile = unwrapProfile(profileQuery.data)
	const displayName = profile?.fullName || 'Teacher'
	const initials = displayName.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase()
	const [menuOpen, setMenuOpen] = useState(false)
	const [notificationsOpen, setNotificationsOpen] = useState(false)
	const [notificationFilter, setNotificationFilter] = useState<'all' | 'unread'>('all')
	const [notifications, setNotifications] = useState(initialNotifications)
	const [profileOpen, setProfileOpen] = useState(false)
	const notificationsRef = useRef<HTMLElement | null>(null)
	const profileRef = useRef<HTMLDivElement | null>(null)
	const unreadCount = notifications.filter(notification => notification.unread).length
	const visibleNotifications = notificationFilter === 'unread' ? notifications.filter(notification => notification.unread) : notifications

	useEffect(() => {
		const dismissMenus = (event: PointerEvent) => {
			const target = event.target as Node
			if (!notificationsRef.current?.contains(target)) setNotificationsOpen(false)
			if (!profileRef.current?.contains(target)) setProfileOpen(false)
		}
		const dismissOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setNotificationsOpen(false); setProfileOpen(false) } }
		document.addEventListener('pointerdown', dismissMenus)
		document.addEventListener('keydown', dismissOnEscape)
		return () => { document.removeEventListener('pointerdown', dismissMenus); document.removeEventListener('keydown', dismissOnEscape) }
	}, [])

	return <div className="teacher-dashboard">
		<header className="teacher-dashboard__header">
			<div className="teacher-dashboard__topbar">
				<button className="teacher-dashboard__menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
				<a href="/" className="teacher-dashboard__brand" aria-label="Return to Sqooli home"><img src={logo} alt="Sqooli" /></a>
				<div className="teacher-dashboard__account-actions" aria-label="Account actions">
					<a className="teacher-dashboard__action-link" href="/teacher/wallet" aria-label="Wallet"><Package size={22} /></a>
					<a className="teacher-dashboard__action-link" href="/teacher/messages" aria-label="Messages"><MessageCircle size={22} /></a>
					<button className="teacher-dashboard__notification-button" type="button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen(current => !current); setProfileOpen(false) }}><Bell size={22} />{unreadCount > 0 && <span className="teacher-dashboard__notification-badge">{unreadCount}</span>}</button>
					<a className="teacher-dashboard__action-link" href="/teacher/cart" aria-label="Cart"><ShoppingCart size={22} /></a>
					<a className="teacher-dashboard__action-link" href="/teacher/settings" aria-label="Settings"><Settings size={22} /></a>
					<div className="teacher-dashboard__profile" ref={profileRef}><button className="teacher-dashboard__profile-trigger" type="button" aria-expanded={profileOpen} onClick={() => { setProfileOpen(current => !current); setNotificationsOpen(false) }}><span className="teacher-dashboard__avatar">{initials || 'T'}</span><span><strong>{displayName}</strong><small>Teacher</small></span><ChevronDown size={16} /></button>{profileOpen && <div className="teacher-dashboard__profile-menu"><a href="/teacher/tutors"><UserRound size={16} /> Teacher’s profile</a><a href="/teacher/settings"><Settings size={16} /> Settings</a><button type="button" onClick={() => { logout(); window.location.href = '/login' }}><LogOut size={16} /> Log out</button></div>}</div>
				</div>
			</div>
			{menuOpen && <button className="teacher-dashboard__backdrop" type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
			<nav className={`teacher-dashboard__nav${menuOpen ? ' is-open' : ''}`} aria-label="Teacher dashboard navigation">
				{navigation.map(({ label, href, icon: Icon }) => <a className={activePath === href ? 'is-active' : ''} href={href} onClick={() => setMenuOpen(false)} key={label}><Icon size={22} /><span>{label}</span></a>)}
			</nav>
			{notificationsOpen && <section ref={notificationsRef} className="teacher-notifications" role="dialog" aria-label="Notifications">
				<header className="teacher-notifications__header"><h2>Notifications {unreadCount > 0 && <span>{unreadCount}</span>}</h2><button type="button" onClick={() => setNotifications(items => items.map(notification => ({ ...notification, unread: false })))}>Mark All as Read</button></header>
				<div className="teacher-notifications__tabs" role="tablist" aria-label="Notification filter"><button className={notificationFilter === 'all' ? 'is-active' : ''} type="button" role="tab" aria-selected={notificationFilter === 'all'} onClick={() => setNotificationFilter('all')}>All</button><button className={notificationFilter === 'unread' ? 'is-active' : ''} type="button" role="tab" aria-selected={notificationFilter === 'unread'} onClick={() => setNotificationFilter('unread')}>Unread</button></div>
				<div className="teacher-notifications__list">{visibleNotifications.length > 0 ? visibleNotifications.map(notification => <article className="teacher-notifications__item" key={notification.id}><p>{notification.message}</p><small>{notification.time}</small>{notification.unread && <i aria-label="Unread" />}</article>) : <p className="teacher-notifications__empty">You’re all caught up.</p>}</div>
			</section>}
		</header>
		<main className="teacher-dashboard__main">{children}</main>
	</div>
}

function unwrapProfile(payload: unknown): { fullName?: string; email?: string; phone?: string; address?: string } | null {
	if (!payload || typeof payload !== 'object') return null
	const value = (payload as { data?: unknown }).data ?? payload
	return value && typeof value === 'object' ? value as { fullName?: string; email?: string; phone?: string; address?: string } : null
}
