import { canManageProduct } from "@/app/api/middlewares/canManageProduct.middleware";
import connectDB from "../../../../../utils/db";
import { Product } from "../../../../models/Product";
import fs from "fs/promises";
import path from "path";

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

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const imagePath = path.join(uploadDir, product.image); 

    await Product.findByIdAndDelete(productId);

    try {
      await fs.access(imagePath); 
      await fs.unlink(imagePath); 
      console.log("Image deleted:", imagePath);
    } catch (fileError) {
      console.warn("Image file not found or already deleted:", imagePath);
    }

    return new Response(
      JSON.stringify({
        message: "Product and its image deleted successfully",
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
