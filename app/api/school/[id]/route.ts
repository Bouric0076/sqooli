import axiosClient, { setAuthToken } from "@/app/lib/axiosClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: { id: string } }
) {
  try {

    const { id: schoolId } = await context.params; // ✅ AWAIT params


    if (!schoolId) {
      return NextResponse.json(
        { message: "School ID is required" },
        { status: 400 }
      );
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/schools/${schoolId}`;
    
    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("School profile APi error:", error?.message);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message ||
            "Failed to fetch school profile",
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend" },
      { status: 502 }
    );
  }
}
