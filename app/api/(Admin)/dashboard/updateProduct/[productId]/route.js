import { canManageProduct } from "@/app/api/middlewares/canManageProduct.middleware";
import connectDB from "../../../../../utils/db";
import { Product } from "../../../../models/Product";
import { writeFile } from "fs/promises";
import path from "path";
export async function PATCH(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const category = formData.get("category");
    const description = formData.get("description");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const image = formData.get("image");

    let fileName;
    if (image && image instanceof File) {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      fileName = `${Date.now()}-${image.name}`;
      const absoluteFilePath = path.join(uploadDir, fileName);

      const fileBuffer = await image.arrayBuffer();
      await writeFile(absoluteFilePath, Buffer.from(fileBuffer));
    }
    await connectDB();
    await canManageProduct(req);

    const productId = req.url.split("/").pop();
    if (!productId) {
      return new Response(
        JSON.stringify({ message: "Product ID is required" }),
        {
          status: 400,
        }
      );
    }
    const oldProduct = await Product.findById(productId);
    if (!oldProduct) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: name || oldProduct.name,
        category: category || oldProduct.category,
        description: description || oldProduct.description,
        price: price || oldProduct.price,
        quantity: quantity || oldProduct.quantity,
        image: fileName || oldProduct.image,
      },
      { new: true }
    );
    return new Response(
      JSON.stringify({
        message: "Product updated successfully",
        product: updatedProduct,
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
