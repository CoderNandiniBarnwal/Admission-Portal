import express from "express";
import { getAllPayment, getPaymentById, payNow } from "../controller/paymentController.js";
import { paymentValidate, paymentValidationSchema } from "../validators/paymentValidation.js";

const paymentRouter=express.Router();
paymentRouter.post("/payNow/:id",paymentValidate(paymentValidationSchema),payNow);
paymentRouter.get("/getPaymentById/:id",getPaymentById);
paymentRouter.get("/getAllPayment",getAllPayment);

export default paymentRouter;