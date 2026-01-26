import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  // ✅ CLEAR HTTP-ONLY COOKIE
  cookieStore.set({
    name: "access_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // ⬅️ THIS deletes it
  });

  return NextResponse.json({ success: true });
}
