"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AssignmentCard } from './components/AssignmentCard';
import { QuizModal } from './components/QuizModal';
import { IntroModal } from './components/IntroModal';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Assignment {
  id: number;
  title: string;
  dueDays: number;
  attempts: string;
  duration: number;
  module: string;
  quiz: string;
  totalQuestions: number;
  dueDate: string;
  description: string;
  learningPoints: string[];
}

export interface Question {
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
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    learningPoints: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
    ],
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
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    learningPoints: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
    ],
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
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    learningPoints: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
    ],
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



// ─── Page ─────────────────────────────────────────────────────────────────────

type ModalState =
  | { mode: 'none' }
  | { mode: 'intro'; assignment: Assignment }
  | { mode: 'quiz'; assignment: Assignment };

function Page(props: Record<string, unknown>) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'submitted'>('upcoming');
  const [modal, setModal] = useState<ModalState>({ mode: 'none' });

  const openIntro = (a: Assignment) => setModal({ mode: 'intro', assignment: a });
  const openQuiz = () =>
    setModal(prev =>
      prev.mode === 'intro' ? { mode: 'quiz', assignment: prev.assignment } : prev
    );
  const closeModal = () => setModal({ mode: 'none' });

  return (
    <div style={styles.page}>
      <h1 style={styles.pageTitle}>Assignments</h1>
      <p style={styles.pageSubtitle}>View and manage your Lessons</p>

      <div style={styles.tabsWrapper}>
        {(['upcoming', 'submitted'] as const).map(tab => (
          <button
            key={tab}
            style={{ ...styles.tab, ...(activeTab === tab ? styles.tabActive : styles.tabInactive) }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'upcoming' ? 'Upcoming Assignment' : 'Submitted Assignments'}
          </button>
        ))}
      </div>

      {activeTab === 'upcoming' && (
        <div style={styles.cardsGrid}>
          {assignments.map(a => (
            <AssignmentCard key={a.id} assignment={a} onStart={openIntro} />
          ))}
        </div>
      )}

      {activeTab === 'submitted' && (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No submitted assignments yet.</p>
        </div>
      )}

      {modal.mode === 'intro' && (
        <IntroModal assignment={modal.assignment} onClose={closeModal} onStartQuiz={openQuiz} />
      )}

      {modal.mode === 'quiz' && (
        <QuizModal questions={questions} assignment={modal.assignment} onClose={closeModal} />
      )}
    </div>
  );
}

// ─── Page Styles ──────────────────────────────────────────────────────────────

export const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',

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
    width: '100%', height: 40,
    background:'#75C6E0',
    position: 'relative', overflow: 'hidden',
  },
  cardImageOverlay: {
    position: 'absolute', inset: 0,
    //backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.055) 3px,rgba(255,255,255,0.055) 4px),repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(255,255,255,0.04) 3px,rgba(255,255,255,0.04) 4px)`,
  },
  cardImageSheen: {
    position: 'absolute', inset: 0,
   // background: 'radial-gradient(ellipse at 30% 40%,rgba(255,255,255,0.18) 0%,transparent 60%),radial-gradient(ellipse at 72% 70%,rgba(20,70,110,0.18) 0%,transparent 50%)',
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

export default Page;