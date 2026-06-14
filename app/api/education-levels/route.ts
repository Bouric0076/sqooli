import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/Educationlevels`;

    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Educationlevels error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to fetch Educationlevels",
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
// Create a new 
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
      `${process.env.BACKEND_API_URL}/Educationlevels`,
      body
    );

    return NextResponse.json(
      { success: true, data: response.data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Educationlevels creation failedd:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Failed to create Educationlevels" },
      { status: 500 }
    );
  }
}

/* ================= PUT ================= */
// Update Educationlevels
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { message: "Educationlevels id is required for update" },
        { status: 400 }
      );
    }

    // update
    await axiosClient.put(
      `${process.env.BACKEND_API_URL}/Educationlevels/${body.id}`,
      body
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Educationlevels update failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Failed to update Educationlevels "+error.message },
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
        { message: "Educationlevels id is required for delete" },
        { status: 400 }
      );
    }

    // delete
    await axiosClient.delete(
      `${process.env.BACKEND_API_URL}/Educationlevels/${body.id}`
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Educationlevels delete failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Failed to delete Educationlevels "+error.message },
      { status: 500 }
    );
  }
}