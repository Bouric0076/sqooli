import { AddResourceForm } from "../(main)/school/resources/assignments/create-assignment/page";

  
    /* ================= GET ================= */
    export async function getAssignments() {
        const res = await fetch(
          `/api/assignment`,
          { cache: "no-store" }
        );
      
        const data = await res.json();
        return data;
      }
    
  
  
  
  /* ================= GET ================= */
  export async function getAssignment(assignemntId: number) {
    const res = await fetch(
      `/api/assignment/${assignemntId}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data;
  }



export async function addAssigment(form :AddResourceForm) {
    const res = await fetch("/api/assignment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to publish assignment");
    }
  
    return res.json();
  }
  
  
  

  export async function UpdateAssigment(form :AddResourceForm, assignemntId: number) {
    const res = await fetch(`/api/assignment/${assignemntId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update assignment");
    }
  
    return res.json();
  }
  
  export async function getAssignmentSubmissions(assignmentId: number) {
    const res = await fetch(
      `/api/assignment/submissions?assignmentId=${assignmentId}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data;
  }

    export async function getAllAssignmentSubmissions(type: string) {
    const res = await fetch(
      `/api/assignment/submissions?type=${type}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data;
  }