import axiosClient from "@/app/lib/axiosClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: { id: string } }
) {
  try {

    const { id: programId } = await context.params; // ✅ AWAIT params


    if (!programId) {
      return NextResponse.json(
        { message: "Program ID is required" },
        { status: 400 }
      );
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/CPrograms/${programId}`;
    
    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("Program profile APi error:", error?.message);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message ||
            "Failed to fetch program profile",
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
