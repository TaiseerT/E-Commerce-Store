import jwt from "jsonwebtoken";
import { User } from "../models/User";
import connectDB from "../../utils/db";

export async function verifyToken(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Authorization header missing or invalid");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      throw new Error("Invalid token");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    throw new Error("Unauthorized");
  }
}
