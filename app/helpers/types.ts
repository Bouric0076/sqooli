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
