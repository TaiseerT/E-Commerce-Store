import { canManageProduct } from "@/app/api/middlewares/canManageProduct.middleware";
import connectDB from "../../../../../utils/db";
import { Product } from "../../../../models/Product";

export async function DELETE(req) {
  try {
    await connectDB();
    await canManageProduct(req);
    const productId = req.url.split("/").pop();

    const product = await Product.findById(productId);
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }
    const updatedProduct = await Product.findByIdAndDelete(productId);
    return new Response(
      JSON.stringify({
        message: "Product deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
