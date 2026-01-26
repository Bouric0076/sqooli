import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Enrollment = {
  curriculumId: number;
  gradeLevelId: number;
  schoolId: number | null;
  subjectIds: number[];
};

type SchoolEnrollment = {
  schoolTypeId: number | null;
  address: string | null;
  logoUrl: string | null;
  schoolCode: string | null;
  schoolMotto: string | null;
  schoolName: string;
  schoolEmail: string;
  adminEmail: string;
  phone: string | null;
  curriculumIds: number[];
};

type OnboardingState = {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  address: string | null;
  nationalId: string | null;
  schoolTypeId: number | null;
  certificateLevelId: number | null;

  teacherEnrollments: Enrollment[];
  studentEnrollments: Enrollment[];

  schoolEnrollment: SchoolEnrollment;

  // Actions
  setBasicInfo: (data: Partial<OnboardingState>) => void;
  addTeacherEnrollment: (e: Enrollment) => void;
  addStudentEnrollment: (e: Enrollment) => void;
  setSchoolEnrollment: (data: Partial<SchoolEnrollment>) => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      email: "",
      role: "",
      firstName: "",
      lastName: "",
      phone: null,
      address: null,
      nationalId: null,
      certificateLevelId: null,
      schoolTypeId: null,

      teacherEnrollments: [],
      studentEnrollments: [],
      schoolEnrollment: {
        schoolTypeId: null,
        address: null,
        logoUrl: null,
        schoolCode: null,
        code: null,
        name: "",
        email: "",
        curriculumIds: [],
      },

      // Actions
      setBasicInfo: (data) =>
        set((state) => ({ ...state, ...data })),

      addTeacherEnrollment: (e) =>
        set((state) => ({
          teacherEnrollments: [...state.teacherEnrollments, e],
        })),

      addStudentEnrollment: (e) =>
        set((state) => ({
          studentEnrollments: [...state.studentEnrollments, e],
        })),

      setSchoolEnrollment: (data) =>
        set((state) => ({
          schoolEnrollment: { ...state.schoolEnrollment, ...data },
        })),

      reset: () =>
        set({
          email: "",
          role: "",
          firstName: "",
          lastName: "",
          phone: null,
          address: null,
          nationalId: null,
          certificateLevelId: null,
          schoolTypeId: null,
          teacherEnrollments: [],
          studentEnrollments: [],
          schoolEnrollment: {
            schoolTypeId: null,
            address: null,
            logoUrl: null,
            motto: null,
            code: null,
            name: "",
            email: "",
            curriculumIds: [],
          },
        }),
    }),
    {
      name: "onboarding-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage), // ✅ ensures proper JSON storage
      partialize: (state) => ({
        email: state.email,
        role: state.role,
        firstName: state.firstName,
        lastName: state.lastName,
        phone: state.phone,
        address: state.address,
        nationalId: state.nationalId,
        certificateLevelId: state.certificateLevelId,
        schoolTypeId: state.schoolTypeId,
        schoolEnrollment: state.schoolEnrollment,
        teacherEnrollments: state.teacherEnrollments,
        studentEnrollments: state.studentEnrollments,
      }),
    }
  )
);
