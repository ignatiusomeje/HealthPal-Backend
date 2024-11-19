import Joi from "joi";

const DrugValidation = async (req, res, next) => {
  try {
    const drugSchema = Joi.object({
      name: Joi.string()
        .trim()
        .required("Drug's name is Required")
        .min(6)
        .max(50),
      description: Joi.string()
        .trim()
        .required("Drug's name is Required")
        .min(6),
      expiryDate: Joi.date().required("expiry Date is required"),
      manufacturingDate: Joi.date().required("Manufacturing Date is required"),
    });

    await drugSchema.validateAsync(req.body);

    next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

export default DrugValidation;
