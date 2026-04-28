import userSchema from "../model/userSchema.js";

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already verified",
      });
    }

    if (user.otp !== otp || user.otpExpire<Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or expired otp",
      });
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;
    await user.save();


    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
