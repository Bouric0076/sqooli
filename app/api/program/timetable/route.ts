import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token"); // 🔹 optional: fetch single slot details
    let endpoint = `${process.env.BACKEND_API_URL}/CPrograms/timetable`;


    const res = await axiosClient.get(endpoint, {
      params: Object.fromEntries(searchParams),
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("CPrograms slots error:", error);

    if (error.response) {
      return NextResponse.json(
        { message: error.response.data?.message || "Failed to fetch Calendar slots api" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend: " + error.message },
      { status: 502 }
    );
  }
}