import { NextRequest, NextResponse } from "next/server";
import axiosClient from "@/app/lib/axiosClient";

/* ================= GET ================= */
// Fetch assignments optionally by lessonId query
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {

   console.log("PARAMS:", await context.params);
    const { id } = await  context.params;
    const assignementId = Number(id);

    console.log("Assignment ID:", assignementId);


    // If no assignemntis, return empty list
    if (!assignementId) {
      return NextResponse.json({ assignments: [] }, { status: 200 });
    }

    const res = await axiosClient.get(
      `${process.env.BACKEND_API_URL}/Assignment/${assignementId}`
    );


    return NextResponse.json(
res.data,
    );
  } catch (err) {
    console.error("GET assignment failed", err);
    return NextResponse.json({ assignments: [] }, { status: 200 });
  }
}


/* ================= PUT ================= */
// Update assignment (optional, example)
export async function PUT(  req: NextRequest,
    context: { params: { id: string } }) {

        const { id } = await  context.params;


        console.log("Assignment ID for update:", id);
    try {
      const body = await req.json();
  
      if (!id) {
        return NextResponse.json(
          { message: "Assignment id is required for update" },
          { status: 400 }
        );
      }
  
      // Assuming you have an update API endpoint on backend
      const response = await axiosClient.put(
        `${process.env.BACKEND_API_URL}/Assignment/${id}`,
        body
      );
  
      return NextResponse.json({ success: true, message: response?.data?.message }, { status: 200 });
    } catch (error: any) {
      console.error("Assignment update failed:", error?.response?.data || error.message);
  
      return NextResponse.json(
        { message: "Failed to update assignment" },
        { status: 500 }
      );
    }
  }
  