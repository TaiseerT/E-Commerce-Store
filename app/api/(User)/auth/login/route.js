import connectDB from "../../../../utils/db";
import bcrypt from "bcryptjs";
import { User } from "../../../models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 401,
      });
    }
    const matchPassword = await bcrypt.compare(password, userExist.password);
    if (!matchPassword) {
      return new Response(JSON.stringify({ message: "Invalid Password" }), {
        status: 403,
      });
    }
    const role = userExist.role;
    const balance = userExist.balance;
    const token = jwt.sign({ id: userExist.id }, process.env.JWT_SECRET);
    return new Response(
      JSON.stringify({ balance, role, token, message: "Login Successful" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
