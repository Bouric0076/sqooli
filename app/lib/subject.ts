import { Subject } from "../admin/subjects/page";

export async function getSubjects() {
    const res = await fetch("/api/subjects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get Subject");
    }
  
    return res.json();
  }



export async function addSubject(form :Subject) {
    const res = await fetch("/api/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to publish Subject");
    }
  
    return res.json();
  }
  
  
  

  export async function UpdateSubject(form :Subject) {
    const res = await fetch(`/api/subjects`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update Subject");
    }
  
    return res.json();
  }
  
    export async function DeleteSubject(form :Subject) {
    const res = await fetch(`/api/subjects`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete Subject");
    }
  
    return res.json();
  }
  