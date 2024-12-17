import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "client",
    },
    balance: {
      type: Number,
      default: 5000,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
