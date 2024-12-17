import connectDB from "@/app/utils/db";
import { verifyToken } from "../../../middlewares/auth.middleware";
import { Product } from "../../../models/Product";
import { Cart } from "../../../models/Cart";
import { User } from "../../../models/User";

export async function POST(req) {
  try {
    await connectDB();
    const user = await verifyToken(req);

    const body = await req.json(); 
    const { items } = body; 

    if (!items || items.length === 0) {
      return new Response(
        JSON.stringify({ message: "Your cart is empty or not found." }),
        { status: 400 }
      );
    }

    let totalPrice = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId); 

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }

      if (product.quantity < item.quantity) {
        throw new Error(`Not enough stock for product: ${product.name}.`);
      }

      totalPrice += product.price * item.quantity;

      await Product.findByIdAndUpdate(product._id, {
        $inc: { quantity: -item.quantity },
      });
    }

    const userData = await User.findById(user.id);
    if (!userData) {
      throw new Error("User not found.");
    }

    if (userData.balance < totalPrice) {
      throw new Error("Insufficient balance to complete the purchase.");
    }

    userData.balance -= totalPrice; 
    await userData.save();

    const cart = await Cart.findOne({ userId: user.id });
    cart.items = [];
    await cart.save();

    return new Response(
      JSON.stringify({
        message: "Order confirmed successfully!",
        totalPrice,
        remainingBalance: userData.balance,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Checkout Error:", error);
    return new Response(
      JSON.stringify({
        message: error.message || "Failed to complete checkout.",
      }),
      { status: 500 }
    );
  }
}
