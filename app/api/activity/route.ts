import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const { searchParams } = new URL(req.url);

        const search = searchParams.get("search") ?? "";
        const type = searchParams.get("type") ?? "All";
        const page = searchParams.get("page") ?? "1";
        const pageSize = searchParams.get("pageSize") ?? "30";

        const backendUrl =
            `${process.env.BACKEND_API_URL}/activity-logs` +
            `?search=${encodeURIComponent(search)}` +
            `&type=${encodeURIComponent(type)}` +
            `&page=${page}` +
            `&pageSize=${pageSize}`;

        const response = await axiosClient.get(backendUrl);

        return NextResponse.json(response.data);

    } catch (error: any) {

        console.error(error);

        return NextResponse.json(
            {
                message:
                    error.response?.data?.message ??
                    "Failed to fetch activities",
            },
            {
                status: error.response?.status ?? 500,
            }
        );
    }
}