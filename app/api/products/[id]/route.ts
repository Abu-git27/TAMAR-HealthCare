import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import mongoose from "mongoose";

async function findProduct(id: string) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const byObjectId = await Product.findById(id);
    if (byObjectId) return byObjectId;
  }

  return Product.findOne({ id });
}

function normalizeProduct(product: any) {
  const obj = product.toObject ? product.toObject() : product;

  const images =
    obj.images && obj.images.length > 0
      ? obj.images
      : obj.image
      ? [obj.image]
      : [];

  return {
    ...obj,
    images,
    image: obj.image || images[0] || "",
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const product = await findProduct(id);

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json(normalizeProduct(product));
  } catch (error) {
    console.error("Product detail API GET error:", error);

    return Response.json({ message: "Error fetching product" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const product = await findProduct(id);

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    const images = Array.isArray(body.images)
      ? body.images
      : body.image
      ? [body.image]
      : [];

    product.id = body.id;
    product.name = body.name;
    product.category = body.category;
    product.description = body.description;

    // New system
    product.images = images;

    // Old fallback system
    product.image = images[0] || body.image || "";

    await product.save();

    return Response.json(normalizeProduct(product));
  } catch (error) {
    console.error("Product detail API PUT error:", error);

    return Response.json({ message: "Error updating product" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    let deletedProduct = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      deletedProduct = await Product.findByIdAndDelete(id);
    }

    if (!deletedProduct) {
      deletedProduct = await Product.findOneAndDelete({ id });
    }

    if (!deletedProduct) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Product detail API DELETE error:", error);

    return Response.json({ message: "Error deleting product" }, { status: 500 });
  }
}