import mongoose, { Schema, model, models } from "mongoose"

const applicationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    job: { type: String, required: true }, // or ObjectId if jobs are in DB
    coverLetter: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
)

const Application = models.Application || model("Application", applicationSchema)
export default Application
