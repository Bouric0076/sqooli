import { ArrowLeft, Check, ChevronLeft, CircleCheckBig } from 'lucide-react'
import { useRef, useState } from 'react'
import StudentDashboardLayout from './StudentDashboardLayout'
import machineLearningArt from '../../../assets/images/student-flow/machine-learning.svg'
import '../../../styles/pages/student-claim-lesson.css'

const codeLength = 6

export default function ClaimLessonPage() {
    const [code, setCode] = useState<string[]>(Array(codeLength).fill(''))
    const [message, setMessage] = useState('')
    const [claimed, setClaimed] = useState(false)
    const inputs = useRef<Array<HTMLInputElement | null>>([])
    const updateCode = (index: number, value: string) => {
        const nextValue = value.replace(/[^a-z0-9]/gi, '').slice(-1).toUpperCase()
        const next = [...code]
        next[index] = nextValue
        setCode(next)
        if (nextValue && index < codeLength - 1) inputs.current[index + 1]?.focus()
        if (message) setMessage('')
    }
    const submitCode = (event: React.FormEvent) => {
        event.preventDefault()
        if (code.some(value => !value)) {
            setMessage('Enter the complete access code to continue.')
            return
        }
        setClaimed(true)
    }

    return <StudentDashboardLayout showSidebar={false} activePath="/student/claim-lesson">
        <section className="student-claim-lesson-page" aria-labelledby="claim-lesson-title">
            <a className="student-claim-lesson-page__back" href="/student"><ArrowLeft size={18} /> Back to Dashboard</a>
            {claimed ? <section className="student-claim-success" aria-labelledby="claim-success-title"><div className="student-claim-success__icon"><CircleCheckBig size={55} strokeWidth={1.25} /></div><h1 id="claim-success-title">Congratulations!</h1><p>You have successfully claimed your lesson. Login to your<br className="student-claim-lesson-page__desktop-break" /> account to start learning.</p><div className="student-claim-ticket"><p>You just got a Sqooli Scholarship! Use it<br /> wisely.</p><strong>10 LESSONS</strong><div><span>Redemption<b>Online</b></span><span>Validity<b>3 Months</b></span><span>Use<b>Multiple</b></span></div></div><a href="/search?student=1&tab=Classes&q=Math&claim=1">Claim Lessons</a></section> : <div className="student-claim-lesson-page__content">
                <img className="student-claim-lesson-page__art" src={machineLearningArt} alt="Sqooli learning assistant" />
                <div className="student-claim-lesson-page__form-wrap">
                    <h1 id="claim-lesson-title">Claim your Lesson</h1>
                    <p>Enter access code provided via WhatsApp AI Agent to<br className="student-claim-lesson-page__desktop-break" /> claim your lesson</p>
                    <form onSubmit={submitCode}>
                        <div className="student-claim-lesson-page__code" aria-label="Lesson access code">{code.map((value, index) => <input key={index} ref={element => { inputs.current[index] = element }} value={value} onChange={event => updateCode(index, event.target.value)} onKeyDown={event => { if (event.key === 'Backspace' && !code[index] && index > 0) inputs.current[index - 1]?.focus() }} maxLength={1} autoComplete="one-time-code" aria-label={`Access code character ${index + 1}`} />)}</div>
                        <button className="student-claim-lesson-page__submit" type="submit"><Check size={16} /> Claim Lesson</button>
                    </form>
                    {message && <p className="student-claim-lesson-page__message" role="status">{message}</p>}
                    <a className="student-claim-lesson-page__back-link" href="/student"><ChevronLeft size={15} /> Return to dashboard</a>
                </div>
            </div>}
        </section>
    </StudentDashboardLayout>
}
