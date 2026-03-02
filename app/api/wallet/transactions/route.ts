import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/wallet/transactions`;

    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "transactions error:",
      error.response?.data || error.message
    );

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message ||
            "Failed to fetch transactions",
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