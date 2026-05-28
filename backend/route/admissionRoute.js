import express from "express";
import { applyAdmission, deleteAdmission, getAdmissionById, getAllAdmission, pagination, updateAdmission } from "../controller/admissionController.js";
import { admissionValidate, admissionValidationSchema } from "../validators/admissionValidation.js";
import { hasToken } from "../middleware/hasToken.js";

const admissionRoute=express.Router();
admissionRoute.post("/applyAdmission/:id",admissionValidate(admissionValidationSchema),hasToken,applyAdmission);
admissionRoute.get("/getAdmissionById/:id",hasToken,getAdmissionById);
admissionRoute.get("/getAllAdmission",hasToken,getAllAdmission);
admissionRoute.delete("/deleteAdmission/:id",hasToken,deleteAdmission);
admissionRoute.put("/updateAdmission/:id",admissionValidate(admissionValidationSchema),hasToken,updateAdmission);
admissionRoute.get("/paginateAdmission",hasToken,pagination);

export default admissionRoute;