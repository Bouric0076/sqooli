import axiosClient from "@/app/lib/axiosClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: { id: string } }
) {
  try {

    const { id: subprogramId } = await context.params; // ✅ AWAIT params


    if (!subprogramId) {
      return NextResponse.json(
        { message: "Subprogram ID is required" },
        { status: 400 }
      );
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/CPrograms/subprogram/${subprogramId}`;
    
    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("SubProgram profile APi error:", error?.message);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message ||
            "Failed to fetch SubProgram profile",
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
