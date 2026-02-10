export type LookupFilters = Record<
  string,
  string | number | boolean | undefined
>;

export interface LessonObjective {
  id: number;
  objective: string;
}

export interface BulkReplaceLessonObjectivesRequest {
  lessonId: number;
  objectives: string[];
}

export type LessonEventPayload = {
  lessonId: string;
  userId: string;
  role: "Teacher" | "Student";
  event:
    | "LESSON_STARTED"
    | "LESSON_ENDED"
    | "STUDENT_JOINED"
    | "STUDENT_LEFT";
  timestamp: number;
};
