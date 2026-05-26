import React, { useCallback, useEffect, useRef, useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Assignment {
  id: number;
  title: string;
  dueDays: number;
  attempts: string;
  duration: number; // minutes
  module: string;
  quiz: string;
  totalQuestions: number;
  dueDate: string;
}

interface Question {
  id: number;
  text: string;
  options: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const assignments: Assignment[] = [
  {
    id: 1,
    title: 'Chemistry Test',
    dueDays: 2,
    attempts: '1 Attempt Left',
    duration: 120,
    module: 'Module 4 - Content Questions',
    quiz: 'Quiz 4',
    totalQuestions: 20,
    dueDate: '12 Jan 2025 11.59 PM',
  },
  {
    id: 2,
    title: 'Chemistry Test',
    dueDays: 2,
    attempts: '1 Attempt',
    duration: 120,
    module: 'Module 4 - Content Questions',
    quiz: 'Quiz 4',
    totalQuestions: 20,
    dueDate: '12 Jan 2025 11.59 PM',
  },
  {
    id: 3,
    title: 'Chemistry Test',
    dueDays: 2,
    attempts: '1 Attempt',
    duration: 120,
    module: 'Module 4 - Content Questions',
    quiz: 'Quiz 4',
    totalQuestions: 20,
    dueDate: '12 Jan 2025 11.59 PM',
  },
];

const questions: Question[] = [
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
  },
  {
    id: 2,
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
  },
  {
    id: 3,
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
  },
  {
    id: 4,
    text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
  },
  {
    id: 5,
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// ─── Quiz Modal ───────────────────────────────────────────────────────────────

interface QuizModalProps {
  assignment: Assignment;
  onClose: () => void;
}

function QuizModal({ assignment, onClose }: QuizModalProps) {
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
    background: '#f0f0f0',
    borderRadius: 14,
    width: '100%',
    maxWidth: 800,
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
    maxWidth: 620,
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

// ─── Assignment Card ──────────────────────────────────────────────────────────

export function AssignmentCard({
  assignment,
  onStart,
}: {
  assignment: Assignment;
  onStart: (a: Assignment) => void;
}) {
  return (
    <div style={styles.card}>
      <div style={styles.cardImage}>
        <div style={styles.cardImageOverlay} />
        <div style={styles.cardImageSheen} />
      </div>
      <div style={styles.cardBody}>
        <p style={styles.cardTitle}>{assignment.title}</p>
        <p style={styles.cardDue}>
          Due in <span style={styles.dueDaysRed}>{assignment.dueDays} days</span>
        </p>
        <div style={styles.cardFooter}>
          <span style={styles.cardMeta}>
            {assignment.attempts}
            <span style={styles.dot} />
            {assignment.duration} Min
          </span>
          <button
            style={styles.startBtn}
            onClick={() => onStart(assignment)}
            onMouseEnter={e => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.borderColor = '#2563eb';
              b.style.color = '#2563eb';
              b.style.background = '#eff6ff';
            }}
            onMouseLeave={e => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.borderColor = '#d1d5db';
              b.style.color = '#1a1a1a';
              b.style.background = '#ffffff';
            }}
          >
            Start
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 4 }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}




function AssignmentComponent(props) {
 const [activeTab, setActiveTab] = useState<'upcoming' | 'submitted'>('upcoming');
  const [activeQuiz, setActiveQuiz] = useState<Assignment | null>(null);

  return (
    <div style={styles.page}>
      <h1 style={styles.pageTitle}>Assignments</h1>
      <p style={styles.pageSubtitle}>View and manage your Lessons</p>

      <div style={styles.tabsWrapper}>
        {(['upcoming', 'submitted'] as const).map(tab => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.tabActive : styles.tabInactive),
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'upcoming' ? 'Upcoming Assignment' : 'Submitted Assignments'}
          </button>
        ))}
      </div>

      {activeTab === 'upcoming' && (
        <div style={styles.cardsGrid}>
          {assignments.map(a => (
            <AssignmentCard key={a.id} assignment={a} onStart={setActiveQuiz} />
          ))}
        </div>
      )}

      {activeTab === 'submitted' && (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No submitted assignments yet.</p>
        </div>
      )}

      {activeQuiz && (
        <QuizModal assignment={activeQuiz} onClose={() => setActiveQuiz(null)} />
      )}
    </div>
  );
}

// ─── Page Styles ──────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#d6d6d6',
    padding: '32px 40px',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  },
  pageTitle: { fontSize: 26, fontWeight: 700, color: '#1a1a1a', margin: 0, lineHeight: 1.2 },
  pageSubtitle: { fontSize: 13, color: '#555', fontWeight: 400, margin: '4px 0 20px' },
  tabsWrapper: { display: 'flex', borderBottom: '1.5px solid #c0c0c0', marginBottom: 28 },
  tab: {
    background: 'none', border: 'none', borderBottom: '2.5px solid transparent',
    marginBottom: -1.5, padding: '8px 0', marginRight: 28,
    fontSize: 14, cursor: 'pointer', outline: 'none', transition: 'color 0.15s',
  },
  tabActive: { color: '#2563eb', borderBottomColor: '#2563eb', fontWeight: 600 },
  tabInactive: { color: '#777', fontWeight: 500 },
  cardsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, maxWidth: 900 },
  card: {
    background: '#ffffff', borderRadius: 12, overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  cardImage: {
    width: '100%', height: 90,
    background: 'linear-gradient(135deg,#5ba3cc 0%,#4a8fb5 35%,#6ab5d4 65%,#5aa5c8 100%)',
    position: 'relative', overflow: 'hidden',
  },
  cardImageOverlay: {
    position: 'absolute', inset: 0,
    backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.055) 3px,rgba(255,255,255,0.055) 4px),repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(255,255,255,0.04) 3px,rgba(255,255,255,0.04) 4px)`,
  },
  cardImageSheen: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 30% 40%,rgba(255,255,255,0.18) 0%,transparent 60%),radial-gradient(ellipse at 72% 70%,rgba(20,70,110,0.18) 0%,transparent 50%)',
  },
  cardBody: { padding: '14px 16px 16px' },
  cardTitle: { fontSize: 14, fontWeight: 700, color: '#1a1a1a', margin: '0 0 4px' },
  cardDue: { fontSize: 12.5, color: '#333', margin: '0 0 12px' },
  dueDaysRed: { color: '#e53e3e', fontWeight: 600 },
  cardFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  cardMeta: { fontSize: 11.5, color: '#777', display: 'flex', alignItems: 'center', gap: 6 },
  dot: { display: 'inline-block', width: 3, height: 3, borderRadius: '50%', backgroundColor: '#aaa' },
  startBtn: {
    display: 'flex', alignItems: 'center', gap: 2,
    background: '#ffffff', border: '1.5px solid #d1d5db',
    borderRadius: 20, padding: '5px 13px', fontSize: 12,
    fontWeight: 500, color: '#1a1a1a', cursor: 'pointer',
    transition: 'border-color 0.15s, color 0.15s, background 0.15s', whiteSpace: 'nowrap',
  },
  emptyState: { padding: '48px 0', textAlign: 'center' },
  emptyText: { color: '#888', fontSize: 14 },
};
export default AssignmentComponent;