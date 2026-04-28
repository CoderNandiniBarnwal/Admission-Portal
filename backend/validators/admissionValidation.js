import yup from "yup";

export const admissionValidationSchema = yup.object({
  course: yup
    .string()
    .trim()
    .required("Course is required"),
  address: yup.string().trim().required("Address is required"),
});
export const admissionValidate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
