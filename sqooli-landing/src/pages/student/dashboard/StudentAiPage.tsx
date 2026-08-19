import { BookOpen, Mic, Plus, Search, UsersRound } from 'lucide-react'
import { useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import logo from '../../../assets/images/student-flow/sqooli-logo-v3.svg'
import '../../../styles/pages/student-ai.css'

const tabs = ['AI Mode', 'Lessons', 'Programs', 'Topics', 'Tutors', 'School', 'Questions']

export default function StudentAiPage() {
	const [prompt, setPrompt] = useState('')
	const submitPrompt = (event: React.FormEvent) => {
		event.preventDefault()
		const query = prompt.trim()
		if (query) window.location.href = `/search?tab=AI%20Mode&q=${encodeURIComponent(query)}&student=1`
	}
	const tabHref = (tab: string) => tab === 'AI Mode' ? '/student/ai' : tab === 'Lessons' ? '/search?tab=Classes&student=1' : tab === 'Programs' ? '/popular' : tab === 'School' ? '/schools' : tab === 'Questions' ? '/questions' : `/search?tab=${tab}&student=1`
	return <StudentDashboardLayout showSidebar={false}>
		<section className="student-ai-page" aria-labelledby="student-ai-title">
			<div className="student-ai-page__top"><a href="/student">← <span>Back to Dashboard</span></a><a className="student-ai-page__trending" href="/popular">Trending</a></div>
			<nav className="student-ai-page__tabs" aria-label="Student discovery navigation">{tabs.map((tab, index) => <a className={index === 0 ? 'is-active' : ''} href={tabHref(tab)} key={tab}>{tab}</a>)}</nav>
			<div className="student-ai-page__hero">
				<img src={logo} alt="Sqooli" />
				<h1 id="student-ai-title">What can I help you with?</h1>
				<form className="student-ai-page__prompt" onSubmit={submitPrompt}><Plus size={19} /><input type="text" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Ask Anything" aria-label="Ask Sqooli anything" /><button type="button" aria-label="Use voice input"><Mic size={19} /></button></form>
				<div className="student-ai-page__shortcuts"><a href="/search?tab=Tutors&student=1"><UsersRound size={18} /> Find Tutors</a><a href="/search?tab=Topics&student=1"><Search size={18} /> Find Learning Resources</a><a href="/search?tab=Classes&student=1"><BookOpen size={18} /> Find Lessons</a></div>
			</div>
		</section>
	</StudentDashboardLayout>
}
