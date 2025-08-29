import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFormUser"

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    return NextResponse.json({ id: userId }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
