import { NextRequest, NextResponse } from "next/server"
import { verifyJwt } from "@/lib/verifyJWT"
import { connect } from "@/db/dbConnect"
import Application from "@/models/applicationModel"

export async function POST(request: NextRequest) {
  try {
    await connect()

    // 🔑 Check auth
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyJwt(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // 📩 Extract data
    const { jobId, coverLetter } = await request.json()

    if (!jobId || !coverLetter) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // ✅ Create application
    const application = await Application.create({
      user: decoded.id, // logged in user
      job: jobId,       // job user applied for
      coverLetter,
    })

    return NextResponse.json({ application }, { status: 201 })
  } catch (err) {
    console.error("Error submitting application:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
