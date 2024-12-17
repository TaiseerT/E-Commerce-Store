import { NextResponse } from "next/server";
import { Product } from "@/app/api/models/Product";
import { Types } from "mongoose";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const excludeId = searchParams.get("excludeId");

  if (!excludeId || !Types.ObjectId.isValid(excludeId)) {
    return NextResponse.json(
      { message: "Invalid or missing product ID provided" },
      { status: 400 }
    );
  }

  if (!category) {
    return NextResponse.json(
      { message: "Category is required" },
      { status: 400 }
    );
  }

  try {
    const relatedProducts = await Product.find({
      category: category,
      _id: { $ne: excludeId },
    })
      .limit(4)
      .exec();

    return NextResponse.json({ relatedProducts });
  } catch (error) {
    console.error("Error fetching related products:", error);
    return NextResponse.json(
      { message: "Failed to fetch related products" },
      { status: 500 }
    );
  }
}
