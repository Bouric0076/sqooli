import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const res = await axiosClient.get(
      `${process.env.BACKEND_API_URL}/Contract`,
      {
        params: Object.fromEntries(searchParams),
      }
    );

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Contract  error:", error);

    if (error.response) {
      return NextResponse.json(
        { message: error.response.data?.message || "Failed to fetch Contract" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend: " + error.message },
      { status: 502 }
    );
  }
}
