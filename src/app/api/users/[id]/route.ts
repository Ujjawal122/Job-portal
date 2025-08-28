import { NextResponse, NextRequest } from "next/server";
import User from "@/models/usermodel";
import { connect } from "@/db/dbConnect";
import { getDataFromToken } from "@/helpers/getDataFormUser";

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // ✅ Require login
    await getDataFromToken(request);

    const { id } = params; // ✅ get user ID from URL
    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
