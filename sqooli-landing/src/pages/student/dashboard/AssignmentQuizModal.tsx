import { ArrowRight, BookOpen, ChevronLeft, Clock3, Download, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type AssignmentQuizModalProps = { onClose: () => void; resultMode?: 'passed' | 'failed' }

export default function AssignmentQuizModal({ onClose, resultMode }: AssignmentQuizModalProps) {
	const [question, setQuestion] = useState(1)
	const [selectedOption, setSelectedOption] = useState('')
	const [secondsLeft, setSecondsLeft] = useState(2963)
	const [submitted, setSubmitted] = useState(Boolean(resultMode))
	useEffect(() => {
		if (submitted) return undefined
		const timer = window.setInterval(() => setSecondsLeft(seconds => Math.max(0, seconds - 1)), 1000)
		return () => window.clearInterval(timer)
	}, [submitted])
	const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0')
	const seconds = (secondsLeft % 60).toString().padStart(2, '0')
	const progress = question === 20 ? 96 : Math.round(20 + ((question - 1) * 76) / 19)
	const goNext = () => { if (question < 20) { setQuestion(current => current + 1); setSelectedOption('') } else setSubmitted(true) }
	const goPrevious = () => { if (question > 1) { setQuestion(current => current - 1); setSelectedOption('') } }
	const retry = () => { setQuestion(1); setSelectedOption(''); setSecondsLeft(2963); setSubmitted(false) }

	const passed = resultMode === 'passed'
	return <div className="student-assignment-modal__backdrop"><section className="student-assignment-quiz" role="dialog" aria-modal="true" aria-labelledby="assignment-quiz-title"><div className="student-assignment-modal__art" /><button type="button" className="student-assignment-quiz__close" aria-label="Close assignment" onClick={onClose}><X size={22} /></button><header className="student-assignment-quiz__header"><div><div className="student-assignment-modal__label"><BookOpen size={16} /> Chemistry Test</div><h1 id="assignment-quiz-title">Module 4 - Content Questions</h1><div className="student-assignment-modal__meta"><span>Quiz 4</span><span>20 Questions</span><span>Due Date: <b>{submitted ? (passed ? 'Expired' : '12 Jan 2025 11.59 PM') : '12 Jan 2025 11.59 PM'}</b></span></div></div>{!submitted && <div className="student-assignment-quiz__status"><div><b>{progress}% complete</b><span><i style={{ width: `${progress}%` }} /></span></div><div className={`student-assignment-quiz__timer${secondsLeft <= 60 ? ' is-urgent' : ''}`}><Clock3 size={20} /><strong>{minutes}:{seconds}</strong><small>Time Left</small></div></div>}</header>{submitted ? <main className={`student-assignment-result${passed ? '' : ' is-failed'}`}><div className="student-assignment-result__banner"><div className="student-assignment-result__rule"><i /><span><Star size={21} fill="currentColor" /></span><i /></div><h2>{passed ? 'Great Job! You Passed...' : 'Sorry, You did not pass'}</h2><p>{passed ? 'You got 16 out of 16' : 'You got 0 out of 16'}</p></div>{passed ? <div className="student-assignment-result__body"><h3>What you’ve learnt</h3><ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing</li></ul><h3 className="student-assignment-result__report-title">Download Report</h3><button type="button" className="student-assignment-result__report"><span><b>First Term 2025</b><small>12 Jan 2024 4.30 PM</small></span><Download size={15} /></button></div> : <div className="student-assignment-result__body"><p className="student-assignment-result__failed-copy">You did not pass this assignment. You are required to retake the assignment to continue.</p><strong className="student-assignment-result__attempts">2 attempts remaining</strong></div>}<footer>{passed ? <button type="button" onClick={onClose}>Great, Thanks!</button> : <button type="button" onClick={retry}>Retake</button>}</footer></main> : <main className="student-assignment-quiz__card"><h2>Question {question}</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><fieldset><legend className="sr-only">Choose an answer</legend>{['Option A', 'Option B', 'Option C', 'Option D'].map(option => <label key={option}><input type="radio" name="assignment-option" value={option} checked={selectedOption === option} onChange={() => setSelectedOption(option)} /><span>{option}</span></label>)}</fieldset><footer><button type="button" disabled={question === 1} onClick={goPrevious}><ChevronLeft size={15} /> Previous</button><button type="button" onClick={goNext}>{question === 20 ? 'Submit' : 'Next'} <ArrowRight size={15} /></button></footer></main>}</section></div>
}
