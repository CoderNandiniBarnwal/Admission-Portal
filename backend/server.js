import express from "express";
import dotenv from "dotenv/config";
import { dbConnect } from "./config/dbConnect.js";
import userRoute from "./route/userRoute.js";
import { upload } from "./middleware/upload.js";
import admissionRoute from "./route/admissionRoute.js";
import paymentRouter from "./route/paymentRoute.js";
import cors from "cors";

const app = express();
const port = process.env.port;

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/payment", paymentRouter);
app.use("/admission", admissionRoute);
app.use("/upload", express.static("upload"));
dbConnect();

app.listen(port, () => {
  console.log("Port running at port ", port);
});
