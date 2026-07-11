import { School } from "../admin/schools/page";

export async function getSchools() {
    const res = await fetch("/api/school", {
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



export async function addSchool(form :School) {
    const res = await fetch("/api/school", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to publish School");
    }
  
    return res.json();
  }
  
  
  

  export async function UpdateSchool(form :School) {
    const res = await fetch(`/api/school`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update School");
    }
  
    return res.json();
  }
  
    export async function DeleteSchool(form :School) {
    const res = await fetch(`/api/school`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete School");
    }
  
    return res.json();
  }
  