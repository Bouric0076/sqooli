import { LookupFilters, lookupFetcher, ContractItem } from "./lookups";

export interface ProgramData extends ContractItem {
  programType: string;
  curriculum: string;
    startDate: string;
    endDate: string;
}

export const getCPrograms = (filters?: LookupFilters) =>
  lookupFetcher<ProgramData>("/api/program", filters);

export const getCProgram = async (id: any, filters?: LookupFilters) => {
      const res = await fetch(`/api/program/${id}`, {
      method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    });
    if (!res.ok) throw new Error("Failed to get program");
    return res.json();
}


  export const addCProgram = async (data: any) => {
    const res = await fetch("/api/program", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add program");
    return res.json();
  };
  

  export const getCProgramSlots = async (id: any,sub_id: any, filters?: LookupFilters) => {
      const res = await fetch(`/api/program/${id}/sub-programs/${sub_id}/slots`, {
      method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    });
    if (!res.ok) throw new Error("Failed to get program slots");
    return res.json();
}

  export const bulkSlotInvite = async (data: any) => {
    const res = await fetch("/api/invitations/invite", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to send bulk invitations");
    return res.json();
  };

  //get the invited program slots
  export const getInvitedProgramSlots = async (filters?: LookupFilters) => {

  const queryParams = filters
    ? `?${new URLSearchParams(filters as Record<string, string>).toString()}`
    : "";



  const res = await fetch(`/api/program/slots${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
    if (!res.ok) throw new Error("Failed to get invited program slots");
    return res.json();
}

export const acceptProgramSlot = async (data: any) => {
  console.log("Accepting program slot with data:", data);

  const res = await fetch("/api/program/slots/accept", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json(); // parse once

  if (!res.ok) {
    throw new Error(responseData?.message || "Request failed");
  }

  return responseData;
};

  export const rejectProgramSlot = async (data: any) => {
    const res = await fetch("/api/program/slots/reject", {
      method: "POST", 
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to reject program slot");
    return res.json();
  };

    export const getSlotTimetable = async (filters?: LookupFilters) => {

  const queryParams = filters
    ? `?${new URLSearchParams(filters as Record<string, string>).toString()}`
    : "";



  const res = await fetch(`/api/program/timetable${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
    if (!res.ok) throw new Error("Failed to get invited program slots");
    return res.json();
}