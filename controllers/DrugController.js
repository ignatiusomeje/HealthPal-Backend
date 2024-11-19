import { Users } from "../models/UserModel.js";
import { Drugs } from "../models/DrugsModel.js";

export async function createDrug(req, res) {
  try {
    const drug = new Drugs({
      name: req.body.name,
      description: req.body.description,
      expiryDate: req.body.expiryDate,
      manufacturingDate: req.body.manufacturingDate,
      creator: req.user,
    });
    const newDrug = await drug.save();
    res.status(200).json({
      status: 200,
      message: newDrug,
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      return res.status(400).json({
        status: 400,
        message: "Drug already exist",
      });
    }

    res.status(500).json({
      status: 500,
      message: "Error creating Drug",
    });
  }
}

export async function getAllDrugs(req, res) {
  try {
    const drugs = await Drugs.find({});
    if (!drugs) {
      return res.status(404).json({
        status: 404,
        message: `No Drug found`,
      });
    }

    return res.status(200).json({
      status: 200,
      message: drugs,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error fetching drug",
    });
  }
}

export async function getADrug(req, res) {
  try {
    const drug = await Drugs.findById(req.params.id);
    if (!drug) {
      return res.status(400).json({
        status: 404,
        message: `Fake Drug found`,
      });
    }
    return res.status(200).json({
      status: 200,
      message: drug,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error fetching drug",
    });
  }
}
