import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

/* ================= GET ================= */
// Get all Programs assigned to a Programs
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const res = await axiosClient.get(
      `${process.env.BACKEND_API_URL}/Programs/${id}`
    );

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error(" Programs fetch error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to fetch  Programs",
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

/* ================= PUT ================= */
// Assign Programs to a Programs (replaces all)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!body.permissionIds || !Array.isArray(body.permissionIds)) {
      return NextResponse.json(
        { message: "permissionIds array is required" },
        { status: 400 }
      );
    }

    const res = await axiosClient.put(
      `${process.env.BACKEND_API_URL}/Programs/${id}`,
      body
    );

    return NextResponse.json(
      { success: true, data: res.data, message: res?.data?.message },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update Programs failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Failed to update Programs: " + error.message },
      { status: 500 }
    );
  }
}