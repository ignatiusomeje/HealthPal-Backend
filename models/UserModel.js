import pkg from "bcryptjs";
import mongoose from "mongoose";

const { hash } = pkg

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    sparse: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  fullName: {
    type: String,
    required: [true, "Your Full Name is Required"],
    minlength: 6,
    maxlength: 50,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  this.password = await hash(this.password, 10);
});

export const Users = mongoose.model("Users", UserSchema);
