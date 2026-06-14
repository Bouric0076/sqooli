import { SubjectCategory } from "../admin/subject-categories/page";

export async function getSubjectCategories() {
    const res = await fetch("/api/subject-categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get SubjectCategory");
    }
  
    return res.json();
  }



export async function addSubjectCategory(form :SubjectCategory) {
    const res = await fetch("/api/subject-categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to publish SubjectCategory");
    }
  
    return res.json();
  }
  
  
  

  export async function UpdateSubjectCategory(form :SubjectCategory) {
    const res = await fetch(`/api/subject-categories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update SubjectCategory");
    }
  
    return res.json();
  }
  
    export async function DeleteSubjectCategory(form :SubjectCategory) {
    const res = await fetch(`/api/subject-categories`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete SubjectCategory");
    }
  
    return res.json();
  }
  