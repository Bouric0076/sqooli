import { EducationLevel } from "../admin/education-levels/page";

export async function addEducationLevel(form :EducationLevel) {
    const res = await fetch("/api/education-levels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to publish education-levels");
    }
  
    return res.json();
  }
  
  
  

  export async function UpdateEducationLevel(form :EducationLevel) {
    const res = await fetch(`/api/education-levels`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update education-levels");
    }
  
    return res.json();
  }
  
    export async function DeleteEducationLevel(form :EducationLevel) {
    const res = await fetch(`/api/education-levels`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete education-levels");
    }
  
    return res.json();
  }
  