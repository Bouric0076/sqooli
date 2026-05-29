import axiosClient from "@/app/lib/axiosClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: { sub_id: string } }
) {
  try {

    const { sub_id: subProgramId } = await context.params; // ✅ AWAIT params


    if (!subProgramId) {
      return NextResponse.json(
        { message: "Sub-program ID is required" },
        { status: 400 }
      );
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/CPrograms/${subProgramId}/slots`;
    
    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("Sub-program slots APi error:", error?.message);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message ||
            "Failed to fetch sub-program slots",
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
