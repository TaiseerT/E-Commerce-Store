import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerce-assignment")
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

async function seedAdmin() {
  try {
    const isThereAdmin = await User.findOne({ role: "admin" });
    if (isThereAdmin) {
      console.log("There's already an Admin!");
      return;
    }

    const admin = {
      email: "admin@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      name: "Mohammad Taiseer Tello",
      role: "admin",
    };

    await User.create(admin);
    console.log("Admin user created!");
  } catch (err) {
    console.error("Error seeding admin:", err);
  }
}

seedAdmin()
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error during seedAdmin execution:", err);
  });
