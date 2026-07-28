import { NextResponse } from "next/server";
import axiosClient from "@/app/lib/axiosClient";

/* ================= POST ================= */
// Submit an assignment
export async function POST(req: Request) {
  try {
    const body = await req.json();


    const response = await axiosClient.post(
      `${process.env.BACKEND_API_URL}/Assignment/submit-and-grade`,
      body
    );

    return NextResponse.json(
      { success: true, data: response.data, message: response?.data?.message },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Assignment submission failedd:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: error?.response?.data?.error || "Failed to submit assignment" },
      { status: 500 }
    );
  }
}
