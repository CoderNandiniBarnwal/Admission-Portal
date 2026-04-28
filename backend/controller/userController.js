import jwt from "jsonwebtoken";
import { verifyMail } from "../emailVerify/verifyMail.js";
import userSchema from "../model/userSchema.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { userName, email, password, phone } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image not found",
      });
    }
    const allowTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    if (!allowTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Image type ",
      });
    }
    const imgUrl = `http://localhost:8001/upload/${req.file.filename}`;

    const userExist = await userSchema.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already existing",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await userSchema.create({
      userName,
      email,
      password: hashPassword,
      phone,
      picture: imgUrl,
      otp,
      otpExpire: Date.now() + 10 * 60 * 1000,
    });
    verifyMail(otp, email);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Unauthorised error",
      });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(404).json({
        success: false,
        message: "Incorrect password",
      });
    }
    if (passwordCheck && user.isVerified === true) {
      const accessToken = jwt.sign({ id: user._id }, process.env.secretKey, {
        expiresIn: "30days",
      });
      const refreshToken = jwt.sign({ id: user._id }, process.env.secretKey, {
        expiresIn: "10days",
      });
      user.isLogin = true;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "User registered successfully",
        accessToken,
        refreshToken,
        data: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "First complete verification then login",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { userName, email, password, phone } = req.body;

    const user = await userSchema.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (email) {
      const userExist = await userSchema.findOne({ email, _id: { $ne: id } });

      if (userExist) {
        return res.status(400).json({
          success: false,
          message: "User already registered",
        });
      }
      user.email = email;
    }

    if (userName) user.userName = userName;
    if (phone) user.phone = phone;
    if (password) user.password = await bcrypt.hash(password, 10);

    if (req.file) {
      const allowTypes = ["image/jpeg", "image/png", "image/svg+xml"];
      if (!allowTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Image type ",
        });
      }
      user.picture = `http://localhost:8001/upload/${req.file.filename}`;
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(404).json({
        success: false,
        message: "Incorrect password",
      });
    }
    
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
