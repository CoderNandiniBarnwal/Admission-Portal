//admissionSchema.js

import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"student",
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      default:"unpaid"
    },
    status: {
      type: String,
      default:"pending"
    },
    
  },
  { timestamps: true },
);
export default mongoose.model("sAdmission", admissionSchema);
