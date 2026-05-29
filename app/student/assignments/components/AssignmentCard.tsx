import { Assignment, styles } from "../page";

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

