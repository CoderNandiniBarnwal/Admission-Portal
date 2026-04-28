//paymentController.js

import paymentSchema from "../model/paymentSchema.js";
import admissionSchema from "../model/admissionSchema.js";

export const payNow = async (req, res) => {
  try {
    const {cardNumber, status } = req.body;
    const userId = req.params.id;

    if (!cardNumber) {
      return res.status(400).json({
        success: false,
        message: "Card number missing",
      });
    }
    const alreadyPaid = await paymentSchema.findOne({ userId });
    if (alreadyPaid) {
      return res.status(400).json({
        success: false,
        message: "Student already paid the admission fee",
      });
    }
    await admissionSchema.findOneAndUpdate(
      { userId },
      { 
        paymentStatus: "paid",
        status: "successful",
      },
    );
    const user = await paymentSchema.create({
      userId,
      amount: 1300,
      cardNumber,
      paymentStatus:"paid",
      status: "Success",
    });

    return res.status(201).json({
      success: true,
      message: "Payment successful",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getPaymentById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await paymentSchema.findOne({ userId });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Payment recipt fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllPayment = async (req, res) => {
  try {
    const user = await paymentSchema.find({});

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Payment recipt fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
