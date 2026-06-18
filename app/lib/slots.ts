export interface Slot{
   id:string 
}


export async function getAvailableSlots(form:Slot) {
    const res = await fetch("/api/program/slots/available", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get Topic");
    }
  
    return res.json();
  }
