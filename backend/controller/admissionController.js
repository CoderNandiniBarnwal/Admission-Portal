//admissionController.js

import admissionSchema from "../model/admissionSchema.js";

export const applyAdmission = async (req, res) => {
  try {
    const { course, address } = req.body;
    const userId = req.params.id;

    if (!course || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const alreadyApplied = await admissionSchema.findOne({ userId });
    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "This user is already applied",
      });
    }

    const user = await admissionSchema.create({
      userId,
      course,
      address,
    });
    return res.status(201).json({
      success: true,
      message: "Admission form submitted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdmissionById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await admissionSchema
      .findOne({ userId })
      .populate("userId", "userName email phone picture");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admission form fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllAdmission = async (req, res) => {
  try {
    const user = await admissionSchema
      .find({})
      .populate("userId", "userName email phone picture");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admission form fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteAdmission = async (req, res) => {
  try {
    const id = req.params.id;

    const admission = await admissionSchema.findById(id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    if (admission.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete after payment",
      });
    }

    const user = await admissionSchema.findByIdAndDelete({
      _id: id,
      userId: req.userId,
    });
    if (user) {
      return res.status(200).json({
        success: true,
        message: "Admission form deleted successfully",
        data: user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Admission form not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAdmission = async (req, res) => {
  try {
    const id = req.params.id;
    const { course, address } = req.body;

    const admission = await admissionSchema.findById(id);
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission form not found",
      });
    }
    if (admission.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Cannot update after payment",
      });
    }
    const user = await admissionSchema.findByIdAndUpdate({
      _id: id,
      userId: req.userId,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admission form not found",
      });
    }
    user.address = address;
    user.course = course;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Admission form updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const pagination = async (req, res) => {
  try {
    // const { search = "" } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;

    const skip = (page - 1) * limit;
    const user = await admissionSchema.find().skip(skip).limit(limit).populate("userId","userName email phone picture");
    const totalAdmission = await admissionSchema.countDocuments();

    const totalPages = Math.ceil(totalAdmission / limit);
    return res.status(200).json({
      success: true,
      message: "Admission sorted pagewise",
      data: user,
      totalPages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
