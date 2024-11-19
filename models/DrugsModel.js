import mongoose from "mongoose";

const DrugSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The Drug's name is Required"],
      minlength: 6,
      maxlength: 50,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      minlength: 6,
      trim: true,
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    manufacturingDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export const Drugs = mongoose.model("Drugs", DrugSchema);
