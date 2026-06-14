import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const res = await axiosClient.put(
      `${process.env.BACKEND_API_URL}/Users/${id}/unlock`
    );

    return NextResponse.json(
      { success: true, data: res.data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Unlock user failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: error?.response?.data?.message || "Failed to unlock user" },
      { status: error?.response?.status || 500 }
    );
  }
}