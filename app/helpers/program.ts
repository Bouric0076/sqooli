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