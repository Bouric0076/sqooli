/* eslint-disable react-refresh/only-export-components */
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import LoadingScreen from './components/LoadingScreen'
import './styles/base.css'
import './styles/components/loading.css'

const LandingPage = lazy(() => import('./pages/landing/LandingPage'))
const PopularPage = lazy(() => import('./pages/landing/popular'))
const PartnersPage = lazy(() => import('./pages/landing/PartnersPage'))
const ContactPage = lazy(() => import('./pages/landing/ContactPage'))
const QuestionBoardPage = lazy(() => import('./pages/landing/QuestionBoardPage'))
const SchoolsLandingPage = lazy(() => import('./pages/schools/SchoolsLandingPage'))
const SchoolListingsPage = lazy(() => import('./pages/schools/SchoolListingsPage'))
const SchoolTutorsPage = lazy(() => import('./pages/schools/SchoolTutorsPage'))
const SchoolProfilePage = lazy(() => import('./pages/schools/SchoolProfilePage'))
const SchoolComparisonPage = lazy(() => import('./pages/schools/SchoolComparisonPage'))
const SearchPage = lazy(() => import('./pages/search/SearchPage'))
const CourseDetailPage = lazy(() => import('./pages/courses/CourseDetailPage'))
const TimetablePage = lazy(() => import('./pages/classes/TimetablePage'))
const TutorProfilePage = lazy(() => import('./pages/tutors/TutorProfilePage'))
const OnboardingPage = lazy(() => import('./pages/student/OnboardingPage'))
const CreateAccountPage = lazy(() => import('./pages/student/CreateAccountPage'))
const LoginPage = lazy(() => import('./pages/student/LoginPage'))
const StudentDashboardPage = lazy(() => import('./pages/student/dashboard/StudentDashboardPage'))
const StudentProfilePage = lazy(() => import('./pages/student/dashboard/StudentProfilePage'))
const WalletPage = lazy(() => import('./pages/student/dashboard/WalletPage'))
const ResetPinPage = lazy(() => import('./pages/student/dashboard/ResetPinPage'))
const StudentAiPage = lazy(() => import('./pages/student/dashboard/StudentAiPage'))
const CartPage = lazy(() => import('./pages/student/dashboard/CartPage'))
const AssignmentsPage = lazy(() => import('./pages/student/dashboard/AssignmentsPage'))
const LessonsPage = lazy(() => import('./pages/student/dashboard/LessonsPage'))
const LessonDetailsPage = lazy(() => import('./pages/student/dashboard/LessonDetailsPage'))
const ForumsPage = lazy(() => import('./pages/student/dashboard/ForumsPage'))
const StudentTimetablePage = lazy(() => import('./pages/student/dashboard/StudentTimetablePage'))
const StudentTutorsPage = lazy(() => import('./pages/student/dashboard/StudentTutorsPage'))
const ActivityFeedPage = lazy(() => import('./pages/student/dashboard/ActivityFeedPage'))
const ClaimLessonPage = lazy(() => import('./pages/student/dashboard/ClaimLessonPage'))
const TeacherOnboardingPage = lazy(() => import('./pages/teacher/TeacherOnboardingPage'))
const TeacherApplicationPage = lazy(() => import('./pages/teacher/application/TeacherApplicationPage'))
const TeacherDashboardPage = lazy(() => import('./pages/teacher/TeacherDashboardPage'))
const TeacherWalletPage = lazy(() => import('./pages/teacher/TeacherWalletPage'))
const TeacherAssignmentsPage = lazy(() => import('./pages/teacher/TeacherAssignmentsPage'))
const TeacherLessonsPage = lazy(() => import('./pages/teacher/TeacherLessonsPage'))
const TeacherTutorsPage = lazy(() => import('./pages/teacher/TeacherTutorsPage'))
const TeacherStudentsPage = lazy(() => import('./pages/teacher/TeacherStudentsPage'))
const TeacherTimetablePage = lazy(() => import('./pages/teacher/TeacherTimetablePage'))
const TeacherAttendancePage = lazy(() => import('./pages/teacher/TeacherAttendancePage'))
const TeacherResourcesPage = lazy(() => import('./pages/teacher/TeacherResourcesPage'))
const TeacherSettingsPage = lazy(() => import('./pages/teacher/TeacherSettingsPage'))
const TeacherCartPage = lazy(() => import('./pages/teacher/TeacherCartPage'))
const TeacherCommunicationPage = lazy(() => import('./pages/teacher/TeacherCommunicationPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Suspense fallback={<LoadingScreen />}>
		<div className="page-shell">
		{pathname === '/login' ? (
			<LoginPage />
		) : pathname === '/student/profile' ? (
			<StudentProfilePage />
		) : pathname === '/student/wallet/reset-pin' ? (
			<ResetPinPage />
		) : pathname === '/student/wallet' ? (
			<WalletPage />
		) : pathname === '/student/ai' ? (
			<StudentAiPage />
		) : pathname === '/student/cart' || pathname === '/cart' ? (
			<CartPage />
		) : pathname === '/student/assignments' || pathname.startsWith('/student/assignments/') ? (
			<AssignmentsPage />
		) : pathname === '/student/lessons' ? (
			<LessonsPage />
		) : pathname.startsWith('/student/lessons/') ? (
			<LessonDetailsPage />
		) : pathname === '/student/forums' ? (
			<ForumsPage />
		) : pathname === '/student/timetable' ? (
			<StudentTimetablePage />
		) : pathname === '/student/tutors' ? (
			<StudentTutorsPage />
		) : pathname === '/student/activity' ? (
			<ActivityFeedPage />
		) : pathname === '/student/claim-lesson' ? (
			<ClaimLessonPage />
		) : pathname === '/student' || pathname === '/student/dashboard' ? (
			<StudentDashboardPage />
		) : pathname.startsWith('/teacher/application') ? (
			<TeacherApplicationPage />
		) : pathname === '/teacher/onboarding' ? (
			<TeacherOnboardingPage />
		) : pathname === '/teacher/dashboard' ? (
			<TeacherDashboardPage />
		) : pathname === '/teacher/wallet' ? (
			<TeacherWalletPage />
		) : pathname === '/teacher/lessons' ? (
			<TeacherLessonsPage />
		) : pathname === '/teacher/assignments' ? (
			<TeacherAssignmentsPage />
		) : pathname === '/teacher/tutors' ? (
			<TeacherTutorsPage />
		) : pathname === '/teacher/students' ? (
			<TeacherStudentsPage />
		) : pathname === '/teacher/timetable' ? (
			<TeacherTimetablePage />
		) : pathname === '/teacher/attendance' ? (
			<TeacherAttendancePage />
		) : pathname === '/teacher/resources' ? (
			<TeacherResourcesPage />
		) : pathname === '/teacher/settings' ? (
			<TeacherSettingsPage />
		) : pathname === '/teacher/cart' ? (
			<TeacherCartPage />
		) : pathname === '/teacher/messages' ? (
			<TeacherCommunicationPage />
		) : pathname === '/popular' ? (
			<PopularPage />
		) : pathname === '/onboarding/account' ? (
			<CreateAccountPage />
		) : pathname === '/onboarding' ? (
			<OnboardingPage />
		) : pathname === '/' ? (
			<LandingPage />
		) : pathname === '/partners' ? (
			<PartnersPage />
		) : pathname === '/contact' ? (
			<ContactPage />
		) : pathname === '/questions' ? (
			<QuestionBoardPage />
		) : pathname === '/search' ? (
			<SearchPage />
		) : pathname === '/courses/detail' ? (
			<CourseDetailPage />
		) : pathname === '/tutors/profile' || pathname === '/tutors/detail' ? (
			<TutorProfilePage />
        ) : pathname === '/classes/timetable' || pathname === '/timetable' ? (
          <TimetablePage />
		) : pathname === '/schools' ? (
			<SchoolsLandingPage />
		) : pathname === '/schools/listings' ? (
			<SchoolListingsPage />
		) : pathname === '/schools/compare' ? (
			<SchoolComparisonPage />
		) : pathname === '/schools/tutors' ? (
			<SchoolTutorsPage />
		) : pathname === '/schools/detail' || pathname === '/schools/profile' ? (
			<SchoolProfilePage />
		) : (
			<NotFoundPage />
		)}
		</div>
		</Suspense>
	</StrictMode>,
)
