import express from "express";
import DrugValidation from "../utils/drugValidation.js";
import {
  createDrug,
  getADrug,
  getAllDrugs,
} from "../controllers/DrugController.js";
import { authenticate } from "../utils/authenticate.js";

const drugRouter = express.Router();

drugRouter.post("/", DrugValidation, authenticate, createDrug);
drugRouter.get("/", authenticate, getAllDrugs);
drugRouter.get("/:id", authenticate, getADrug);
// drugRouter.put("/:id", DrugValidation, updateADrug);
// drugRouter.delete("/:id", deleteADrug);

export default drugRouter;

/* 
1. post a drug
2. get a drug
3. get all drugs
// 4. verify a drugs genuineness
// 5. get a qrCode
*/

/* 
1. login a user
2. create a user
3. confirm user
// 3. forgot password
*/
