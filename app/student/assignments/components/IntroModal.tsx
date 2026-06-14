import { useCallback } from "react";
import { Assignment } from "../page";

interface IntroModalProps {
  assignment: Assignment;
  type?: "assignment" | "exam";
  onClose: () => void;
  onStartQuiz: () => void;
}

function ModalShell({
  onClose,
  children,
  maxWidth = 860,
}: {
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: number;
}) {
  const handleBackdrop = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLDivElement).dataset.backdrop) onClose();
    },
    [onClose]
  );

  return (
    <div style={ms.backdrop} data-backdrop="true" onClick={handleBackdrop}>
      <div style={{ ...ms.modal, maxWidth }}>
        {/* Top header bar: book icon + title + X */}
        {children}
      </div>
    </div>
  );
}

export function IntroModal({ assignment, onClose, onStartQuiz, type }: IntroModalProps) {
  return (
    <ModalShell onClose={onClose} maxWidth={860}>
      {/* Header */}
      <div style={ms.header}>
        <div style={ms.headerLeft}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span style={ms.headerTitle}>{assignment.title}</span>
        </div>
        <button style={ms.closeX} onClick={onClose} aria-label="Close">✕</button>
      </div>

      {/* Body */}
      <div style={is.body}>
        {/* Top row: module info + Start Assignment button */}
        <div style={is.topRow}>
          <div>
            <h2 style={is.moduleTitle}>{assignment.module}</h2>
            <p style={is.moduleMeta}>
              {assignment.quiz}
              <span style={is.pipe}>|</span>
              {assignment.totalQuestions} Questions
              <span style={is.pipe}>|</span>
              Due Date: <strong>{assignment.dueDate}</strong>
            </p>
          </div>
          <button style={is.startBtn} onClick={onStartQuiz}>
            Start {type === "exam" ? "Exam" : "Assignment"}
          </button>
        </div>

        {/* Description */}
        <p style={is.description}>{assignment.description}</p>

        {/* What you'll learn */}
        <p style={is.learnHeading}>What you'll learn:</p>
        <ul style={is.learnList}>
          {assignment.learningPoints.map((point, i) => (
            <li key={i} style={is.learnItem}>
              <span style={is.bullet}>•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </ModalShell>
  );
}

// Intro modal styles
const is: Record<string, React.CSSProperties> = {
  body: {
    padding: '24px 28px 40px',
    background: '#ebebeb',
    borderRadius: '0 0 14px 14px',
  },
  topRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 16,
  },
  moduleTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#111',
    margin: '0 0 6px',
    lineHeight: 1.2,
  },
  moduleMeta: {
    fontSize: 12.5,
    color: '#555',
    margin: 0,
  },
  pipe: { margin: '0 8px', color: '#bbb' },
  startBtn: {
    flexShrink: 0,
    background: '#2a7db5',
    color: '#fff',
    border: 'none',
    borderRadius: 24,
    padding: '10px 22px',
    fontSize: 13.5,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 8px rgba(37,99,235,0.18)',
    transition: 'background 0.15s',
  },
  description: {
    fontSize: 13.5,
    color: '#333',
    lineHeight: 1.7,
    margin: '0 0 22px',
  },
  learnHeading: {
    fontSize: 13.5,
    fontWeight: 600,
    color: '#111',
    margin: '0 0 10px',
  },
  learnList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  learnItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    fontSize: 13.5,
    color: '#333',
  },
  bullet: {
    color: '#555',
    fontSize: 16,
    lineHeight: 1.3,
    flexShrink: 0,
  },
};

const ms: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed', inset: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: 16,
  },
  modal: {
    background: '#ebebeb',
    borderRadius: 14,
    width: '100%',
    maxHeight: '92vh',
    overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 20px',
    background: '#ebebeb',
    borderRadius: '14px 14px 0 0',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 14, color: '#444', fontWeight: 500 },
  closeX: {
    background: 'none', border: 'none', fontSize: 17,
    color: '#666', cursor: 'pointer', padding: '2px 6px', borderRadius: 4, lineHeight: 1,
  },
  infoBar: {
    display: 'flex', alignItems: 'center', gap: 24,
    padding: '14px 24px',
    background: '#fff',
    borderBottom: '1px solid #e8e8e8',
    borderTop: '1px solid #e8e8e8',
  },
  infoLeft: { flex: 1 },
  moduleName: { fontSize: 15, fontWeight: 700, color: '#111', margin: '0 0 3px' },
  moduleMeta: { fontSize: 12, color: '#666', margin: 0 },
  pipe: { margin: '0 6px', color: '#ccc' },
  progressArea: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, minWidth: 200 },
  progressLabel: { fontSize: 12, color: '#444', fontWeight: 500 },
  progressTrack: { width: 200, height: 7, background: '#e0e0e0', borderRadius: 99, overflow: 'hidden' },
  progressFill: { height: '100%', background: '#2563eb', borderRadius: 99, transition: 'width 0.4s ease' },
  timerArea: { display: 'flex', alignItems: 'center', gap: 8 },
  timerText: { display: 'flex', flexDirection: 'column' },
  timerCount: { fontSize: 16, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.1 },
  timerLabel: { fontSize: 11, color: '#888' },
  questionPanel: {
    margin: '28px auto', maxWidth: 620,
    background: '#f0f0f0', borderRadius: 10, padding: '28px 32px 24px',
  },
  questionTitle: { fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 14px' },
  questionText: { fontSize: 14, color: '#333', lineHeight: 1.65, margin: '0 0 24px' },
  optionsList: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 },
  optionRow: {
    display: 'flex', alignItems: 'center', gap: 12,
    cursor: 'pointer', padding: '8px 4px', borderRadius: 6, transition: 'background 0.12s',
  },
  optionRowSelected: { background: 'rgba(37,99,235,0.05)' },
  radio: {
    width: 20, height: 20, borderRadius: '50%',
    border: '1.8px solid #bbb', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'border-color 0.15s',
  },
  radioSelected: { borderColor: '#2563eb' },
  radioDot: { width: 9, height: 9, borderRadius: '50%', background: '#2563eb' },
  optionLabel: { fontSize: 14, color: '#222' },
  navRow: { display: 'flex', justifyContent: 'flex-end', gap: 10 },
  navBtn: {
    padding: '8px 22px', borderRadius: 24, fontSize: 13,
    fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'opacity 0.15s',
  },
  prevBtn: { background: '#fff', border: '1.5px solid #ccc', color: '#333' },
  nextBtn: { background: '#2563eb', color: '#fff' },
  submitBtn: { background: '#16a34a', color: '#fff' },
  navBtnDisabled: { opacity: 0.4, cursor: 'not-allowed' },
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
    border: 'none', borderRadius: 24, fontSize: 14, fontWeight: 500, cursor: 'pointer',
  },
};