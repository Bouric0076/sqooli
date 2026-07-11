

export interface Student{
    id:number,
    name:string
}


export async function getStudents() {
    const res = await fetch("/api/student", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get Student");
    }
  
    return res.json();
  }



export async function addStudent(form :Student) {
    const res = await fetch("/api/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to publish Student");
    }
  
    return res.json();
  }
  
  
  

  export async function UpdateStudent(form :Student) {
    const res = await fetch(`/api/student`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update Student");
    }
  
    return res.json();
  }
  
    export async function DeleteStudent(form :Student) {
    const res = await fetch(`/api/student`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete Student");
    }
  
    return res.json();
  }
  