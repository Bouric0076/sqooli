import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/Roles`;

    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Roles error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to fetch Roles",
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
      `${process.env.BACKEND_API_URL}/Roles`,
      body
    );

    return NextResponse.json(
      { success: true, data: response.data,
        message: response?.data?.message
       },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Roles creation failedd:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Failed to create Roles" },
      { status: 500 }
    );
  }
}

/* ================= PUT ================= */
// Update Roles (optional, example)
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { message: "Roles id is required for update" },
        { status: 400 }
      );
    }

    // update
     const response= await axiosClient.put(
      `${process.env.BACKEND_API_URL}/Roles/${body.id}`,
      body
    );

    return NextResponse.json({ success: true,
       message: response?.data?.message
     }, { status: 200 });
  } catch (error: any) {
    console.error("Roles update failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Failed to update Roles "+error.message },
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
        { message: "Roles id is required for delete" },
        { status: 400 }
      );
    }

    // delete
   const response = await axiosClient.delete(
      `${process.env.BACKEND_API_URL}/Roles/${body.id}`
    );

    return NextResponse.json({ success: true, message: response?.data?.message }, { status: 200 });
  } catch (error: any) {
    console.error("Roles delete failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Failed to delete Roles "+error.message },
      { status: 500 }
    );
  }
}