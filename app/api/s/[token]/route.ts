import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";
/* =======================
   FETCH LESSON(S) (GET)
======================= */
export async function GET(
  req: NextRequest,
  context: { params: { token: string } }
) {
  try {
    const { token } = await  context.params;

    // console.log("token Shorttner ===   "+token);

    // if(!token){
    //   console.log("not token")
    //   return ;
    // }
    // If id exists → fetch single lesson
    const backendUrl = `${process.env.BACKEND_API_URL}/s/${token}`;

    const res = await axiosClient.get(backendUrl);

    // console.log(res)



    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("urlshortner GET error:", error.response?.data || error.message);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to fetch urlshortner(s)",
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