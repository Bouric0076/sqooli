import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const backendUrl = `${process.env.BACKEND_API_URL}/Subject`;

    const res = await axiosClient.get(backendUrl, {
      params: Object.fromEntries(searchParams),
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Subjects lookup error:", error);

    if (error.response) {
      return NextResponse.json(
        { message: error.response.data?.message || "Failed to fetch subjects" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend: " + error.message },
      { status: 502 }
    );
  }
}
