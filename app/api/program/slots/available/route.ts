import axiosClient from "@/app/lib/axiosClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) { 
  try {

 const body = await req.json();

 const  subProgramId = body.id;

    if (!subProgramId) {
      return NextResponse.json(
        { message: "subProgramId ID is required" },
        { status: 400 }
      );
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/CPrograms/${subProgramId}/available-slots`;
    
    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("slots available  APi error:", error?.message);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message ||
            "Failed to fetch program slots available",
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
