import yup from "yup";

export const paymentValidationSchema = yup.object({
  cardNumber: yup
    .string()
    .trim()
    .min(5, "Card number must be of 5 digits")
    .max(5, "Card number must be of 5 digits")
    .required("Card is required"),
});
export const paymentValidate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
