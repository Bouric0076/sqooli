import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

/* ================= GET ================= */
// Get all permissions assigned to a role
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const res = await axiosClient.get(
      `${process.env.BACKEND_API_URL}/Roles/${id}/permissions`
    );

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Role permissions fetch error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to fetch role permissions",
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
// Assign permissions to a role (replaces all)
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
      `${process.env.BACKEND_API_URL}/Roles/${id}/permissions`,
      body
    );

    return NextResponse.json(
      { success: true, data: res.data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Assign permissions failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Failed to assign permissions: " + error.message },
      { status: 500 }
    );
  }
}