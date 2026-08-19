import { BookOpen, ChevronDown, FileQuestion, FileText, FolderOpen, X } from 'lucide-react'
import { useState } from 'react'
import '../../styles/pages/teacher-lesson-add.css'

type AddKind = 'assignment' | 'exam' | 'quiz' | 'resource'
type ResourceKind = 'Books' | 'Notes' | 'Videos'

type Props = {
    kind: AddKind
    onClose: () => void
    onAdded?: (label: string) => void
}

const labels: Record<Exclude<AddKind, 'resource'>, { title: string; subtitle: string; field: string; action: string }> = {
    assignment: { title: 'Add Assignment', subtitle: 'Select assignment to add to this lesson', field: 'Assignment', action: 'Add Assignment' },
    exam: { title: 'Add Exam', subtitle: 'Select exam to add to this lesson', field: 'Exam', action: 'Add Exam' },
    quiz: { title: 'Add Quiz', subtitle: 'Select quiz to add to this lesson', field: 'Quiz', action: 'Add Quiz' },
}

const existingItems: Record<Exclude<AddKind, 'resource'>, string[]> = {
    assignment: ['Select an assignment', 'Term 1 Mathematics Assignment', 'Holiday Revision Assignment'],
    exam: ['Select an exam', 'Form 4 Physics Mid-term Exam', 'CBC Grade 6 Assessment'],
    quiz: ['Select a quiz', 'Atoms and Matter Quiz', 'Introduction to Physics Quiz'],
}

const resourceItems: Record<ResourceKind, string[]> = {
    Books: ['Select a book', 'Physics Form 4 Handbook', 'CBC Science Reference'],
    Notes: ['Select notes', 'Atoms and Matter Notes', 'Term 3 Revision Notes'],
    Videos: ['Select a video', 'Introduction to Atoms', 'Physics Form 4 Revision'],
}

export default function TeacherLessonAddModal({ kind, onClose, onAdded }: Props) {
    const [resourceKind, setResourceKind] = useState<ResourceKind>('Books')
    const [selected, setSelected] = useState('')
    const [newItem, setNewItem] = useState('')
    const [addingNew, setAddingNew] = useState(false)
    const isResource = kind === 'resource'
    const config = isResource ? null : labels[kind]
    const field = isResource ? resourceKind.slice(0, -1) : config!.field
    const options = isResource ? resourceItems[resourceKind] : existingItems[kind]
    const itemValue = newItem.trim() || selected
    const title = isResource ? 'Add Resource' : config!.title
    const subtitle = isResource ? 'Select resource to add to this lesson' : config!.subtitle
    const action = isResource ? 'Add Resource' : config!.action

    const changeResourceKind = (value: ResourceKind) => {
        setResourceKind(value)
        setSelected('')
        setNewItem('')
        setAddingNew(false)
    }

    const submit = () => {
        if (!itemValue) return
        onAdded?.(itemValue)
        onClose()
    }

    return <div className="teacher-lesson-add__backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
        <section className="teacher-lesson-add" role="dialog" aria-modal="true" aria-labelledby="teacher-lesson-add-title">
            <header className="teacher-lesson-add__header">
                <div><h2 id="teacher-lesson-add-title">{title}</h2><p>{subtitle}</p></div>
                <button type="button" aria-label={`Close ${title}`} onClick={onClose}><X size={21} /></button>
            </header>
            <div className="teacher-lesson-add__body">
                {isResource && <fieldset className="teacher-lesson-add__resource-types"><legend>Resource Type</legend><div>{(['Books', 'Notes', 'Videos'] as ResourceKind[]).map(item => <label key={item}><input type="radio" name="resource-type" checked={resourceKind === item} onChange={() => changeResourceKind(item)} /> <span>{item}</span></label>)}</div></fieldset>}
                <div className="teacher-lesson-add__field-heading"><label htmlFor="teacher-lesson-add-select">{field}</label><button type="button" onClick={() => { setAddingNew(value => !value); setNewItem(''); setSelected('') }}>{addingNew ? 'Use Existing' : 'Add New'}</button></div>
                {addingNew ? <input className="teacher-lesson-add__new-input" autoFocus value={newItem} onChange={event => setNewItem(event.target.value)} placeholder={`Enter ${field.toLowerCase()} name`} /> : <div className="teacher-lesson-add__select"><select id="teacher-lesson-add-select" value={selected} onChange={event => setSelected(event.target.value)}><option value="">Type to search</option>{options.slice(1).map(option => <option key={option} value={option}>{option}</option>)}</select><ChevronDown size={17} /></div>}
            </div>
            <footer className="teacher-lesson-add__footer"><button type="button" disabled={!itemValue} onClick={submit}>{action}</button></footer>
        </section>
    </div>
}

export function AddKindIcon({ kind }: { kind: AddKind }) {
    if (kind === 'assignment') return <FileText size={15} />
    if (kind === 'exam') return <BookOpen size={15} />
    if (kind === 'quiz') return <FileQuestion size={15} />
    return <FolderOpen size={15} />
}

export type { AddKind }
