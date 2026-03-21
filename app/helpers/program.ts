import { LookupFilters, lookupFetcher, ContractItem } from "./lookups";

export interface ProgramData extends ContractItem {
  programType: string;
  curriculum: string;
    startDate: string;
    endDate: string;
}

export const getCPrograms = (filters?: LookupFilters) =>
  lookupFetcher<ProgramData>("/api/program", filters);


  export const addCProgram = async (data: any) => {
    const res = await fetch("/api/program", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add program");
    return res.json();
  };
  