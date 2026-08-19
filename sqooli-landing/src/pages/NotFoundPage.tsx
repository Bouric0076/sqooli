import { ArrowLeft, ArrowRight, Compass } from 'lucide-react'
import logo from '../assets/images/student-flow/sqooli-logo-v2.svg'
import '../styles/pages/not-found.css'

export default function NotFoundPage() {
	const goBack = () => {
		if (window.history.length > 1) window.history.back()
		else window.location.href = '/'
	}

	return <main className="not-found" aria-labelledby="not-found-title">
		<header className="not-found__header">
			<a href="/" className="not-found__logo" aria-label="Return to Sqooli home"><img src={logo} alt="Sqooli" /></a>
			<a className="not-found__home-link" href="/">Home <ArrowRight size={16} aria-hidden="true" /></a>
		</header>

		<section className="not-found__content">
			<div className="not-found__art" aria-hidden="true">
				<span className="not-found__digit">4</span>
				<span className="not-found__compass"><Compass size={74} strokeWidth={1.45} /></span>
				<span className="not-found__digit">4</span>
			</div>
			<p className="not-found__eyebrow">PAGE NOT FOUND</p>
			<h1 id="not-found-title">This lesson seems to be off the timetable.</h1>
			<p className="not-found__description">The page you’re looking for may have moved, or the link may be taking a little break. Let’s get you back to learning.</p>
			<div className="not-found__actions">
				<a className="not-found__primary" href="/">Back to Sqooli <ArrowRight size={17} aria-hidden="true" /></a>
				<button className="not-found__secondary" type="button" onClick={goBack}><ArrowLeft size={16} aria-hidden="true" /> Go back</button>
			</div>
			<a className="not-found__support-link" href="/onboarding">New to Sqooli? Get started</a>
		</section>
	</main>
}
