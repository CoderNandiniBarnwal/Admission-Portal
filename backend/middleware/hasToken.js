import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import userSchema from "../model/userSchema.js";
import sessionSchema from "../model/sessionSchema.js";

export const hasToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(400).json({
        success: false,
        message: "Token expired or invelid",
      });
    } else {
      const token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        process.env.secretKey,
        async (err, decoded) => {
          if (err) {
            if (err.name === "TokenExpiredError") {
              return res.status(400).json({
                success: false,
                message: "Token expired",
              });
            }
            return res.status(400).json({
              success: false,
              message: "Token invelid",
            });
          } else {
            const { id } = decoded;
            const user = await userSchema.findById(id);

            if (!user) {
              return res.status(404).json({
                success: false,
                message: "User not found",
              });
            }

            const existing = await sessionSchema.findOne({ userId: id });
            if (!existing) {
              return res.status(400).json({
                success: false,
                message: "User already logout",
              });
            }
            req.userId = id;
            req.user = user;
            next();
          }
        },
      );
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






