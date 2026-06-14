import { GradeLevel } from "../admin/grade-levels/page";

export async function addGradeLevel(form :GradeLevel) {
    const res = await fetch("/api/grade-levels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to publish grade-levels");
    }
  
    return res.json();
  }
  
  
  

  export async function UpdateGradeLevel(form :GradeLevel) {
    const res = await fetch(`/api/grade-levels`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update grade-levels");
    }
  
    return res.json();
  }
  
    export async function DeleteGradeLevel(form :GradeLevel) {
    const res = await fetch(`/api/grade-levels`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete grade-levels");
    }
  
    return res.json();
  }
  