import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/Teacher/all`;

    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Teachers error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to fetch Teachers",
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend: " + error.message },
      { status: 502 }
    );
  }
}


/* ================= POST ================= */
// Create a new curriculumns
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      !body.email 
    ) {
      return NextResponse.json(
        { message: "Email required" },
        { status: 400 }
      );
    }

    const response = await axiosClient.post(
      `${process.env.BACKEND_API_URL}/Teacher`,
      body
    );

    return NextResponse.json(
      { success: true, data: response.data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Teacher creation failedd:", error?.response?.data || error.message);

    return NextResponse.json(
      { message:  error?.response?.data || error.message   },
      { status: 500 }
    );
  }
}

/* ================= PUT ================= */
// Update Teacher (optional, example)
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { message: "Teacher id is required for update" },
        { status: 400 }
      );
    }

    // update
    await axiosClient.put(
      `${process.env.BACKEND_API_URL}/Teacher/${body.id}`,
      body
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Teacher update failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Failed to update Teacher "+error.message },
      { status: 500 }
    );
  }
}

///delete
export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { message: "Teacher id is required for delete" },
        { status: 400 }
      );
    }

    // delete
    await axiosClient.delete(
      `${process.env.BACKEND_API_URL}/Teacher/${body.id}`
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Teacher delete failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Failed to delete Teacher "+error.message },
      { status: 500 }
    );
  }
}