import express from "express";
import { Login, register, updateUser } from "../controller/userController.js";
import { upload } from "../middleware/upload.js";
import { verifyOtp } from "../middleware/verifyOTP.js";
import { userValidate, userValidationSchema } from "../validators/userValidation.js";

const userRoute=express.Router();
userRoute.post("/register", upload.single("picture"),userValidate(userValidationSchema), register);
userRoute.post("/verify",  verifyOtp);
userRoute.post("/login",  Login);
userRoute.put("/updateUser/:id", upload.single("picture"),userValidate(userValidationSchema), updateUser);
export default userRoute;