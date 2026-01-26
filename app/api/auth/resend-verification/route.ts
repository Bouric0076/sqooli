import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json(); // { email }

    const backendUrl = `${process.env.BACKEND_API_URL}/Auth/resend-verification-email`;
    const res = await axiosClient.post(backendUrl, body);

    return NextResponse.json(res.data, { status: 200 });
  } catch (err: any) {
    console.error("Resend verification error:", err);

    if (err.response) {
      return NextResponse.json(
        { message: err.response.data?.message || "Failed to resend verification email" },
        { status: err.response.status }
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend: " + err.message },
      { status: 502 }
    );
  }
}
