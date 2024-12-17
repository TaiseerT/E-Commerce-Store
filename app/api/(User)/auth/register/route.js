import connectDB from "../../../../utils/db";
import bcrypt from "bcryptjs";
import { User } from "../../../models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, password } = body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return new Response(JSON.stringify({ message: "User already exists!" }), {
        status: 401,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return new Response(
      JSON.stringify({ token, message: "Signup Successful", user }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
