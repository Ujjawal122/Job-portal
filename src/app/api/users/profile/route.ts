import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import User from "@/models/usermodel";
import { connect } from "@/db/dbConnect";

connect();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("fullname") as string;
    const email = formData.get("email") as string;
    const bio = formData.get("bio") as string;
    const profileFile = formData.get("file") as File | null;
    const resumeFile = formData.get("resume") as File | null;

    let profileImageUrl = "";
    let resumeUrl = "";

    // Upload profile image if provided
    if (profileFile) {
      const buffer = Buffer.from(await profileFile.arrayBuffer());
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "profiles" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });
      profileImageUrl = uploadResult.secure_url;
    }

    // Upload resume if provided
    if (resumeFile) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "resumes", resource_type: "raw" }, // important: resource_type raw for PDFs
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          )
          .end(buffer);
      });
      resumeUrl = uploadResult.secure_url;
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Update fields
    user.username = name;
    user.bio = bio;
    user.profileImage = profileImageUrl || user.profileImage;
    if (resumeUrl) user.resumeUrl = resumeUrl;

    await user.save();

    return NextResponse.json({ success: true, profile: user });
  } catch (error) {
    console.error("Profile save error:", error);
    return NextResponse.json(
      { success: false, error: "Profile save failed" },
      { status: 500 }
    );
  }
}
