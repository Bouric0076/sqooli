import StudentDashboardLayout from './StudentDashboardLayout'
import StudentProfileModal from './StudentProfileModal'

export default function StudentProfilePage() {
	return <StudentDashboardLayout><StudentProfileModal onClose={() => { window.location.href = '/student' }} onSaved={() => { window.location.href = '/student' }} /></StudentDashboardLayout>
}
