import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let backendUrl = `${process.env.BACKEND_API_URL}/CPrograms/slots/accept`;

    console.log("Accepting program slot with data:", body);

    const res = await axiosClient.post(backendUrl, body);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "program slot accept error:",
      error.response?.data || error.message
    );

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.error ||
            "Failed to accept program slot",
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