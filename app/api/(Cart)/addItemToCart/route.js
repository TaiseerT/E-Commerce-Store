import connectDB from "@/app/utils/db";
import { verifyToken } from "../../middlewares/auth.middleware";
import { Product } from "../../models/Product";
import { Cart } from "../../models/Cart";

export async function POST(req) {
  try {
    await connectDB();
    const user = await verifyToken(req);

    const body = await req.json();
    const { productId } = body;

    if (user.role === "client") {
      if (!productId) {
        return new Response(JSON.stringify({ message: "Invalid Data!" }), {
          status: 400,
        });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return new Response(JSON.stringify({ message: "Product not found" }), {
          status: 404,
        });
      }

      let cart = await Cart.findOne({ userId: user.id });
      if (!cart) {
        cart = new Cart({ userId: user.id, items: [] });
      }

      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (!existingItem) {
        cart.items.push({ productId, quantity: 1 });
      }

      await cart.save();

      return new Response(
        JSON.stringify({ message: "Cart updated successfully", cart }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Only clients can add to cart!" }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
