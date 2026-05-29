import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let backendUrl = `${process.env.BACKEND_API_URL}/CPrograms/slots/decline`;

    const res = await axiosClient.post(backendUrl, body);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "program slot decline error:",
      error.response?.data || error.message
    );

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message ||
            "Failed to decline program slot",
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