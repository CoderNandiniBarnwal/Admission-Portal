import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    isIssuedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

export default mongoose.model("aSession", sessionSchema);
