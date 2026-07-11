

export interface Teacher{
    id:number,
    name:string
}


export async function getTeachers() {
    const res = await fetch("/api/teacher", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get Teacher");
    }
  
    return res.json();
  }



export async function addTeacher(form :Teacher) {
    const res = await fetch("/api/teacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to publish Teacher");
    }
  
    return res.json();
  }
  
  
  

  export async function UpdateTeacher(form :Teacher) {
    const res = await fetch(`/api/teacher`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update Teacher");
    }
  
    return res.json();
  }
  
    export async function DeleteTeacher(form :Teacher) {
    const res = await fetch(`/api/teacher`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete Teacher");
    }
  
    return res.json();
  }
  