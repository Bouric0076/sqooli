export interface Break {
  startTime: string;
  endTime: string;
}

export interface Schedule {
  dayOfWeek: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
  breaks: Break[];
}

export interface Holiday {
  holidayName: string;
  startDate: string;
  endDate: string;
}

export interface BusinessHour {
  day: string;
  isActive: boolean;
}

export interface SubProgram {
  name: string;
  educationLevelId: number;
  gradeLevelId: number;
  subjectIds: number[];
  startDate: string;
  endDate: string;
}

export interface ProgramRequest {
  programId?: number;
  lessonDuration?: number;
  programName: string;
  programTypeId: number;
  curriculumId: number;
  programStartDate: string;
  programEndDate: string;
  hasSubPrograms: boolean;
  subPrograms: SubProgram[];
  schedules: Schedule[];
  holidays: Holiday[];
  businessHours: BusinessHour[];
}