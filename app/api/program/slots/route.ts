import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token"); // 🔹 optional: fetch single slot details
    let endpoint = `${process.env.BACKEND_API_URL}/CPrograms/invitations`;

    // ✅ If token is provided, fetch details of a single slot invitation
    if (token) {
      endpoint = `${process.env.BACKEND_API_URL}/CPrograms/slots/details`;
      console.log("Fetching slot details for token:", token);
    } else {
      console.log("Fetching all slot invitations with params:", Object.fromEntries(searchParams));
    }

    const res = await axiosClient.get(endpoint, {
      params: Object.fromEntries(searchParams),
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("CPrograms slots error:", error);

    if (error.response) {
      return NextResponse.json(
        { message: error.response.data?.message || "Failed to fetch CPrograms slots api" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend: " + error.message },
      { status: 502 }
    );
  }
}