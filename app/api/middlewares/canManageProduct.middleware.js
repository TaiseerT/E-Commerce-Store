import jwt from "jsonwebtoken";
import { User } from "@/app/api/models/User";
import connectDB from "@/app/utils/db";

export async function canManageProduct(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized: Invalid token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("Unauthorized: Invalid token");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("Unauthorized: User not found");
    }

    if (user.role !== "admin") {
      throw new Error("Forbidden: Access denied");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}
