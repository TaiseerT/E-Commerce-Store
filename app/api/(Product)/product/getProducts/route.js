import connectDB from "@/app/utils/db";
import { Product } from "../../../models/Product";

export async function GET(req) {
  await connectDB();
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    };

    const products = await Product.find(search ? query : {});

    if (products.length === 0) {
      return new Response(
        JSON.stringify({ message: "No products found", products: [] }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify({ message: "Products:", products }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
