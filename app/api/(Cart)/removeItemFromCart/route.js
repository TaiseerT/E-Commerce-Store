import connectDB from "@/app/utils/db";
import { verifyToken } from "../../middlewares/auth.middleware";
import { Cart } from "../../models/Cart";
import { Product } from "../../models/Product";

export async function POST(req) {
  try {
    await connectDB();
    const user = await verifyToken(req);

    const body = await req.json();
    const { itemId } = body; 

    if (!itemId) {
      return new Response(JSON.stringify({ message: "Invalid Data!" }), {
        status: 400,
      });
    }

    let cart = await Cart.findOne({ userId: user.id });
    if (!cart) {
      return new Response(JSON.stringify({ message: "Cart not found" }), {
        status: 404,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return new Response(
        JSON.stringify({ message: "Product not found in cart" }),
        { status: 404 }
      );
    }

    const item = cart.items[itemIndex];

    await Product.findByIdAndUpdate(item.productId, {
      $inc: { quantity: item.quantity },
    });

    cart.items.splice(itemIndex, 1);

    await cart.save();

    return new Response(
      JSON.stringify({
        message: "Product removed from cart successfully",
        cart,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
