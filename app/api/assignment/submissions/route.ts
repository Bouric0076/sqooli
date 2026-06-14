import { NextResponse } from "next/server";
import axiosClient from "@/app/lib/axiosClient";



export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

  
    const endpoint =  `${process.env.BACKEND_API_URL}/Assignment/submissions?type=${type}`;
    console.log("GET assignments submission endpoint:", endpoint);

    const res = await axiosClient.get(endpoint);

    console.log("GET assignments response:", res.data);

    return NextResponse.json(res.data, { status: 200 });

  } catch (err) {
    console.error("GET assignments failef", err);
    return NextResponse.json([], { status: 200 });
  }
}
