import { IntakeRequest } from "../(main)/school/intakes/create/page";


export async function getIntake(id: string) {
    const res = await fetch(`/api/intake/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get Intake");
    }
  
    return res.json();
  }
  


export async function addIntake(form :IntakeRequest) {
    const res = await fetch("/api/intake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to publish Intake");
    }
  
    return res.json();
  }
  
  

  export async function UpdateIntake(form :IntakeRequest) {
    const res = await fetch(`/api/intake`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update Intake");
    }
  
    return res.json();
  }
  
    export async function DeleteIntake(form :IntakeRequest) {
    const res = await fetch(`/api/intake`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete Intake");
    }
  
    return res.json();
  }
  