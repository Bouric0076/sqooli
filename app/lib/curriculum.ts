import { Curriculum } from "../admin/curriculums/page";

export async function addCurriculum(form :Curriculum) {
    const res = await fetch("/api/curriculums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to publish Curriculum");
    }
  
    return res.json();
  }
  
  
  

  export async function UpdateCurriculum(form :Curriculum) {
    const res = await fetch(`/api/curriculums`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update curriculum");
    }
  
    return res.json();
  }
  
    export async function DeleteCurriculum(form :Curriculum) {
    const res = await fetch(`/api/curriculums`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete curriculum");
    }
  
    return res.json();
  }
  