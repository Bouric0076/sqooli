import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Enrollment = {
  curriculumId: number;
  gradeLevelId: number;
  schoolId: number | null;
  subjectIds: number[];
};

export type SchoolEnrollment = {
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

export type OnboardingState = {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  address: string | null;
  nationalId: string | null;
  schoolTypeId: number | null;
  certificateLevelId: number | null;
  gender: string;

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
      gender: "", 
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
      setBasicInfo: (data) => set((state) => ({ ...state, ...data })),

      addTeacherEnrollment: (e) =>
        set(() => ({
          // Single enrollment per teacher
          teacherEnrollments: [e],
        })),

      addStudentEnrollment: (e) =>
        set(() => ({
          // Single enrollment per student
          studentEnrollments: [e],
        })),


        clearStudentEnrollments: () =>
          set({ studentEnrollments: [] }),
        
        clearTeacherEnrollments: () =>
          set({ teacherEnrollments: [] }),


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
      name: "onboarding-storage",
      storage: createJSONStorage(() => localStorage),
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
