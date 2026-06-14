export type LessonItem = {
  title: string;
  type: "Quiz" | "Assignment" | "Exam" | "Resource";
  order: number;
  referenceId?: number;
};

export type LessonLecture = {
  title: string;
  description: string;
  order: number;
  items: LessonItem[];
};

export type LessonSection = {
  title: string;
  order: number;
  lectures: LessonLecture[];
};




export async function getLessonBasicInfo(lessonId: number) {
  const res = await fetch(
    `/api/lesson?id=${lessonId}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return data;
}


export async function getLessonBasicInfoToken(token: string) {
  const res = await fetch(
    `/api/lesson?token=${token}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return data;
}



export async function getCurriculumTeachers(lessonId: number) {
  const res = await fetch(
    `/api/lesson/teachers?subjectId=${lessonId}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return data;
}


// app/helpers/lesson.ts
export const assignTeacherToLesson = async (
  lessonId: number,
  teacherId: number
) => {
  const res = await fetch("/api/lesson/assign-teacher", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lessonId,
      teacherId,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to assign teacher");
  }

  return res.json();
};


export async function publishLesson(lessonId: number) {
  const res = await fetch("/api/lesson/publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lessonId,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to publish lesson");
  }

  return res.json();
}




/* ================= GET ================= */
export async function getLessonContent(lessonId: number) {
  const res = await fetch(
    `/api/lesson/content?lessonId=${lessonId}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return {
    sections: Array.isArray(data?.sections) ? data.sections : [],
  };
}






/* ================= SAVE ================= */
export async function saveLessonContent(payload: {
  lessonId: number;
  sections: LessonSection[];
}) {
  const res = await fetch("/api/lesson/content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  console.log("Save lesson content response:", res);

  if (!res.ok) {
    throw new Error("Failed to save lesson content");
  }

  return res.json();
}
