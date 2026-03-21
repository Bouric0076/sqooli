import { apiFetcher } from "./apiFetcher";

/* =========================
   TYPES
========================= */

export interface LookupItem {
  id: number;
  name: string;
}

export interface ContractItem {
  id: number;
  title: string;
  content: string;
  contractType: string;
}

export type LookupFilters = Record<
  string,
  string | number | boolean | undefined
>;

interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: {
    page: number;
    pageSize: number;
    totalRecords: number;
    items: T[];
  };
  error: string | null;
}

export interface Enrollment {
    accountId: number;
    curriculumId: number;
    curriculumName: string;
    gradeLevelId: number;
    gradeLevelName: string;
    schoolId: number;
    schoolName: string;
    isIndependent: boolean;
    subjects: string[];
  }
// Teacher type based on your API response
export interface Teacher {
    id: number;
    fullName: string;
    phone: string;
    email: string;
    bio: string;
    workplace: string;
    tscNumber: string;
    certificateLevelId: number;
    certificateLevelName: string;
    subjectCount: number;
    ratingsCount: number;
    averageRating: number;
    lessonCount: number;
    attendanceRating: number;
    pendingLessonCount: number;
    enrollments: Enrollment[];
    image?: string; // optional, if available later
  }

  export interface Student {
    id: number;
    fullName: string;
    phone: string;
    email: string;
    certificateLevelId: number;
    certificateLevelName: string;
    subjectCount: number;
    ratingsCount: number;
    averageRating: number;
    lessonCount: number;
    attendanceRating: number;
    pendingLessonCount: number;
    enrollments: Enrollment[];
    image?: string; // optional, if available later
  }

  export interface LessonObjective {
    id: number;
    objective: string;
  }
  
/* =========================
   INTERNAL HELPER
========================= */

export async function lookupFetcher<T>(
  url: string,
  filters?: LookupFilters
): Promise<T[]> {
  const res = await apiFetcher<ApiResponse<T>>(url, {
    params: filters,
  });

  // Check if res.data.items is an array, else return empty array
  return Array.isArray(res.data?.items) ? res.data.items : [];
}

/* =========================
   LOOKUP HELPERS
========================= */

export const getCurriculums = (filters?: LookupFilters) =>
  lookupFetcher<LookupItem>("/api/lookups/curriculums", filters);


export const getEducationLevels = (filters?: LookupFilters) =>
  lookupFetcher<LookupItem>("/api/lookups/education-levels", filters);

export const getGradeLevels = (filters?: LookupFilters) =>
  lookupFetcher<LookupItem>("/api/lookups/grade-levels", filters);

export const getPrograms = (filters?: LookupFilters) =>
  lookupFetcher<LookupItem>("/api/lookups/programs", filters);

export const getProgramTypes = (filters?: LookupFilters) =>
  lookupFetcher<LookupItem>("/api/lookups/program-types", filters);

export const getSubjectCategories = (filters?: LookupFilters) =>
  lookupFetcher<LookupItem>("/api/lookups/subject-categories", filters);

export const getSubjects = (filters?: LookupFilters) =>
  lookupFetcher<LookupItem>("/api/lookups/subjects", filters);

export const getTopics = (filters?: LookupFilters) =>
  lookupFetcher<LookupItem>("/api/lookups/topics", filters);

export const getLessonTypes = (filters?: LookupFilters) =>
  lookupFetcher<LookupItem>("/api/lookups/lesson-types", filters);

export const getCertificateLevels = (filters?: LookupFilters) =>
  lookupFetcher<LookupItem>("/api/lookups/certificate-levels", filters);

export const getTeachers = (filters?: LookupFilters) =>
    lookupFetcher<Teacher>("/api/lookups/teachers", filters);
  
export const getLessons = (filters?: LookupFilters) =>
  lookupFetcher<LookupItem>("/api/lookups/lessons", filters);

export const getBookingLessons = (filters?: LookupFilters) =>
  lookupFetcher<LookupItem>("/api/lesson/bookings", filters);

export const getStudents = (filters?: LookupFilters) =>
  lookupFetcher<Student>("/api/lookups/students", filters);

export const getAllAssignments = (type:string,filters?: LookupFilters) =>
  lookupFetcher<LookupItem>(`/api/assignment?type=${type}`, filters);

export const getAllUploadResources = (type:string,filters?: LookupFilters) =>
  lookupFetcher<LookupItem>(`/api/resource/uploads?type=${type}`, filters);

export const getPayments = (filters?: LookupFilters) =>
  lookupFetcher<LookupItem>("/api/payments", filters);

export const getContract = (filters?: LookupFilters) =>
  lookupFetcher<ContractItem>("/api/lookups/contract", filters);