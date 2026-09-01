import { ArrowRight, BookOpen, ChevronLeft, Clock3, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { submitQuiz } from '../../../api/assessments'

type AssessmentQuestion = { id?: number | string; text?: string; question?: string; options?: Array<{ text?: string; optionText?: string; label?: string } | string> }
type Assessment = { id?: number | string; title?: string; name?: string; description?: string; questions?: unknown[] }
type AssignmentQuizModalProps = { onClose: () => void; resultMode?: 'passed' | 'failed'; assessment?: Assessment }

export default function AssignmentQuizModal({ onClose, resultMode, assessment }: AssignmentQuizModalProps) {
	const [question, setQuestion] = useState(1)
	const [selectedOption, setSelectedOption] = useState('')
	const [answers, setAnswers] = useState<Record<number, string>>({})
	const [secondsLeft, setSecondsLeft] = useState(2963)
	const [submitted, setSubmitted] = useState(Boolean(resultMode))
	const submit = useMutation({ mutationFn: submitQuiz, onSuccess: () => setSubmitted(true) })
	const questions = (assessment?.questions || []).filter(Boolean) as AssessmentQuestion[]
	const totalQuestions = questions.length || 0
	const currentQuestion = questions[question - 1]
	useEffect(() => {
		if (submitted) return undefined
		const timer = window.setInterval(() => setSecondsLeft(seconds => Math.max(0, seconds - 1)), 1000)
		return () => window.clearInterval(timer)
	}, [submitted])
	const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0')
	const seconds = (secondsLeft % 60).toString().padStart(2, '0')
	const progress = totalQuestions ? Math.round((question / totalQuestions) * 100) : 0
	const goNext = () => {
		if (selectedOption) setAnswers(current => ({ ...current, [question]: selectedOption }))
		if (question < totalQuestions) { setQuestion(current => current + 1); setSelectedOption(answers[question + 1] || '') }
		else if (assessment?.id !== undefined) submit.mutate({ quizId: assessment.id, answers: Object.entries({ ...answers, [question]: selectedOption }).map(([index, answer]) => ({ questionId: questions[Number(index) - 1]?.id ?? Number(index), selectedOptionLabel: answer })) })
	}
	const goPrevious = () => { if (question > 1) { setQuestion(current => current - 1); setSelectedOption('') } }

	const passed = resultMode === 'passed'
	const options = currentQuestion?.options?.map(option => typeof option === 'string' ? option : option.text || option.optionText || option.label || '').filter(Boolean) || []
	return <div className="student-assignment-modal__backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}><section className="student-assignment-quiz" role="dialog" aria-modal="true" aria-labelledby="assignment-quiz-title"><div className="student-assignment-modal__art" /><button type="button" className="student-assignment-quiz__close" aria-label="Close assignment" onClick={onClose}><X size={22} /></button><header className="student-assignment-quiz__header"><div><div className="student-assignment-modal__label"><BookOpen size={16} /> Assessment</div><h1 id="assignment-quiz-title">{assessment?.title || assessment?.name || 'Assessment'}</h1><div className="student-assignment-modal__meta"><span>{totalQuestions} Questions</span><span>{assessment?.description || 'Complete the assessment below.'}</span></div></div>{!submitted && <div className="student-assignment-quiz__status"><div><b>{progress}% complete</b><span><i style={{ width: `${progress}%` }} /></span></div><div className={`student-assignment-quiz__timer${secondsLeft <= 60 ? ' is-urgent' : ''}`}><Clock3 size={20} /><strong>{minutes}:{seconds}</strong><small>Time Left</small></div></div>}</header>{submitted ? <main className={`student-assignment-result${passed ? '' : ' is-failed'}`}><div className="student-assignment-result__banner"><div className="student-assignment-result__rule"><i /><span><Star size={21} fill="currentColor" /></span><i /></div><h2>{passed ? 'Submission received' : 'Submission failed'}</h2><p>{passed ? 'Your answers were submitted successfully.' : 'The assessment could not be submitted.'}</p></div><footer><button type="button" onClick={onClose}>Close</button></footer></main> : <main className="student-assignment-quiz__card"><h2>Question {question}</h2><p>{currentQuestion?.text || currentQuestion?.question || 'This assessment did not return question content.'}</p><fieldset><legend className="sr-only">Choose an answer</legend>{options.length ? options.map(option => <label key={option}><input type="radio" name="assignment-option" value={option} checked={selectedOption === option} onChange={() => setSelectedOption(option)} /><span>{option}</span></label>) : <p role="status">No answer options were supplied for this question.</p>}</fieldset>{submit.isError && <p role="alert">We couldn’t submit your answers. Please try again.</p>}<footer><button type="button" disabled={question === 1} onClick={goPrevious}><ChevronLeft size={15} /> Previous</button><button type="button" disabled={!selectedOption || submit.isPending || !totalQuestions} onClick={goNext}>{submit.isPending ? 'Submitting…' : question === totalQuestions ? 'Submit' : 'Next'} <ArrowRight size={15} /></button></footer></main>}</section></div>
}
