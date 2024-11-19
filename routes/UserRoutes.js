import express from "express";
import { UserValidation, LoginValidation } from "../utils/inputValidation.js";
import { createUser, loginUser } from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/create", UserValidation, createUser);
userRouter.post("/login", LoginValidation, loginUser);
// userRouter.put("/:id", updateADrug);
// userRouter.delete("/:id", deleteADrug);

export default userRouter;
