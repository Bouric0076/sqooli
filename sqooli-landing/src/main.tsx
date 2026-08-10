/* eslint-disable react-refresh/only-export-components */
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import LoadingScreen from './components/LoadingScreen'
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
const TutorProfilePage = lazy(() => import('./pages/tutors/TutorProfilePage'))

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Suspense fallback={<LoadingScreen />}>
		<div className="page-shell">
		{pathname === '/popular' ? (
			<PopularPage />
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
          <CourseDetailPage initialTab="Timetable" />
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
			<LandingPage />
		)}
		</div>
		</Suspense>
	</StrictMode>,
)
