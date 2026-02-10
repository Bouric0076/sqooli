import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: { resourceId: string } }
) {
  try {

    const { resourceId } = await  context.params;
    const body = await req.json();


    const res = await axiosClient.post(
      `${process.env.BACKEND_API_URL}/Resource/${resourceId}/attach`,body
    );


    console.log("Resource attach data:", res.data);
    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {

    console.error("Resource attach error:", error);
    return NextResponse.json(
      { message: error.response?.data?.message || "Failed to Resource attach" },
      { status: error.response?.status || 500 }
    );
  }
}
