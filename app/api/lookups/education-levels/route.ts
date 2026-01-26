import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const res = await axiosClient.get(
      `${process.env.BACKEND_API_URL}/EducationLevels`,
      {
        params: Object.fromEntries(searchParams),
      }
    );

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Education levels error:", error);

    if (error.response) {
      return NextResponse.json(
        { message: error.response.data?.message || "Failed to fetch education levels" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend: " + error.message },
      { status: 502 }
    );
  }
}
