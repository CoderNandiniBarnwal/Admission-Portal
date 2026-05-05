import express from "express";
import { getAllPayment, getPaymentById, payNow } from "../controller/paymentController.js";
import { paymentValidate, paymentValidationSchema } from "../validators/paymentValidation.js";
import {hasToken} from "../middleware/hasToken.js";

const paymentRouter=express.Router();
paymentRouter.post("/payNow/:id",paymentValidate(paymentValidationSchema),hasToken,payNow);
paymentRouter.get("/getPaymentById/:id",hasToken,getPaymentById);
paymentRouter.get("/getAllPayment",hasToken,getAllPayment);

export default paymentRouter;