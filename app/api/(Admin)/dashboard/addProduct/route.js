import { Product } from "../../../models/Product";
import connectDB from "../../../../utils/db";
import { writeFile } from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const category = formData.get("category");
    const description = formData.get("description");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const image = formData.get("image");

    if (
      !name ||
      !price ||
      !category ||
      !description ||
      !quantity ||
      !image ||
      typeof image === "string"
    ) {
      return new Response(
        JSON.stringify({ message: "Missing required fields!" }),
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const fileName = `${image.name}`;
    const absoluteFilePath = path.join(uploadDir, fileName);

    const fileBuffer = await image.arrayBuffer();
    await writeFile(absoluteFilePath, Buffer.from(fileBuffer));

    await connectDB();

    const product = new Product({
      name,
      category,
      description,
      price,
      quantity,
      image: fileName,
    });

    await product.save();

    return new Response(
      JSON.stringify({ message: "Product added successfully", product }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error }),
      { status: 500 }
    );
  }
}
