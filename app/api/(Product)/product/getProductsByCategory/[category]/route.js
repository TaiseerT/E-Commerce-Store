import { Product } from "../../../../models/Product";
export async function GET(req, { params }) {
  const { category } = await params;

  try {
    const products = await Product.find({ category: category });

    if (products.length === 0) {
      return new Response(
        JSON.stringify({
          message: `No products found in the ${category} category`,
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        message: `Products in ${category} category`,
        products: products,
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
