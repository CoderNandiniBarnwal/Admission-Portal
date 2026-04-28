import nodemailer from "nodemailer";
import dotenv from "dotenv/config";

export const verifyMail=async(otp,email)=>{
    const transport=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.mailUser,
            pass:process.env.mailPass,
        }
    });
    const configuration={
        from:process.env.mailUser,
        to:email,
        subject:"OTP for verification",
        text:`You are successfully registered now your otp is ${otp}.`
    };
    transport.sendMail(configuration,function(err,info){
        if(err){
            console.log("Can't verify mail");
            throw new Error(err);
        }
        console.log("Mail verified successfully");
        console.log(info)
    })
}