
export type Gender = "Male" | "Female";

export interface EnrollmentForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  dob: string | null;
  gender: string;
  country: string;
  county: string;
  subProgramId: string;
  intake: string;
  studyMode: string;
  previousSchool: string | null;
  grade: string | null;
  subjectIds: number[];
}

export interface EnrollmentPayForm{
    enrollmentId:number,
    phone:string
    paymentMethod:string
}

export async function addEnrollment(form :EnrollmentForm) {
    const res = await fetch("/api/enrollment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to Enrollment");
    }
  
    return res.json();
  }
  

  export async function payEnrollment(form :EnrollmentPayForm) {
    const res = await fetch("/api/enrollment/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to pay Enrollment");
    }
  
    return res.json();
  }
  

  export async function getEnrollmentPrograms() {
    const res = await fetch("/api/enrollment/programs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get programs");
    }
  
    return res.json();
  }

    export async function getEnrollmentIntakes() {
    const res = await fetch("/api/enrollment/intakes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get intakes");
    }
  
    return res.json();
  }

    export async function getEnrollmentCountries() {
    const res = await fetch("/api/enrollment/countries", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get countries");
    }
  
    return res.json();
  }

export async function getEnrollmentStatus(id:number) {
    const res = await fetch(`/api/enrollment/${id}/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get countries");
    }
  
    return res.json();
  }