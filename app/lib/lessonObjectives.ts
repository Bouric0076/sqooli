import { apiFetcher } from "../helpers/apiFetcher";
import { LessonObjective, BulkReplaceLessonObjectivesRequest } from "../helpers/types";


/**
 * Preload lesson objectives
 */
export async function getLessonObjectives(lessonId: number): Promise<string[]> {
  const res = await apiFetcher<{ 
    status: boolean;
    message: string;
    data: {
      page: number;
      pageSize: number;
      totalRecords: number;
      items: LessonObjective[];
    };
    error: string | null;
  }>("/api/lesson/objectives", {
    params: {
      lessonId,
      page: 1,
      pageSize: 100,
    },
  });

  return Array.isArray(res.data?.items)
    ? res.data.items.map((x) => x.objective)
    : [];
}

/**
 * Bulk replace lesson objectives
 */
export async function bulkReplaceLessonObjectives(
  lessonId: number,
  objectives: string[]
): Promise<number> {
  const body: BulkReplaceLessonObjectivesRequest = { lessonId, objectives };

  const res = await apiFetcher<{ 
    status: boolean;
    message: string;
    data: number;
    error: string | null;
  }>("/api/lesson/objectives", {
    method: "PUT",
    body,
  });

  return res.data;
}
