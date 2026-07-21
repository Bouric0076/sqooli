export type ActivityType =
  | "Enrollment"
  | "Lesson"
  | "Assignment"
  | "Attendance"
  | "Exam"
  | "Announcement"
  | "Student"
  | "Teacher"
  | "Program"
  | "Payment"
  | "Login"
  | "Other";

export interface Activity {
  id: string;
  user: string;
  role: string;
  action: string;
  type: ActivityType;
  createdAt: string;
  time: string;
}

export interface ActivityResponse {
  total: number;
  page: number;
  pageSize: number;
  data: Activity[];
}

export interface ActivityStats {
  todayActivities: number;
  assignments: number;
  attendance: number;
  announcements: number;
}