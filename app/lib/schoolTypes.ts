export async function getSchoolTypes() {
    const res = await fetch("/api/school-types", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get School");
    }
  
    return res.json();
  }
