import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import User from "@/models/usermodel"
import { profile } from "console"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const bio = formData.get("bio") as string
    const file = formData.get("file") as File | null

    let imageUrl = ""

    if (file) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Upload to Cloudinary
      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "profiles" }, (error, result) => {
            if (error) return reject(error)
            resolve(result)
          })
          .end(buffer)
      })

      imageUrl = uploadResult.secure_url
    }


    let user=await User.findOne({email})
    if(!user){
      user=new User({
        username:name,
        email,
        bio,
        profileImage:imageUrl
      })
    }else{
      user.fullname=name
      user.bio=bio;
      user.profileImage=imageUrl ||user.profileImage
    }

    await user.save();

    return NextResponse.json({
      success: true,
      profile:user
    })
  } catch (error) {
    console.error("Profile save error:",error)
    return NextResponse.json(
      { success: false, error: "Profile save failed" },
      { status: 500 }
    )
  }
}
