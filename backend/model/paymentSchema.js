//paymentSchema.js

import mongoose from "mongoose";

export const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    amount: {
      type: Number,
      default: 1300,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "success",
    },
  },
  { timestamps: true },
);
export default mongoose.model("sPayment", paymentSchema);
