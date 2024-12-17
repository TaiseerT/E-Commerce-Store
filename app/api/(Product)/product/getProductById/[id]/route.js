import { Types } from "mongoose";
import { Product } from "../../../../models/Product";
import { verifyToken } from "@/app/api/middlewares/auth.middleware";
import connectDB from "@/app/utils/db";

export async function GET(req) {
  await connectDB()
  try {
    const id = req.url.split("/").pop();
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID provided");
    }
    const objectId = new Types.ObjectId(id);
      const product = await Product.findOne({ _id: objectId });

      if (!product) {
        return new Response(JSON.stringify({ message: "Product not found" }), {
          status: 404,
        });
      } else {
        return new Response(JSON.stringify({ message: "Product:", product }), {
          status: 200,
        });
      }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
