import pkg from "bcryptjs";
import { Users } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const { compare } = pkg;

export async function createUser(req, res) {
  try {
    const users = new Users({
      email: req.body.email,
      fullName: req.body.fullName,
      password: req.body.password,
    });
    await users.save();
    res.status(200).json({
      status: 200,
      message: `account created`,
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      return res.status(400).json({
        status: 400,
        message: "Email already exist",
      });
    }

    res.status(500).json({
      status: 500,
      message: "Error creating User",
    });
  }
}

export async function loginUser(req, res) {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: `Invalid Login Credentials`,
      });
    }

    let verified = await compare(req.body.password, user.password);

    if (verified) {
      const { _id, email, fullName } = user;

      const LoggedUser = { _id, email, fullName };

      const token = jwt.sign({ userId: LoggedUser._id }, process.env.JWT_SECRET_KEY);

      return res.status(200).json({
        status: 200,
        message: {
          ...LoggedUser,
          token
        },
      });
    }

    return res.status(400).json({
      status: 400,
      message: `Invalid Login Credentials`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error Login User",
    });
  }
}
