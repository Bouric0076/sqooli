import { NextResponse } from "next/server";
import axiosClient from "@/app/lib/axiosClient";

/* ================= GET ================= */
// Fetch assignments optionally by lessonId query
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    // If no lessonId, return empty list
    // if (!lessonId) {
    //   return NextResponse.json({ assignments: [] }, { status: 200 });
    // }

    console.log("Fetching assignments with type:", type);
    const endpoint =  `${process.env.BACKEND_API_URL}/assignment-resources/${type}`;
    console.log("GET assignments endpoint:", endpoint);

    const res = await axiosClient.get(endpoint);

    console.log("GET assignments response:", res.data);

    return NextResponse.json(res.data, { status: 200 });

  } catch (err) {
    console.error("GET assignments failef", err);
    return NextResponse.json({ assignments: [] }, { status: 200 });
  }
}

/* ================= POST ================= */
// Create a new assignment with sections and questions
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      !body.name ||
      !body.sections ||
      !Array.isArray(body.sections) ||
      body.sections.length === 0
    ) {
      return NextResponse.json(
        { message: "Assignment name and sections are required" },
        { status: 400 }
      );
    }

    const response = await axiosClient.post(
      `${process.env.BACKEND_API_URL}/Assignment/create`,
      body
    );

    return NextResponse.json(
      { success: true, data: response.data, message: response?.data?.message },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Assignment creation failedd:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Failed to create assignment" },
      { status: 500 }
    );
  }
}

/* ================= PUT ================= */
// Update assignment (optional, example)
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { message: "Assignment id is required for update" },
        { status: 400 }
      );
    }

    // Assuming you have an update API endpoint on backend
    const response = await axiosClient.put(
      `${process.env.BACKEND_API_URL}/api/assignments/${body.id}`,
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
