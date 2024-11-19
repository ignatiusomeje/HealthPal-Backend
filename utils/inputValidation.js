import Joi from "joi";

export const UserValidation = async (req, res, next) => {
  try {
    const userSchema = Joi.object({
      email: Joi.string().trim().email().required("email is required"),
      fullName: Joi.string()
        .trim()
        .required("Full name is Required")
        .min(6)
        .max(50),
      password: Joi.string().required("Password is required").min(6),
    });

    await userSchema.validateAsync(req.body);

    next();
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

export const LoginValidation = async (req, res, next) => {
  try {
    const LoginSchema = Joi.object({
      email: Joi.string().trim().email().required("email is required"),
      password: Joi.string().required("Password is required").min(6),
    });

    await LoginSchema.validateAsync(req.body);

    next();
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};


