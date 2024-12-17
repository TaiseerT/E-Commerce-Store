import connectDB from "@/app/utils/db";
import { verifyToken } from "../../middlewares/auth.middleware";
import { Product } from "../../models/Product";
import { Cart } from "../../models/Cart";

export async function PATCH(req) {
  try {
    await connectDB();
    const user = await verifyToken(req);

    const body = await req.json();
    const { productId, quantityChange } = body;

    if (!productId || quantityChange === undefined) {
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

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantityChange;

      if (newQuantity < 1) {
        cart.items = cart.items.filter(
          (item) => item.productId.toString() !== productId
        );
        await Product.findByIdAndUpdate(
          productId,
          {
            $inc: { quantity: existingItem.quantity },
          },
          { new: true }
        );
      } else {
        const quantityDifference = quantityChange;

        if (product.quantity < quantityDifference && quantityDifference > 0) {
          return new Response(
            JSON.stringify({ message: "Not enough stock for this product" }),
            { status: 400 }
          );
        }

        existingItem.quantity = newQuantity;
        await Product.findByIdAndUpdate(
          productId,
          {
            $inc: { quantity: -quantityDifference },
          },
          { new: true }
        );
      }
    } else {
      if (quantityChange > 0) {
        if (product.quantity < quantityChange) {
          return new Response(
            JSON.stringify({ message: "Not enough stock for this product" }),
            { status: 400 }
          );
        }
        cart.items.push({ productId, quantity: quantityChange });
        await Product.findByIdAndUpdate(
          productId,
          {
            $inc: { quantity: -quantityChange },
          },
          { new: true }
        );
      } else {
        return new Response(
          JSON.stringify({ message: "Cannot decrease quantity below 1" }),
          { status: 400 }
        );
      }
    }

    await cart.save();

    return new Response(
      JSON.stringify({ message: "Cart updated successfully", cart }),
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
