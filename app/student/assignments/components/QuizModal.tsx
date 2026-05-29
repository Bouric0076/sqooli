import { useState, useRef, useEffect, useCallback } from "react";
import { Assignment, Question } from "../page";

interface QuizModalProps {
  assignment: Assignment;
  questions: Question[];
  onClose: () => void;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function QuizModal({ assignment, questions, onClose }: QuizModalProps) {
  const totalQ = questions.length;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(assignment.duration * 60);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Countdown timer
  useEffect(() => {
    if (submitted) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setSubmitted(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [submitted]);

  const current = questions[currentIdx];
  const progress = Math.round(((currentIdx) / totalQ) * 100);
  const answeredCount = Object.keys(answers).length;

  const handleSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [current.id]: option }));
  };

  const handleNext = () => {
    if (currentIdx < totalQ - 1) setCurrentIdx(i => i + 1);
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(i => i - 1);
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current!);
    setSubmitted(true);
  };

  // Backdrop click closes
  const handleBackdrop = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).dataset.backdrop) onClose();
  }, [onClose]);

  return (
    <div style={ms.backdrop} data-backdrop="true" onClick={handleBackdrop}>
      <div style={ms.modal}>

        {/* Blue textile banner at top */}
        <div style={ms.banner}>
          <div style={ms.bannerOverlay} />
          <div style={ms.bannerSheen} />
        </div>

        {submitted ? (
          /* ── Submission Confirmation ── */
          <div style={ms.submitScreen}>
            <div style={ms.submitIcon}>✓</div>
            <h2 style={ms.submitTitle}>Quiz Submitted!</h2>
            <p style={ms.submitSub}>
              You answered <strong>{answeredCount}</strong> of <strong>{totalQ}</strong> questions.
            </p>
            <button style={ms.closeBtn2} onClick={onClose}>Back to Assignments</button>
          </div>
        ) : (
          <>
            {/* ── Modal Header ── */}
            <div style={ms.header}>
              <div style={ms.headerLeft}>
                <span style={ms.bookIcon}>
                  {/* Book SVG */}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                </span>
                <span style={ms.headerTitle}>{assignment.title}</span>
              </div>
              <button style={ms.closeX} onClick={onClose} aria-label="Close">✕</button>
            </div>

            {/* ── Module Info + Progress ── */}
            <div style={ms.infoBar}>
              <div style={ms.infoLeft}>
                <p style={ms.moduleName}>{assignment.module}</p>
                <p style={ms.moduleMeta}>
                  {assignment.quiz}
                  <span style={ms.pipe}>|</span>
                  {assignment.totalQuestions} Questions
                  <span style={ms.pipe}>|</span>
                  Due Date: <strong>{assignment.dueDate}</strong>
                </p>
              </div>
              <div style={ms.progressArea}>
                <span style={ms.progressLabel}>{progress}% complete</span>
                <div style={ms.progressTrack}>
                  <div style={{ ...ms.progressFill, width: `${progress}%` }} />
                </div>
              </div>
              <div style={ms.timerArea}>
                {/* Clock icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <div style={ms.timerText}>
                  <span style={ms.timerCount}>{formatTime(timeLeft)}</span>
                  <span style={ms.timerLabel}>Time Left</span>
                </div>
              </div>
            </div>

            {/* ── Question Panel ── */}
            <div style={ms.questionPanel}>
              <h2 style={ms.questionTitle}>Question {current.id}</h2>
              <p style={ms.questionText}>{current.text}</p>

              <div style={ms.optionsList}>
                {current.options.map(opt => {
                  const selected = answers[current.id] === opt;
                  return (
                    <label key={opt} style={{ ...ms.optionRow, ...(selected ? ms.optionRowSelected : {}) }}>
                      <div style={{ ...ms.radio, ...(selected ? ms.radioSelected : {}) }}>
                        {selected && <div style={ms.radioDot} />}
                      </div>
                      <span style={ms.optionLabel}>{opt}</span>
                      <input
                        type="radio"
                        name={`q${current.id}`}
                        value={opt}
                        checked={selected}
                        onChange={() => handleSelect(opt)}
                        style={{ display: 'none' }}
                      />
                    </label>
                  );
                })}
              </div>

              {/* ── Navigation Buttons ── */}
              <div style={ms.navRow}>
                <button
                  style={{ ...ms.navBtn, ...ms.prevBtn, ...(currentIdx === 0 ? ms.navBtnDisabled : {}) }}
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                >
                  Previous
                </button>

                {currentIdx < totalQ - 1 ? (
                  <button style={{ ...ms.navBtn, ...ms.nextBtn }} onClick={handleNext}>
                    Next
                  </button>
                ) : (
                  <button style={{ ...ms.navBtn, ...ms.submitBtn }} onClick={handleSubmit}>
                    Submit
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Modal styles
const ms: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 16,
  },
  modal: {
    background: '#fff',
    borderRadius: 14,
    width: '100%',
    maxWidth: '98%',
    maxHeight: '92vh',
    overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    position: 'relative',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  },

  // Blue banner
  banner: {
    height: 36,
    background: 'linear-gradient(135deg, #5ba3cc 0%, #4a8fb5 35%, #6ab5d4 65%, #5aa5c8 100%)',
    borderRadius: '14px 14px 0 0',
    position: 'relative',
    overflow: 'hidden',
  },
  bannerOverlay: {
    position: 'absolute', inset: 0,
    backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.055) 3px,rgba(255,255,255,0.055) 4px),repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(255,255,255,0.04) 3px,rgba(255,255,255,0.04) 4px)`,
  },
  bannerSheen: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 30% 50%,rgba(255,255,255,0.18) 0%,transparent 60%)',
  },

  // Header row
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 20px 10px',
    borderBottom: '1px solid #e0e0e0',
    background: '#fff',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 8 },
  bookIcon: { display: 'flex', alignItems: 'center' },
  headerTitle: { fontSize: 14, color: '#444', fontWeight: 500 },
  closeX: {
    background: 'none', border: 'none', fontSize: 16,
    color: '#888', cursor: 'pointer', padding: '2px 6px',
    borderRadius: 4, lineHeight: 1,
  },

  // Info / progress bar
  infoBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    padding: '14px 24px',
    background: '#fff',
    borderBottom: '1px solid #e8e8e8',
  },
  infoLeft: { flex: 1 },
  moduleName: { fontSize: 15, fontWeight: 700, color: '#111', margin: '0 0 3px' },
  moduleMeta: { fontSize: 12, color: '#666', margin: 0 },
  pipe: { margin: '0 6px', color: '#ccc' },

  progressArea: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, minWidth: 200 },
  progressLabel: { fontSize: 12, color: '#444', fontWeight: 500 },
  progressTrack: {
    width: 200, height: 7, background: '#e0e0e0',
    borderRadius: 99, overflow: 'hidden',
  },
  progressFill: {
    height: '100%', background: '#2563eb',
    borderRadius: 99, transition: 'width 0.4s ease',
  },

  timerArea: { display: 'flex', alignItems: 'center', gap: 8 },
  timerText: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  timerCount: { fontSize: 16, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.1 },
  timerLabel: { fontSize: 11, color: '#888' },

  // Question panel
  questionPanel: {
    margin: '28px auto',
    maxWidth: '65%',
    background: '#f7f7f7',
    borderRadius: 10,
    padding: '28px 32px 24px',
  },
  questionTitle: { fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 14px' },
  questionText: { fontSize: 14, color: '#333', lineHeight: 1.65, margin: '0 0 24px' },

  optionsList: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 },
  optionRow: {
    display: 'flex', alignItems: 'center', gap: 12,
    cursor: 'pointer', padding: '8px 4px', borderRadius: 6,
    transition: 'background 0.12s',
  },
  optionRowSelected: { background: 'rgba(37,99,235,0.05)' },
  radio: {
    width: 20, height: 20, borderRadius: '50%',
    border: '1.8px solid #bbb', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'border-color 0.15s',
  },
  radioSelected: { borderColor: '#2563eb' },
  radioDot: {
    width: 9, height: 9, borderRadius: '50%', background: '#2563eb',
  },
  optionLabel: { fontSize: 14, color: '#222' },

  // Navigation
  navRow: { display: 'flex', justifyContent: 'flex-end', gap: 10 },
  navBtn: {
    padding: '8px 22px', borderRadius: 24, fontSize: 13,
    fontWeight: 500, cursor: 'pointer', border: 'none',
    transition: 'opacity 0.15s',
  },
  prevBtn: {
    background: '#fff', border: '1.5px solid #ccc', color: '#333',
  },
  nextBtn: { background: '#2563eb', color: '#fff' },
  submitBtn: { background: '#16a34a', color: '#fff' },
  navBtnDisabled: { opacity: 0.4, cursor: 'not-allowed' },

  // Submission screen
  submitScreen: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '60px 32px', gap: 16,
  },
  submitIcon: {
    width: 64, height: 64, borderRadius: '50%',
    background: '#16a34a', color: '#fff',
    fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  submitTitle: { fontSize: 22, fontWeight: 700, color: '#111', margin: 0 },
  submitSub: { fontSize: 14, color: '#555', margin: 0 },
  closeBtn2: {
    marginTop: 12, padding: '10px 28px',
    background: '#2563eb', color: '#fff',
    border: 'none', borderRadius: 24, fontSize: 14,
    fontWeight: 500, cursor: 'pointer',
  },
};