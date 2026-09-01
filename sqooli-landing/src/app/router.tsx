/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import { RequireAuth, RequireDashboard } from '../auth/guards'

const LandingPage = lazy(() => import('../pages/landing/LandingPage'))
const PopularPage = lazy(() => import('../pages/landing/popular'))
const PartnersPage = lazy(() => import('../pages/landing/PartnersPage'))
const ContactPage = lazy(() => import('../pages/landing/ContactPage'))
const QuestionBoardPage = lazy(() => import('../pages/landing/QuestionBoardPage'))
const SchoolsLandingPage = lazy(() => import('../pages/schools/SchoolsLandingPage'))
const SchoolListingsPage = lazy(() => import('../pages/schools/SchoolListingsPage'))
const SchoolTutorsPage = lazy(() => import('../pages/schools/SchoolTutorsPage'))
const SchoolProfilePage = lazy(() => import('../pages/schools/SchoolProfilePage'))
const SchoolComparisonPage = lazy(() => import('../pages/schools/SchoolComparisonPage'))
const SearchPage = lazy(() => import('../pages/search/SearchPage'))
const CourseDetailPage = lazy(() => import('../pages/courses/CourseDetailPage'))
const TimetablePage = lazy(() => import('../pages/classes/TimetablePage'))
const TutorProfilePage = lazy(() => import('../pages/tutors/TutorProfilePage'))
const OnboardingPage = lazy(() => import('../pages/auth/OnboardingPage'))
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'))
const LoginPage = lazy(() => import('../pages/auth/LoginPage'))
const VerifyEmailPage = lazy(() => import('../pages/auth/VerifyEmailPage'))
const RegistrationCompletionPage = lazy(() => import('../pages/auth/RegistrationCompletionPage'))
const VerificationSentPage = lazy(() => import('../pages/auth/VerificationSentPage'))
const SetPasswordPage = lazy(() => import('../pages/auth/SetPasswordPage'))
const StudentDashboardPage = lazy(() => import('../pages/student/dashboard/StudentDashboardPage'))
const StudentProfilePage = lazy(() => import('../pages/student/dashboard/StudentProfilePage'))
const WalletPage = lazy(() => import('../pages/student/dashboard/WalletPage'))
const ResetPinPage = lazy(() => import('../pages/student/dashboard/ResetPinPage'))
const AssignmentsPage = lazy(() => import('../pages/student/dashboard/AssignmentsPage'))
const LessonsPage = lazy(() => import('../pages/student/dashboard/LessonsPage'))
const StudentTimetablePage = lazy(() => import('../pages/student/dashboard/StudentTimetablePage'))
const StudentTutorsPage = lazy(() => import('../pages/student/dashboard/StudentTutorsPage'))
const ActivityFeedPage = lazy(() => import('../pages/student/dashboard/ActivityFeedPage'))
const StudentFeatureUnavailablePage = lazy(() => import('../pages/student/dashboard/StudentFeatureUnavailablePage'))
const TeacherOnboardingPage = lazy(() => import('../pages/teacher/TeacherOnboardingPage'))
const TeacherApplicationPage = lazy(() => import('../pages/teacher/application/TeacherApplicationPage'))
const TeacherDashboardPage = lazy(() => import('../pages/teacher/TeacherDashboardPage'))
const TeacherWalletPage = lazy(() => import('../pages/teacher/TeacherWalletPage'))
const TeacherAssignmentsPage = lazy(() => import('../pages/teacher/TeacherAssignmentsPage'))
const TeacherLessonsPage = lazy(() => import('../pages/teacher/TeacherLessonsPage'))
const TeacherTutorsPage = lazy(() => import('../pages/teacher/TeacherTutorsPage'))
const TeacherStudentsPage = lazy(() => import('../pages/teacher/TeacherStudentsPage'))
const TeacherTimetablePage = lazy(() => import('../pages/teacher/TeacherTimetablePage'))
const TeacherAttendancePage = lazy(() => import('../pages/teacher/TeacherAttendancePage'))
const TeacherResourcesPage = lazy(() => import('../pages/teacher/TeacherResourcesPage'))
const TeacherSettingsPage = lazy(() => import('../pages/teacher/TeacherSettingsPage'))
const TeacherCartPage = lazy(() => import('../pages/teacher/TeacherCartPage'))
const TeacherCommunicationPage = lazy(() => import('../pages/teacher/TeacherCommunicationPage'))
const ForbiddenPage = lazy(() => import('../pages/ForbiddenPage'))

function PageBoundary() {
	return <Suspense fallback={<LoadingScreen />}><Outlet /></Suspense>
}

function PlaceholderDashboard({ label }: { label: string }) {
	return <main style={{ maxWidth: 760, margin: '12vh auto', padding: 24, textAlign: 'center' }}><h1>{label} dashboard</h1><p>This dashboard is now protected and routed from the backend dashboard key. Its feature modules are next in the implementation sequence.</p></main>
}

const studentRoutes = [
	{ path: '/student', element: <StudentDashboardPage /> },
	{ path: '/student/dashboard', element: <Navigate to="/student" replace /> },
	{ path: '/student/profile', element: <StudentProfilePage /> },
	{ path: '/student/wallet', element: <WalletPage /> },
	{ path: '/student/wallet/reset-pin', element: <ResetPinPage /> },
	{ path: '/student/ai', element: <StudentFeatureUnavailablePage title="Sqooli AI is coming soon" description="We’re preparing guided learning support and recommendations for your account." /> },
	{ path: '/student/cart', element: <StudentFeatureUnavailablePage title="Shopping Cart is coming soon" description="Purchasing and checkout will be available here once the student store is connected." /> },
	{ path: '/cart', element: <Navigate to="/student/cart" replace /> },
	{ path: '/student/assignments', element: <AssignmentsPage /> },
	{ path: '/student/assignments/*', element: <AssignmentsPage /> },
	{ path: '/student/lessons', element: <LessonsPage /> },
	{ path: '/student/lessons/:id', element: <StudentFeatureUnavailablePage title="Lesson details are coming soon" description="Detailed topics, resources, assessments, tutor information, and lesson actions will be available here soon." /> },
	{ path: '/student/lessons/*', element: <StudentFeatureUnavailablePage title="Lesson details are coming soon" description="Detailed topics, resources, assessments, tutor information, and lesson actions will be available here soon." /> },
	{ path: '/student/forums', element: <StudentFeatureUnavailablePage title="Forums are coming soon" description="We’re preparing a safe space for students to ask questions, share ideas, and learn together." /> },
	{ path: '/student/timetable', element: <StudentTimetablePage /> },
	{ path: '/student/tutors', element: <StudentTutorsPage /> },
	{ path: '/student/activity', element: <ActivityFeedPage /> },
	{ path: '/student/performance', element: <StudentFeatureUnavailablePage title="Performance insights are coming soon" description="Detailed scores, progress trends, and subject insights will appear here once assessment results are available." /> },
	{ path: '/student/claim-lesson', element: <StudentFeatureUnavailablePage title="Lesson claiming is coming soon" description="Lesson-code redemption will be enabled once the entitlement service is connected." /> },
]

const teacherRoutes = [
	{ path: '/teacher/dashboard', element: <TeacherDashboardPage /> },
	{ path: '/teacher/wallet', element: <TeacherWalletPage /> },
	{ path: '/teacher/lessons', element: <TeacherLessonsPage /> },
	{ path: '/teacher/assignments', element: <TeacherAssignmentsPage /> },
	{ path: '/teacher/tutors', element: <TeacherTutorsPage /> },
	{ path: '/teacher/students', element: <TeacherStudentsPage /> },
	{ path: '/teacher/timetable', element: <TeacherTimetablePage /> },
	{ path: '/teacher/attendance', element: <TeacherAttendancePage /> },
	{ path: '/teacher/resources', element: <TeacherResourcesPage /> },
	{ path: '/teacher/settings', element: <TeacherSettingsPage /> },
	{ path: '/teacher/cart', element: <TeacherCartPage /> },
	{ path: '/teacher/messages', element: <TeacherCommunicationPage /> },
	{ path: '/teacher/onboarding', element: <TeacherOnboardingPage /> },
	{ path: '/teacher/application/*', element: <TeacherApplicationPage /> },
]

export const router = createBrowserRouter([
	{
		element: <PageBoundary />,
		children: [
			{ path: '/', element: <LandingPage /> },
			{ path: '/login', element: <LoginPage /> },
			{ path: '/popular', element: <PopularPage /> },
			{ path: '/partners', element: <PartnersPage /> },
			{ path: '/contact', element: <ContactPage /> },
			{ path: '/questions', element: <QuestionBoardPage /> },
			{ path: '/search', element: <SearchPage /> },
			{ path: '/courses/detail', element: <CourseDetailPage /> },
			{ path: '/tutors/profile', element: <TutorProfilePage /> },
			{ path: '/tutors/detail', element: <TutorProfilePage /> },
			{ path: '/classes/timetable', element: <TimetablePage /> },
			{ path: '/timetable', element: <TimetablePage /> },
			{ path: '/schools', element: <SchoolsLandingPage /> },
			{ path: '/schools/listings', element: <SchoolListingsPage /> },
			{ path: '/schools/compare', element: <SchoolComparisonPage /> },
			{ path: '/schools/tutors', element: <SchoolTutorsPage /> },
			{ path: '/schools/detail', element: <SchoolProfilePage /> },
			{ path: '/schools/profile', element: <SchoolProfilePage /> },
			{ path: '/onboarding', element: <OnboardingPage /> },
			{ path: '/onboarding/account', element: <RegisterPage /> },
			{ path: '/onboarding/verify', element: <VerifyEmailPage /> },
			// Backend verification emails currently use /verify-email. Keep this
			// compatibility route until the email template is aligned.
			{ path: '/verify-email', element: <VerifyEmailPage /> },
			{ path: '/onboarding/verification-sent', element: <VerificationSentPage /> },
			{ path: '/set-password', element: <SetPasswordPage /> },
			{ path: '/onboarding/set-password', element: <SetPasswordPage /> },
			{ path: '/forbidden', element: <ForbiddenPage /> },
			{
				element: <RequireAuth />,
				children: [
					{ path: '/onboarding/complete', element: <RegistrationCompletionPage /> },
					{ element: <RequireDashboard dashboard="student" />, children: studentRoutes },
					{ element: <RequireDashboard dashboard="teacher" />, children: teacherRoutes },
					{ path: '/parent/dashboard', element: <RequireDashboard dashboard="parent" />, children: [{ index: true, element: <PlaceholderDashboard label="Parent" /> }] },
					{ path: '/school/dashboard', element: <RequireDashboard dashboard="school" />, children: [{ index: true, element: <PlaceholderDashboard label="School" /> }] },
					{ path: '/admin/dashboard', element: <RequireDashboard dashboard="admin" />, children: [{ index: true, element: <PlaceholderDashboard label="Platform admin" /> }] },
				],
			},
		],
	},
])
