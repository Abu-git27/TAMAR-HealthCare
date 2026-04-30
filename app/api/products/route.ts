import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: 1 }).lean();

    const normalizedProducts = products.map((product: any) => ({
      ...product,
      images:
        product.images && product.images.length > 0
          ? product.images
          : product.image
          ? [product.image]
          : [],
      image:
        product.image ||
        (product.images && product.images.length > 0 ? product.images[0] : ""),
    }));

    return Response.json(normalizedProducts);
  } catch (error) {
    console.error("Products API GET error:", error);

    return Response.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const images = Array.isArray(body.images)
      ? body.images
      : body.image
      ? [body.image]
      : [];

    const product = await Product.create({
      id: body.id,
      name: body.name,
      category: body.category,
      description: body.description,

      // New system
      images,

      // Old fallback system
      image: images[0] || body.image || "",
    });

    return Response.json(product, { status: 201 });
  } catch (error) {
    console.error("Products API POST error:", error);

    return Response.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}