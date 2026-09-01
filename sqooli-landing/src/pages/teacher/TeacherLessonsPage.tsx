import { Ban, ClipboardCheck, EllipsisVertical, Eye, FileQuestion, FileText, Filter, FolderOpen, Megaphone, Pencil, Plus, School, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import TeacherDashboardLayout from './TeacherDashboardLayout'
import TeacherCreateLessonModal from './TeacherCreateLessonModal'
import TeacherLessonWorkspace from './TeacherLessonWorkspace'
import TeacherStudentViewModal from './TeacherStudentViewModal'
import banner from '../../assets/images/programs/teachers-change-world.webp'
import '../../styles/pages/teacher-lessons.css'
import { useTeacherLessons } from '../../features/teacher/teacher.queries'

type TeacherLesson = { id?: number | string; name?: string; description?: string; created_at?: string; createdAt?: string; updatedAt?: string }

function extractLessons(payload: unknown): TeacherLesson[] {
	if (Array.isArray(payload)) return payload as TeacherLesson[]
	if (!payload || typeof payload !== 'object') return []
	const record = payload as Record<string, unknown>
	for (const key of ['data', 'items', 'results', 'lessons']) {
		if (Array.isArray(record[key])) return record[key] as TeacherLesson[]
		if (record[key] && typeof record[key] === 'object') {
			const nested = extractLessons(record[key])
			if (nested.length) return nested
		}
	}
	return []
}

export default function TeacherLessonsPage() {
    const [query, setQuery] = useState('')
    const [createOpen, setCreateOpen] = useState(false)
    const [workspaceOpen, setWorkspaceOpen] = useState(false)
    const [studentViewOpen, setStudentViewOpen] = useState(false)
    const [addOpen, setAddOpen] = useState(false)
    const [actionsFor, setActionsFor] = useState<number | null>(null)
    const [deactivateFor, setDeactivateFor] = useState<number | null>(null)
    const [editOpen, setEditOpen] = useState(false)
    const { data, isLoading, isError, refetch } = useTeacherLessons({ page: 1, pageSize: 50, search: query.trim() || undefined })
    const visibleLessons = useMemo(() => extractLessons(data).filter(lesson => (lesson.name || 'Untitled lesson').toLowerCase().includes(query.toLowerCase())), [data, query])

    return <TeacherDashboardLayout activePath="/teacher/lessons">
        <section className="teacher-lessons-page" aria-labelledby="teacher-lessons-title">
            <div className="teacher-lessons-page__layout">
                <TeacherAccountRail />
                <div className="teacher-lessons-page__content">
                    <header className="teacher-lessons-page__header">
                        <div><h1 id="teacher-lessons-title">Lessons</h1><p>Manage lessons you offer</p></div>
                        <div className="teacher-lessons-page__header-actions">
                            <div className="teacher-lessons-page__add-wrap"><button className="teacher-lessons-page__outline-action" type="button" onClick={() => setAddOpen(value => !value)}><Plus size={16} /> Add</button>{addOpen && <AddMenu onClose={() => setAddOpen(false)} />}</div>
                            <button className="teacher-lessons-page__create" type="button" onClick={() => setCreateOpen(true)}>Create Lesson</button>
                        </div>
                    </header>
                    <label className="teacher-lessons-page__search"><Search size={19} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search" aria-label="Search lessons" /><Filter size={18} /></label>
                    {isLoading && <p className="teacher-lessons-page__state" role="status">Loading your lessons…</p>}
                    {isError && <div className="teacher-lessons-page__state is-error" role="alert"><strong>We couldn’t load your lessons</strong><span>Something interrupted the connection. Please try again in a moment.</span><button type="button" onClick={() => refetch()}>Try again</button></div>}
                    {!isLoading && !isError && visibleLessons.length === 0 && <p className="teacher-lessons-page__state" role="status">No lessons match your search.</p>}
                    {!isLoading && !isError && <div className="teacher-lessons-page__grid">{visibleLessons.map((lesson, index) => { const id = lesson.id ?? `lesson-${index}`; const title = lesson.name || 'Untitled lesson'; return <article className="teacher-lessons-page__card" key={id}>
                        <header><h2>{title}</h2><button type="button" aria-label={`More actions for ${title}`} onClick={() => setActionsFor(Number(id))}><EllipsisVertical size={20} /></button>{actionsFor === Number(id) && <LessonActions onStudentView={() => { setStudentViewOpen(true); setActionsFor(null) }} onEdit={() => { setEditOpen(true); setActionsFor(null) }} onDeactivate={() => { setDeactivateFor(Number(id)); setActionsFor(null) }} />}</header>
                        <button className="teacher-lessons-page__banner" type="button" aria-label={`Open ${title}`} onClick={() => setWorkspaceOpen(true)}><img src={banner} alt="Teacher presenting a lesson" /></button>
                        <div className="teacher-lessons-page__meta"><span>Date Created: <b>{lesson.createdAt || lesson.created_at ? new Date(lesson.createdAt || lesson.created_at || '').toLocaleDateString() : 'Unavailable'}</b></span><span>Last Updated: <b>{lesson.updatedAt || 'Unavailable'}</b></span><button type="button" onClick={() => setWorkspaceOpen(true)}><Eye size={15} /> View</button></div>
                    </article>})}</div>}
                </div>
            </div>
        </section>
        {createOpen && <TeacherCreateLessonModal onClose={() => setCreateOpen(false)} onSubmitted={() => { setCreateOpen(false); refetch() }} />}
        {editOpen && <TeacherCreateLessonModal onClose={() => setEditOpen(false)} />}
        {workspaceOpen && <TeacherLessonWorkspace onClose={() => setWorkspaceOpen(false)} onStudentView={() => setStudentViewOpen(true)} />}
        {studentViewOpen && <TeacherStudentViewModal onClose={() => setStudentViewOpen(false)} />}
        {deactivateFor !== null && <DeactivateLessonModal onClose={() => setDeactivateFor(null)} onDeactivate={() => setDeactivateFor(null)} />}
    </TeacherDashboardLayout>
}

function TeacherAccountRail() {
    return <aside className="teacher-lessons-page__account"><div className="teacher-lessons-page__school-mark"><School size={25} /></div><h2>Mathematic Excellence<br />Academy</h2><span className="teacher-lessons-page__school-tag">Online School</span><p>Contact Information</p><strong>+254712 345 678</strong><strong>mathematicexcel@gmail.com</strong><button type="button">Switch Account</button><div className="teacher-lessons-page__referral"><Megaphone size={37} /><div><b>Refer &amp; Earn with Sqooli</b><small>Share your unique link to students &amp; parents to join Sqooli</small><button type="button"><ClipboardCheck size={14} /> Copy Link</button></div></div></aside>
}

function AddMenu({ onClose }: { onClose: () => void }) {
    const items = [[ClipboardCheck, 'Assignment'], [FileText, 'Exam'], [FileQuestion, 'Quiz'], [FolderOpen, 'Resources']] as const
    return <div className="teacher-lessons-page__menu teacher-lessons-page__add-menu">{items.map(([Icon, label]) => <button type="button" key={label} onClick={onClose}><Icon size={16} /> {label}</button>)}</div>
}

function LessonActions({ onStudentView, onEdit, onDeactivate }: { onStudentView: () => void; onEdit: () => void; onDeactivate: () => void }) {
    return <div className="teacher-lessons-page__menu teacher-lessons-page__actions-menu"><button type="button" onClick={onStudentView}><Eye size={16} /> Student View</button><button type="button" onClick={onEdit}><Pencil size={16} /> Edit Details</button><button type="button" onClick={onDeactivate}><Ban size={16} /> Deactivate</button></div>
}

function DeactivateLessonModal({ onClose, onDeactivate }: { onClose: () => void; onDeactivate: () => void }) {
    return <div className="teacher-lessons-page__modal-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}><section className="teacher-lessons-page__deactivate" role="dialog" aria-modal="true" aria-labelledby="deactivate-lesson-title"><header><h2 id="deactivate-lesson-title">Deactivate Lesson</h2><button type="button" aria-label="Close deactivate lesson" onClick={onClose}><X size={20} /></button></header><p>Are you sure you want to deactivate this lesson?</p><label>Reason for deactivation<textarea placeholder="Enter reason..." /></label><button className="is-danger" type="button" onClick={onDeactivate}>Deactivate Lesson</button></section></div>
}
