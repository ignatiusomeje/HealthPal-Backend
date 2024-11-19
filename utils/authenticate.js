import jwt from "jsonwebtoken";
import "dotenv/config.js"

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    
    if (token) {
      const validate = await jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = validate.userId;
      return next();
    }
    throw new Error();
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
};
