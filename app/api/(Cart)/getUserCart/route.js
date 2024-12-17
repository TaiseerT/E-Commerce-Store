import connectDB from "../../../utils/db";
import { Cart } from "../../models/Cart";
import { Product } from "../../models/Product";
import { verifyToken } from "@/app/api/middlewares/auth.middleware";

export async function GET(req) {
  try {
    await connectDB();

    const user = await verifyToken(req);

    const cart = await Cart.findOne({ userId: user.id })
      .select("-__v -createdAt -updatedAt")
      .populate("items.productId")
      .select("-___v -updatedAt -createdAt");

    if (!cart) {
      return new Response(JSON.stringify({ message: "Cart is empty" }), {
        status: 200,
      });
    }

    return new Response(JSON.stringify({ cart }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
