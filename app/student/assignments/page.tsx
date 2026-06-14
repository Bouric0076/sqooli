"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { AssignmentCard } from './components/AssignmentCard';
import { QuizModal } from './components/QuizModal';
import { IntroModal } from './components/IntroModal';
import { useSpinnerStore } from '@/app/store/useSpinnerStore';
import { getBookingLessons } from '@/app/helpers/lookups';
import { SubmittedList } from './components/SubmittedList';
// ─── Types ───────────────────────────────────────────────────────────────────

export interface Assignment {
  id: string | number; // String format: `${bookingId}-${assignmentId}` for uniqueness
  bookingId: number;
  assignmentId: number;
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
  questions: Question[]; // Questions are attached directly to each assignment
  status: "Active" | "Inactive";
}

export interface Question {
  id: number;
  assignmentId?: number;
  assignmentTitle?: string;
  assignmentDescription?: string;
  sectionId?: number;
  text: string;
  options: {
    id: number;
    label: string;
    text: string;
  }[];
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type ModalState =
  | { mode: 'none' }
  | { mode: 'intro'; assignment: Assignment }
  | { mode: 'quiz'; assignment: Assignment };

function Page(props: Record<string, unknown>) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'submitted'>('upcoming');
  const [modal, setModal] = useState<ModalState>({ mode: 'none' });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [assignmentsList, setAssignmentsList] = useState<Assignment[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const { setLoading } = useSpinnerStore();

  // 1. Open the introduction modal and load this specific assignment's questions
  const openIntro = (assignment: Assignment) => {
    setQuestions(assignment.questions || []);
    setModal({
      mode: "intro",
      assignment,
    });
  };

  // 2. Open the quiz modal for the active assignment
  const openQuiz = async () => {
    setModal(prev =>
      prev.mode === 'intro' ? { mode: 'quiz', assignment: prev.assignment } : prev
    );
  };

  const closeModal = () => setModal({ mode: 'none' });

  // 3. Fetch lessons and extract individual assignments
  useEffect(() => {
    setLoading(true);
    getBookingLessons()
      .then((data) => {
        const extractedAssignments: Assignment[] = [];

        data.forEach((booking: any) => {
          // Traverse through sections, lectures, and items to find assignments
          booking.lesson?.sections?.forEach((section: any) => {
            section.lectures?.forEach((lecture: any) => {
              lecture.items?.forEach((item: any) => {
                if (item.type === "Assignment" && item.data?.sections) {
                  
                  // Extract questions for this assignment only
                  const assignmentQuestions: Question[] = [];
                  item.data.sections.forEach((assignmentSection: any) => {
                    assignmentSection.questions?.forEach((q: any) => {
                      assignmentQuestions.push({
                        assignmentId: item.referenceId,
                        assignmentTitle: item.title,
                        assignmentDescription: item.description || booking.lesson?.description,
                        sectionId: assignmentSection.id,
                        id: q.question.id,
                        text: q.question.text,
                        options: q.question.options?.map((option: any) => ({
                          id: option.id,
                          label: option.optionLabel,
                          text: option.optionText,
                        })) || [],
                      });
                    });
                  });

                  // Build the independent assignment object
                  extractedAssignments.push({
                    id: `${booking.id}-${item.referenceId}`, // Composite key for uniqueness
                    bookingId: booking.id,
                    assignmentId: item.referenceId,
                    title: item.title || booking.lesson?.name || 'Assignment',
                    dueDays: 2, // Map custom dynamic value if available
                    attempts: '1 Attempt Left',
                    duration: item.data.duration || 120,
                    module: section.name || 'Lesson Module',
                    quiz: item.title || 'Quiz',
                    totalQuestions: assignmentQuestions.length,
                    dueDate: booking.lesson?.date || '12 Jan 2025 11.59 PM',
                    description: item.description || booking.lesson?.description || 'No description provided.',
                    learningPoints: item.learningPoints || [
                      'Review the related lecture topics.',
                      'Answer all questions to the best of your ability.',
                      'Review your answers before finalizing your attempt.'
                    ],
                    questions: assignmentQuestions,
                    status: booking.isApproved ? "Active" : "Inactive"
                  });
                }
              });
            });
          });
        });

        console.log("Extracted Assignments:", extractedAssignments);
        setAssignmentsList(extractedAssignments);
      })
      .finally(() => setLoading(false));
  }, [setLoading]);

  // 4. UseMemo to filter the list of assignments based on search query and status
  const filteredAssignments = useMemo(() => {
    return assignmentsList.filter(a => {
      const matchesSearch = 
        a.title.toLowerCase().includes(search.toLowerCase()) || 
        a.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = a.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [assignmentsList, search, status]);

  return (
    <div style={styles.page}>
      <h1 style={styles.pageTitle}>Assignments</h1>
      <p style={styles.pageSubtitle}>View and manage your Lessons</p>

      {/* Optional: Add search and status filter inputs here if needed to connect to the state */}

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
          {assignmentsList.map(a => (
            <AssignmentCard key={a.id} assignment={a} onStart={openIntro} />
          ))}
        </div>
      )}

      {activeTab === 'submitted' && (
        
          <SubmittedList type="assignment" />
       
      )}

      {modal.mode === 'intro' && (
        <IntroModal assignment={modal.assignment} onClose={closeModal}  type="assignment" onStartQuiz={openQuiz} />
      )}

      {modal.mode === 'quiz' && (
        <QuizModal questions={questions} assignment={modal.assignment} type="assignment" onClose={closeModal} />
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
  },
  cardImageSheen: {
    position: 'absolute', inset: 0,
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