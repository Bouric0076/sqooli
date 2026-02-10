async function handleResponse(res: Response, defaultMessage: string) {
  if (!res.ok) {
    let errMessage = defaultMessage;

    try {
      const err = await res.json();
      errMessage = err.message || defaultMessage;
    } catch {
      // response not JSON, keep default message
    }

    throw new Error(errMessage);
  }

  return res;
}

export async function startLesson(lessonId: string) {
  const res = await fetch(`/api/lesson/${lessonId}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await handleResponse(res, "Failed to start lesson");
}

export async function endLesson(lessonId: string) {
  const res = await fetch(`/api/lesson/${lessonId}/end`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await handleResponse(res, "Failed to end lesson");
}

export async function joinLesson(lessonId: string) {
  const res = await fetch(`/api/lesson/${lessonId}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await handleResponse(res, "Failed to join lesson");
}

export async function getAttendance(lessonId: string) {
  const res = await fetch(`/api/lesson/${lessonId}/attendance`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await handleResponse(res, "Failed to get attendance");
  return res.json();
}



export async function getLessonStatus(lessonId: string) {
  const res = await fetch(`/api/lesson/${lessonId}/status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await handleResponse(res, "Failed to get attendance");
  return res.json();
}

