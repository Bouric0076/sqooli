import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/Permissions`;

    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Permissions error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to fetch Permissions",
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
      !body.name 
    ) {
      return NextResponse.json(
        { message: "Name required" },
        { status: 400 }
      );
    }

    const response = await axiosClient.post(
      `${process.env.BACKEND_API_URL}/Permissions`,
      body
    );

    return NextResponse.json(
      { success: true, data: response.data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Permissions creation failedd:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Failed to create Permissions" },
      { status: 500 }
    );
  }
}

/* ================= PUT ================= */
// Update Permissions (optional, example)
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { message: "Permissions id is required for update" },
        { status: 400 }
      );
    }

    // update
    await axiosClient.put(
      `${process.env.BACKEND_API_URL}/Permissions/${body.id}`,
      body
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Permissions update failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Failed to update Permissions "+error.message },
      { status: 500 }
    );
  }
}

///delete
