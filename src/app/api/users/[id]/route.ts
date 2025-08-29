import { NextResponse, NextRequest } from "next/server";
import User from "@/models/usermodel";
import { connect } from "@/db/dbConnect";
import { getDataFromToken } from "@/helpers/getDataFormUser";

connect();

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 params is async
) {
  try {
    // ✅ Require login
    await getDataFromToken(request);

    const { id } = await context.params; // 👈 await is required
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
