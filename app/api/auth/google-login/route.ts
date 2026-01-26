import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // expects { idToken: string }

    const backendUrl = `${process.env.BACKEND_API_URL}/Auth/google-login`;

    // Send idToken to your backend
    const res = await axiosClient.post(backendUrl, body);

    const { access_token, user } = res.data;

    if (!access_token) {
      return NextResponse.json(
        { message: "Authentication token missing" },
        { status: 401 }
      );
    }

    // ✅ SET HTTP-ONLY COOKIE
    (await cookies()).set({
      name: "access_token",
      value: access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // ✅ Return only safe user data
    return NextResponse.json(
      { user, message: res.data.message || "Login successful" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Google login error:", error);

    if (error.response) {
      return NextResponse.json(
        { message: error.response.data?.message || "Login failed" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend" },
      { status: 502 }
    );
  }
}
