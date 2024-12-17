import { Product } from "@/app/api/models/Product";

export async function GET(req) {
    try {
      const categories = await Product.distinct("category");
  
      if (categories.length === 0) {
        return new Response(JSON.stringify({ message: "No categories found" }), {
          status: 200,
        });
      }
  
      return new Response(
        JSON.stringify({ message: "Categories:", categories }),
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({
          message: error.message || "Failed to fetch categories.",
        }),
        { status: 500 }
      );
    }
  }