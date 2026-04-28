import express from "express";
import { applyAdmission, deleteAdmission, getAdmissionById, getAllAdmission, updateAdmission } from "../controller/admissionController.js";
import { admissionValidate, admissionValidationSchema } from "../validators/admissionValidation.js";

const admissionRoute=express.Router();
admissionRoute.post("/applyAdmission/:id",admissionValidate(admissionValidationSchema),applyAdmission);
admissionRoute.get("/getAdmissionById/:id",getAdmissionById);
admissionRoute.get("/getAllAdmission",getAllAdmission);
admissionRoute.delete("/deleteAdmission/:id",deleteAdmission);
admissionRoute.put("/updateAdmission/:id",admissionValidate(admissionValidationSchema),updateAdmission);

export default admissionRoute;