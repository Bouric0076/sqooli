import { ArrowLeft, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import StudentDashboardLayout from './StudentDashboardLayout'
import '../../../styles/pages/student-feature-unavailable.css'

type Props = { title: string; description: string; activePath?: string; showSidebar?: boolean }

export default function StudentFeatureUnavailablePage({ title, description, activePath = '/student', showSidebar = true }: Props) {
	return <StudentDashboardLayout activePath={activePath} showSidebar={showSidebar} variant="complete">
		<section className="student-feature-unavailable" aria-labelledby="student-feature-unavailable-title">
			<Link className="student-feature-unavailable__back" to="/student"><ArrowLeft size={17} /> Back to Dashboard</Link>
			<div className="student-feature-unavailable__card">
				<div className="student-feature-unavailable__icon" aria-hidden="true"><Clock3 size={26} /></div>
				<p className="student-feature-unavailable__eyebrow">Coming soon</p>
				<h1 id="student-feature-unavailable-title">{title}</h1>
				<p>{description}</p>
				<Link className="student-feature-unavailable__action" to="/student/lessons">Continue to Lessons</Link>
			</div>
		</section>
	</StudentDashboardLayout>
}
