import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true,"Please provide a username"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please provide a email"]
    },
    password:{
        type:String,
        required:[true,"Please provide a password"]
    },

 fullName: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String, // store Cloudinary URL
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  skills: {
    type: [String], 
    default: [],
  },
  experience: {
    type: String, 
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
    forgetPasswordToken:String,
    forgetPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
},
{timestamps:true}
)

const User=mongoose.models.User || mongoose.model("User",userSchema)

export default User; 