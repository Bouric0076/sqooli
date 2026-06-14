
import { useState, useRef, useEffect, useCallback } from "react";
import { Assignment } from "../page";

interface QuizModalProps {
  assignment: Assignment;
  questions: Question[];
  type?: "assignment" | "exam";
  onClose: () => void;
}

export interface QuestionOption {
  id: number;
  label: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  questionType?: string; // e.g. "MCQ", "MULTIPLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER", "ESSAY"
  options: QuestionOption[];
  assignmentId?: number;
  assignmentTitle?: string;
  assignmentDescription?: string;
  sectionId?: number;
}

interface Answer {
  questionId: number;
  selectedOptionId: number | null;
  textAnswer: string | null;
}

interface SubmissionResult {
  submissionId: number;
  totalQuestions: number;
  autoGraded: {
    count: number;
    correct: number;
    wrong: number;
  };
  pendingTeacherReview: number;
  currentScorePercentage: number;
  isFullyGraded: boolean;
  maxScore: number;
  pointsEarned: number;
  feedback: string;
  answers: {
    questionId: number;
    selectedOptionId: number | null;
    textAnswer: string | null;
    isCorrect: boolean;
    pointsAwarded: number;
    maxPoints: number;
    gradingStatus: string;
  }[];
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Returns true if the question should render as MCQ (has selectable options) */
function isMcqQuestion(q: Question): boolean {
  return q.options && q.options.length > 0;
}

export function QuizModal({ assignment, questions, type, onClose }: QuizModalProps) {
  const totalQ = questions.length;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [timeLeft, setTimeLeft] = useState((assignment.duration || 120) * 60);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Countdown timer
  useEffect(() => {
    if (submitted || submitting || totalQ === 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          // Auto-submit when timer runs out
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, submitting, totalQ]);

  // Handle backdrop click to close
  const handleBackdrop = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLDivElement).dataset.backdrop) onClose();
    },
    [onClose]
  );

  // Safeguard: Check if there are no questions to display
  if (totalQ === 0) {
    return (
      <div style={ms.backdrop} data-backdrop="true" onClick={handleBackdrop}>
        <div style={{ ...ms.modal, padding: "48px 32px", textAlign: "center" }}>
          <h2 style={{ fontSize: 20, marginBottom: 16 }}>No questions available for this {type === "exam" ? "exam" : "assignment"}.</h2>
          <button style={ms.closeBtn2} onClick={onClose}>
            Back to {type === "exam" ? "Exams" : "Assignments"}
          </button>
        </div>
      </div>
    );
  }

  const current = questions[currentIdx];
  const progress = totalQ > 0 ? Math.round((currentIdx / totalQ) * 100) : 0;
  const answeredCount = Object.keys(answers).length;

  // ── Handle MCQ selection ──────────────────────────────────────────
  const handleSelect = (option: { id: number; text: string }) => {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: {
        questionId: current.id,
        selectedOptionId: option.id,
        textAnswer: null,
      },
    }));
  };

  // ── Handle written/text answer ────────────────────────────────────
  const handleTextChange = (text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: {
        questionId: current.id,
        selectedOptionId: null,
        textAnswer: text,
      },
    }));
  };

  const handleNext = () => {
    if (currentIdx < totalQ - 1) setCurrentIdx((i) => i + 1);
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1);
  };

  // ── Submit to API ─────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitting(true);
    setSubmitError(null);

    console.log("Submitting assignment with answers:", assignment);
    
    // Safely retrieve the assignmentId from props or questions array
    const targetAssignmentId = assignment.assignmentId || questions[0]?.assignmentId;

    const payload = {
      assignmentId: targetAssignmentId,
      answers: questions.map((q) => {
        const ans = answers[q.id];
        return {
          questionId: q.id,
          selectedOptionId: ans?.selectedOptionId ?? null,
          textAnswer: ans?.textAnswer ?? null,
        };
      }),
    };

    try {
      const token = localStorage.getItem("token"); // adjust to your auth storage
      const res = await fetch("/api/assignment/submit-and-grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || json.status === false) {
        setSubmitError(json.message || json.error || "Submission failed");
        setSubmitting(false);
        return;
      }

      setResult(json.data?.data);
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "Network error — please try again");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Determine if current question is MCQ or written ───────────────
  const currentIsMcq = current ? isMcqQuestion(current) : true;
  const currentTextAnswer = answers[current?.id]?.textAnswer ?? "";

  return (
    <div style={ms.backdrop} data-backdrop="true" onClick={handleBackdrop}>
      <div style={ms.modal}>
        {/* Blue textile banner at top */}
        <div style={ms.banner}>
          <div style={ms.bannerOverlay} />
          <div style={ms.bannerSheen} />
        </div>

        {submitted ? (
          /* ── Submission Confirmation with Results ── */
          <div style={ms.submitScreen}>
            <div style={ms.submitIcon}>✓</div>
            <h2 style={ms.submitTitle}>Quiz Submitted!</h2>

            {result ? (
              <div style={ms.resultCard}>
                {/* Score circle */}
                <div style={ms.scoreCircle}>
                  <span style={ms.scoreValue}>{result.currentScorePercentage}%</span>
                  <span style={ms.scoreLabel}>Score</span>
                </div>

                {/* Stats grid */}
                <div style={ms.statsGrid}>
                  <div style={ms.statItem}>
                    <span style={ms.statNumber}>{result.totalQuestions}</span>
                    <span style={ms.statLabel}>Total Questions</span>
                  </div>
                  <div style={ms.statItem}>
                    <span style={{ ...ms.statNumber, color: "#16a34a" }}>
                      {result?.autoGraded?.correct}
                    </span>
                    <span style={ms.statLabel}>Correct</span>
                  </div>
                  <div style={ms.statItem}>
                    <span style={{ ...ms.statNumber, color: "#dc2626" }}>
                      {result?.autoGraded?.wrong}
                    </span>
                    <span style={ms.statLabel}>Wrong</span>
                  </div>
                  <div style={ms.statItem}>
                    <span style={{ ...ms.statNumber, color: "#f59e0b" }}>
                      {result.pendingTeacherReview}
                    </span>
                    <span style={ms.statLabel}>Pending Review</span>
                  </div>
                </div>

                {/* Points summary */}
                <div style={ms.pointsSummary}>
                  <span style={ms.pointsText}>
                    {result.pointsEarned} / {result.maxScore} points earned
                  </span>
                </div>

                {/* Pending notice */}
                {result.pendingTeacherReview > 0 && (
                  <div style={ms.pendingBanner}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span style={ms.pendingText}>
                      {result.pendingTeacherReview} written answer{result.pendingTeacherReview > 1 ? "s" : ""}{" "}
                      pending teacher review. Your final score may change.
                    </span>
                  </div>
                )}

                {/* Feedback */}
                {result?.feedback && (
                  <p style={ms.feedbackText}>{result.feedback}</p>
                )}
              </div>
            ) : (
              <p style={ms.submitSub}>
                You answered <strong>{answeredCount}</strong> of <strong>{totalQ}</strong> questions.
              </p>
            )}

            <button style={ms.closeBtn2} onClick={onClose}>
              Back to {type === "exam" ? "Exams" : "Assignments"}
            </button>
          </div>
        ) : (
          <>
            {/* ── Modal Header ── */}
            <div style={ms.header}>
              <div style={ms.headerLeft}>
                <span style={ms.bookIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </span>
                <span style={ms.headerTitle}>{assignment.title}</span>
              </div>
              <button style={ms.closeX} onClick={onClose} aria-label="Close">
                ✕
              </button>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <div style={ms.timerText}>
                  <span style={ms.timerCount}>{formatTime(timeLeft)}</span>
                  <span style={ms.timerLabel}>Time Left</span>
                </div>
              </div>
            </div>

            {/* ── Question Panel ── */}
            <div style={ms.questionPanel}>
              <div style={ms.questionHeader}>
                <h2 style={ms.questionTitle}>Question {currentIdx + 1}</h2>
                {!currentIsMcq && (
                  <span style={ms.writtenBadge}>Written Answer</span>
                )}
              </div>
              <p style={ms.questionText}>{current.text}</p>

              {currentIsMcq ? (
                /* ── MCQ Options ── */
                <div style={ms.optionsList}>
                  {current.options.map((opt) => {
                    const selected = answers[current.id]?.selectedOptionId === opt.id;
                    return (
                      <label
                        key={opt.id}
                        style={{
                          ...ms.optionRow,
                          ...(selected ? ms.optionRowSelected : {}),
                        }}
                      >
                        <div style={{ ...ms.radio, ...(selected ? ms.radioSelected : {}) }}>
                          {selected && <div style={ms.radioDot} />}
                        </div>
                        <span style={ms.optionLabel}>{opt.text}</span>
                        <input
                          type="radio"
                          name={`q${current.id}`}
                          value={opt.id}
                          checked={selected}
                          onChange={() => handleSelect(opt)}
                          style={{ display: "none" }}
                        />
                      </label>
                    );
                  })}
                </div>
              ) : (
                /* ── Written / Text Answer ── */
                <div style={ms.textAnswerArea}>
                  <textarea
                    style={ms.textArea}
                    placeholder="Type your answer here..."
                    value={currentTextAnswer}
                    onChange={(e) => handleTextChange(e.target.value)}
                    rows={6}
                  />
                  <span style={ms.charCount}>
                    {currentTextAnswer.length} characters
                  </span>
                </div>
              )}

              {/* ── Error message ── */}
              {submitError && (
                <div style={ms.errorBanner}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span>{submitError}</span>
                </div>
              )}

              {/* ── Navigation Buttons ── */}
              <div style={ms.navRow}>
                <button
                  style={{
                    ...ms.navBtn,
                    ...ms.prevBtn,
                    ...(currentIdx === 0 ? ms.navBtnDisabled : {}),
                  }}
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
                  <button
                    style={{
                      ...ms.navBtn,
                      ...ms.submitBtn,
                      ...(submitting ? ms.navBtnDisabled : {}),
                    }}
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>

              {/* ── Question navigator dots ── */}
              <div style={ms.dotNav}>
                {questions.map((q, idx) => {
                  const isAnswered = !!answers[q.id];
                  const isCurrent = idx === currentIdx;
                  return (
                    <button
                      key={q.id}
                      style={{
                        ...ms.dot,
                        ...(isCurrent ? ms.dotCurrent : {}),
                        ...(isAnswered && !isCurrent ? ms.dotAnswered : {}),
                      }}
                      onClick={() => setCurrentIdx(idx)}
                      title={`Question ${idx + 1}${isAnswered ? " (answered)" : ""}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Modal styles ──────────────────────────────────────────────────────
const ms: Record<string, React.CSSProperties> = {
  backdrop: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 16,
  },
  modal: {
    background: "#fff",
    borderRadius: 14,
    width: "100%",
    maxWidth: "98%",
    maxHeight: "92vh",
    overflowY: "auto",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    position: "relative",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  },

  // Blue banner
  banner: {
    height: 36,
    background: "linear-gradient(135deg, #5ba3cc 0%, #4a8fb5 35%, #6ab5d4 65%, #5aa5c8 100%)",
    borderRadius: "14px 14px 0 0",
    position: "relative",
    overflow: "hidden",
  },
  bannerOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.055) 3px,rgba(255,255,255,0.055) 4px),repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(255,255,255,0.04) 3px,rgba(255,255,255,0.04) 4px)`,
  },
  bannerSheen: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at 30% 50%,rgba(255,255,255,0.18) 0%,transparent 60%)",
  },

  // Header row
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 20px 10px",
    borderBottom: "1px solid #e0e0e0",
    background: "#fff",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 8 },
  bookIcon: { display: "flex", alignItems: "center" },
  headerTitle: { fontSize: 14, color: "#444", fontWeight: 500 },
  closeX: {
    background: "none",
    border: "none",
    fontSize: 16,
    color: "#888",
    cursor: "pointer",
    padding: "2px 6px",
    borderRadius: 4,
    lineHeight: 1,
  },

  // Info / progress bar
  infoBar: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    padding: "14px 24px",
    background: "#fff",
    borderBottom: "1px solid #e8e8e8",
  },
  infoLeft: { flex: 1 },
  moduleName: { fontSize: 15, fontWeight: 700, color: "#111", margin: "0 0 3px" },
  moduleMeta: { fontSize: 12, color: "#666", margin: 0 },
  pipe: { margin: "0 6px", color: "#ccc" },

  progressArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 5,
    minWidth: 200,
  },
  progressLabel: { fontSize: 12, color: "#444", fontWeight: 500 },
  progressTrack: {
    width: 200,
    height: 7,
    background: "#e0e0e0",
    borderRadius: 99,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#2563eb",
    borderRadius: 99,
    transition: "width 0.4s ease",
  },

  timerArea: { display: "flex", alignItems: "center", gap: 8 },
  timerText: { display: "flex", flexDirection: "column", alignItems: "flex-start" },
  timerCount: { fontSize: 16, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.1 },
  timerLabel: { fontSize: 11, color: "#888" },

  // Question panel
  questionPanel: {
    margin: "28px auto",
    maxWidth: "65%",
    background: "#f7f7f7",
    borderRadius: 10,
    padding: "28px 32px 24px",
  },
  questionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  questionTitle: { fontSize: 20, fontWeight: 700, color: "#111", margin: 0 },
  writtenBadge: {
    fontSize: 11,
    fontWeight: 600,
    color: "#7c3aed",
    background: "#ede9fe",
    padding: "3px 10px",
    borderRadius: 12,
    letterSpacing: 0.3,
  },
  questionText: { fontSize: 14, color: "#333", lineHeight: 1.65, margin: "0 0 24px" },

  // MCQ options
  optionsList: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 },
  optionRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
    padding: "8px 4px",
    borderRadius: 6,
    transition: "background 0.12s",
  },
  optionRowSelected: { background: "rgba(37,99,235,0.05)" },
  radio: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    border: "1.8px solid #bbb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "border-color 0.15s",
  },
  radioSelected: { borderColor: "#2563eb" },
  radioDot: {
    width: 9,
    height: 9,
    borderRadius: "50%",
    background: "#2563eb",
  },
  optionLabel: { fontSize: 14, color: "#222" },

  // Written answer textarea
  textAnswerArea: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 28,
  },
  textArea: {
    width: "100%",
    padding: "14px 16px",
    fontSize: 14,
    lineHeight: 1.7,
    color: "#222",
    border: "1.5px solid #d1d5db",
    borderRadius: 8,
    background: "#fff",
    resize: "vertical" as const,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
    minHeight: 140,
    boxSizing: "border-box" as const,
  },
  charCount: {
    fontSize: 11,
    color: "#999",
    textAlign: "right" as const,
  },

  // Navigation
  navRow: { display: "flex", justifyContent: "flex-end", gap: 10 },
  navBtn: {
    padding: "8px 22px",
    borderRadius: 24,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    transition: "opacity 0.15s",
  },
  prevBtn: {
    background: "#fff",
    border: "1.5px solid #ccc",
    color: "#333",
  },
  nextBtn: { background: "#2563eb", color: "#fff" },
  submitBtn: { background: "#16a34a", color: "#fff" },
  navBtnDisabled: { opacity: 0.4, cursor: "not-allowed" },

  // Question navigator dots
  dotNav: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 6,
    justifyContent: "center",
    marginTop: 20,
    paddingTop: 16,
    borderTop: "1px solid #e5e5e5",
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: "1.5px solid #d1d5db",
    background: "#fff",
    color: "#888",
    fontSize: 11,
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
  },
  dotCurrent: {
    background: "#2563eb",
    color: "#fff",
    borderColor: "#2563eb",
  },
  dotAnswered: {
    background: "#dbeafe",
    borderColor: "#93c5fd",
    color: "#2563eb",
  },

  // Error banner
  errorBanner: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 13,
    color: "#dc2626",
  },

  // Submission screen
  submitScreen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 32px",
    gap: 16,
  },
  submitIcon: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#16a34a",
    color: "#fff",
    fontSize: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  submitTitle: { fontSize: 22, fontWeight: 700, color: "#111", margin: 0 },
  submitSub: { fontSize: 14, color: "#555", margin: 0 },

  // Result card
  resultCard: {
    width: "100%",
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    marginTop: 8,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
  },
  scoreValue: {
    fontSize: 26,
    fontWeight: 800,
    color: "#fff",
    lineHeight: 1.1,
  },
  scoreLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.8)",
    fontWeight: 500,
    textTransform: "uppercase" as const,
    letterSpacing: 0.8,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    width: "100%",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    padding: "12px 8px",
    background: "#f9fafb",
    borderRadius: 8,
    border: "1px solid #f0f0f0",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 700,
    color: "#111",
    lineHeight: 1.1,
  },
  statLabel: {
    fontSize: 10,
    color: "#888",
    fontWeight: 500,
    textAlign: "center" as const,
  },
  pointsSummary: {
    padding: "8px 16px",
    background: "#f0fdf4",
    borderRadius: 8,
    border: "1px solid #bbf7d0",
  },
  pointsText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#166534",
  },
  pendingBanner: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    padding: "10px 14px",
    background: "#fffbeb",
    border: "1px solid #fde68a",
    borderRadius: 8,
    width: "100%",
  },
  pendingText: {
    fontSize: 12,
    color: "#92400e",
    lineHeight: 1.5,
  },
  feedbackText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    margin: 0,
    textAlign: "center" as const,
  },
  closeBtn2: {
    marginTop: 12,
    padding: "10px 28px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 24,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
  },
};
